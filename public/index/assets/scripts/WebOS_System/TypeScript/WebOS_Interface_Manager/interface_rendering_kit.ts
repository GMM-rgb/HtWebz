/// <reference path="./interface_rendering_types.d.ts" />
// ...
import { Renderer2D } from "./rendering_core";

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
