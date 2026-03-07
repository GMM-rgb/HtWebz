import { WindowDockerUtilitys } from "./modules/menu_docker_tools";

// Argument Types
declare type SetSizeDimensionAxisTypes = "width" | "height";

// Sub-Object Type Definitions
declare type DockerContent = string;
declare type DockerPositionTypes = {
    y: string;
    x: string;
};

// Object Type Definitions
/**
 * ---
 * 
 * 
 * 
 */
export declare type FloatingDockWindow = {
    DockWindowRoot: typeof HTMLUnknownElement;
    DockWindowCustomizationProperties: DockCustomizationPropeties;
    DockWindowContent: DockerContent;
    DockWindowName: string | undefined;
    PositionValues: DockerPositionTypes;
    DockHeight: Number;
    DockWidth: Number;
};

// Abstract Class(es); Reference; Declaration
export declare abstract class FloatingDockWindowInstanceType {
    
}

export class InstanceFloatingDockWindow implements FloatingDockWindowInstanceType {
    DockWindow: HTMLUnknownElement | null;

    private NewDockWindowElement(): HTMLUnknownElement {
        const DockWindowRegistery = new CustomElementRegistry();
        let DockWindow = new HTMLUnknownElement();

        async function InstanceWindow(): Promise<void> {
            DockWindow = document.createElement("div", { customElementRegistry: DockWindowRegistery ?? undefined });
        }

        return;
    }

    constructor () {
        this.DockWindow = null;
    }
}

/**
 * 
 */
export namespace FloatingDockWindowConstructor {
    declare type TypeAvailableMatch = "string" | "number" | "boolean" | "object";

    const DefaultName = "NewDockWindow";
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
    export class Instance extends FloatingDockCustomizer {
        newInstancedFloatingWindowDock: FloatingDockWindow | null;
        targetCustomizingDock: FloatingDockWindow | null;
        moveable: boolean;
        dockName: string | null;

        constructor(FloatingDockWindowName: string, DockMoveable?: boolean | undefined) {
            super();
            // Customizer Constructor Variables
            this.targetCustomizingDock = null;
            // Main Property Variables
            this.newInstancedFloatingWindowDock = null;
            this.moveable = false;
            // Miscellaneous Variables
            this.dockName = undefined;
            // Object Inital Function(s) Runtime
            (InstanceFloatingDock as Function)?.() ?? console.error(`Uh oh! The nain utility failed to Initalize the new FloatingDockWindow!`);
            (this.SetDefaultDockName as Function)?.();
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

        /**
         * 
         * ---
         * 
         * Sets the default name to `NewDockWindow` incase of **NO** *Custom Name*. 
         * 
         * ---
         * 
         * @returns 
         * 
         */
        private SetDefaultDockName(ReturnsName?: boolean): string | undefined {
            if (ReturnsName === undefined) ReturnsName = false;
            if (DefaultName !== null 
            && typeof(DefaultName) === "string" 
            && this.dockName !== DefaultName) {
                if (!ReturnsName) {
                    this.dockName = DefaultName ?? "NewUnknown";
                } else return DefaultName ?? "NewUnknown";
            } else {
                console.error(`\n`, new Error());
            }
        }

        /**
         * 
         * @param value
         * @param requestedType 
         * @returns 
         */
        private valueTypeMatch(value: any, requestedType?: TypeAvailableMatch): boolean {
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

        public getDockerSize(GetAxis: "X" | "Y"): number | null {
            let FetchedDockerSize: number = 0;

            if (this.newInstancedFloatingWindowDock !== null
            && this.newInstancedFloatingWindowDock instanceof InstanceFloatingDockWindow) {
                let DockerSizeRect: DockWindowConstraints = {
                    SizeConstraints: {
                        SizeY: this.newInstancedFloatingWindowDock.DockHeight.valueOf(),
                        SizeX: this.newInstancedFloatingWindowDock.DockWidth.valueOf(),
                    },
                    PositionConstraints: {
                        PosY: parseFloat(this.newInstancedFloatingWindowDock.PositionValues.y),
                        PosX: parseFloat(this.newInstancedFloatingWindowDock.PositionValues.x),
                    },
                };
            }

            return FetchedDockerSize ?? 0;
        }

        public setDockName(RequestedDockName: string | undefined): void {
            if (RequestedDockName != null) {
                if (this.valueTypeMatch(RequestedDockName, "string")) {
                    this.dockName = RequestedDockName !== undefined ? RequestedDockName : this.SetDefaultDockName(true);
                }
            }
        }

        public getDockName(): string | null {
            let SequenceFetchedDockName: string = "";

            if (this.dockName != null && typeof(this.dockName) === "string") {
                SequenceFetchedDockName = this.dockName !== null ? this.dockName : null;
            } else {
                console.warn(`Dock Name was null, or invalid to fetch.`);
            }

            return SequenceFetchedDockName ?? null;
        }
    }
}
