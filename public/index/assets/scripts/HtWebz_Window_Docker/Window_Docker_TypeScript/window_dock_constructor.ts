/// <reference path="window_docker_system_types/window_dock_objects.d.ts" />
///
namespace HtWebzDockWindowStatistics {
    export let ActiveDockWindows: Array<typeof HtWebzDockWindow.prototype> = [];
    export let MinimizedDockWindows: Array<typeof HtWebzDockWindow.prototype> = [];
}

declare namespace WindowDockSizeConstraints {
    export type WindowDockSizeConstraintAbstract = {
        WIDTH_CONSTRAINT: typeof DOMRect.prototype.width;
        HEIGHT_CONSTRAINT: typeof DOMRect.prototype.height;
    };

    export type WindowDockSizeConstraintsChange = {
        changes: {
            height?: boolean;
            width?: boolean;
        };
        changeIncrements: {
            heightDifference?: number;
            widthDifference?: number;
        };
    };

    export type TransformConstraintOrigins = ("LEFT" | "TOP" | "RIGHT" | "BOTTOM")[];
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
        if (NewMinimizedStatus === undefined || !(typeof (NewMinimizedStatus) === "boolean")) return undefined;
        if (this.WindowDockShadowElement !== null && this.WindowDockShadowElement.hasChildNodes() === true) {
            this.WindowDockShadowElement.childNodes.forEach((SelectedElementNode, _ElementNodeIndex, NodeGroupList): void => {
                if (SelectedElementNode != null && (SelectedElementNode instanceof Node).valueOf()) {
                    const ElementNodeRootValue: typeof Node.prototype.nodeValue = (SelectedElementNode.getRootNode({ "composed": false }).nodeValue);
                    const ElementNodeType: typeof Node.prototype.nodeName = SelectedElementNode.nodeName.toLowerCase().trim().toString();
                    let ReferenceProperElement = new globalThis.window.Document().createElement(String(ElementNodeType));
                    ReferenceProperElement.nodeValue ??= ((ElementNodeRootValue ?? new Node().nodeValue) ?? (null));
                    ReferenceProperElement.className ??= SelectedElementNode.parentElement?.className ?? "classNameParseError";
                    const ContentVisualStyle: CSSStyleValue = CSSStyleValue.parse("display", "none") as typeof CSSStyleValue.prototype;
                    const DockerContentElement: HTMLElement | null = globalThis.document.querySelector(`.${this.WindowDockShadowElement.className} .${ReferenceProperElement.className.trim()}`);
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

    public async removeWindowDock(): Promise<void> {
        return new Promise<(void)>((): void => {
            if (this.WindowDockShadowElement !== undefined && Object.is(this.WindowDockShadowElement.nodeName, "htwebz-dock-window")) {

            }
        }).catch((DockClosingError: Error) => {
            if (DockClosingError == null || !(DockClosingError instanceof Error).valueOf()) return void undefined;
            console.error(String("Crticial ERROR in closing WindowDock:\n" + "WindowDockName:\t" + new String(this.WindowDockName ?? undefined).trim() + "\n" + "Error Message:\t" + (DockClosingError.message ?? null)).trim().toString());
        }).then(() => void null).finally(() => console.debug(`Attempted to remove WindowDock:\t${String(this.WindowDockName ?? "NAME_UNVAILABLE").trim()}`));
    }

    private computeNewSizeConstraints(): undefined {

    }

    public updateDockWindowSizeConstraints(targetWidth: number, targetHeight: number, transformFromOrigin: WindowDockSizeConstraints.TransformConstraintOrigins = ["LEFT", "TOP"]): WindowDockSizeConstraints.WindowDockSizeConstraintsChange {
        let ConstraintsChangeInfo: WindowDockSizeConstraints.WindowDockSizeConstraintsChange = {
            changeIncrements: {},
            changes: {},
        }; 

        return ConstraintsChangeInfo;
    }
}
