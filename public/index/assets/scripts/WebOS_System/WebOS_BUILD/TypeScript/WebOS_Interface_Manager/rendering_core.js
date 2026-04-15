"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer2D = void 0;
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
class Renderer2D {
    AttatchedRenderer;
    program;
    RenderingBuffer;
    VertexArrayBuffer;
    data;
    offset = 0;
    ObjectLimit;
    uResolutionLoc;
    constructor(canvas, TargetObjectLimit = 1024) {
        const gl = canvas.getContext("webgl2");
        if (!gl)
            throw new Error("WebGL2 not supported");
        this.AttatchedRenderer = gl;
        const vs = this.compile(gl.VERTEX_SHADER, RenderingShaderData.InterfaceRenderingVertex.trim());
        const fs = this.compile(gl.FRAGMENT_SHADER, RenderingShaderData.FragmentRendering.trim());
        const InstancedProgram = gl.createProgram();
        gl.attachShader(InstancedProgram, vs);
        gl.attachShader(InstancedProgram, fs);
        gl.linkProgram(InstancedProgram);
        this.program = InstancedProgram ?? null;
        this.ObjectLimit = new Number(TargetObjectLimit);
        this.uResolutionLoc = gl.getUniformLocation(InstancedProgram, "uResolution");
        this.data = new Float32Array(6 * 6 * this.ObjectLimit.valueOf());
        this.RenderingBuffer = gl.createBuffer();
        this.VertexArrayBuffer = gl.createVertexArray();
        gl.bindVertexArray(this.VertexArrayBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.RenderingBuffer);
        const stride = 6 * 4;
        const posLoc = gl.getAttribLocation(InstancedProgram, "position");
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, stride, 0);
        const colLoc = gl.getAttribLocation(InstancedProgram, "color");
        gl.enableVertexAttribArray(colLoc);
        gl.vertexAttribPointer(colLoc, 4, gl.FLOAT, false, stride, 2 * 4);
        gl.bindVertexArray(null);
    }
    compile(type, src) {
        const s = this.AttatchedRenderer.createShader(type);
        this.AttatchedRenderer.shaderSource(s, src);
        this.AttatchedRenderer.compileShader(s);
        return s;
    }
    begin(width, height) {
        this.offset = 0;
        const gl = this.AttatchedRenderer;
        gl.viewport(0, 0, width, height);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(this.program);
        gl.uniform2f(this.uResolutionLoc, width, height);
    }
    rect(x, y, w, h, color) {
        const [r, g, b, a] = color;
        const x1 = x, y1 = y;
        const x2 = x + w, y2 = y + h;
        const v = this.data;
        let o = this.offset;
        v[o++] = x1;
        v[o++] = y1;
        v[o++] = r;
        v[o++] = g;
        v[o++] = b;
        v[o++] = a;
        v[o++] = x2;
        v[o++] = y1;
        v[o++] = r;
        v[o++] = g;
        v[o++] = b;
        v[o++] = a;
        v[o++] = x1;
        v[o++] = y2;
        v[o++] = r;
        v[o++] = g;
        v[o++] = b;
        v[o++] = a;
        v[o++] = x1;
        v[o++] = y2;
        v[o++] = r;
        v[o++] = g;
        v[o++] = b;
        v[o++] = a;
        v[o++] = x2;
        v[o++] = y1;
        v[o++] = r;
        v[o++] = g;
        v[o++] = b;
        v[o++] = a;
        v[o++] = x2;
        v[o++] = y2;
        v[o++] = r;
        v[o++] = g;
        v[o++] = b;
        v[o++] = a;
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
exports.Renderer2D = Renderer2D;
//# sourceMappingURL=../../../../TypeScript/WebOS_Interface_Manager/rendering_core.js.map