/// <reference path="./rendering_core_reference.d.ts" />
declare type TweeningProperties = {
    positions?: {
        x: number;
        y: number;
    };
    sizing?: {
        w: number;
        h: number;
    };
};

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

interface Drawable {
    x: number;
    y: number;
    visible: boolean;
}

class RenderQuad implements Drawable {
    x: number = 0;
    y: number = 0;
    w: number = 0;
    h: number = 0;
    color: [number, number, number, number] = [1, 1, 1, 1];
    texture: WebGLTexture | null = null;
    uvs = { left: 0, top: 0, right: 1, bottom: 1 };
    visible = true;

    constructor(x: number, y: number, w: number, h: number, color?: [number, number, number, number], texture?: WebGLTexture | null) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        if (color) this.color = color;
        if (texture !== undefined) this.texture = texture;
    }
}

class RenderGroup implements Drawable {
    x: number = 0;
    y: number = 0;
    visible = true;
    children: (RenderQuad | RenderGroup)[] = [];

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(child: RenderQuad | RenderGroup) {
        this.children.push(child);
    }

    remove(child: RenderQuad | RenderGroup) {
        const idx = this.children.indexOf(child);
        if (idx > -1) this.children.splice(idx, 1);
    }
}

export class Renderer2D implements ReferenceRendererCore2D {
    private AttatchedRenderer: WebGL2RenderingContext;
    private program: WebGLProgram | null;
    private RenderingBuffer: WebGLBuffer;
    private VertexArrayBuffer: WebGLVertexArrayObject;
    private uResolutionLoc: WebGLUniformLocation | null;
    private uTextureLoc: WebGLUniformLocation | null;
    private whiteTexture: WebGLTexture;

    private topLevelDrawables: (RenderQuad | RenderGroup)[] = [];
    private activeTweens: any[] = [];

    /**
     * ---
     * Renderer2D:
     * - Retained-mode object management
     * - Sprite / image support with textures
     * - Grouping with collective positioning
     * - Built-in tweening / animation system
     * - Texture batching for efficiency
     * - Simplified API while keeping WebGL2 under the hood
     */
    constructor(DisplayCanvas: HTMLCanvasElement, TargetObjectLimit: number = 4096) {
        const GraphicLibrary = DisplayCanvas.getContext("webgl2", {
            powerPreference: "default",
            antialias: true,
            depth: true,
        });
        if (!GraphicLibrary) throw new Error("WebGL2 not supported");
        this.AttatchedRenderer = GraphicLibrary;

        // Compile shaders (texture support added)
        const vs = this.CompileFramework(GraphicLibrary.VERTEX_SHADER, RenderingShaderData.InterfaceRenderingVertex.trim());
        const fs = this.CompileFramework(GraphicLibrary.FRAGMENT_SHADER, RenderingShaderData.FragmentRendering.trim());
        const InstancedProgram = GraphicLibrary.createProgram()!;
        GraphicLibrary.attachShader(InstancedProgram, vs);
        GraphicLibrary.attachShader(InstancedProgram, fs);
        GraphicLibrary.linkProgram(InstancedProgram);
        this.program = InstancedProgram;

        this.uResolutionLoc = GraphicLibrary.getUniformLocation(InstancedProgram, "uResolution");
        this.uTextureLoc = GraphicLibrary.getUniformLocation(InstancedProgram, "uTexture");

        // Vertex setup: 2 pos + 4 color + 2 texCoord = 8 floats per vertex
        this.RenderingBuffer = GraphicLibrary.createBuffer()!;
        this.VertexArrayBuffer = GraphicLibrary.createVertexArray()!;

        GraphicLibrary.bindVertexArray(this.VertexArrayBuffer);
        GraphicLibrary.bindBuffer(GraphicLibrary.ARRAY_BUFFER, this.RenderingBuffer);

        const stride = 8 * 4; // 8 floats

        // position
        const posLoc = GraphicLibrary.getAttribLocation(InstancedProgram, "position");
        GraphicLibrary.enableVertexAttribArray(posLoc);
        GraphicLibrary.vertexAttribPointer(posLoc, 2, GraphicLibrary.FLOAT, false, stride, 0);

        // color
        const colLoc = GraphicLibrary.getAttribLocation(InstancedProgram, "color");
        GraphicLibrary.enableVertexAttribArray(colLoc);
        GraphicLibrary.vertexAttribPointer(colLoc, 4, GraphicLibrary.FLOAT, false, stride, 2 * 4);

        // texCoord
        const texLoc = GraphicLibrary.getAttribLocation(InstancedProgram, "texCoord");
        GraphicLibrary.enableVertexAttribArray(texLoc);
        GraphicLibrary.vertexAttribPointer(texLoc, 2, GraphicLibrary.FLOAT, false, stride, 6 * 4);

        GraphicLibrary.bindVertexArray(null);

        // Default 1x1 white texture (for colored rects)
        this.whiteTexture = GraphicLibrary.createTexture()!;
        GraphicLibrary.bindTexture(GraphicLibrary.TEXTURE_2D, this.whiteTexture);
        GraphicLibrary.texImage2D(GraphicLibrary.TEXTURE_2D, 0, GraphicLibrary.RGBA, 1, 1, 0, GraphicLibrary.RGBA, GraphicLibrary.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
        GraphicLibrary.texParameteri(GraphicLibrary.TEXTURE_2D, GraphicLibrary.TEXTURE_MIN_FILTER, GraphicLibrary.LINEAR);
        GraphicLibrary.texParameteri(GraphicLibrary.TEXTURE_2D, GraphicLibrary.TEXTURE_MAG_FILTER, GraphicLibrary.LINEAR);
        GraphicLibrary.texParameteri(GraphicLibrary.TEXTURE_2D, GraphicLibrary.TEXTURE_WRAP_S, GraphicLibrary.CLAMP_TO_EDGE);
        GraphicLibrary.texParameteri(GraphicLibrary.TEXTURE_2D, GraphicLibrary.TEXTURE_WRAP_T, GraphicLibrary.CLAMP_TO_EDGE);
    }

    private CompileFramework(type: number, src: string): WebGLShader {
        const gl = this.AttatchedRenderer;
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(s));
            throw new Error("Shader compile error");
        }
        return s;
    }

    /** Load image → WebGL texture (supports URL or existing Image) */
    public async loadTexture(source: string | HTMLImageElement): Promise<WebGLTexture> {
        const gl = this.AttatchedRenderer;
        let img: HTMLImageElement;

        if (typeof source === "string") {
            img = await new Promise((resolve, reject) => {
                const i = new Image();
                i.crossOrigin = "anonymous";
                i.onload = () => resolve(i);
                i.onerror = reject;
                i.src = source;
            });
        } else {
            img = source;
        }

        const texture = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        return texture;
    }

    /** Create a colored rectangle (uses white texture internally) */
    public createRect(x: number, y: number, w: number, h: number, color: [number, number, number, number] = [1, 1, 1, 1]): RenderQuad {
        return new RenderQuad(x, y, w, h, color, null);
    }

    /** Create a textured sprite */
    public createSprite(x: number, y: number, w: number, h: number, texture: WebGLTexture, tint: [number, number, number, number] = [1, 1, 1, 1]): RenderQuad {
        return new RenderQuad(x, y, w, h, tint, texture);
    }

    /** Create a group for collective positioning / management */
    public createGroup(x = 0, y = 0): RenderGroup {
        return new RenderGroup(x, y);
    }

    /** Add any drawable (quad or group) to the scene */
    public addToScene(drawable: RenderQuad | RenderGroup) {
        if (!this.topLevelDrawables.includes(drawable)) {
            this.topLevelDrawables.push(drawable);
        }
    }

    /** Remove from scene */
    public removeFromScene(drawable: RenderQuad | RenderGroup) {
        const idx = this.topLevelDrawables.indexOf(drawable);
        if (idx > -1) this.topLevelDrawables.splice(idx, 1);
    }

    /** Tween position and/or size of any object (quad or group) */
    public TweenSelected(RequestedObject: RenderQuad | RenderGroup | undefined = undefined, TargetProperties: TweeningProperties, durationMs: number = 500) {
        if (!RequestedObject || !TargetProperties) {
            console.error("TweenSelected: invalid object or target properties");
            return Promise.reject();
        }

        const startTime = Date.now();
        const startPos = { x: RequestedObject.x, y: RequestedObject.y };

        let startSize = null;
        if ("w" in RequestedObject && "h" in RequestedObject) {
            startSize = { w: (RequestedObject as RenderQuad).w, h: (RequestedObject as RenderQuad).h };
        }

        const tween = {
            object: RequestedObject,
            startTime,
            duration: durationMs,
            startPos,
            startSize,
            targetPos: TargetProperties.positions,
            targetSize: TargetProperties.sizing,
            onComplete: null as (() => void) | null
        };

        if (this.activeTweens !== null && this.activeTweens instanceof Array) {
            this.activeTweens.push(tween);
        } else {
            console.warn("");
        }

        return new Promise<void>(resolve => {
            tween.onComplete = resolve;
        });
    }

    /** Call this every frame (before render) to advance animations */
    public update() {
        const now = Date.now();
        for (let i = this.activeTweens.length - 1; i >= 0; i--) {
            const t = this.activeTweens[i];
            let progress = (now - t.startTime) / t.duration;
            if (progress > 1) progress = 1;

            const obj = t.object;

            // Position tween
            if (t.targetPos) {
                obj.x = t.startPos.x + (t.targetPos.x - t.startPos.x) * progress;
                obj.y = t.startPos.y + (t.targetPos.y - t.startPos.y) * progress;
            }

            // Size tween (only for quads)
            if (t.targetSize && t.startSize) {
                (obj as RenderQuad).w = t.startSize.w + (t.targetSize.w - t.startSize.w) * progress;
                (obj as RenderQuad).h = t.startSize.h + (t.targetSize.h - t.startSize.h) * progress;
            }

            if (progress >= 1) {
                if (t.onComplete) t.onComplete();
                this.activeTweens.splice(i, 1);
            }
        }
    }

    /** Main render call – clears, batches by texture, draws everything */
    public render(width: number, height: number) {
        const gl = this.AttatchedRenderer;
        gl.viewport(0, 0, width, height);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(this.program);
        gl.uniform2f(this.uResolutionLoc, width, height);

        const batchMap = new Map<WebGLTexture, number[]>();

        // Collect all quads (with group transforms applied)
        for (const drawable of this.topLevelDrawables) {
            this.collectVertices(drawable, 0, 0, batchMap);
        }

        gl.bindVertexArray(this.VertexArrayBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.RenderingBuffer);

        for (const [texture, vertList] of batchMap) {
            if (vertList.length === 0) continue;

            const batchData = new Float32Array(vertList);
            gl.bufferData(gl.ARRAY_BUFFER, batchData, gl.DYNAMIC_DRAW);

            // Bind the texture for this batch
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.uniform1i(this.uTextureLoc, 0);

            gl.drawArrays(gl.TRIANGLES, 0, batchData.length / 8);
        }

        gl.bindVertexArray(null);
    }

    private collectVertices(drawable: Drawable, offsetX: number, offsetY: number, batchMap: Map<WebGLTexture, number[]>) {
        if (!drawable.visible) return;

        if (drawable instanceof RenderGroup) {
            const g = drawable as RenderGroup;
            for (const child of g.children) {
                this.collectVertices(child, offsetX + g.x, offsetY + g.y, batchMap);
            }
            return;
        }

        // Leaf quad
        const q = drawable as RenderQuad;
        const worldX = q.x + offsetX;
        const worldY = q.y + offsetY;

        const tex = q.texture || this.whiteTexture;
        if (!batchMap.has(tex)) batchMap.set(tex, []);

        const verts = batchMap.get(tex)!;
        const [r, g, b, a] = q.color;

        const x1 = worldX, y1 = worldY;
        const x2 = worldX + q.w, y2 = worldY + q.h;
        const u1 = q.uvs.left, v1 = q.uvs.top;
        const u2 = q.uvs.right, v2 = q.uvs.bottom;

        // Triangle 1
        verts.push(x1, y1, r, g, b, a, u1, v1);
        verts.push(x2, y1, r, g, b, a, u2, v1);
        verts.push(x1, y2, r, g, b, a, u1, v2);

        // Triangle 2
        verts.push(x1, y2, r, g, b, a, u1, v2);
        verts.push(x2, y1, r, g, b, a, u2, v1);
        verts.push(x2, y2, r, g, b, a, u2, v2);
    }

    /** OPTIONAL: start a **full** animation loop setup automatically (call this ONCE) */
    public startAnimationLoop(onBeforeRender?: (deltaMs: number) => void) {
        let last = performance.now();
        const loop = (now: number) => {
            const delta = now - last;
            last = now;

            this.update();
            if (onBeforeRender) onBeforeRender(delta);

            // User must call render() themselves with current canvas dimensions
            // Example: onBeforeRender = () => renderer.render(canvas.width, canvas.height)

            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}
