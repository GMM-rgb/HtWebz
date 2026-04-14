/// <reference path="./interface_rendering_types.d.ts" />
// import node from "node-fetch";
// import { ChildProcess } from "child_process";
// import { devNull, freemem, availableParallelism } from "os";
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
    private AttatchedRenderer: WebGL2RenderingContext;
    private program: WebGLProgram;
    private RenderingBuffer: WebGLBuffer;
    private VertexArrayBuffer: WebGLVertexArrayObject;
    private data: Float32Array;
    private offset = 0;
    private uResolutionLoc: WebGLUniformLocation | null;

    constructor(canvas: HTMLCanvasElement) {
        const gl = canvas.getContext("webgl2");
        if (!gl) throw new Error("WebGL2 not supported");
        this.AttatchedRenderer = gl;

        // compile + link shaders (helper omitted for brevity)
        const vs = this.compile(gl.VERTEX_SHADER, RenderingShaderData.InterfaceRenderingVertex.trim());
        const fs = this.compile(gl.FRAGMENT_SHADER, RenderingShaderData.FragmentRendering.trim());
        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        this.program = program;

        this.uResolutionLoc = gl.getUniformLocation(program, "uResolution");

        // buffer: each vertex = 2 pos + 4 color = 6 floats
        this.data = new Float32Array(6 * 6 * 1024); // 1024 rects max for now
        this.RenderingBuffer = gl.createBuffer()!;
        this.VertexArrayBuffer = gl.createVertexArray()!;

        gl.bindVertexArray(this.VertexArrayBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.RenderingBuffer);

        const stride = 6 * 4; // 6 floats * 4 bytes

        const posLoc = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, stride, 0);

        const colLoc = gl.getAttribLocation(program, "color");
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

/**
 * 
 */
class WindowConstructor {
    DataConstructors: Object;
    /**
     * 
     */
    constructor() {
        this.DataConstructors = new Object({
            InstanceWindowData: async function (TargetwindowTitle: string = "Untitled#Window", RequestedWindowDataInput: object): Promise<InterfaceWindowData | undefined> {
                let NewWindowRendering: InterfaceWindowData = {
                    toolbar: {},
                    logical: {
                        TitleName: new String().valueOf(),
                    },
                    visual: {},
                    sizing: {
                        height: 200,
                        width: 300,
                    },
                };

                if (TargetwindowTitle !== undefined && typeof (TargetwindowTitle) === "string" && NewWindowRendering.logical !== undefined && typeof (NewWindowRendering.logical) === "object") {
                    NewWindowRendering.logical.TitleName = TargetwindowTitle ?? "TITLE#ERROR";
                } else {
                    console.warn(`Requested window title was INVALID, or UNDEFINED.\nExpected:\tSTRING\nReceived:\t${new String(TargetwindowTitle !== undefined ? typeof (TargetwindowTitle) : null).valueOf()}`);
                }

                return;
            },
        }).valueOf();
    }
}

/**
 * 
 */
class UiRenderingSystem implements OS_RenderingSystemControler {
    constructor() {

    }

    GenerateWindowDisplay(WindowInterfaceConstructionData: InterfaceWindowData | undefined = undefined): void {
        if (typeof (WindowInterfaceConstructionData !== undefined && WindowInterfaceConstructionData instanceof WindowConstructor && WindowInterfaceConstructionData) === "object") {

        } else {
            console.warn();
            return;
        }
    }
}

/**
 * 
 */
class UiWebO extends WindowConstructor implements _WebOS_UI_KitReference {
    WindowConstructor: WindowConstructor;
    CurrentWindows: Object;

    static FormatWindowTitle(TargetWindow: InterfaceWindowData | undefined = undefined): void {
        if (TargetWindow !== undefined && typeof (TargetWindow) === "object") {

        } else {
            console.error();
        }
    }

    constructor() {
        super();
        this.WindowConstructor = new WindowConstructor();
        this.CurrentWindows = new Object({
            WelcomeWindow: {
                sizing: {

                },
                visual: {

                },
                toolbar: {
                    TOOLBAR_ENABLED: true,
                    _enabled_elements: {
                        title: false,
                        controls: true,
                    }
                }
            } as InterfaceWindowData,
        });
    }

    DestroyRenderingSystem(): never {


        throw void null;
    }
}
