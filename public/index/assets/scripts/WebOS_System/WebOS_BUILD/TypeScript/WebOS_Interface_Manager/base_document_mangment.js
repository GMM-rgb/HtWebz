import { Renderer2D, InterfaceRenderQuad } from "./rendering_core.js";
const VirtualMachineWrapper = self.window.document.body.querySelector(".virtual-machine-display-wrapper");
let DisplayCanvasStyles = new String().valueOf();
var TerminalCursorDirectionConstants;
(function (TerminalCursorDirectionConstants) {
    TerminalCursorDirectionConstants.LEFT = 1;
    TerminalCursorDirectionConstants.RIGHT = 2;
})(TerminalCursorDirectionConstants || (TerminalCursorDirectionConstants = {}));
(() => {
    function browserSupportsCSS() {
        return typeof CSS !== "undefined" && typeof CSSStyleDeclaration !== "undefined";
    }
    if (!browserSupportsCSS()) {
        return console.error("Active browser session does not support CSS!");
    }
    DisplayCanvasStyles = String(`
        border: 1px solid #ccc;
        border-radius: 15px;
        background: #fff;
    `).trim();
})();
var VirtualMachineElementManager;
(function (VirtualMachineElementManager) {
    async function InstanceCanvasRenderingElement() {
        if (!window?.document?.body) {
            console.error("Document body not available");
            return undefined;
        }
        let lastW = 0;
        let lastH = 0;
        function UpdateDisplaySizing() {
            if (!VirtualMachineWrapper || !canvas)
                return;
            const wrapperW = Math.floor(VirtualMachineWrapper.clientWidth);
            const wrapperH = Math.floor(VirtualMachineWrapper.clientHeight);
            if (wrapperW <= 0 || wrapperH <= 0)
                return;
            if (wrapperW === lastW && wrapperH === lastH)
                return;
            const dpr = window.devicePixelRatio || 1;
            const paddingLeft = 35;
            const paddingRight = 35;
            const paddingTop = 10;
            const paddingBottom = 35;
            let titleHeight = 0;
            for (let i = 0; i < VirtualMachineWrapper.children.length; i++) {
                const child = VirtualMachineWrapper.children[i];
                if (child !== canvas && child instanceof HTMLElement) {
                    titleHeight = child.clientHeight;
                    break;
                }
            }
            let availW = wrapperW - paddingLeft - paddingRight;
            let availH = wrapperH - paddingTop - paddingBottom - titleHeight;
            const MIN_WIDTH = 320;
            const MIN_HEIGHT = 180;
            availW = Math.max(availW, MIN_WIDTH);
            availH = Math.max(availH, MIN_HEIGHT);
            const desiredAspect = 16 / 9;
            let finalW = availW;
            let finalH = Math.floor(finalW / desiredAspect);
            if (finalH > availH) {
                finalH = availH;
                finalW = Math.floor(finalH * desiredAspect);
            }
            finalW = Math.max(finalW, MIN_WIDTH);
            finalH = Math.max(finalH, MIN_HEIGHT);
            const physicalW = Math.floor(finalW * dpr);
            const physicalH = Math.floor(finalH * dpr);
            if (canvas.width !== physicalW || canvas.height !== physicalH) {
                canvas.width = physicalW;
                canvas.height = physicalH;
                canvas.style.width = `${finalW}px`;
                canvas.style.height = `${finalH}px`;
            }
            lastW = wrapperW;
            lastH = wrapperH;
        }
        const canvas = document.createElement("canvas");
        canvas.style.cssText = DisplayCanvasStyles;
        canvas.id ?? (canvas.id = "DisplayVM");
        UpdateDisplaySizing();
        function handleResize() {
            requestAnimationFrame(UpdateDisplaySizing);
        }
        window.addEventListener('resize', handleResize, { passive: true });
        const resizeObserver = new ResizeObserver(handleResize);
        if (VirtualMachineWrapper)
            resizeObserver.observe(VirtualMachineWrapper);
        return canvas;
    }
    VirtualMachineElementManager.InstanceCanvasRenderingElement = InstanceCanvasRenderingElement;
})(VirtualMachineElementManager || (VirtualMachineElementManager = {}));
window.addEventListener("DOMContentLoaded", (LoadEventValue) => {
    VirtualMachineElementManager.InstanceCanvasRenderingElement().then(canvas => {
        if (canvas && canvas instanceof HTMLCanvasElement) {
            VirtualMachineWrapper?.appendChild(canvas);
            console.debug(("DISPLAY OUTPUT:\t" + (canvas.nodeName ?? "unknown")));
            console.debug(canvas.dataset ?? "Display output dataset NOT available.");
            function shiftCursor(targetDirection = TerminalCursorDirectionConstants.LEFT) {
            }
            const TerminalRenderer = new Renderer2D(canvas, 1024);
            const TerminalCursor = TerminalRenderer.createRect(-50, 10, 5, 30, [0, 255, 0, 1]);
            TerminalRenderer.applyToRendering(TerminalCursor);
            TerminalRenderer.TweenSelected(TerminalCursor, {
                positions: {
                    "x": 10,
                    "y": 10,
                },
            }, parseFloat("425").valueOf());
            async function blinkCursor() {
                if (TerminalCursor !== undefined && TerminalCursor instanceof InterfaceRenderQuad) {
                    TerminalCursor.visible = !TerminalCursor.visible;
                }
                else {
                    console.warn("TerminalCursor is invalid or undefined!");
                }
            }
            TerminalRenderer.startAnimationLoop(() => {
                const logicalW = Math.floor(new Number(canvas.clientWidth).valueOf());
                const logicalH = Math.ceil(new Number(canvas.clientHeight).valueOf());
                TerminalRenderer.render(logicalW, logicalH);
                TerminalRenderer.update();
            });
            (async () => {
                let BlinkingInterval = null;
                new Promise((ResolveCursorBlinking) => {
                    BlinkingInterval !== null ? clearInterval(BlinkingInterval ?? undefined) : null;
                    BlinkingInterval = setInterval(() => {
                        blinkCursor().then(() => ResolveCursorBlinking(null));
                    }, 500);
                });
            })();
        }
    }).catch(err => console.error("Failed to create canvas:", err));
    LoadEventValue.stopPropagation();
}, { once: true, passive: true });
//# sourceMappingURL=../../../TypeScript/WebOS_Interface_Manager/base_document_mangment.js.map