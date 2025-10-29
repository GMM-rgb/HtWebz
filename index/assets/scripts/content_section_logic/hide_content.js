const HideContentSectionButtons = document.querySelectorAll(".hide-content-section-button");

HideContentSectionButtons.forEach((ContentHideBtn) => {
    if (typeof ContentHideBtn === Element) {
        let BtnSecondaryClass = ContentHideBtn.classList.item(1);
        if (!BtnSecondaryClass) return;

        
    } else {
        return;
    }
});
