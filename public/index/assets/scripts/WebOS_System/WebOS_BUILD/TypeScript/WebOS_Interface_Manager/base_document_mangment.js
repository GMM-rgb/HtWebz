import { Renderer2D, InterfaceRenderQuad } from "./rendering_core.js";
import { TextFontRendering as InterfaceTextRendering } from "./text_rendering_core.js";
const VirtualMachineWrapper = self.window.document.body.querySelector(".virtual-machine-display-wrapper");
let DisplayCanvasStyles = new String().valueOf();
var TerminalCursorDirectionConstants;
(function (TerminalCursorDirectionConstants) {
    TerminalCursorDirectionConstants._RIGHT_MOVMENT = parseFloat("16");
    TerminalCursorDirectionConstants._LEFT_MOVMENT = parseFloat("-16");
    TerminalCursorDirectionConstants._VALID_KEYS = [
        "ArrowLeft",
        "ArrowRight",
    ];
    TerminalCursorDirectionConstants.LEFT = 1;
    TerminalCursorDirectionConstants.RIGHT = 2;
    TerminalCursorDirectionConstants.ArrowLeft = TerminalCursorDirectionConstants.LEFT;
    TerminalCursorDirectionConstants.ArrowRight = TerminalCursorDirectionConstants.RIGHT;
    TerminalCursorDirectionConstants.AbsoluteIDs = [
        "LEFT",
        "RIGHT",
    ];
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
    VirtualMachineElementManager.InstanceCanvasRenderingElement().then(VirtualMachineDisplayOutput => {
        if (VirtualMachineDisplayOutput && VirtualMachineDisplayOutput instanceof HTMLCanvasElement) {
            VirtualMachineWrapper?.appendChild(VirtualMachineDisplayOutput);
            console.debug(("DISPLAY OUTPUT:\t" + (VirtualMachineDisplayOutput.nodeName ?? "unknown")));
            console.debug(VirtualMachineDisplayOutput.dataset ?? "Display output dataset NOT available.");
            let VirtualMachineDisplayGeometricData = (VirtualMachineDisplayOutput?.getBoundingClientRect() ?? null);
            let VirtualMachineFocused = false;
            VirtualMachineDisplayOutput.addEventListener("click", (ClickEvent) => {
                if (ClickEvent !== undefined && ClickEvent instanceof PointerEvent && !ClickEvent.isPrimary) {
                    if (VirtualMachineFocused !== null && typeof (VirtualMachineFocused) === "boolean") {
                        (async () => {
                            if (!VirtualMachineDisplayOutput.classList.contains("highlight-focused")) {
                                VirtualMachineDisplayOutput.classList.add("highlight-focused");
                            }
                            else {
                                console.info("Focused classlist already exists, skipping.");
                            }
                        })().then(() => {
                            VirtualMachineFocused = true;
                            console.debug(VirtualMachineFocused.valueOf());
                        });
                    }
                }
                else {
                    console.warn("click invalid\n" + ClickEvent.isPrimary);
                }
            }, { passive: true });
            self.window.document.addEventListener("click", (ClickEvent) => {
                if (ClickEvent !== undefined && ClickEvent instanceof PointerEvent) {
                    if (ClickEvent.target !== null && ClickEvent.target instanceof HTMLElement) {
                        if (!(ClickEvent.target instanceof HTMLCanvasElement)) {
                            if (VirtualMachineDisplayOutput.classList.contains("highlight-focused")) {
                                VirtualMachineDisplayOutput.classList.remove("highlight-focused");
                                VirtualMachineFocused = false;
                            }
                        }
                    }
                }
            }, { passive: true, capture: true });
            self.window.addEventListener("keydown", (KeyboardPressEvent) => {
                if (!VirtualMachineFocused || typeof (VirtualMachineFocused) !== "boolean")
                    return;
                if (KeyboardPressEvent !== undefined && KeyboardPressEvent instanceof KeyboardEvent) {
                    const PressedKeyboardKeybind = KeyboardPressEvent?.key ?? null;
                    if (PressedKeyboardKeybind.valueOf() === TerminalCursorDirectionConstants._VALID_KEYS[0].normalize("NFC") || PressedKeyboardKeybind.valueOf() === TerminalCursorDirectionConstants._VALID_KEYS[1].normalize("NFC")) {
                        console.debug("Valid terminal cursor keybind detected.");
                        translateTerminalCursor(TerminalCursorDirectionConstants[PressedKeyboardKeybind], TerminalCursorQaud);
                    }
                }
            }, { passive: true, capture: true });
            function translateTerminalCursor(targetDirection, activeTerminalCursor) {
                if (targetDirection === undefined || activeTerminalCursor === undefined || !(activeTerminalCursor instanceof InterfaceRenderQuad))
                    return;
                if (targetDirection !== TerminalCursorDirectionConstants.LEFT && targetDirection !== TerminalCursorDirectionConstants.RIGHT)
                    return;
                const FormatedValueKey = `_${TerminalCursorDirectionConstants.AbsoluteIDs[Math.ceil(targetDirection.valueOf() - 1)] ?? new String(null).valueOf()}_MOVMENT`;
                const SelectedMovmentValueDirection = TerminalCursorDirectionConstants?.[FormatedValueKey] ?? undefined;
                console.info(FormatedValueKey);
                console.info(SelectedMovmentValueDirection);
                if (SelectedMovmentValueDirection === undefined || typeof (SelectedMovmentValueDirection) !== "number")
                    return void null;
                else {
                    requestAnimationFrame(() => console.debug("OK"));
                }
                (InterfaceRendererPipeline.TweenSelected?.(activeTerminalCursor, {
                    positions: {
                        x: Number(activeTerminalCursor.x + SelectedMovmentValueDirection.valueOf()),
                        y: parseFloat(activeTerminalCursor.y.toFixed(2)),
                    },
                }, () => {
                    console.debug("Tweening terminal cursor; translation position.");
                }, 125) ?? (void null)).finally(() => {
                    console.info?.(`Tweening terminal cursor thread completed.`) ?? undefined;
                });
            }
            const InterfaceRendererPipeline = new Renderer2D(VirtualMachineDisplayOutput, 1024);
            const TextRenderingInstance = new InterfaceTextRendering("monospace", "ENGLISH", InterfaceRendererPipeline ?? null);
            const TerminalCursorObjectInterface = InterfaceRendererPipeline.createGroup(VirtualMachineDisplayOutput.clientWidth / 2, VirtualMachineDisplayOutput.clientHeight / 2);
            const TerminalBackground = InterfaceRendererPipeline.createRect(0, 0, VirtualMachineDisplayGeometricData.width, VirtualMachineDisplayGeometricData.height, [0, 0, 0, 1]);
            const TerminalCursorQaud = InterfaceRendererPipeline.createRect(-50, 10, 5, 30, [0, 255, 0, 1]);
            const TerminalCursorFade = InterfaceRendererPipeline.createRect(10, TerminalCursorQaud.y, TerminalCursorQaud.w, TerminalCursorQaud.h, [255, 0, 255, 1]);
            InterfaceRendererPipeline.applyToRendering(TerminalCursorObjectInterface);
            InterfaceRendererPipeline.applyToRendering(TerminalBackground);
            InterfaceRendererPipeline.applyToRendering(TerminalCursorFade);
            InterfaceRendererPipeline.applyToRendering(TerminalCursorQaud);
            TerminalCursorObjectInterface.add(TerminalCursorQaud);
            TerminalCursorObjectInterface.add(TerminalCursorFade);
            InterfaceRendererPipeline.TweenSelected(TerminalCursorQaud, {
                positions: {
                    "x": 10,
                    "y": 10,
                },
            }, undefined, Number(parseFloat("425").valueOf())).finally(async () => {
                TerminalCursorObjectInterface.remove(TerminalCursorFade);
                (TerminalCursorFade.visible !== false ? TerminalCursorFade.updateVisiblility(false) : null);
            });
            async function blinkCursor() {
                if (TerminalCursorQaud !== undefined && TerminalCursorQaud instanceof InterfaceRenderQuad) {
                    TerminalCursorQaud.visible = !TerminalCursorQaud.visible;
                }
                else {
                    console.warn("TerminalCursor is invalid or undefined!");
                }
            }
            InterfaceRendererPipeline.startAnimationLoop(() => {
                VirtualMachineDisplayGeometricData = VirtualMachineDisplayOutput.getBoundingClientRect();
                if (TerminalBackground !== undefined && TerminalBackground instanceof InterfaceRenderQuad) {
                    if ((VirtualMachineDisplayGeometricData.height > TerminalBackground.h || VirtualMachineDisplayGeometricData.height < TerminalBackground.h)
                        || (VirtualMachineDisplayGeometricData.width > TerminalBackground.w || VirtualMachineDisplayGeometricData.width < TerminalBackground.w)) {
                        TerminalBackground.h = VirtualMachineDisplayGeometricData?.height?.valueOf() ?? 100;
                        TerminalBackground.w = VirtualMachineDisplayGeometricData?.width?.valueOf() ?? 200;
                    }
                }
                else {
                    console.warn("");
                }
                InterfaceRendererPipeline.update();
                const logicalW = Math.floor(new Number(VirtualMachineDisplayOutput.clientWidth).valueOf());
                const logicalH = Math.ceil(new Number(VirtualMachineDisplayOutput.clientHeight).valueOf());
                InterfaceRendererPipeline.render(logicalW, logicalH);
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