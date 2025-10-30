const GrabContentSectionBtns = document.querySelectorAll(".grab-move-button");
const ContentSectionIndexLocalstorageData = localStorage.getItem("ContentSectionIndexs");

let ContentSectionIndexData = JSON.parse(ContentSectionIndexLocalstorageData) || {} ? ContentSectionIndexLocalstorageData : {};

function loadSavedIndexChanges(data) {
    if (!data) return;

    
}

// function saveContentSectionIndexChanges(newData) {

// }

GrabContentSectionBtns.forEach((GrabBtn) => {
    if ((GrabBtn instanceof HTMLButtonElement)) {
        const ParentBtn_ContentSection = GrabBtn.parentElement.parentElement.parentElement;

        

        if (ParentBtn_ContentSection) GrabBtn.addEventListener("mousedown", (e) => {
            e.stopPropagation?.() ?? console.warn(this.Error);
        }).catch((error) => {
            console.error(`ERROR: Failed to listen for mousedown on grab button: ${GrabBtn.className.replace(" ", ".")}`, error);
        });
    }
});

if (ContentSectionIndexData) window.addEventListener("DOMContentLoaded", loadSavedIndexChanges(ContentSectionIndexData));
