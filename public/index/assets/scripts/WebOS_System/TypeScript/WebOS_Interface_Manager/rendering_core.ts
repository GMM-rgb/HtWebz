/// <reference path="./rendering_core_reference.d.ts" />
import { TextFontRendering } from "./text_rendering_core";
/**
 * Shader sources used by the renderer
 */
const RenderingShaderData = {
    InterfaceRenderingVertex: `#version 300 es
    in vec2 position;
    in vec4 color;
    in vec2 texCoord;

    uniform vec2 uResolution;

    out vec4 vColor;
    out vec2 vTexCoord;

    void main() {
        vec2 zeroToOne = position / uResolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clip = zeroToTwo - 1.0;
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

declare type WrapperUV = {
    left: number | 0;
    top: number | 0;
    right: number | 1;
    bottom: number | 1;
};

/**
 * A single textured or colored rectangle/sprite
 */
export class InterfaceRenderQuad implements Drawable {
    color: [number, number, number, number] = [1, 1, 1, 1];
    texture: WebGLTexture | null = null;
    uvs: WrapperUV = { left: 0, top: 0, right: 1, bottom: 1 };
    visible: boolean = true;
    rotation: number = 0; // degrees, rotates around the quad's center

    constructor(
        public x: number,
        public y: number,
        public w: number,
        public h: number,
        color?: [number, number, number, number],
        texture?: WebGLTexture | null) {
        if (color) this.color = color;
        if (texture !== undefined) this.texture = texture;
    }

    /**
     * Update the visibility of this quad
     */
    public updateVisiblility(requestedVisiblity: boolean = true): void {
        if (requestedVisiblity !== null && typeof (requestedVisiblity) === "boolean") {
            this.visible = new Boolean(requestedVisiblity).valueOf() as (true | false);
        } else {
            console.warn("Updating visibilty for interface object could not continue.\nInvalid visiblity request.");
        }
    }
}

/**
 * Group for collective positioning and rotation of multiple children
 */
export class RenderGroup implements Drawable {
    x: number = 0;
    y: number = 0;
    visible = true;
    rotation: number = 0; // degrees – rotates all children around the group's (x, y) pivot
    children: (InterfaceRenderQuad | RenderGroup)[] = [];

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(child: InterfaceRenderQuad | RenderGroup) {
        this.children.push(child);
    }

    remove(child: InterfaceRenderQuad | RenderGroup) {
        const idx = this.children.indexOf(child);
        if (idx > -1) this.children.splice(idx, 1);
    }
}

/**
 * Main 2D WebGL renderer with retained-mode objects, tweening, rotation, and SVG texture support
 */
export class Renderer2D implements ReferenceRendererCore2D {
    private AttatchedRenderer: WebGL2RenderingContext;
    private program: WebGLProgram | null;
    private RenderingBuffer: WebGLBuffer;
    private VertexArrayBuffer: WebGLVertexArrayObject;
    private uResolutionLoc: WebGLUniformLocation | null;
    private uTextureLoc: WebGLUniformLocation | null;
    private whiteTexture: WebGLTexture;

    private topLevelDrawables: (InterfaceRenderQuad | RenderGroup)[] = [];
    private activeTweens: any[] = [];

    /**
     * Creates a new Renderer2D instance
     * @param DisplayCanvas - The HTMLCanvasElement to render to
     * @param TargetObjectLimit - Maximum number of objects (currently unused but kept for compatibility)
     */
    constructor(DisplayCanvas: HTMLCanvasElement, TargetObjectLimit: number = 4096) {
        const GraphicLibrary = DisplayCanvas.getContext("webgl2", {
            powerPreference: "default",
            antialias: true,
            depth: true,
        });
        if (!GraphicLibrary) throw new Error("WebGL2 not supported");
        this.AttatchedRenderer = GraphicLibrary;

        // Compile shaders
        const vs = this.CompileFramework(GraphicLibrary.VERTEX_SHADER, RenderingShaderData.InterfaceRenderingVertex.trim());
        const fs = this.CompileFramework(GraphicLibrary.FRAGMENT_SHADER, RenderingShaderData.FragmentRendering.trim());
        const InstancedProgram = GraphicLibrary.createProgram()!;
        GraphicLibrary.attachShader(InstancedProgram, vs);
        GraphicLibrary.attachShader(InstancedProgram, fs);
        GraphicLibrary.linkProgram(InstancedProgram);
        this.program = InstancedProgram;

        this.uResolutionLoc = GraphicLibrary.getUniformLocation(InstancedProgram, "uResolution");
        this.uTextureLoc = GraphicLibrary.getUniformLocation(InstancedProgram, "uTexture");

        this.RenderingBuffer = GraphicLibrary.createBuffer()!;
        this.VertexArrayBuffer = GraphicLibrary.createVertexArray()!;

        GraphicLibrary.bindVertexArray(this.VertexArrayBuffer);
        GraphicLibrary.bindBuffer(GraphicLibrary.ARRAY_BUFFER, this.RenderingBuffer);

        const stride = 8 * 4;

        const posLoc = GraphicLibrary.getAttribLocation(InstancedProgram, "position");
        GraphicLibrary.enableVertexAttribArray(posLoc);
        GraphicLibrary.vertexAttribPointer(posLoc, 2, GraphicLibrary.FLOAT, false, stride, 0);

        const colLoc = GraphicLibrary.getAttribLocation(InstancedProgram, "color");
        GraphicLibrary.enableVertexAttribArray(colLoc);
        GraphicLibrary.vertexAttribPointer(colLoc, 4, GraphicLibrary.FLOAT, false, stride, 2 * 4);

        const texLoc = GraphicLibrary.getAttribLocation(InstancedProgram, "texCoord");
        GraphicLibrary.enableVertexAttribArray(texLoc);
        GraphicLibrary.vertexAttribPointer(texLoc, 2, GraphicLibrary.FLOAT, false, stride, 6 * 4);

        GraphicLibrary.bindVertexArray(null);

        // Default white texture for colored rects
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

    /** @inheritdoc */
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

    /**
     * ---
     * Create a WebGL texture directly from an inline SVG string.
     * 
     * ---
     * @param svgString - Raw SVG XML string
     * @param targetWidth - Texture width in pixels (default 512)
     * @param targetHeight - Texture height in pixels (default 512)
     * @returns 
     * @example
     * const svgCircle = 
     * (`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
     *   <circle cx="100" cy="100" r="90" fill="#ff0000" />
     * </svg>`);
     * const tex = await renderer.loadSVGTexture(svgCircle, 256, 256);
     */
    public async loadSVGTexture(svgString: string, targetWidth: number = 512, targetHeight: number = 512): Promise<WebGLTexture> {
        const gl = this.AttatchedRenderer;

        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas 2D context not supported for SVG rasterization");

        const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        try {
            const img: HTMLImageElement = await new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.onerror = () => reject(new Error("Failed to load SVG as image"));
                image.src = url;
            });

            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            const texture = gl.createTexture()!;
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            return texture;
        } finally {
            URL.revokeObjectURL(url);
        }
    }

    /** @inheritdoc */
    public createRect(x: number, y: number, w: number, h: number, color: [number, number, number, number] = [1, 1, 1, 1]): InterfaceRenderQuad {
        return new InterfaceRenderQuad(x, y, w, h, color, null);
    }

    /** @inheritdoc */
    public createSprite(x: number, y: number, w: number, h: number, texture: WebGLTexture, tint: [number, number, number, number] = [1, 1, 1, 1]): InterfaceRenderQuad {
        return new InterfaceRenderQuad(x, y, w, h, tint, texture);
    }

    /** @inheritdoc */
    public createGroup(x = 0, y = 0): RenderGroup {
        return new RenderGroup(x, y);
    }

    /** @inheritdoc */
    public applyToRendering(drawable: InterfaceRenderQuad | RenderGroup) {
        if (!this.topLevelDrawables.includes(drawable)) {
            this.topLevelDrawables.push(drawable);
        }
    }

    /** @inheritdoc */
    public removeFromScene(drawable: InterfaceRenderQuad | RenderGroup) {
        const idx = this.topLevelDrawables.indexOf(drawable);
        if (idx > -1) this.topLevelDrawables.splice(idx, 1);
    }

    /**
     * Tween position, size (quads only), and/or rotation.
     * 
     * **IntelliSense behavior:**
     * - When passing `InterfaceRenderQuad` → shows `positions`, `sizing`, `rotation`
     * - When passing `RenderGroup` → shows only `positions`, `rotation`
     * 
     * @param RequestedObject - The quad or group to animate
     * @param TargetProperties - Target values (type depends on the object passed)
     * @param durationMs - Animation duration in milliseconds
     */
    public async TweenSelected<T extends InterfaceRenderQuad | RenderGroup>(
        RequestedObject: T | undefined = undefined,
        TargetProperties: T extends InterfaceRenderQuad ? TweeningVariants.QaudTweening : TweeningVariants.GroupTweening,
        threadFunction?: () => void,
        durationMs: number = 500, 
    ): Promise<void> {
        if (!RequestedObject || !TargetProperties) {
            console.error("TweenSelected: invalid object or target properties");
            return Promise.reject();
        }

        const startTime = Date.now();
        const startPos = { x: RequestedObject.x, y: RequestedObject.y };
        const startRotation = RequestedObject.rotation ?? 0;

        let startSize = null;
        const targetRotation: number | undefined = (TargetProperties as any)?.rotation;

        let tween = {
            targetPos: TargetProperties.positions,
            object: RequestedObject,
            startTime,
            startPos,
            duration: durationMs,
            startSize,
            targetSize: (TargetProperties as any).sizing,
            startRotation,
            targetRotation,
            activeThreadFunction: threadFunction !== undefined ? threadFunction?.() : null,
            onComplete: null as (() => void) | null,
        };

        if ("w" in RequestedObject && "h" in RequestedObject) {
            startSize = { w: (RequestedObject as InterfaceRenderQuad).w, h: (RequestedObject as InterfaceRenderQuad).h };
        }

        if (this.activeTweens !== null && this.activeTweens instanceof Array) {
            this.activeTweens.push(tween);
        } else {
            console.warn("activeTweens not initialized");
        }

        return new Promise<void>(resolve => {
            tween.onComplete = resolve;
        });
    }

    /** Call this every frame to advance all active tweens */
    public update() {
        const now = Date.now();
        for (let i = this.activeTweens.length - 1; i >= 0; i--) {
            const t = this.activeTweens[i];
            let progress = (now - t.startTime) / t.duration;
            if (progress > 1) progress = 1;

            const obj = t.object;

            if (t.targetPos) {
                obj.x = t.startPos.x + (t.targetPos.x - t.startPos.x) * progress;
                obj.y = t.startPos.y + (t.targetPos.y - t.startPos.y) * progress;
            }

            if (t.targetSize && t.startSize) {
                (obj as InterfaceRenderQuad).w = t.startSize.w + (t.targetSize.w - t.startSize.w) * progress;
                (obj as InterfaceRenderQuad).h = t.startSize.h + (t.targetSize.h - t.startSize.h) * progress;
            }

            if (typeof t.targetRotation === "number") {
                obj.rotation = t.startRotation + (t.targetRotation - t.startRotation) * progress;
            }

            if (progress >= 1) {
                if (t.onComplete) t.onComplete();
                this.activeTweens.splice(i, 1);
            }
        }
    }

    private rotatePoint(x: number, y: number, pivotX: number, pivotY: number, angleDeg: number) {
        const rad = angleDeg * Math.PI / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const dx = x - pivotX;
        const dy = y - pivotY;
        return {
            x: pivotX + (dx * cos - dy * sin),
            y: pivotY + (dx * sin + dy * cos)
        };
    }

    /** Main render call – clears, batches by texture, and draws everything with rotation support */
    public render(width: number, height: number) {
        const gl = this.AttatchedRenderer;
        gl.viewport(0, 0, width, height);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(this.program);
        gl.uniform2f(this.uResolutionLoc, width, height);

        const batchMap = new Map<WebGLTexture, number[]>();

        for (const drawable of this.topLevelDrawables) {
            this.collectVertices(drawable, 0, 0, batchMap);
        }

        gl.bindVertexArray(this.VertexArrayBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.RenderingBuffer);

        for (const [texture, vertList] of batchMap) {
            if (vertList.length === 0) continue;

            const batchData = new Float32Array(vertList);
            gl.bufferData(gl.ARRAY_BUFFER, batchData, gl.DYNAMIC_DRAW);

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
            const groupPivotX = offsetX + g.x;
            const groupPivotY = offsetY + g.y;

            for (const child of g.children) {
                const rotatedRel = this.rotatePoint(child.x, child.y, 0, 0, g.rotation);
                const childWorldX = groupPivotX + rotatedRel.x;
                const childWorldY = groupPivotY + rotatedRel.y;

                const childOffsetX = childWorldX - child.x;
                const childOffsetY = childWorldY - child.y;

                this.collectVertices(child, childOffsetX, childOffsetY, batchMap);
            }
            return;
        }

        const q = drawable as InterfaceRenderQuad;
        let worldX = q.x + offsetX;
        let worldY = q.y + offsetY;

        const tex = q.texture || this.whiteTexture;
        if (!batchMap.has(tex)) batchMap.set(tex, []);

        const verts = batchMap.get(tex)!;
        const [r, g, b, a] = q.color;

        const u1 = q.uvs.left, v1 = q.uvs.top;
        const u2 = q.uvs.right, v2 = q.uvs.bottom;

        if (q.rotation === 0) {
            const x1 = worldX, y1 = worldY;
            const x2 = worldX + q.w, y2 = worldY + q.h;

            verts.push(x1, y1, r, g, b, a, u1, v1);
            verts.push(x2, y1, r, g, b, a, u2, v1);
            verts.push(x1, y2, r, g, b, a, u1, v2);

            verts.push(x1, y2, r, g, b, a, u1, v2);
            verts.push(x2, y1, r, g, b, a, u2, v1);
            verts.push(x2, y2, r, g, b, a, u2, v2);
        } else {
            const centerX = worldX + q.w / 2;
            const centerY = worldY + q.h / 2;
            const halfW = q.w / 2;
            const halfH = q.h / 2;

            const corners = [
                { x: -halfW, y: -halfH },
                { x: halfW, y: -halfH },
                { x: -halfW, y: halfH },
                { x: halfW, y: halfH }
            ];

            const rotated = corners.map(c => this.rotatePoint(c.x, c.y, 0, 0, q.rotation));

            const x1 = centerX + rotated[0].x;
            const y1 = centerY + rotated[0].y;
            const x2 = centerX + rotated[1].x;
            const y2 = centerY + rotated[1].y;
            const x3 = centerX + rotated[2].x;
            const y3 = centerY + rotated[2].y;
            const x4 = centerX + rotated[3].x;
            const y4 = centerY + rotated[3].y;

            verts.push(x1, y1, r, g, b, a, u1, v1);
            verts.push(x2, y2, r, g, b, a, u2, v1);
            verts.push(x3, y3, r, g, b, a, u1, v2);

            verts.push(x3, y3, r, g, b, a, u1, v2);
            verts.push(x2, y2, r, g, b, a, u2, v1);
            verts.push(x4, y4, r, g, b, a, u2, v2);
        }
    }

    /**
     * Starts an automatic animation loop.
     * Call this once after setting up your scene.
     * @param onBeforeRender - Optional callback called every frame before render()
     */
    public startAnimationLoop(onBeforeRender?: (deltaMs: number) => void) {
        let last = performance.now();
        const loop = (now: number) => {
            const delta = now - last;
            last = now;

            this.update();
            if (onBeforeRender) onBeforeRender(delta);

            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}
