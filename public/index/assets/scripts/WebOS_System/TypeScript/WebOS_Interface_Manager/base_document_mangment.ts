import { Renderer2D, InterfaceRenderQuad, RenderGroup } from "./rendering_core.js";
import { TextFontRendering as InterfaceTextRendering } from "./text_rendering_core.js";

const VirtualMachineWrapper = self.window.document.body.querySelector(".virtual-machine-display-wrapper");
let DisplayCanvasStyles = new String().valueOf();

namespace TerminalCursorDirectionConstants {
    // Constants literal values
    export const _RIGHT_MOVMENT: Readonly<number> = parseFloat("16");
    export const _LEFT_MOVMENT: Readonly<number> = parseFloat("-16");
    export const _VALID_KEYS: readonly string[] = [
        "ArrowLeft",
        "ArrowRight",
    ];
    // Constants value IDs
    export let LEFT = 1 as const;
    export let RIGHT = 2 as const;
    // Conversion values
    export const ArrowLeft = LEFT;
    export const ArrowRight = RIGHT;
    export let AbsoluteIDs: Readonly<("LEFT" | "RIGHT")[]> = [
        "LEFT",
        "RIGHT",
    ] as const;
}

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

declare type TerminalCursorDirectionVariants = typeof TerminalCursorDirectionConstants.LEFT | typeof TerminalCursorDirectionConstants.RIGHT;

// DOMContentLoaded
window.addEventListener("DOMContentLoaded", (LoadEventValue) => {
    VirtualMachineElementManager.InstanceCanvasRenderingElement().then(VirtualMachineDisplayOutput => {
        if (VirtualMachineDisplayOutput && VirtualMachineDisplayOutput instanceof HTMLCanvasElement) {
            VirtualMachineWrapper?.appendChild(VirtualMachineDisplayOutput);
            console.debug(("DISPLAY OUTPUT:\t" + (VirtualMachineDisplayOutput.nodeName ?? "unknown")));
            console.debug(VirtualMachineDisplayOutput.dataset ?? "Display output dataset NOT available.");

            let VirtualMachineDisplayGeometricData = (VirtualMachineDisplayOutput?.getBoundingClientRect() ?? null);
            let VirtualMachineFocused: boolean = false;

            VirtualMachineDisplayOutput.addEventListener("click", (ClickEvent) => {
                if (ClickEvent !== undefined && ClickEvent instanceof PointerEvent && !ClickEvent.isPrimary) {
                    if (VirtualMachineFocused !== null && typeof (VirtualMachineFocused) === "boolean") {
                        (async () => {
                            if (!VirtualMachineDisplayOutput.classList.contains("highlight-focused")) {
                                VirtualMachineDisplayOutput.classList.add("highlight-focused");
                            } else {
                                console.info("Focused classlist already exists, skipping.");
                            }
                        })().then(() => {
                            VirtualMachineFocused = true;
                            console.debug(VirtualMachineFocused.valueOf());
                        });
                    }
                } else {
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

            self.window.addEventListener("keydown", (KeyboardPressEvent: KeyboardEvent) => {
                if (KeyboardPressEvent !== undefined && KeyboardPressEvent instanceof KeyboardEvent) {
                    const PressedKeyboardKeybind: string = KeyboardPressEvent?.key ?? null;
                    if (PressedKeyboardKeybind.valueOf() === TerminalCursorDirectionConstants._VALID_KEYS[0].normalize("NFC") || PressedKeyboardKeybind.valueOf() === TerminalCursorDirectionConstants._VALID_KEYS[1].normalize("NFC")) {
                        console.debug("Valid terminal cursor keybind detected.");
                        translateTerminalCursor(TerminalCursorDirectionConstants[PressedKeyboardKeybind as "ArrowLeft" | "ArrowRight"], TerminalCursor);
                    }
                }
            }, { passive: true, capture: true });

            /**
             * ---
             * @param targetDirection 
             * @param activeTerminalCursor 
             * @returns 
             */
            function translateTerminalCursor(targetDirection: TerminalCursorDirectionVariants, activeTerminalCursor: InterfaceRenderQuad): void {
                if (targetDirection === undefined || activeTerminalCursor === undefined || !(activeTerminalCursor instanceof InterfaceRenderQuad)) return;
                if (targetDirection !== TerminalCursorDirectionConstants.LEFT! && targetDirection !== TerminalCursorDirectionConstants.RIGHT!) return;
                const FormatedValueKey = `_${TerminalCursorDirectionConstants.AbsoluteIDs[Math.ceil(targetDirection.valueOf() - 1)] ?? new String(null).valueOf()}_MOVMENT` as "_LEFT_MOVMENT" | "_RIGHT_MOVMENT";
                const SelectedMovmentValueDirection = TerminalCursorDirectionConstants?.[FormatedValueKey] ?? undefined;

                console.info(FormatedValueKey);
                console.info(SelectedMovmentValueDirection);

                if (SelectedMovmentValueDirection === undefined || typeof (SelectedMovmentValueDirection) !== "number") return void null; else {
                    requestAnimationFrame(() => console.debug("OK"));
                }

                (InterfaceRendererPipeline.TweenSelected?.(activeTerminalCursor, {
                    positions: {
                        x: Number(activeTerminalCursor.x + SelectedMovmentValueDirection.valueOf()),
                        y: parseFloat(activeTerminalCursor.y.toFixed(2)),
                    },
                }, () => {
                    console.debug("Tweening terminal cursor; translation position.");
                }, 100) ?? (void null)).finally(() => {

                });
            }

            const InterfaceRendererPipeline = new Renderer2D(VirtualMachineDisplayOutput, 1024) as typeof Renderer2D.prototype;
            const TextRenderingInstance = new InterfaceTextRendering();
            // ...
            const TerminalBackground = InterfaceRendererPipeline.createRect(0, 0, VirtualMachineDisplayGeometricData.width, VirtualMachineDisplayGeometricData.height, [0, 0, 0, 1]);
            InterfaceRendererPipeline.applyToRendering(TerminalBackground);
            // ...
            const TerminalCursor = InterfaceRendererPipeline.createRect(-50, 10, 5, 30, [0, 255, 0, 1]);
            InterfaceRendererPipeline.applyToRendering(TerminalCursor);
            // ...
            InterfaceRendererPipeline.TweenSelected(TerminalCursor, {
                positions: {
                    "x": 10,
                    "y": 10,
                },
            }, undefined, parseFloat("425").valueOf());

            async function blinkCursor(): Promise<void> {
                if (TerminalCursor !== undefined && TerminalCursor instanceof InterfaceRenderQuad) {
                    TerminalCursor.visible = !TerminalCursor.visible;
                } else {
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
                } else {
                    console.warn("");
                }

                InterfaceRendererPipeline.update();
                const logicalW = Math.floor(new Number(VirtualMachineDisplayOutput.clientWidth).valueOf());
                const logicalH = Math.ceil(new Number(VirtualMachineDisplayOutput.clientHeight).valueOf());
                InterfaceRendererPipeline.render(logicalW, logicalH);
            });

            (async () => {
                let BlinkingInterval: typeof globalThis.setInterval.prototype | null = null;
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
