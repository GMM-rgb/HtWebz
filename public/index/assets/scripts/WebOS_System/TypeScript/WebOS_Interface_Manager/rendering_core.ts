const RenderingShaderData = {
    InterfaceRenderingVertex: `#version 300 es
in vec2 position;
in vec4 color;

uniform vec2 uResolution;

out vec4 vColor;

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
}`,
    FragmentRendering: `#version 300 es
precision mediump float;

in vec4 vColor;
out vec4 outColor;

void main() {
    outColor = vColor;
}`
};

export class Renderer2D {
    private AttatchedRenderer: WebGL2RenderingContext;
    private program: WebGLProgram | null;
    private RenderingBuffer: WebGLBuffer;
    private VertexArrayBuffer: WebGLVertexArrayObject;
    private data: Float32Array;
    private offset = 0;
    private ObjectLimit: Number;
    private uResolutionLoc: WebGLUniformLocation | null;

    /**
     * ---
     * @param canvas 
     * @param TargetObjectLimit 
     */
    constructor(canvas: HTMLCanvasElement, TargetObjectLimit: number = 1024) {
        const gl = canvas.getContext("webgl2");
        if (!gl) throw new Error("WebGL2 not supported");
        this.AttatchedRenderer = gl;

        // compile + link shaders (helper omitted for brevity)
        const vs = this.compile(gl.VERTEX_SHADER, RenderingShaderData.InterfaceRenderingVertex.trim());
        const fs = this.compile(gl.FRAGMENT_SHADER, RenderingShaderData.FragmentRendering.trim());
        const InstancedProgram = gl.createProgram()!;
        gl.attachShader(InstancedProgram, vs);
        gl.attachShader(InstancedProgram, fs);
        gl.linkProgram(InstancedProgram);
        this.program = InstancedProgram ?? null;

        this.ObjectLimit = new Number(TargetObjectLimit);
        this.uResolutionLoc = gl.getUniformLocation(InstancedProgram, "uResolution");

        // buffer: each vertex = 2 pos + 4 color = 6 floats
        this.data = new Float32Array(6 * 6 * this.ObjectLimit.valueOf());
        this.RenderingBuffer = gl.createBuffer()!;
        this.VertexArrayBuffer = gl.createVertexArray()!;

        gl.bindVertexArray(this.VertexArrayBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.RenderingBuffer);

        const stride = 6 * 4; // 6 floats * 4 bytes

        const posLoc = gl.getAttribLocation(InstancedProgram, "position");
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, stride, 0);

        const colLoc = gl.getAttribLocation(InstancedProgram, "color");
        gl.enableVertexAttribArray(colLoc);
        gl.vertexAttribPointer(colLoc, 4, gl.FLOAT, false, stride, 2 * 4);

        gl.bindVertexArray(null);
    }

    private compile(type: number, src: string): WebGLShader {
        const s = this.AttatchedRenderer.createShader(type)!;
        this.AttatchedRenderer.shaderSource(s, src);
        this.AttatchedRenderer.compileShader(s);
        return s;
    }

    begin(width: number, height: number) {
        this.offset = 0;
        const gl = this.AttatchedRenderer;
        gl.viewport(0, 0, width, height);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(this.program);
        gl.uniform2f(this.uResolutionLoc, width, height);
    }

    rect(x: number, y: number, w: number, h: number, color: [number, number, number, number]) {
        const [r, g, b, a] = color;
        const x1 = x, y1 = y;
        const x2 = x + w, y2 = y + h;

        // 2 triangles, 6 vertices
        const v = this.data;
        let o = this.offset;

        // tri 1
        v[o++] = x1; v[o++] = y1; v[o++] = r; v[o++] = g; v[o++] = b; v[o++] = a;
        v[o++] = x2; v[o++] = y1; v[o++] = r; v[o++] = g; v[o++] = b; v[o++] = a;
        v[o++] = x1; v[o++] = y2; v[o++] = r; v[o++] = g; v[o++] = b; v[o++] = a;

        // tri 2
        v[o++] = x1; v[o++] = y2; v[o++] = r; v[o++] = g; v[o++] = b; v[o++] = a;
        v[o++] = x2; v[o++] = y1; v[o++] = r; v[o++] = g; v[o++] = b; v[o++] = a;
        v[o++] = x2; v[o++] = y2; v[o++] = r; v[o++] = g; v[o++] = b; v[o++] = a;

        this.offset = o;
    }

    end() {
        const gl = this.AttatchedRenderer;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.RenderingBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.data.subarray(0, this.offset), gl.DYNAMIC_DRAW);
        gl.bindVertexArray(this.VertexArrayBuffer);
        gl.drawArrays(gl.TRIANGLES, 0, this.offset / 6);
        gl.bindVertexArray(null);
    }
}
