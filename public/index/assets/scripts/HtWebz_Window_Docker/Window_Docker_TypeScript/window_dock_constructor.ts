/// <reference path="window_dock_objects.d.ts" />

namespace HtWebzDockWindowStatistics {
    export let ActiveDockWindows: Array<typeof HtWebzDockWindow.prototype> = [];
    export let MinimizedDockWindows: Array<typeof HtWebzDockWindow.prototype> = [];
}

class HtWebzDockWindow implements WindowDockPrimative {
    constructor(public DockWindowName: string) {

    }

    public setMinimized(NewMinimizedStatus: boolean): void {
        if (NewMinimizedStatus === undefined || !(typeof (NewMinimizedStatus) === "boolean")) return;
    }

    public removeWindowDock(): Promise<void> {
        return new Promise((): void => {

        });
    }
}
