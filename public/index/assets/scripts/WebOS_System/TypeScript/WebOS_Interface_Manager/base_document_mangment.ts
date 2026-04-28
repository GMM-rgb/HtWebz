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
    VirtualMachineElementManager.InstanceCanvasRenderingElement().then(async (VirtualMachineDisplayOutput) => {
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
                if (!VirtualMachineFocused || typeof (VirtualMachineFocused) !== "boolean") return;
                if (KeyboardPressEvent !== undefined && KeyboardPressEvent instanceof KeyboardEvent) {
                    const PressedKeyboardKeybind: string = KeyboardPressEvent?.key ?? null;
                    if (PressedKeyboardKeybind.valueOf() === TerminalCursorDirectionConstants._VALID_KEYS[0].normalize("NFC") || PressedKeyboardKeybind.valueOf() === TerminalCursorDirectionConstants._VALID_KEYS[1].normalize("NFC")) {
                        console.debug("Valid terminal cursor keybind detected.");
                        translateTerminalCursor(TerminalCursorDirectionConstants[PressedKeyboardKeybind as "ArrowLeft" | "ArrowRight"], TerminalCursorQaud);
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

                (InterfaceRendererPipeline!.TweenSelected?.(activeTerminalCursor, {
                    positions: {
                        x: Number(activeTerminalCursor.x + SelectedMovmentValueDirection.valueOf()),
                        y: parseFloat(activeTerminalCursor.y.toPrecision(2)),
                    },
                }, function() {
                    // console.debug("Tweening terminal cursor; translation position.");
                    if (TerminalCursorFade !== undefined && TerminalCursorFade instanceof InterfaceRenderQuad) {
                        !(TerminalCursorFade.visible) ? TerminalCursorFade.updateVisiblility(true) : void null;
                        TerminalCursorFade.x = TerminalCursorFade.x + SelectedMovmentValueDirection.valueOf();
                        TerminalCursorFade.y = activeTerminalCursor.y;
                    } else { console.warn("Fading shadow element is undefined for terminal cursor!"); }
                }, 125) ?? (void null))?.finally(() => {
                    // console.debug?.(`Tweening terminal cursor thread completed.`) ?? void undefined;
                    TerminalCursorFade.visible ? TerminalCursorFade.updateVisiblility(false) : null;
                    if ((activeTerminalCursor.x !== TerminalCursorFade.x).valueOf() === true) {
                        (activeTerminalCursor.x = TerminalCursorFade?.x.valueOf() ?? 10);
                        (activeTerminalCursor.x === TerminalCursorFade.x ? console.debug("Respositioned delayed terminal cursor position successfully.") : null);
                    }
                });
            }

            const InterfaceRendererPipeline = new Renderer2D(VirtualMachineDisplayOutput, 1024) as typeof Renderer2D.prototype;
            const TextRenderingInstance = new InterfaceTextRendering("monospace", "ENGLISH", InterfaceRendererPipeline ?? null);
            const TerminalCursorObjectInterface = InterfaceRendererPipeline.createGroup(VirtualMachineDisplayOutput.clientWidth / 2, VirtualMachineDisplayOutput.clientHeight / 2);
            const TerminalBackground = InterfaceRendererPipeline.createRect(0, 0, VirtualMachineDisplayGeometricData.width, VirtualMachineDisplayGeometricData.height, [0, 0, 0, 1]);
            const TerminalCursorQaud = InterfaceRendererPipeline.createRect(-50, 10, 5, 30, [0, 100, 150, 1]);
            const TerminalCursorFade = InterfaceRendererPipeline.createRect(10, TerminalCursorQaud.y, TerminalCursorQaud.w, TerminalCursorQaud.h, [255, 0, 255, 1]);

            // const LoadingSpinnerTexture = await InterfaceRendererPipeline.loadSVGTexture(String(`
            // <svg width="100" height="100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            //     <defs>
            //         <clipPath id="spinnerCutout">
            //             <rect width="200" height="200" />
            //             <rect x="88" y="8" width="32" height="78" fill="black" />
            //         </clipPath>
            //     </defs>

            //     <g id="spinnerGroup" style="transform-origin: 100px 100px;">
            //         <!-- Outer dark outline -->
            //         <circle cx="100" cy="100" r="79" fill="none" stroke="#0d5329" stroke-width="24" />
            //         <!-- Main lime ring -->
            //         <g clip-path="url(#spinnerCutout)">
            //             <circle cx="100" cy="100" r="67" fill="none" stroke="#22c55e" stroke-width="17" stroke-linecap="round" />
            //             <circle cx="100" cy="100" r="67" fill="none" stroke="#1e9e4f" stroke-width="17" stroke-linecap="round"
            //                 stroke-dasharray="340 120" stroke-dashoffset="25" />
            //         </g>

            //         <circle cx="100" cy="100" r="55" fill="none" stroke="#0f2a1a" stroke-width="10" />
            //     </g>
            // </svg>`));
            // const LoadingSpinner = InterfaceRendererPipeline.createSprite(100, 100, 100, 100, LoadingSpinnerTexture, [1, 1, 1, 1]);
            // console.info(LoadingSpinner.texture);

            // InterfaceRendererPipeline.applyToRendering(LoadingSpinner);
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
            }, undefined, Number(parseFloat("425").valueOf())).finally(async (): Promise<void> => {
                (TerminalCursorFade.visible !== false ? TerminalCursorFade.updateVisiblility(false) : null);
                TerminalCursorObjectInterface.remove(TerminalCursorFade);
            });

            async function blinkCursor(): Promise<void> {
                if (TerminalCursorQaud !== undefined && TerminalCursorQaud instanceof InterfaceRenderQuad) {
                    TerminalCursorQaud.visible = !TerminalCursorQaud.visible;
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
