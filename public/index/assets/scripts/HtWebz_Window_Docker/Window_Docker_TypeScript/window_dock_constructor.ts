/// <reference path="window_docker_system_types/window_dock_objects.d.ts" />

namespace HtWebzDockWindowStatistics {
    export let ActiveDockWindows: Array<typeof HtWebzDockWindow.prototype> = [];
    export let MinimizedDockWindows: Array<typeof HtWebzDockWindow.prototype> = [];
}

declare namespace WindowDockSizeConstraints {
    export type WindowDockSizeConstraintAbstract = {
        ASPECT_CONSTRAINT_DIAGONAL?: ArrayIterator<typeof Number.prototype>;
        GeneralSizingConstraints?: {
            WIDTH_CONSTRAINT: typeof DOMRect.prototype.width;
            HEIGHT_CONSTRAINT: typeof DOMRect.prototype.height;
        };
    };

    export type WindowDockSizeConstraintsChange = {
        changedProperties: {
            height?: boolean;
            width?: boolean;
        };
        newIncrementValues: {
            heightDifference?: number;
            widthDifference?: number;
        };
    };

    export type ComputationParameterObject = {
        readonly ["RequestedComputationHeight"]: number;
        readonly ["RequestedComputationWidth"]: number;
        readonly ["TargetOriginReference"]: WindowDockSizeConstraints.TransformConstraintOrigins;
    };

    export type TransformConstraintOrigins = Array<("LEFT" | "TOP" | "RIGHT" | "BOTTOM")>;
}

declare type WindowDockSizeComputationQueries = ((
    WindowDockSizeConstraints.ComputationParameterObject["TargetOriginReference"] |
    WindowDockSizeConstraints.ComputationParameterObject["RequestedComputationHeight"] |
    WindowDockSizeConstraints.ComputationParameterObject["RequestedComputationWidth"]
));

class HtWebzDockWindow implements WindowDockPrimative {
    public WindowMenuMinimized: boolean;
    private WindowDockCoreElement: HTMLUnknownElement | HTMLElement;

    protected constructor(public WindowDockName: string, private StartMinimized: boolean = false) {
        this.WindowMenuMinimized = new Boolean(StartMinimized ?? "false").valueOf();
        this.WindowDockCoreElement = document.createElement("htwebz-docking-window", {
            is: HTMLUnknownElement.name.toLocaleLowerCase(Intl.getCanonicalLocales("en-us")),
        });

        this.WindowDockCoreElement.style.display = String("inline-block").toString();
    }

    public SetMinimized(NewMinimizedStatus: boolean): void {
        if (NewMinimizedStatus === undefined || !(typeof (NewMinimizedStatus) === "boolean")) return undefined;
        if (this.WindowDockCoreElement !== null && this.WindowDockCoreElement.hasChildNodes() === true) {
            this.WindowDockCoreElement.childNodes.forEach((SelectedElementNode, _ElementNodeIndex, NodeGroupList): void => {
                if (SelectedElementNode != null && (SelectedElementNode instanceof Node).valueOf()) {
                    const ElementNodeRootValue: typeof Node.prototype.nodeValue = (SelectedElementNode.getRootNode({ "composed": false }).nodeValue);
                    const ElementNodeType: typeof Node.prototype.nodeName = SelectedElementNode.nodeName.toLowerCase().trim().toString();
                    let ReferenceProperElement = (new (globalThis.window.Document)()).createElement(String(ElementNodeType));
                    ReferenceProperElement.nodeValue ??= ((ElementNodeRootValue ?? new Node().nodeValue) ?? (null));
                    ReferenceProperElement.className ??= SelectedElementNode.parentElement?.className ?? "classNameParseError";
                    const ContentVisualStyle: CSSStyleValue = CSSStyleValue.parse("display", "none") as typeof CSSStyleValue.prototype;
                    const DockerContentElement: HTMLElement | null = globalThis.document.querySelector(`.${this.WindowDockCoreElement.className} .${ReferenceProperElement.className.trim()}`);
                    if (DockerContentElement === null || !(DockerContentElement instanceof HTMLElement)) return undefined;
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

    public async RemoveWindowDock(): Promise<void> {
        return new Promise<(void)>((): void => {
            if (this.WindowDockCoreElement !== undefined && Object.is(this.WindowDockCoreElement.nodeName, "htwebz-dock-window")) {

            }
        }).catch((DockClosingError: Error) => {
            if (DockClosingError == null || !(DockClosingError instanceof Error).valueOf()) return void undefined;
            console.error(String("Fatal ERROR in closing WindowDock:\n" + "WindowDockName:\t" + new String(this.WindowDockName ?? undefined).trim() + "\n" + "Error Message:\t" + (DockClosingError.message ?? null)).trim().toString());
        }).then(() => void null).finally(() => console.debug(`Attempted to remove WindowDock:\t${String(this.WindowDockName ?? "NAME_UNVAILABLE").trim()}`));
    }

    private computeNewSizeConstraints(TargetComputationData: WindowDockSizeConstraints.ComputationParameterObject): WindowDockSizeConstraints.WindowDockSizeConstraintAbstract | undefined {
        /**
         * Computed sizing constraint info data for finalized display managment statistics.
         */
        let InstanceComputedConstraintInfo: WindowDockSizeConstraints.WindowDockSizeConstraintAbstract = {};
        const DockWindowBoundingBoxDimensions = (this?.WindowDockCoreElement?.getBoundingClientRect() ?? null);

        if (TargetComputationData === undefined || typeof (TargetComputationData) !== "object" || this.WindowDockCoreElement === null) return undefined;
        if ((DockWindowBoundingBoxDimensions === null || !(DockWindowBoundingBoxDimensions instanceof DOMRect)).valueOf() === true) return undefined;

        const ActiveConstraintHeight = Math.floor(Math.abs(DockWindowBoundingBoxDimensions.height));
        const ActiveConstraintWidth = Math.ceil(Math.abs(DockWindowBoundingBoxDimensions.width));
        const ParameterComputationRelation = Object.seal(TargetComputationData ?? null) as WindowDockSizeConstraints.ComputationParameterObject;
        const AvailableComputationEntries = Object.entries(ParameterComputationRelation);
        const ComputationValueIterator = (AvailableComputationEntries.reverse().values() ?? null);
        let IteratedComputationValue = ComputationValueIterator.next();
        let ObjectParameterCount: number = 0;

        Object.keys(ParameterComputationRelation).forEach((ParameterObjectKey, KeyIndex, _ObjectValueArray): void => {
            if (ParameterObjectKey !== void undefined && typeof (ParameterObjectKey) === "string" && KeyIndex !== null && typeof (KeyIndex) === "number") {
                ObjectParameterCount !== undefined && typeof (ObjectParameterCount) === "number" ? (ObjectParameterCount++) : null;
            }
        });

        function ScanParameterObjectValues(IteratorThread: Function, ScanningThread?: Function): void {
            if (!IteratorThread || !(IteratorThread instanceof Function)) return void null;

            let ThreadingRoots = {
                IteratorThreadRoot: null as ((typeof Function.prototype) | null),
                ScanningThreadRoot: null as ((typeof Function.prototype) | null),
            };

            (async () => {
                (async () => await (IteratorThread.bind(ThreadingRoots["IteratorThreadRoot"])).caller())();
                if (ScanningThread && (ScanningThread instanceof Function)) { (() => ScanningThread.call(ThreadingRoots["ScanningThreadRoot"], []))(); }
            })();
        }

        (ObjectParameterCount !== undefined && (typeof (ObjectParameterCount) === "number") ? (async (): Promise<void> => {
            async function NextIterate(): Promise<void> {
                IteratedComputationValue ??= ComputationValueIterator.next();
            }

            for (let ComputationEntryIndex: number = 0; Boolean(ComputationEntryIndex < parseFloat(Number(ObjectParameterCount).toPrecision(2))).valueOf() === true; ComputationEntryIndex++) {
                ScanParameterObjectValues((NextIterate as typeof Function.prototype), () => {
                    if (IteratedComputationValue !== undefined && IteratedComputationValue.done !== undefined && IteratedComputationValue.done.valueOf() === true) {
                        if ((IteratedComputationValue.value !== undefined && Array.isArray(IteratedComputationValue.value).valueOf()) === true) {
                            const QeuriedComputationEntry: WindowDockSizeComputationQueries | null = IteratedComputationValue?.value?.[0].valueOf() as WindowDockSizeComputationQueries | undefined ?? null;
                            const SelectedValueComputation = ParameterComputationRelation[
                                Object.getOwnPropertyNames(ParameterComputationRelation)
                                [((QeuriedComputationEntry ?? "TargetOriginReference") as any)]
                                .valueOf() as keyof WindowDockSizeConstraints.ComputationParameterObject
                            ].valueOf();
                            ///
                            const PackagedComputationSelection = Object.isSealed(SelectedValueComputation).valueOf() !== true ? Object.seal(SelectedValueComputation).valueOf() : SelectedValueComputation as object;
                            ///
                            if (SelectedValueComputation !== null && typeof (SelectedValueComputation) === "object" && !(Object.isExtensible(SelectedValueComputation).valueOf() === true)) {
                                SelectedValueComputation;
                            } else {
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

    public RefactorDockWindowSizeConstraints(ConstraintData: WindowDockSizeConstraints.ComputationParameterObject): WindowDockSizeConstraints.WindowDockSizeConstraintsChange | null {
        let ConstraintsChangeInfo: WindowDockSizeConstraints.WindowDockSizeConstraintsChange = {
            newIncrementValues: {},
            changedProperties: {},
        };

        const NewComputedConstraints = (async (): Promise<WindowDockSizeConstraints.WindowDockSizeConstraintAbstract> => {
            return await new Promise(async () => await this.computeNewSizeConstraints({
                TargetOriginReference: Array.from(ConstraintData["TargetOriginReference"]),
                RequestedComputationWidth: (parseFloat(Number().toPrecision(2)) ?? 0),
                RequestedComputationHeight: (parseFloat(Number().toPrecision(2)) ?? 0),
            }));
        })();

        const isConstraintsChangeInfoDataValid: boolean = (ConstraintsChangeInfo !== null && typeof (ConstraintsChangeInfo) === "object").valueOf();
        return isConstraintsChangeInfoDataValid === true ? ConstraintsChangeInfo : null;
    }
}
