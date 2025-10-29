const HideContentSectionButtons = document.querySelectorAll(".hide-content-section-button");

window.addEventListener("DOMContentLoaded", (e) => {
    HideContentSectionButtons.forEach((ContentHideBtn) => {
        if (typeof ContentHideBtn === "object" && ContentHideBtn instanceof HTMLElement) {
            let BtnSecondaryClass = ContentHideBtn.classList.item(1);
            if (!BtnSecondaryClass) return;

            ContentHideBtn.addEventListener("click", () => {
                // Strip both -content and -section to get base class name format
                const TargetSectionClass = BtnSecondaryClass.replace("-content", "").replace("-section", "");
                const TargetSection = document.querySelectorAll(`.inner-frame-container.${TargetSectionClass}`);
                
                if (TargetSection.length === 0) {
                    return console.warn(`WARNING: Target section not found for class: ${TargetSectionClass}`);
                }
                
                console.log(`Toggling visibility for section: ${TargetSectionClass}`);
                
                TargetSection.forEach((section) => {
                    if (section.style.display === "none") {
                        section.classList.remove("hidden-content-section");
                        section.style.display = "flex";
                        ContentHideBtn.innerHTML = "&ndash;";
                        ContentHideBtn.classList.remove("collapsed");
                    } else {
                        section.classList.add("hidden-content-section");
                        section.style.display = "none";
                        ContentHideBtn.innerHTML = "+";
                        ContentHideBtn.classList.add("collapsed");
                    }
                });
            });
        }
    });
    e.stopPropagation();
});
