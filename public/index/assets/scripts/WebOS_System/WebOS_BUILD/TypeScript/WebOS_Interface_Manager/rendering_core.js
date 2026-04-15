const RenderingShaderData = {
    InterfaceRenderingVertex: `#version 300 es
in vec2 position;
in vec4 color;
in vec2 texCoord;

uniform vec2 uResolution;

out vec4 vColor;
out vec2 vTexCoord;

void main() {
    // convert from pixels to 0 1
    vec2 zeroToOne = position / uResolution;
    // 0 1 → 0 2
    vec2 zeroToTwo = zeroToOne * 2.0;
    // 0 2 → -1 1 (clip space)
    vec2 clip = zeroToTwo - 1.0;
    // flip Y (canvas is top-left, clip is bottom-left)
    clip.y *= -1.0;

    gl_Position = vec4(clip, 0.0, 1.0);
    vColor = color;
    vTexCoord = texCoord;
}`,
    FragmentRendering: `#version 300 es
precision mediump float;

in vec4 vColor;
in vec2 vTexCoord;
uniform sampler2D uTexture;

out vec4 outColor;

void main() {
    outColor = texture(uTexture, vTexCoord) * vColor;
}`
};
class RenderQuad {
    constructor(x, y, w, h, color, texture) {
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.color = [1, 1, 1, 1];
        this.texture = null;
        this.uvs = { left: 0, top: 0, right: 1, bottom: 1 };
        this.visible = true;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        if (color)
            this.color = color;
        if (texture !== undefined)
            this.texture = texture;
    }
}
class RenderGroup {
    constructor(x = 0, y = 0) {
        this.x = 0;
        this.y = 0;
        this.visible = true;
        this.children = [];
        this.x = x;
        this.y = y;
    }
    add(child) {
        this.children.push(child);
    }
    remove(child) {
        const idx = this.children.indexOf(child);
        if (idx > -1)
            this.children.splice(idx, 1);
    }
}
export class Renderer2D {
    constructor(DisplayCanvas, TargetObjectLimit = 4096) {
        this.topLevelDrawables = [];
        this.activeTweens = [];
        const gl = DisplayCanvas.getContext("webgl2");
        if (!gl)
            throw new Error("WebGL2 not supported");
        this.AttatchedRenderer = gl;
        const vs = this.CompileFramework(gl.VERTEX_SHADER, RenderingShaderData.InterfaceRenderingVertex.trim());
        const fs = this.CompileFramework(gl.FRAGMENT_SHADER, RenderingShaderData.FragmentRendering.trim());
        const InstancedProgram = gl.createProgram();
        gl.attachShader(InstancedProgram, vs);
        gl.attachShader(InstancedProgram, fs);
        gl.linkProgram(InstancedProgram);
        this.program = InstancedProgram;
        this.uResolutionLoc = gl.getUniformLocation(InstancedProgram, "uResolution");
        this.uTextureLoc = gl.getUniformLocation(InstancedProgram, "uTexture");
        this.RenderingBuffer = gl.createBuffer();
        this.VertexArrayBuffer = gl.createVertexArray();
        gl.bindVertexArray(this.VertexArrayBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.RenderingBuffer);
        const stride = 8 * 4;
        const posLoc = gl.getAttribLocation(InstancedProgram, "position");
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, stride, 0);
        const colLoc = gl.getAttribLocation(InstancedProgram, "color");
        gl.enableVertexAttribArray(colLoc);
        gl.vertexAttribPointer(colLoc, 4, gl.FLOAT, false, stride, 2 * 4);
        const texLoc = gl.getAttribLocation(InstancedProgram, "texCoord");
        gl.enableVertexAttribArray(texLoc);
        gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, stride, 6 * 4);
        gl.bindVertexArray(null);
        this.whiteTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.whiteTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    CompileFramework(type, src) {
        const gl = this.AttatchedRenderer;
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(s));
            throw new Error("Shader compile error");
        }
        return s;
    }
    async loadTexture(source) {
        const gl = this.AttatchedRenderer;
        let img;
        if (typeof source === "string") {
            img = await new Promise((resolve, reject) => {
                const i = new Image();
                i.crossOrigin = "anonymous";
                i.onload = () => resolve(i);
                i.onerror = reject;
                i.src = source;
            });
        }
        else {
            img = source;
        }
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        return texture;
    }
    createRect(x, y, w, h, color = [1, 1, 1, 1]) {
        return new RenderQuad(x, y, w, h, color, null);
    }
    createSprite(x, y, w, h, texture, tint = [1, 1, 1, 1]) {
        return new RenderQuad(x, y, w, h, tint, texture);
    }
    createGroup(x = 0, y = 0) {
        return new RenderGroup(x, y);
    }
    addToScene(drawable) {
        if (!this.topLevelDrawables.includes(drawable)) {
            this.topLevelDrawables.push(drawable);
        }
    }
    removeFromScene(drawable) {
        const idx = this.topLevelDrawables.indexOf(drawable);
        if (idx > -1)
            this.topLevelDrawables.splice(idx, 1);
    }
    TweenSelected(RequestedObject = undefined, TargetProperties, durationMs = 500) {
        if (!RequestedObject || !TargetProperties) {
            console.error("TweenSelected: invalid object or target properties");
            return Promise.reject();
        }
        const startTime = Date.now();
        const startPos = { x: RequestedObject.x, y: RequestedObject.y };
        let startSize = null;
        if ("w" in RequestedObject && "h" in RequestedObject) {
            startSize = { w: RequestedObject.w, h: RequestedObject.h };
        }
        const tween = {
            object: RequestedObject,
            startTime,
            duration: durationMs,
            startPos,
            startSize,
            targetPos: TargetProperties.positions,
            targetSize: TargetProperties.sizing,
            onComplete: null
        };
        if (this.activeTweens !== null && this.activeTweens instanceof Array) {
            this.activeTweens.push(tween);
        }
        else {
            console.warn("");
        }
        return new Promise(resolve => {
            tween.onComplete = resolve;
        });
    }
    update() {
        const now = Date.now();
        for (let i = this.activeTweens.length - 1; i >= 0; i--) {
            const t = this.activeTweens[i];
            let progress = (now - t.startTime) / t.duration;
            if (progress > 1)
                progress = 1;
            const obj = t.object;
            if (t.targetPos) {
                obj.x = t.startPos.x + (t.targetPos.x - t.startPos.x) * progress;
                obj.y = t.startPos.y + (t.targetPos.y - t.startPos.y) * progress;
            }
            if (t.targetSize && t.startSize) {
                obj.w = t.startSize.w + (t.targetSize.w - t.startSize.w) * progress;
                obj.h = t.startSize.h + (t.targetSize.h - t.startSize.h) * progress;
            }
            if (progress >= 1) {
                if (t.onComplete)
                    t.onComplete();
                this.activeTweens.splice(i, 1);
            }
        }
    }
    render(width, height) {
        const gl = this.AttatchedRenderer;
        gl.viewport(0, 0, width, height);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(this.program);
        gl.uniform2f(this.uResolutionLoc, width, height);
        const batchMap = new Map();
        for (const drawable of this.topLevelDrawables) {
            this.collectVertices(drawable, 0, 0, batchMap);
        }
        gl.bindVertexArray(this.VertexArrayBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.RenderingBuffer);
        for (const [texture, vertList] of batchMap) {
            if (vertList.length === 0)
                continue;
            const batchData = new Float32Array(vertList);
            gl.bufferData(gl.ARRAY_BUFFER, batchData, gl.DYNAMIC_DRAW);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.uniform1i(this.uTextureLoc, 0);
            gl.drawArrays(gl.TRIANGLES, 0, batchData.length / 8);
        }
        gl.bindVertexArray(null);
    }
    collectVertices(drawable, offsetX, offsetY, batchMap) {
        if (!drawable.visible)
            return;
        if (drawable instanceof RenderGroup) {
            const g = drawable;
            for (const child of g.children) {
                this.collectVertices(child, offsetX + g.x, offsetY + g.y, batchMap);
            }
            return;
        }
        const q = drawable;
        const worldX = q.x + offsetX;
        const worldY = q.y + offsetY;
        const tex = q.texture || this.whiteTexture;
        if (!batchMap.has(tex))
            batchMap.set(tex, []);
        const verts = batchMap.get(tex);
        const [r, g, b, a] = q.color;
        const x1 = worldX, y1 = worldY;
        const x2 = worldX + q.w, y2 = worldY + q.h;
        const u1 = q.uvs.left, v1 = q.uvs.top;
        const u2 = q.uvs.right, v2 = q.uvs.bottom;
        verts.push(x1, y1, r, g, b, a, u1, v1);
        verts.push(x2, y1, r, g, b, a, u2, v1);
        verts.push(x1, y2, r, g, b, a, u1, v2);
        verts.push(x1, y2, r, g, b, a, u1, v2);
        verts.push(x2, y1, r, g, b, a, u2, v1);
        verts.push(x2, y2, r, g, b, a, u2, v2);
    }
    startAnimationLoop(onBeforeRender) {
        let last = performance.now();
        const loop = (now) => {
            const delta = now - last;
            last = now;
            this.update();
            if (onBeforeRender)
                onBeforeRender(delta);
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}
//# sourceMappingURL=../../../TypeScript/WebOS_Interface_Manager/rendering_core.js.map