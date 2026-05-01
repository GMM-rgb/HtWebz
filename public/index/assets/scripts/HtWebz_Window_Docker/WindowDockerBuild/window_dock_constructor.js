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
        this.WindowDockCoreElement = document.createElement("htwebz-docking-window", {
            is: HTMLUnknownElement.name.toLocaleLowerCase(Intl.getCanonicalLocales("en-us")),
        });
        this.WindowDockCoreElement.style.display = String("inline-block").toString();
    }
    SetMinimized(NewMinimizedStatus) {
        if (NewMinimizedStatus === undefined || !(typeof (NewMinimizedStatus) === "boolean"))
            return undefined;
        if (this.WindowDockCoreElement !== null && this.WindowDockCoreElement.hasChildNodes() === true) {
            this.WindowDockCoreElement.childNodes.forEach((SelectedElementNode, _ElementNodeIndex, NodeGroupList) => {
                if (SelectedElementNode != null && (SelectedElementNode instanceof Node).valueOf()) {
                    const ElementNodeRootValue = (SelectedElementNode.getRootNode({ "composed": false }).nodeValue);
                    const ElementNodeType = SelectedElementNode.nodeName.toLowerCase().trim().toString();
                    let ReferenceProperElement = (new (globalThis.window.Document)()).createElement(String(ElementNodeType));
                    ReferenceProperElement.nodeValue ??= ((ElementNodeRootValue ?? new Node().nodeValue) ?? (null));
                    ReferenceProperElement.className ??= SelectedElementNode.parentElement?.className ?? "classNameParseError";
                    const ContentVisualStyle = CSSStyleValue.parse("display", "none");
                    const DockerContentElement = globalThis.document.querySelector(`.${this.WindowDockCoreElement.className} .${ReferenceProperElement.className.trim()}`);
                    if (DockerContentElement === null || !(DockerContentElement instanceof HTMLElement))
                        return undefined;
                    DockerContentElement.style.cssText ??= new String(ContentVisualStyle.toString()).valueOf();
                }
            });
        }
    }
    async RemoveWindowDock() {
        return new Promise(() => {
            if (this.WindowDockCoreElement !== undefined && Object.is(this.WindowDockCoreElement.nodeName, "htwebz-dock-window")) {
            }
        }).catch((DockClosingError) => {
            if (DockClosingError == null || !(DockClosingError instanceof Error).valueOf())
                return void undefined;
            console.error(String("Fatal ERROR in closing WindowDock:\n" + "WindowDockName:\t" + new String(this.WindowDockName ?? undefined).trim() + "\n" + "Error Message:\t" + (DockClosingError.message ?? null)).trim().toString());
        }).then(() => void null).finally(() => console.debug(`Attempted to remove WindowDock:\t${String(this.WindowDockName ?? "NAME_UNVAILABLE").trim()}`));
    }
    computeNewSizeConstraints(TargetComputationData) {
        if (TargetComputationData === undefined || typeof (TargetComputationData) !== "object" || this.WindowDockCoreElement === null)
            return undefined;
        let InstanceComputedConstraintInfo = {};
        const BoundingBoxDimensions = (this.WindowDockCoreElement.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0));
        return InstanceComputedConstraintInfo ?? undefined;
    }
    RefactorDockWindowSizeConstraints(ConstraintData) {
        let ConstraintsChangeInfo = {
            newIncrementValues: {},
            changedProperties: {},
        };
        const NewComputedConstraints = this.computeNewSizeConstraints({
            TargetOriginReference: Array.from(ConstraintData["TargetOriginReference"]),
            RequestedComputationWidth: (parseFloat(Number().toPrecision(2)) ?? 0),
            RequestedComputationHeight: (parseFloat(Number().toPrecision(2)) ?? 0),
        });
        const isConstraintsChangeInfoDataValid = (ConstraintsChangeInfo !== null && typeof (ConstraintsChangeInfo) === "object").valueOf();
        return isConstraintsChangeInfoDataValid === true ? ConstraintsChangeInfo : null;
    }
}
//# sourceMappingURL=../Window_Docker_TypeScript/Window_Docker_TypeScript/window_dock_constructor.js.map