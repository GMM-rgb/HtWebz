const HideContentSectionButtons = document.querySelectorAll(".hide-content-section-button");
const VisibilityToggleDataLocalStorage = localStorage.getItem("VisibilityToggleData") || null;

let VisibilityToggleDataParsed = JSON.parse(VisibilityToggleDataLocalStorage);
let VisibilityToggleData = VisibilityToggleDataParsed || {};

const HideButtonAmmount = HideContentSectionButtons.length;

let tooltip_append_complete = HideContentSectionButtons.forEach((btn) => {
    if (typeof btn !== "object" || !(btn instanceof HTMLElement)) return console.warn("WARNING: Invalid Hide Content Section Button detected:", btn);
    let BtnClassNamedFormated = null;
    try {
        const BtnClassName = btn.className.replace(" ", ".");
        BtnClassNamedFormated = BtnClassName.replace("", ".").charAt(0) + `${BtnClassName}`;
    } catch (FormatError) {
        if (FormatError) reportError(FormatError);
        throw new Error(FormatError);
    } finally {
        if (BtnClassNamedFormated) {
            btn.setAttribute("onmouseenter", `setupTooltip('${BtnClassNamedFormated}', 'Toggle Content Section Visibility');`);
        } else {
            return false;
        }
    }
});

window.addEventListener("DOMContentLoaded", (e) => {
    if ((HideContentSectionButtons instanceof Object)) {
        // Initialize sections based on saved visibility states and interactiveness of buttons
        HideContentSectionButtons.forEach((ContentHideBtn) => {
            if (typeof ContentHideBtn === "object" && (ContentHideBtn instanceof HTMLElement)) {
                let BtnSecondaryClass = ContentHideBtn.classList.item(1);
                if (!BtnSecondaryClass) return;

                ContentHideBtn.addEventListener("click", () => {
                    // Strip both `-content and -section` to get base class name format 
                    const TargetSectionClass = BtnSecondaryClass.replace("-content", "").replace("-section", "");
                    const TargetSection = document.querySelectorAll(`.inner-frame-container.${TargetSectionClass}`);

                    if (TargetSection.length === 0) {
                        return console.warn(`WARNING: Target section not found for class: ${TargetSectionClass}`);
                    } else {
                        console.log(`Toggling visibility for section: ${TargetSectionClass}`);
                    }

                    TargetSection.forEach((section) => {
                        if (section.classList.contains("hidden-content-section")) {
                            section.classList.remove("hidden-content-section");
                            ContentHideBtn.innerHTML = "&ndash;";
                            ContentHideBtn.classList.remove("collapsed");
                            window.notify(`Showing ${TargetSectionClass} section.`);
                        } else {
                            section.classList.add("hidden-content-section");
                            ContentHideBtn.innerHTML = "&plus;";
                            ContentHideBtn.classList.add("collapsed");
                            window.notify(`Hiding ${TargetSectionClass} section.`);
                        }
                    });
                });
            }
        });
    } else {
        console.error(Error);
    }
    e.stopPropagation();
});
