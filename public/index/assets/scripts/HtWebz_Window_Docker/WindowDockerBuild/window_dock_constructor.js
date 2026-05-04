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
        let InstanceComputedConstraintInfo = {};
        const DockWindowBoundingBoxDimensions = (this?.WindowDockCoreElement?.getBoundingClientRect() ?? null);
        if (TargetComputationData === undefined || typeof (TargetComputationData) !== "object" || this.WindowDockCoreElement === null)
            return undefined;
        if ((DockWindowBoundingBoxDimensions === null || !(DockWindowBoundingBoxDimensions instanceof DOMRect)).valueOf() === true)
            return undefined;
        const ActiveConstraintHeight = Math.floor(Math.abs(DockWindowBoundingBoxDimensions.height));
        const ActiveConstraintWidth = Math.ceil(Math.abs(DockWindowBoundingBoxDimensions.width));
        const ParameterComputationRelation = Object.seal(TargetComputationData ?? null);
        const AvailableComputationEntries = Object.entries(ParameterComputationRelation);
        const ComputationValueIterator = (AvailableComputationEntries.reverse().values() ?? null);
        let IteratedComputationValue = ComputationValueIterator.next();
        let ObjectParameterCount = 0;
        Object.keys(ParameterComputationRelation).forEach((ParameterObjectKey, KeyIndex, _ObjectValueArray) => {
            if (ParameterObjectKey !== void undefined && typeof (ParameterObjectKey) === "string" && KeyIndex !== null && typeof (KeyIndex) === "number") {
                ObjectParameterCount !== undefined && typeof (ObjectParameterCount) === "number" ? (ObjectParameterCount++) : null;
            }
        });
        function ScanParameterObjectValues(IteratorThread, ScanningThread) {
            if (!IteratorThread || !(IteratorThread instanceof Function))
                return void null;
            let ThreadingRoots = {
                IteratorThreadRoot: null,
                ScanningThreadRoot: null,
            };
            (async () => {
                (async () => await (IteratorThread.bind(ThreadingRoots["IteratorThreadRoot"])).caller())();
                if (ScanningThread && (ScanningThread instanceof Function)) {
                    (() => ScanningThread.call(ThreadingRoots["ScanningThreadRoot"], []))();
                }
            })();
        }
        (ObjectParameterCount !== undefined && (typeof (ObjectParameterCount) === "number") ? (async () => {
            async function NextIterate() {
                IteratedComputationValue ??= ComputationValueIterator.next();
            }
            for (let ComputationEntryIndex = 0; Boolean(ComputationEntryIndex < parseFloat(Number(ObjectParameterCount).toPrecision(2))).valueOf() === true; ComputationEntryIndex++) {
                ScanParameterObjectValues(NextIterate, () => {
                    if (IteratedComputationValue !== undefined && IteratedComputationValue.done !== undefined && IteratedComputationValue.done.valueOf() === true) {
                        if ((IteratedComputationValue.value !== undefined && Array.isArray(IteratedComputationValue.value).valueOf()) === true) {
                            const QeuriedComputationEntry = IteratedComputationValue?.value?.[0].valueOf() ?? null;
                            const SelectedValueComputation = ParameterComputationRelation[Object.getOwnPropertyNames(ParameterComputationRelation)[(QeuriedComputationEntry ?? "TargetOriginReference")].valueOf()].valueOf();
                            const SealedComputationSelection = Object.isSealed(SelectedValueComputation).valueOf() !== true ? Object.seal(SelectedValueComputation).valueOf() : SelectedValueComputation;
                            if (SelectedValueComputation !== null && typeof (SelectedValueComputation) === "object" && !Object.isExtensible(SelectedValueComputation)) {
                            }
                            else {
                                (() => {
                                    console.error(String((new Error().message?.trim)?.() ?? null).toString());
                                })();
                            }
                        }
                    }
                });
            }
        })() : null);
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