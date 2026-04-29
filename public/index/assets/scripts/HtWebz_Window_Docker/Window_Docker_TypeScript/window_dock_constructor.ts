/// <reference path="window_dock_objects.d.ts" />
namespace HtWebzDockWindowStatistics {
    export let ActiveDockWindows: Array<typeof HtWebzDockWindow.prototype> = [];
    export let MinimizedDockWindows: Array<typeof HtWebzDockWindow.prototype> = [];
}

class HtWebzDockWindow implements WindowDockPrimative {
    public WindowMenuMinimized: boolean;
    private WindowDockShadowElement: HTMLUnknownElement | HTMLElement;

    constructor(public WindowDockName: string, private StartMinimized: boolean = false) {
        this.WindowMenuMinimized = new Boolean(StartMinimized ?? "false").valueOf();
        this.WindowDockShadowElement = document.createElement("htwebz-dock-window", {
            is: HTMLUnknownElement.name,
        });
    }

    public setMinimized(NewMinimizedStatus: boolean): void {
        if (NewMinimizedStatus === undefined || !(typeof (NewMinimizedStatus) === "boolean")) return;
        
    }

    public async removeWindowDock(): Promise<void> {
        return new Promise<(void)>((): void => {
            if (this.WindowDockShadowElement !== undefined && Object.is(this.WindowDockShadowElement.nodeName, "htwebz-dock-window")) {

            }
        }).catch((DockClosingError: Error) => {
            if (DockClosingError == null || !(DockClosingError instanceof Error).valueOf()) return void undefined;
            console.error(String("Crticial ERROR in closing WindowDock:\n" + "WindowDockName:\t" + new String(this.WindowDockName ?? undefined).trim() + "\n" + "Error Message:\t" + (DockClosingError.message ?? null)).trim().toString());
        }).then(() => void null).finally(() => console.debug(`Attempted to remove WindowDock:\t${String(this.WindowDockName ?? "NAME_UNVAILABLE").trim()}`));
    }
}
