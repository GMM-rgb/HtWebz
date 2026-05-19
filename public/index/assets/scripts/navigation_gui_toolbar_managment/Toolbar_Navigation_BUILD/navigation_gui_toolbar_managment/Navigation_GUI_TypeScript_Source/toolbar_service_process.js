import { NavigationToolbarCoreController } from "./navigation_toolbar_core";
var ToolbarUpdatingGui;
(function (ToolbarUpdatingGui) {
    function RefreshToolbarGui() {
        const FetchedToolbarRoot = NavigationToolbarCoreController.FindRootNavigation();
        if (!NavigationToolbarCoreController) {
            return undefined;
        }
        if (!NavigationToolbarCoreController.CoreControllerBooted) {
            NavigationToolbarCoreController.BootNavigationController() || null;
        }
        else
            console.debug("Toolbar Navigation Controller ALREADY BOOTED!");
    }
    ToolbarUpdatingGui.RefreshToolbarGui = RefreshToolbarGui;
})(ToolbarUpdatingGui || (ToolbarUpdatingGui = {}));
export { ToolbarUpdatingGui, };
//# sourceMappingURL=toolbar_service_process.js.map