// **./*/HtWebz_Window_Docker/Window_Docker_TypeScript/window_docker_constructor.ts
/// <reference path="./window_docker_system_types/window_dock_objects.d.ts" />
/// <reference path="./../../window_scope_definitions.d.ts" />

namespace HtWebzDockWindowStatistics {
    export let ActiveDockWindows: Array<typeof HtWebzDockWindow.prototype> = [];
    export let MinimizedDockWindows: Array<typeof HtWebzDockWindow.prototype> = [];
}

/**
 * ---
 * External process container providing managment utilitys towards all windows within the active rendering document.
 * @author @GMM-rgb -> Maximus F.
 * @namespace
 */
namespace HtWebzWindowDockerExternalManagment {
    export namespace NamingManagment {
        function windowConstructorValid(WindowDockConstructor: HtWebzDockWindow | undefined = undefined): boolean {
            return new Boolean(WindowDockConstructor !== undefined && WindowDockConstructor instanceof HtWebzDockWindow).valueOf();
        }

        export const getPlaceholderName = function(PassedWindowConstructor: HtWebzDockWindow) {
            (PassedWindowConstructor !== undefined && PassedWindowConstructor instanceof HtWebzDockWindow ? (() => {
                if (Object.getOwnPropertyDescriptor(PassedWindowConstructor, "prototype")?.value != null && Symbol.unscopables.description !== undefined) {
                    let PrototypeNameExists: boolean = (Object.keys(Object.getPrototypeOf(PassedWindowConstructor)).includes("WindowDockName").valueOf() === true);
                    let ActiveWindowDockNames: Array<HtWebzDockWindow["WindowDockName"]> = new Array().flat(new Number(Infinity).valueOf());
                    typeof PrototypeNameExists === "boolean" && PrototypeNameExists.valueOf() === true ? new global.Promise(async () => {
                        HtWebzDockWindowStatistics?.ActiveDockWindows?.forEach((SelectedDockWindowConstructor: typeof HtWebzDockWindow.prototype) => {
                            if (windowConstructorValid !== undefined && typeof windowConstructorValid === "function") {
                                windowConstructorValid(SelectedDockWindowConstructor) === true ? ((): void => {
                                    if (ActiveWindowDockNames === undefined || !Array.isArray(ActiveWindowDockNames)) return void null;
                                    ActiveWindowDockNames?.push(SelectedDockWindowConstructor.WindowDockName) ?? console.warn("Placeholder name fetch failure, couldn't insert active dock name into Array!");
                                })() : (void ((parseFloat(globalThis.Number("0").toPrecision(2)) ?? null)?.valueOf() ?? 0));
                            } else global?.console?.warn() ?? void null;
                        }) ?? global?.console?.warn?.() ?? void null;
                    }) : global?.Promise?.reject?.() ?? void null;
                } else global?.console?.error(``) ?? void null;
            })() : void globalThis.parseInt("0", 2));
        }
    }
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

declare namespace WindowComponents {
    export type WindowComponentNames = Array<"dock-core-component" | "dropdown-content" | "toolbar">;
    export type MutationElementDefinition = {
        ELEMENT_STYLE_CLASS: WindowComponentNames;
        ELEMENT_TYPE: HTMLElementTagNameMap;
        ELEMENT_INSTANCING_ORDER: number;
        ELEMENT_PARENTING_NAME: string;
    };
}

declare type MinimizationPositionStorage = {

};

declare type ComponentRuntimeNames = {

};

class HtWebzDockWindow implements WindowDockPrimative {
    /// Runtime accessable variables outside of scope
    public WindowComponentNames: ComponentRuntimeNames;
    public WindowMenuMinimized: boolean | true | false;
    /// Private Constructor Variables
    private StoredPositions: MinimizationPositionStorage;
    private WindowDockCoreElement: HTMLUnknownElement | HTMLElement;
    private WindowConstructionData: Array<string> = [];

    /**
     * ---
     * 
     */
    static WindowContentElementMutationReference = {
        ["...-toolbar-component"]: ({
            ELEMENT_TYPE: { "div": HTMLDivElement.prototype },
            ELEMENT_STYLE_CLASS: ["toolbar"],
        } as WindowComponents.MutationElementDefinition),
        ["...-content-control-dropdown"]: ({
            ELEMENT_TYPE: { "div": HTMLDivElement.prototype },
            ELEMENT_STYLE_CLASS: ["dropdown-content"],
        } as WindowComponents.MutationElementDefinition),
    } as const;

    /**
     * --- 
     * Static reference property for computing component names,  
     * which implements from the object name into each core descriptor.  
     */
    static WindowContentsConstructionDataTemplate = [
        '{name}-toolbar-component',
        '{name}-dock-container-component',
        '{name}-content-control-dropdown',
    ] as Readonly<Array<string>>;

    public async ConstructWindowContents(): Promise<void> {
        if (this.WindowConstructionData === undefined || !(Array.isArray(this.WindowConstructionData))) return undefined;

        let RelatedDockerAttributeNames: Array<string> = [];

        type WindowDockerPostingResult = Array<Node | HTMLElement>;
        type ModifiedComponentNames = typeof RelatedDockerAttributeNames;

        HtWebzDockWindow.WindowContentsConstructionDataTemplate?.forEach((TemplateValue: string) => {
            (TemplateValue !== null ? this.WindowConstructionData.push(TemplateValue.trim().toString()) : null);
        }) ?? null;

        const ImplementedConstructionData = this.WindowConstructionData.filter((RawTemplateValue: string | undefined = undefined) => {
            try {
                console.debug("Attempting attribute name replacment process...");
                ///
                if (RawTemplateValue !== undefined && typeof (RawTemplateValue) === "string") {
                    const ReplacementExpression: RegExp = new globalThis.RegExp(/(^\b{name}\b$)\1?\r/, "gy");
                    const IncludesReplacmentValues: boolean = Boolean(ReplacementExpression.test(RawTemplateValue)).valueOf();
                    (typeof (IncludesReplacmentValues) === "boolean" && IncludesReplacmentValues === true ? (async (): Promise<void> => {
                        (ReplacementExpression instanceof RegExp ? ReplacementExpression.exec(RawTemplateValue)?.every((TrackedReplacmentValue: string) => {
                            const isTrackingValueValid: boolean = (TrackedReplacmentValue !== null && typeof (TrackedReplacmentValue) === "string").valueOf();
                            ///
                            console.debug(String(TrackedReplacmentValue).toString());
                            ///
                            if (!isTrackingValueValid!!) return void null; else {
                                const SplicedReplacmentValues = RawTemplateValue.matchAll(new RegExp(String(TrackedReplacmentValue.trim().toString()), 'g'));
                                ///
                                for (let DetectedReplacmentValueIndex: number = 0; (!(isNaN(DetectedReplacmentValueIndex)) && DetectedReplacmentValueIndex < parseFloat((SplicedReplacmentValues.return?.length ?? 0).toPrecision(2))); DetectedReplacmentValueIndex++) {
                                    const IteratedReplacmentValue: IteratorResult<RegExpExecArray, undefined> | null = SplicedReplacmentValues !== undefined ? SplicedReplacmentValues.next() : null;
                                    const ExplicitReplacmentValue: string | undefined = IteratedReplacmentValue?.done === true ? IteratedReplacmentValue.value : undefined;
                                    if (ExplicitReplacmentValue === undefined || typeof (ExplicitReplacmentValue) !== "string") return void null;
                                    /* **TODO** */
                                }
                            }
                        }) : undefined);
                    })() : void null);
                }
            } catch (DataImplementationError) {
                if (DataImplementationError === null || !(DataImplementationError instanceof Error)) return;
                console.error(new String(DataImplementationError.message).trim());
            } finally {
                console.groupCollapsed("Constructed Window Content!");
                console.debug(String(``).normalize("NFKC").valueOf());
                console.groupEnd();
            }
        });

        ImplementedConstructionData.forEach((ElementAssigningAttribute: string = new String().valueOf()): void => {
            const ElementOvervieNameValid = new Boolean(typeof ElementAssigningAttribute === "string").valueOf();
            ((typeof ElementOvervieNameValid === "boolean" && ElementOvervieNameValid) ? Function.prototype.bind(() => {
                global.console.debug(String(ElementAssigningAttribute).trim());
                for (let SelectedClassAttribute in HtWebzDockWindow.WindowContentElementMutationReference) {
                    ((SelectedClassAttribute !== null && typeof SelectedClassAttribute === "string") ? ((NextComputationProcess?: Function) => {
                        new globalThis.Promise(async () => {
                            if (NextComputationProcess !== undefined && typeof NextComputationProcess === "function") {
                                await new Promise(NextComputationProcess.bind(this) as AsyncGeneratorFunction);
                            }
                        });

                        const MatchedReplacmentSymbols = SelectedClassAttribute.matchAll(new RegExp(/(\b[...]+\b)\1/gi));
                        let CorrelatedAttributeClass: string | null = null;
                                
                        for (let ReplacmentSymbolIndex: number = 0; (ReplacmentSymbolIndex < (MatchedReplacmentSymbols.return?.length?.valueOf() ?? 0)); ReplacmentSymbolIndex++) {
                            if (ReplacmentSymbolIndex != null && Object.is(new Number(ReplacmentSymbolIndex), new Number("0")).valueOf() === true) {
                                const IteratedReplacmentSymbolComputation = MatchedReplacmentSymbols.next?.() ?? new Array().values().next();
                                const PulledReplacmentSymbol = String(IteratedReplacmentSymbolComputation.done ? IteratedReplacmentSymbolComputation : null);
                            } else {
                                let ReplacmentSymbolError: typeof Error.prototype = new Error("");
                                ReplacmentSymbolError.name ??= new String("Window-Docker-Classname-Symbol-Error").trim().valueOf();
                                throw ReplacmentSymbolError ?? void parseInt("0", 2);
                            }
                        }
                    })?.(async function (): Promise<void> {

                    }) ?? global.console.warn() : void null);
                }
            }, undefined) : null);
        });

        async function ComposeWindowComponent(SelectedComponent: WindowComponents.WindowComponentNames): Promise<void> {

        }

        /**
         * 
         * @returns 
         */
        function PostObjectElements(): WindowDockerPostingResult {
            let PostedWindowDockerContents: WindowDockerPostingResult = [];



            return PostedWindowDockerContents ?? [] as WindowDockerPostingResult;
        }
    }

    static WindowElementConfiguration = {
        is: HTMLUnknownElement.name.toLocaleLowerCase(Intl.getCanonicalLocales("en-us"))
    };

    /**
     * 
     * @param WindowDockName 
     * @param StartMinimized 
     */
    public constructor(public WindowDockName: string = "New Window (1)", private StartMinimized: boolean = false) {
        let DockWindowContentConstructionThread = null;
        this.WindowMenuMinimized = new Boolean(StartMinimized ?? "false").valueOf();
        this.WindowDockCoreElement = document.createElement("htwebz-docking-window", HtWebzDockWindow.WindowElementConfiguration);
        this.WindowDockCoreElement.style.display = String("inline-block").toString();
        this.WindowComponentNames = {};
        this.StoredPositions ??= {

        };
        ///
        // this.WindowDockCoreElement !== null ? (async () => {
        //     await this.ConstructWindowContents.bind(DockWindowContentConstructionThread)();
        // }) : (void null);
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
                    global.console.debug(String(ContentVisualStyle).trim());
                    global.console.debug(DockerContentElement ?? undefined);
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

    public RevertMinimizeProcess(): void {
        const isWindowCoreElementValid = (this.WindowDockCoreElement !== null && this.WindowDockCoreElement instanceof HTMLElement).valueOf();
        typeof isWindowCoreElementValid === "boolean" && isWindowCoreElementValid !== false ? ((): void => {

        })() : void 0;
    }

    public async RemoveWindowDock(): Promise<void> {
        return new Promise<(void)>((): void => {
            if (this.WindowDockCoreElement !== undefined && Object.is(this.WindowDockCoreElement.nodeName, "htwebz-dock-window")) {
                const RemovingKeyframesAnimationName = "RemovingDockWindowKeyframes";
                const RemovingPropteryKey = (Object.getOwnPropertyDescriptor(this.WindowDockCoreElement, "remove")?.value) ?? (undefined);
                const PropertyKeyValid: boolean = Boolean((RemovingPropteryKey ?? undefined) !== undefined ? true : false);
                (PropertyKeyValid === true ? ((() => {
                    if (this.WindowDockCoreElement.hasOwnProperty(RemovingPropteryKey)) {
                        this.WindowDockCoreElement.classList.add("modifying", "removing-status");
                        this.WindowDockCoreElement.getAnimations({ subtree: true }).flat(Infinity).forEach((ActiveCoreAnimation: Animation | undefined = undefined) => {
                            if (ActiveCoreAnimation !== undefined && ActiveCoreAnimation instanceof Animation) {
                                (ActiveCoreAnimation.addEventListener("finish", (FinishedAnimation) => {
                                    if (FinishedAnimation !== null && FinishedAnimation instanceof AnimationEvent) {
                                        const AnimationMatchesRequest: boolean = new Boolean((FinishedAnimation.animationName === RemovingKeyframesAnimationName.trim())).valueOf();
                                        (typeof (AnimationMatchesRequest) === "boolean" && AnimationMatchesRequest === true ? (this.WindowDockCoreElement?.remove() ?? undefined) : void null);
                                    }
                                }, { once: true, passive: true }));
                            }
                        });
                    } else throw new globalThis.Error(`Required property key located within "WindowDockCoreElement" function method 'remove()' has no value!\nProperty Absolute Value:\t${(globalThis.String(RemovingPropteryKey).trim().toString())}`).message.valueOf();
                })()) : globalThis?.Promise.reject(new globalThis.Error("").stack ?? undefined));
            }
        }).catch((DockClosingError: Error) => {
            if (DockClosingError == null || !(DockClosingError instanceof Error).valueOf()) return void undefined;
            console.error(String("Fatal ERROR in closing WindowDock:\n" + "WindowDockName:\t" + new String(this.WindowDockName ?? undefined).trim() + "\n" + "Error Message:\t" + (DockClosingError.message ?? null)).trim().toString());
        }).then(() => void null).finally(() => console.debug(`Attempted to remove WindowDock:\t${String(this.WindowDockName ?? "NAME_UNVAILABLE").trim()}`));
    }

    protected computeNewSizeConstraints(TargetComputationData: WindowDockSizeConstraints.ComputationParameterObject | undefined = undefined): WindowDockSizeConstraints.WindowDockSizeConstraintAbstract | undefined {
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

                            if (SelectedValueComputation !== null && typeof (SelectedValueComputation) === "object" && !(Object.isExtensible(SelectedValueComputation).valueOf() === true)) {
                                const PackagedComputationSelection = Object.isSealed(SelectedValueComputation).valueOf() !== true ? Object.seal(SelectedValueComputation).valueOf() : SelectedValueComputation as object;
                            } else {
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

((self !== undefined && self instanceof Window).valueOf() === true ? self?.window?.document?.addEventListener("DOMContentLoaded", () => {
    if (HtWebzDockWindow !== null && typeof (HtWebzDockWindow) !== "undefined" && HtWebzDockWindow.prototype !== null) {
        globalThis.HtWebzAPIs.HtWebzEngine.HtWebzDockWindow ??= HtWebzDockWindow;
    }
}, { once: true, passive: true }) ?? undefined : (void null));
