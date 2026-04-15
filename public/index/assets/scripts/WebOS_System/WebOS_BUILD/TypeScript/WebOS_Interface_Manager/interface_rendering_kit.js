"use strict";
class WindowConstructor {
    constructor() {
        this.DataConstructors = new Object({
            InstanceWindowData: async function (TargetwindowTitle = "Untitled#Window", RequestedWindowDataInput) {
                let NewWindowRendering = {
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
                }
                else {
                    console.warn(`Requested window title was INVALID, or UNDEFINED.\nExpected:\tSTRING\nReceived:\t${new String(TargetwindowTitle !== undefined ? typeof (TargetwindowTitle) : null).valueOf()}`);
                }
                return;
            },
        }).valueOf();
    }
}
class UiRenderingSystem {
    constructor() {
    }
    GenerateWindowDisplay(WindowInterfaceConstructionData = undefined) {
        if (typeof (WindowInterfaceConstructionData !== undefined && WindowInterfaceConstructionData instanceof WindowConstructor && WindowInterfaceConstructionData) === "object") {
        }
        else {
            console.warn();
            return;
        }
    }
}
class UiWebOS extends WindowConstructor {
    static FormatWindowTitle(TargetWindow = undefined) {
        if (TargetWindow !== undefined && typeof (TargetWindow) === "object") {
        }
        else {
            console.error();
        }
    }
    constructor() {
        super();
        this.WindowConstructor = new WindowConstructor();
        this.CurrentWindows = new Object({
            WelcomeWindow: {
                sizing: {},
                visual: {},
                toolbar: {
                    TOOLBAR_ENABLED: true,
                    _enabled_elements: {
                        title: false,
                        controls: true,
                    }
                }
            },
        });
    }
    DestroyRenderingSystem() {
        throw void null;
    }
}
//# sourceMappingURL=../../../TypeScript/WebOS_Interface_Manager/interface_rendering_kit.js.map