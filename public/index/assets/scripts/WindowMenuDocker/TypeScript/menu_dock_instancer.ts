// / <reference path="../../window_scope_definitions.d.ts" />

declare type SetSizeDimensionAxisTypes = "width" | "height";

export namespace FloatingDockMenu {
    let CurrentDockMenus: HTMLElement[] = new Array(0);
    /**
     * 
     */
    class FloatingDockCustomizer {
        targetCustomizingDock: HTMLElement | null;

        constructor() {
            this.targetCustomizingDock = null;
        }

        /**
         * Sets the `FloatingDock`'s height; the specified amount.
         * @param RequestedDimensionAxis 
         * @param RequestedHeightAmount 
         */
        public SetSizDimension(RequestedDimensionAxis: SetSizeDimensionAxisTypes, RequestedHeightAmount?: number): void {
            if (RequestedDimensionAxis === "height" || RequestedDimensionAxis === "width") {
                if (RequestedHeightAmount !== null && RequestedHeightAmount?.valueOf() || 0 > 0) {
                    try {
                        let IsValidDockMenu: boolean = false;
                        CurrentDockMenus.forEach(DockMenu => {

                        });

                        if (IsValidDockMenu !== null && IsValidDockMenu) {

                        } else {
                            throw new Error("", {
                                cause: new String(`Incorrect DockMenu Type, expected:\t${String(HTMLElement.name)}`)
                            });
                        }
                    } catch (SizeDimensionSettingError) {
                        console.error("Whilelist Instancing a new FloatingDockMenu, the utility crashed.\n" + String(SizeDimensionSettingError).trim());
                    }
                }
            }
        }
    }

    /**
     * 
     */
    abstract class Customizer {

    }

    /**
     * 
     */
    export class InstanceFloatingDockMenu extends Customizer {
        
    }
}

new FloatingDockMenu.InstanceFloatingDockMenu();
