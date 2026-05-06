"use strict";
// ././HtWebz_Window_Docker/Window_Docker_TypeScript/window_docker_constructor.ts
/// <reference path="./window_docker_system_types/window_dock_objects.d.ts" />
/// <reference path="./../../window_scope_definitions.d.ts" />
var HtWebzDockWindowStatistics;
(function (HtWebzDockWindowStatistics) {
    HtWebzDockWindowStatistics.ActiveDockWindows = [];
    HtWebzDockWindowStatistics.MinimizedDockWindows = [];
})(HtWebzDockWindowStatistics || (HtWebzDockWindowStatistics = {}));
class HtWebzDockWindow {
    async ConstructWindowContents() {
        if (this.WindowConstructionData === undefined || !(Array.isArray(this.WindowConstructionData)))
            return undefined;
        HtWebzDockWindow.WindowContentsConstructionDataTemplate?.forEach((TemplateValue) => {
            (TemplateValue !== null ? this.WindowConstructionData.push(TemplateValue.trim().toString()) : null);
        }) ?? null;
        const ImplementedConstructionData = this.WindowConstructionData.filter((RawTemplateValue = undefined) => {
            try {
                if (RawTemplateValue !== undefined && typeof (RawTemplateValue) === "string") {
                    const ReplacementExpression = new globalThis.RegExp(/(^\b{name}\b$)\1?\r/, "gy");
                    const IncludesReplacmentValues = Boolean(ReplacementExpression.test(RawTemplateValue)).valueOf();
                    (typeof (IncludesReplacmentValues) === "boolean" && IncludesReplacmentValues === true ? (async () => {
                        (ReplacementExpression instanceof RegExp ? ReplacementExpression.exec(RawTemplateValue)?.every((TrackedReplacmentValue) => {
                            const isTrackingValueValid = (TrackedReplacmentValue !== null && typeof (TrackedReplacmentValue) === "string").valueOf();
                            ///
                            if (!isTrackingValueValid)
                                return void null;
                            else {
                                const SplicedReplacmentValues = RawTemplateValue.matchAll(new RegExp(String(TrackedReplacmentValue.trim().toString()), 'g'));
                                ///
                                for (let DetectedReplacmentValueIndex = 0; (!(isNaN(DetectedReplacmentValueIndex)) && DetectedReplacmentValueIndex < parseFloat((SplicedReplacmentValues.return?.length ?? 0).toPrecision(2))); DetectedReplacmentValueIndex++) {
                                    const IteratedReplacmentValue = SplicedReplacmentValues !== undefined ? SplicedReplacmentValues.next() : null;
                                    const ExplicitReplacmentValue = IteratedReplacmentValue?.done === true ? IteratedReplacmentValue.value : undefined;
                                    if (ExplicitReplacmentValue === undefined || typeof (ExplicitReplacmentValue) !== "string")
                                        return void null;
                                }
                            }
                        }) : undefined);
                    })() : void null);
                }
            }
            catch (DataImplementationError) {
                if (DataImplementationError === null || !(DataImplementationError instanceof Error))
                    return;
                console.error(new String(DataImplementationError.message).trim());
            }
            finally {
                console.groupCollapsed("Constructing Window Content Debug");
                console.debug(String(``).normalize("NFKC").valueOf());
                console.groupEnd();
            }
        });
    }
    /**
     *
     * @param WindowDockName
     * @param StartMinimized
     */
    constructor(WindowDockName, StartMinimized = false) {
        this.WindowDockName = WindowDockName;
        this.StartMinimized = StartMinimized;
        this.WindowConstructionData = [];
        let DockWindowContentConstructionThread = null;
        this.WindowMenuMinimized = new Boolean(StartMinimized ?? "false").valueOf();
        this.WindowDockCoreElement = document.createElement("htwebz-docking-window", {
            is: HTMLUnknownElement.name.toLocaleLowerCase(Intl.getCanonicalLocales("en-us")),
        });
        ///
        this.WindowDockCoreElement.style.display = String("inline-block").toString();
        this.WindowDockCoreElement !== null ? (async () => {
            await this.ConstructWindowContents.bind(DockWindowContentConstructionThread)();
        }) : (void null);
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
            //for (let WindowDockShadowIndex: number = 0; (WindowDockShadowIndex.valueOf() < (this.WindowDockShadowElement.childNodes.length)).valueOf(); WindowDockShadowIndex++) {
            //    SelectedDockWindowElementChild ??= this.WindowDockShadowElement?.childNodes?.item(Number(WindowDockShadowIndex)) ?? null;
            //    if (new Boolean(((SelectedDockWindowElementChild instanceof Element).valueOf() ? "true" : "false") as string).valueOf() !== true) break;
            //    const ComputationStyleValid: boolean = Boolean(StyleSelectorMapout.has("display") === true ? "true" : "false");
            //    const ElementChildFetch = globalThis.document.querySelector("." + String(SelectedDockWindowElementChild.parentElement?.className));
            //    if ((ComputationStyleValid.valueOf() && ElementChildFetch !== null && (ElementChildFetch instanceof HTMLElement)) === true) {
            //    } else {
            //        (async () => console.error())();
            //    }
            //}
        }
    }
    async RemoveWindowDock() {
        return new Promise(() => {
            if (this.WindowDockCoreElement !== undefined && Object.is(this.WindowDockCoreElement.nodeName, "htwebz-dock-window")) {
                const RemovingKeyframesAnimationName = "RemovingDockWindowKeyframes";
                const RemovingPropteryKey = (Object.getOwnPropertyDescriptor(this.WindowDockCoreElement, "remove")?.value) ?? (undefined);
                const PropertyKeyValid = Boolean((RemovingPropteryKey ?? undefined) !== undefined ? true : false);
                (PropertyKeyValid === true ? ((() => {
                    if (this.WindowDockCoreElement.hasOwnProperty(RemovingPropteryKey)) {
                        this.WindowDockCoreElement.classList.add("modifying", "removing-status");
                        this.WindowDockCoreElement.getAnimations({ subtree: true }).flat(Infinity).forEach((ActiveCoreAnimation = undefined) => {
                            if (ActiveCoreAnimation !== undefined && ActiveCoreAnimation instanceof Animation) {
                                (ActiveCoreAnimation.addEventListener("finish", (FinishedAnimation) => {
                                    if (FinishedAnimation !== null && FinishedAnimation instanceof AnimationEvent) {
                                        const AnimationMatchesRequest = new Boolean((FinishedAnimation.animationName === RemovingKeyframesAnimationName.trim())).valueOf();
                                        (typeof (AnimationMatchesRequest) === "boolean" && AnimationMatchesRequest === true ? (this.WindowDockCoreElement?.remove() ?? undefined) : void null);
                                    }
                                }, { once: true, passive: true }));
                            }
                        });
                    }
                    else
                        throw new globalThis.Error(`Required property key located within "WindowDockCoreElement" function method 'remove()' has no value!\nProperty Absolute Value:\t${(globalThis.String(RemovingPropteryKey).trim().toString())}`).message.valueOf();
                })()) : globalThis?.Promise.reject(new globalThis.Error("").stack ?? undefined));
            }
        }).catch((DockClosingError) => {
            if (DockClosingError == null || !(DockClosingError instanceof Error).valueOf())
                return void undefined;
            console.error(String("Fatal ERROR in closing WindowDock:\n" + "WindowDockName:\t" + new String(this.WindowDockName ?? undefined).trim() + "\n" + "Error Message:\t" + (DockClosingError.message ?? null)).trim().toString());
        }).then(() => void null).finally(() => console.debug(`Attempted to remove WindowDock:\t${String(this.WindowDockName ?? "NAME_UNVAILABLE").trim()}`));
    }
    computeNewSizeConstraints(TargetComputationData = undefined) {
        /**
         * Computed sizing constraint info data for finalized display managment statistics.
         */
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
                            const SelectedValueComputation = ParameterComputationRelation[Object.getOwnPropertyNames(ParameterComputationRelation)[(QeuriedComputationEntry ?? "TargetOriginReference")]
                                .valueOf()].valueOf();
                            if (SelectedValueComputation !== null && typeof (SelectedValueComputation) === "object" && !(Object.isExtensible(SelectedValueComputation).valueOf() === true)) {
                                const PackagedComputationSelection = Object.isSealed(SelectedValueComputation).valueOf() !== true ? Object.seal(SelectedValueComputation).valueOf() : SelectedValueComputation;
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
        })() : (null));
        return InstanceComputedConstraintInfo ?? undefined;
    }
    RefactorDockWindowSizeConstraints(ConstraintData) {
        let ConstraintsChangeInfo = {
            newIncrementValues: {},
            changedProperties: {},
        };
        const NewComputedConstraints = (async () => {
            return await new Promise(async () => await this.computeNewSizeConstraints({
                TargetOriginReference: Array.from(ConstraintData["TargetOriginReference"]),
                RequestedComputationWidth: (parseFloat(Number().toPrecision(2)) ?? 0),
                RequestedComputationHeight: (parseFloat(Number().toPrecision(2)) ?? 0),
            }));
        })();
        const isConstraintsChangeInfoDataValid = (ConstraintsChangeInfo !== null && typeof (ConstraintsChangeInfo) === "object").valueOf();
        return isConstraintsChangeInfoDataValid === true ? ConstraintsChangeInfo : null;
    }
}
///
HtWebzDockWindow.WindowContentsConstructionDataTemplate = [
    "{name}-toolbar",
];
self.window.document.addEventListener("DOMContentLoaded", () => {
    Object.defineProperty(globalThis.HtWebzAPIs.HtWebzEngine, new String(HtWebzDockWindow.name).toString(), HtWebzDockWindow);
}, { once: true, passive: false });
//# sourceMappingURL=window_dock_constructor.js.map