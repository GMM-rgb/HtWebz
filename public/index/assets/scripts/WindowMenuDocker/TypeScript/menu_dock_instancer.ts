// / <reference path="../../window_scope_definitions.d.ts" />
import * as DockerTools from "./TypeScript_Modules/menu_docker_tools";
// Argument Types
declare type SetSizeDimensionAxisTypes = "width" | "height";
// Sub-Object Type Definitions
declare type DockerContent = string;
// Object Type Definitions
declare type FloatingDockWindow = {
    DockWindowName: string | undefined;
    DockWindowContent: DockerContent;
};

export namespace FloatingDockWindowConstructor {
    var CurrentDockMenus: FloatingDockWindow[] = new Array(0);
    /**
     * 
     */
    class FloatingDockCustomizer {
        targetCustomizingDock: FloatingDockWindow | null;

        // Construct the Customizer for the `FloatingDockWindow`
        constructor(WindowDock: FloatingDockWindow) {
            /**
             * @private
             */
            this.targetCustomizingDock = WindowDock || null;
        }

        /**
         * Sets the `FloatingDock`'s height; the specified amount.
         * @param RequestedDimensionAxis 
         * @param RequestedHeightAmount 
         * @returns {void}
         */
        public SetSizDimension(RequestedDimensionAxis: SetSizeDimensionAxisTypes, RequestedHeightAmount?: number): void {
            if (RequestedDimensionAxis === "height" || RequestedDimensionAxis === "width") {
                if (RequestedHeightAmount !== null && RequestedHeightAmount?.valueOf() || 0 > 0) {
                    try {
                        let IsValidDockMenu: boolean = false;
                        let ValidDockMenuIndex = new Number(0).valueOf();

                        // Ensures this customizer is pointing to the correct `FloatingDockMenu`
                        CurrentDockMenus.forEach((DockMenu, CurrentMenuIndex) => {
                            if (this.targetCustomizingDock !== null || this.targetCustomizingDock !== undefined) {
                                if (this.targetCustomizingDock.DockWindowName.trim() === DockMenu.DockWindowName.trim()) {
                                    IsValidDockMenu = true;
                                }
                            }
                            // Match the Index; with the current item
                            ValidDockMenuIndex = Math.ceil(Math.abs(CurrentMenuIndex.valueOf()));
                        });

                        if ((IsValidDockMenu !== null && IsValidDockMenu) ) {

                        } else {
                            throw new Error(`Incorrect DockMenu Type, expected:\t${new String(typeof(HTMLElement)).valueOf()}`);
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
