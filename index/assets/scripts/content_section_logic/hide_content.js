const HideContentSectionButtons = document.querySelectorAll(".hide-content-section-button");
const VisibilityToggleDataLocalStorage = localStorage.getItem("VisibilityToggleData");
let VisibilityToggleDataParsed = JSON.parse(VisibilityToggleDataLocalStorage);

let VisibilityToggleData = VisibilityToggleDataParsed || {};

HideContentSectionButtons.forEach((btn) => {
    if (typeof btn !== "object" || !(btn instanceof HTMLElement)) {
        return console.warn("WARNING: Invalid Hide Content Section Button detected:", btn);
    }
    btn.setAttribute("onmouseenter", "setTooltipText(this, 'Toggle Content Section Visibility');");
});

window.addEventListener("DOMContentLoaded", (e) => {
    // Initialize sections based on saved visibility states and interactiveness of buttons
    HideContentSectionButtons.forEach((ContentHideBtn) => {
        if (typeof ContentHideBtn === "object" && ContentHideBtn instanceof HTMLElement) {
            let BtnSecondaryClass = ContentHideBtn.classList.item(1);
            if (!BtnSecondaryClass) return;

            ContentHideBtn.addEventListener("click", () => {
                // Strip both `-content and -section` to get base class name format
                const TargetSectionClass = BtnSecondaryClass.replace("-content", "").replace("-section", "");
                const TargetSection = document.querySelectorAll(`.inner-frame-container.${TargetSectionClass}`);

                if (TargetSection.length === 0) {
                    return console.warn(`WARNING: Target section not found for class: ${TargetSectionClass}`);
                }

                console.log(`Toggling visibility for section: ${TargetSectionClass}`);

                TargetSection.forEach((section) => {
                    if (section.classList.contains("hidden-content-section")) {
                        section.classList.remove("hidden-content-section");
                        ContentHideBtn.innerHTML = "&ndash;";
                        ContentHideBtn.classList.remove("collapsed");
                    } else {
                        section.classList.add("hidden-content-section");
                        ContentHideBtn.innerHTML = "+";
                        ContentHideBtn.classList.add("collapsed");
                    }
                });
            });
        }
    });
    e.stopPropagation();
});
