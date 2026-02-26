import {
    WindowDockerUtilitys,
} from "./TypeScript_Modules/menu_docker_tools";
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
    export class InstanceFloatingDockMenu extends FloatingDockCustomizer {
        newInstancedFloatingWindowDock: FloatingDockWindow | null;
        targetCustomizingDock: FloatingDockWindow | null;
        moveable: boolean;

        constructor(FloatingDockWindowName: string, DockMoveable?: boolean | undefined) {
            super();
            // Customizer Constructor Variables
            this.targetCustomizingDock = null;
            // 
            this.newInstancedFloatingWindowDock = null;
            this.moveable = false;
            // 
            (InstanceFloatingDock as Function)?.() ?? console.error(`Uh oh! The nain utility failed to Initalize the new FloatingDockWindow!`);
            function InstanceFloatingDock(): void {
                try {
                   if ((FloatingDockWindowName !== null && typeof(FloatingDockWindowName) === "string")) {

                    } else {
                        throw new TypeError(`
                            (Floating Dock Window)'s name is NULL, or incorrect value type;
                            \nEXPECTED:\t
                            ${new String(String)
                                .toLowerCase()
                                .valueOf()
                                .trim()
                            }
                        `);
                    } 
                } catch (DockWindowInstancingErr: unknown) {
                    if (DockWindowInstancingErr != null) {
                        var Stringified: Readonly<string> = new String(DockWindowInstancingErr).valueOf();
                        console.error(String(Stringified.toString()));
                    }
                }
            }
        }

        private valueTypeMatch(value: any, requestedType?: "string" | "number" | "boolean" | "object"): boolean {
            let typeMatches = false;
            const ValueType = typeof(value);
            const StringedRequestType = new String(requestedType).valueOf();

            function setTypeMatch(matchValue: boolean): void {
                try {
                    if (typeof(matchValue) === "boolean") {
                        typeMatches = matchValue;
                    } else {
                        throw new TypeError();
                    }
                } catch (SetValueErr) {
                    if (SetValueErr != null)
                        console.error();
                }
            }
            
            if (ValueType === StringedRequestType.trim()) {
                setTypeMatch(true);
            } else {
                setTypeMatch(false);
                console.warn('Value does not match requested, or does not exist.');
            }

            return typeMatches.valueOf();
        }

        public setDockName(RequestedDockName: string | undefined): void {
            if (RequestedDockName !== null) {
                if (this.valueTypeMatch(RequestedDockName, "string")) {

                }
            }
        }
    }
}
