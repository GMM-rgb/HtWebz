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
        if (NewMinimizedStatus === undefined || !(typeof (NewMinimizedStatus) === "boolean"))
            return undefined;
        if (this.WindowDockShadowElement !== null && this.WindowDockShadowElement.hasChildNodes() === true) {
            this.WindowDockShadowElement.childNodes.forEach((SelectedElementNode, _ElementNodeIndex, NodeGroupList) => {
                if (SelectedElementNode != null && (SelectedElementNode instanceof Node).valueOf()) {
                    const ElementNodeRootValue = (SelectedElementNode.getRootNode({ "composed": false }).nodeValue);
                    const ElementNodeType = SelectedElementNode.nodeName.toLowerCase().trim().toString();
                    let ReferenceProperElement = new globalThis.window.Document().createElement(String(ElementNodeType));
                    ReferenceProperElement.nodeValue ??= ((ElementNodeRootValue ?? new Node().nodeValue) ?? (null));
                    ReferenceProperElement.className ??= SelectedElementNode.parentElement?.className ?? "classNameParseError";
                    const ContentVisualStyle = CSSStyleValue.parse("display", "none");
                    const DockerContentElement = globalThis.document.querySelector(`.${this.WindowDockShadowElement.className} .${ReferenceProperElement.className.trim()}`);
                    if (DockerContentElement === null || !(DockerContentElement instanceof HTMLElement))
                        return undefined;
                    DockerContentElement.style.cssText ??= new String(ContentVisualStyle.toString()).valueOf();
                }
            });
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
    computeNewSizeConstraints() {
    }
    updateDockWindowSizeConstraints(targetWidth, targetHeight, transformFromOrigin = ["LEFT", "TOP"]) {
        let ConstraintsChangeInfo = {
            changeIncrements: {},
            changes: {},
        };
        return ConstraintsChangeInfo;
    }
}
//# sourceMappingURL=../Window_Docker_TypeScript/Window_Docker_TypeScript/window_dock_constructor.js.map