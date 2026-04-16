import { Renderer2D, InterfaceRenderQuad } from "./rendering_core.js";

const VirtualMachineWrapper = self.window.document.body.querySelector(".virtual-machine-display-wrapper");
let DisplayCanvasStyles = new String().valueOf();

(() => {
    function browserSupportsCSS(): boolean {
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

namespace VirtualMachineElementManager {
    export async function InstanceCanvasRenderingElement(): Promise<HTMLCanvasElement | undefined> {
        if (!window?.document?.body) {
            console.error("Document body not available");
            return undefined;
        }

        let lastW = 0;
        let lastH = 0;

        function UpdateDisplaySizing(): void {
            if (!VirtualMachineWrapper || !canvas) return;

            const wrapperW = Math.floor(VirtualMachineWrapper.clientWidth);
            const wrapperH = Math.floor(VirtualMachineWrapper.clientHeight);

            if (wrapperW <= 0 || wrapperH <= 0) return;
            if (wrapperW === lastW && wrapperH === lastH) return;

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

            // Real available space
            let availW = wrapperW - paddingLeft - paddingRight;
            let availH = wrapperH - paddingTop - paddingBottom - titleHeight;

            // IMPORTANT: Minimum size protection so it never becomes microscopic
            const MIN_WIDTH = 320;
            const MIN_HEIGHT = 180;   // 16:9 minimum

            availW = Math.max(availW, MIN_WIDTH);
            availH = Math.max(availH, MIN_HEIGHT);

            const desiredAspect = 16 / 9;

            let finalW = availW;
            let finalH = Math.floor(finalW / desiredAspect);

            // Clamp to available space
            if (finalH > availH) {
                finalH = availH;
                finalW = Math.floor(finalH * desiredAspect);
            }

            // Final safety minimum
            finalW = Math.max(finalW, MIN_WIDTH);
            finalH = Math.max(finalH, MIN_HEIGHT);

            const physicalW = Math.floor(finalW * dpr);
            const physicalH = Math.floor(finalH * dpr);

            // Update only when necessary
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
        canvas.id ??= "DisplayVM";

        // Initial
        UpdateDisplaySizing();

        // Lightweight handler for 120Hz
        function handleResize() {
            requestAnimationFrame(UpdateDisplaySizing);
        }

        window.addEventListener('resize', handleResize, { passive: true });

        const resizeObserver = new ResizeObserver(handleResize);
        if (VirtualMachineWrapper) resizeObserver.observe(VirtualMachineWrapper);

        return canvas;
    }
}

// DOMContentLoaded
window.addEventListener("DOMContentLoaded", (LoadEventValue) => {
    VirtualMachineElementManager.InstanceCanvasRenderingElement().then(canvas => {
        if (canvas && canvas instanceof HTMLCanvasElement) {
            VirtualMachineWrapper?.appendChild(canvas);

            console.debug("Virtual-Machine display created successfully:", canvas.id);

            const TerminalRenderer = new Renderer2D(canvas, 1024);
            const TerminalCursorGrouping = TerminalRenderer.createGroup(-50, 10);
            const TerminalCursor = TerminalRenderer.createRect(-50, 10, 5, 30, [0, 255, 0, 1]);
            TerminalRenderer.addToScene(TerminalCursor);

            TerminalRenderer.TweenSelected(TerminalCursor, {
                "positions": {
                    "x": 10,
                    "y": 10,
                },
            }, parseFloat("425").valueOf());

            async function blinkCursor(): Promise<void> {
                if (TerminalCursor !== undefined && TerminalCursor instanceof InterfaceRenderQuad) {
                    TerminalCursor.visible = !TerminalCursor.visible;
                    console.debug(TerminalCursor.visible.valueOf());
                } else {
                    console.warn("TerminalCursor is invalid or undefined!");
                }
            }

            (async () => {
                new Promise((ResolveCursorBlinking) => {
                    setInterval(() => {
                        console.debug("Blinking terminal cursor...");
                        blinkCursor().then(() => ResolveCursorBlinking(null));
                    }, 1000);
                });
            })();

            TerminalRenderer.startAnimationLoop(() => {
                const logicalW = Math.floor(new Number(canvas.clientWidth).valueOf());
                const logicalH = Math.ceil(new Number(canvas.clientHeight).valueOf());
                TerminalRenderer.render(logicalW, logicalH);
            });
        }
    }).catch(err => console.error("Failed to create canvas:", err));

    LoadEventValue.stopPropagation();
}, { once: true, passive: true });
