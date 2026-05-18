/// <reference path="../../window_scope_definitions.d.ts" />
import type { CoreConfigurations } from "./controller_configurations.d.ts";

const NavigationToolbarGuiServices = new ServiceWorkerContainer();
const AbortFailureServiceWorkerGUI = new AbortSignal();
const EventReasonServiceWorkerGUI = new Event("ToolbarGuiErrorEvent", {
    composed: true,
});

if (AbortFailureServiceWorkerGUI != null && EventReasonServiceWorkerGUI != null) {
    NavigationToolbarGuiServices.dispatchEvent(EventReasonServiceWorkerGUI);
    // AbortFailureServiceWorkerGUI.onabort(EventReasonServiceWorkerGUI);
}

((new AsyncDisposableStack())?.adopt((async function() {
    globalThis.console.debug();
})(), async (): Promise<void> => {
    const CurrentComponentServices = await NavigationToolbarGuiServices.getRegistrations();

    for await (let ComponentService of CurrentComponentServices) {
        const ComponentServiceHasValue = ((ComponentService !== undefined && ComponentService !== null).valueOf());
        const ComponentServiceValid = (ComponentServiceHasValue ? ((ComponentService instanceof ServiceWorkerRegistration).valueOf()) : false).valueOf();
        ComponentServiceHasValue && ComponentServiceValid ? (() => {
            ComponentService.addEventListener("updatefound", (ServiceUpdate) => {
                ServiceUpdate.stopPropagation();
                ComponentService.update();
            }, { passive: true });
        })() : null;
    }

    await NavigationToolbarGuiServices.register(new URL("navigation_toolbar_process.js", "./"), {
        updateViaCache: "imports",
        type: "classic",
    }).then((RegisteredService: ServiceWorkerRegistration) => {
        if (RegisteredService !== null && RegisteredService instanceof ServiceWorkerRegistration && (RegisteredService.active?.state ?? 'redundant') === 'activated') {
            
        } else {
            const NavigationToolbarServiceError = new Error(`Registered navigator GUI controller was invalid and failed.`);
            globalThis.console.error(NavigationToolbarServiceError.message);
        }
    });
}) ?? (void null));

namespace NavigationToolbarCoreController {
    /**
     * 
     */
    class ToolbarController {
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
    export async function BootController<BootedNavigationController = typeof ToolbarController.prototype>(): Promise<void> {

    }
}
