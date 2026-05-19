export var NavigationToolbarCoreController;
(function (NavigationToolbarCoreController) {
    NavigationToolbarCoreController.CoreControllerBooted = false;
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
    NavigationToolbarCoreController.ToolbarController = ToolbarController;
    async function BootNavigationController() {
        console.debug("BOOTING Navigation Controller...");
    }
    NavigationToolbarCoreController.BootNavigationController = BootNavigationController;
    function FindRootNavigation() {
        const FoundRoot = globalThis.window.document.body.querySelector(".staticStickyUiFlex");
        return (FoundRoot !== null && (FoundRoot instanceof Element && FoundRoot instanceof HTMLElement) ? FoundRoot : null);
    }
    NavigationToolbarCoreController.FindRootNavigation = FindRootNavigation;
})(NavigationToolbarCoreController || (NavigationToolbarCoreController = {}));
NavigationToolbarCoreController.BootNavigationController();
//# sourceMappingURL=navigation_toolbar_core.js.map