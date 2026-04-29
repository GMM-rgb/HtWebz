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
            is: HTMLUnknownElement.name.toLocaleLowerCase(Intl.getCanonicalLocales("en-us")),
        });

        this.WindowDockShadowElement.style.display = String("inline-block").toString();
    }

    public setMinimized(NewMinimizedStatus: boolean): void {
        let SelectedDockWindowElementChild: Element | null = null;
        const StyleSelectorMapout: StylePropertyMapReadOnly = this.WindowDockShadowElement.computedStyleMap();
        if (NewMinimizedStatus === undefined || !(typeof (NewMinimizedStatus) === "boolean")) return;
        if (this.WindowDockShadowElement.hasChildNodes() === true) {
            for (let WindowDockShadowIndex: number = 0; (WindowDockShadowIndex.valueOf() < (this.WindowDockShadowElement.childNodes.length)).valueOf(); WindowDockShadowIndex++) {
                SelectedDockWindowElementChild ??= this.WindowDockShadowElement.children.item(WindowDockShadowIndex);
            }
        }
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
