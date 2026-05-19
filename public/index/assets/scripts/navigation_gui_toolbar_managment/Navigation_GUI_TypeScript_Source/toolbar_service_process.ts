import {
    NavigationToolbarCoreController,
} from "./navigation_toolbar_core";

namespace ToolbarUpdatingGui {
    export function RefreshToolbarGui(): void {
        const FetchedToolbarRoot =
        NavigationToolbarCoreController.FindRootNavigation();
        const NavigationToolbar =
        FetchedToolbarRoot?.querySelector("#topUserInterfaceBar");
        if (!NavigationToolbarCoreController) { return undefined; }
        if (!NavigationToolbarCoreController.CoreControllerBooted) {
            NavigationToolbarCoreController.BootNavigationController() || null;
        } else console.debug("Toolbar Navigation Controller ALREADY BOOTED!");

        for (let ToolbarRootRefreshScan = 0; (ToolbarRootRefreshScan < (NavigationToolbar?.childElementCount ?? 0)); ToolbarRootRefreshScan++) {

        }
    }
}

namespace ToolbarPreferenceHandler {

}

export {
    ToolbarUpdatingGui,
    ToolbarPreferenceHandler,
};
