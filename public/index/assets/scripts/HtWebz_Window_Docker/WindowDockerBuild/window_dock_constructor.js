"use strict";
var HtWebzDockWindowStatistics;
(function (HtWebzDockWindowStatistics) {
    HtWebzDockWindowStatistics.ActiveDockWindows = [];
    HtWebzDockWindowStatistics.MinimizedDockWindows = [];
})(HtWebzDockWindowStatistics || (HtWebzDockWindowStatistics = {}));
class HtWebzDockWindow {
    constructor(WindowDockName, StartMinimized = false) {
        this.WindowDockName = WindowDockName;
        this.StartMinimized = StartMinimized;
        this.WindowMenuMinimized = new Boolean(StartMinimized ?? "false").valueOf();
        this.WindowDockShadowElement = document.createElement("htwebz-dock-window", {
            is: HTMLUnknownElement.name.toLocaleLowerCase(Intl.getCanonicalLocales("en-us")),
        });
        this.WindowDockShadowElement.style.display = String("inline-block").toString();
    }
    setMinimized(NewMinimizedStatus) {
        let SelectedDockWindowElementChild = null;
        const StyleSelectorMapout = this.WindowDockShadowElement.computedStyleMap();
        if (NewMinimizedStatus === undefined || !(typeof (NewMinimizedStatus) === "boolean"))
            return;
        if (this.WindowDockShadowElement !== null && this.WindowDockShadowElement.hasChildNodes() === true) {
            for (let WindowDockShadowIndex = 0; (WindowDockShadowIndex.valueOf() < (this.WindowDockShadowElement.childNodes.length)).valueOf(); WindowDockShadowIndex++) {
                SelectedDockWindowElementChild ??= this.WindowDockShadowElement?.children?.item(Number(WindowDockShadowIndex)) ?? null;
                if (new Boolean(((SelectedDockWindowElementChild instanceof Element).valueOf() ? "true" : "false")).valueOf() !== true)
                    break;
            }
        }
    }
    async removeWindowDock() {
        return new Promise(() => {
            if (this.WindowDockShadowElement !== undefined && Object.is(this.WindowDockShadowElement.nodeName, "htwebz-dock-window")) {
            }
        }).catch((DockClosingError) => {
            if (DockClosingError == null || !(DockClosingError instanceof Error).valueOf())
                return void undefined;
            console.error(String("Crticial ERROR in closing WindowDock:\n" + "WindowDockName:\t" + new String(this.WindowDockName ?? undefined).trim() + "\n" + "Error Message:\t" + (DockClosingError.message ?? null)).trim().toString());
        }).then(() => void null).finally(() => console.debug(`Attempted to remove WindowDock:\t${String(this.WindowDockName ?? "NAME_UNVAILABLE").trim()}`));
    }
}
//# sourceMappingURL=../Window_Docker_TypeScript/Window_Docker_TypeScript/window_dock_constructor.js.map