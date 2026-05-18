const NavigationToolbarGuiServices = new ServiceWorkerContainer();
const AbortFailureServiceWorkerGUI = new AbortSignal();
const EventReasonServiceWorkerGUI = new Event("ToolbarGuiErrorEvent", {
    composed: true,
});
if (AbortFailureServiceWorkerGUI != null && EventReasonServiceWorkerGUI != null) {
    NavigationToolbarGuiServices.dispatchEvent(EventReasonServiceWorkerGUI);
    NavigationToolbarGuiServices.controller.
    ;
}
((new AsyncDisposableStack())?.adopt((async function () {
    globalThis.console.debug();
})(), async () => {
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
    }).then((RegisteredService) => {
        if (RegisteredService !== null && RegisteredService instanceof ServiceWorkerRegistration && (RegisteredService.active?.state ?? 'redundant') === 'activated') {
        }
        else {
            const NavigationToolbarServiceError = new Error(`Registered navigator GUI controller was invalid and failed.`);
            globalThis.console.error(NavigationToolbarServiceError.message);
        }
    });
}) ?? (void null));
var NavigationToolbarCoreController;
(function (NavigationToolbarCoreController) {
    class ToolbarController {
        NavigationToolbarConfigs;
        ActiveConfigurations;
        static DefaultSettings = {
            ActivatedToolbarElements: {
                ApplicationsButton: true,
            },
        };
        constructor(NavigationToolbarConfigs = ToolbarController.DefaultSettings) {
            this.NavigationToolbarConfigs = NavigationToolbarConfigs;
            this.ActiveConfigurations = undefined;
        }
        CommitQueryingConfigurations() {
            if (this.NavigationToolbarConfigs !== undefined && typeof this.NavigationToolbarConfigs === 'object') {
                this.ActiveConfigurations ??= this?.NavigationToolbarConfigs ?? undefined;
            }
        }
    }
    async function BootController() {
    }
    NavigationToolbarCoreController.BootController = BootController;
})(NavigationToolbarCoreController || (NavigationToolbarCoreController = {}));
export {};
//# sourceMappingURL=navigation_toolbar_core.js.map