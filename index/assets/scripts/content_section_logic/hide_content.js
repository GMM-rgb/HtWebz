const HideContentSectionButtons = document.querySelectorAll(".hide-content-section-button");
const VisibilityToggleDataLocalStorage = localStorage.getItem("VisibilityToggleData") || null;
const HideButtonAmmount = HideContentSectionButtons.length;

/**
 * @type {JSON | Object ?}
 */
let VisibilityToggleDataParsed = JSON.parse(VisibilityToggleDataLocalStorage);
let VisibilityToggleData = VisibilityToggleDataParsed || {};

function logVisibilityData() {
    console.log("Content Visibility Data:");
    if (VisibilityToggleData) {
        for (const key in VisibilityToggleData) {
            console.log(`${key}: ${VisibilityToggleData[key]}`);
        }
    } else {
        console.warn("WARNING: Could not fetch data");
    }
}

// Tooltip setup
HideContentSectionButtons.forEach((btn) => {
    if (!(btn instanceof HTMLElement)) return console.warn("WARNING: Invalid Hide Content Section Button detected:", btn);
    try {
        const BtnClassName = btn.className.replace(" ", ".");
        const BtnClassNamedFormated = "." + BtnClassName;
        btn.setAttribute("onmouseenter", `setupTooltip('${BtnClassNamedFormated}', 'Toggle Content Section Visibility');`);
    } catch (FormatError) {
        reportError?.(FormatError);
        throw new Error(FormatError);
    }
});

window.addEventListener("DOMContentLoaded", (e) => {
    if (HideContentSectionButtons instanceof Object) {
        HideContentSectionButtons.forEach((ContentHideBtn) => {
            if (!(ContentHideBtn instanceof HTMLElement)) return;

            let BtnSecondaryClass = ContentHideBtn.classList.item(1);
            if (!BtnSecondaryClass) return;

            // Base class for section
            const TargetSectionClass = BtnSecondaryClass.replace("-content", "").replace("-section", "");
            const TargetSection = document.querySelectorAll(`.inner-frame-container.${TargetSectionClass}`);

            // --- Restore saved state ---
            if (VisibilityToggleData[TargetSectionClass] === "hidden") {
                TargetSection.forEach((section) => section.classList.add("hidden-content-section"));
                ContentHideBtn.innerHTML = "&plus;";
                ContentHideBtn.classList.add("collapsed");
            } else if (VisibilityToggleData[TargetSectionClass] === "visible") {
                TargetSection.forEach((section) => section.classList.remove("hidden-content-section"));
                ContentHideBtn.innerHTML = "&ndash;";
                ContentHideBtn.classList.remove("collapsed");
            }

            // --- Toggle + Save state ---
            ContentHideBtn.addEventListener("click", () => {
                if (TargetSection.length === 0) {
                    return console.warn(`WARNING: Target section not found for class: ${TargetSectionClass}`);
                }

                TargetSection.forEach((section) => {
                    if (section.classList.contains("hidden-content-section")) {
                        section.classList.remove("hidden-content-section");
                        ContentHideBtn.innerHTML = "&ndash;";
                        ContentHideBtn.classList.remove("collapsed");
                        window.notify?.(`Showing ${TargetSectionClass} section.`) ?? console.log(`Showing ${TargetSectionClass} section.`); // If notify is callable use it, else log to console

                        // Save state
                        VisibilityToggleData[TargetSectionClass] = "visible";
                    } else {
                        section.classList.add("hidden-content-section");
                        ContentHideBtn.innerHTML = "&plus;";
                        ContentHideBtn.classList.add("collapsed");
                        window.notify?.(`Hiding ${TargetSectionClass} section.`) ?? console.log(`Hiding ${TargetSectionClass} section.`); // If notify is callable use it, else log to console

                        // Save state
                        VisibilityToggleData[TargetSectionClass] = "hidden";
                    }
                });

                // Persist to localStorage
                localStorage.setItem("VisibilityToggleData", JSON.stringify(VisibilityToggleData));
            });
        });
    } else {
        console.error(Error);
    }
    e.stopPropagation();
});

window.addEventListener("DOMContentLoaded", logVisibilityData);
