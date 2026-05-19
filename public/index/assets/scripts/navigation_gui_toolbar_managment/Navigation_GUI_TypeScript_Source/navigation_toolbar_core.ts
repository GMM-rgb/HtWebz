/// <reference path="../../window_scope_definitions.d.ts" />

import type { CoreConfigurations } from "./controller_configurations.d.ts";
import { ToolbarUpdatingGui, ToolbarPreferenceHandler } from "./toolbar_service_process.js";

// const NavigationToolbarGuiServices = new ServiceWorkerContainer();
// const AbortFailureServiceWorkerGUI = new AbortSignal();
// const EventReasonServiceWorkerGUI = new Event("ToolbarGuiErrorEvent", {
//     composed: true,
// });

// if (AbortFailureServiceWorkerGUI != null && EventReasonServiceWorkerGUI != null) {
//     NavigationToolbarGuiServices.dispatchEvent(EventReasonServiceWorkerGUI);
//     // AbortFailureServiceWorkerGUI.onabort(EventReasonServiceWorkerGUI);
// }

// ((new AsyncDisposableStack())?.adopt((async function() {
//     globalThis.console.debug();
// })(), async (): Promise<void> => {
//     const CurrentComponentServices = await NavigationToolbarGuiServices.getRegistrations();

//     for await (let ComponentService of CurrentComponentServices) {
//         const ComponentServiceHasValue = ((ComponentService !== undefined && ComponentService !== null).valueOf());
//         const ComponentServiceValid = (ComponentServiceHasValue ? ((ComponentService instanceof ServiceWorkerRegistration).valueOf()) : false).valueOf();
//         ComponentServiceHasValue && ComponentServiceValid ? (() => {
//             ComponentService.addEventListener("updatefound", (ServiceUpdate) => {
//                 ServiceUpdate.stopPropagation();
//                 ComponentService.update();
//             }, { passive: true });
//         })() : null;
//     }

//     await NavigationToolbarGuiServices.register(new URL("toolbar_service_process.js", "./"), {
//         updateViaCache: "imports",
//         type: "classic",
//     }).then((RegisteredService: ServiceWorkerRegistration) => {
//         if (RegisteredService !== null && RegisteredService instanceof ServiceWorkerRegistration && (RegisteredService.active?.state ?? 'redundant') === 'activated') {
            
//         } else {
//             const NavigationToolbarServiceError = new Error(`Registered navigator GUI controller was invalid and failed.`);
//             globalThis.console.error(NavigationToolbarServiceError.message);
//         }
//     });
// }) ?? (void null));

export namespace NavigationToolbarCoreController {
    export let CoreControllerBooted: boolean = false;

    /**
     * 
     */
    export class ToolbarController {
        public ActiveConfigurations: CoreConfigurations.DynamicSetupValues | undefined;

        static DefaultSettings: CoreConfigurations.DynamicSetupValues = {
            ActivatedToolbarElements: {
                ApplicationsButton: true,
            },
        };

        public constructor(private NavigationToolbarConfigs: CoreConfigurations.DynamicSetupValues = ToolbarController.DefaultSettings) {
            this.ActiveConfigurations = undefined;
        }

        private CommitQueryingConfigurations(): void {
            if (this.NavigationToolbarConfigs !== undefined && typeof this.NavigationToolbarConfigs === 'object') {
                this.ActiveConfigurations ??= this?.NavigationToolbarConfigs ?? undefined;
            }
        }
    }

    /**
     * 
     * @returns
     */
    export async function BootNavigationController<BootedNavigationController = typeof ToolbarController.prototype>(): Promise<void> {
        console.groupCollapsed("%cBOOTING%c\sNavigation Controller...", 'font-weight: bold;', 'font-weight: normal;');
        await new Promise<void>(async function(): Promise<void> {
            
        }).finally((): void => console.debug("Navigation Controller BOOTED:\t" + NavigationToolbarCoreController.CoreControllerBooted));
        console.groupEnd();
        return undefined;
    }

    /**
     * 
     * @returns 
     */
    export function FindRootNavigation(): Element | HTMLElement | null {
        const FoundRoot = globalThis.window.document.body.querySelector(".staticStickyUiFlex");
        console.assert((FoundRoot !== null && (FoundRoot instanceof Element)), "Root Navigation Element couldn't be found!");
        return (FoundRoot !== null && (FoundRoot instanceof Element && FoundRoot instanceof HTMLElement) ? FoundRoot : null);
    }
}

// NavigationToolbarCoreController.BootNavigationController();
