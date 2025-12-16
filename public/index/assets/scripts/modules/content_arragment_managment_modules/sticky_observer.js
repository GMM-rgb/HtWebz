/**
 * Observes the target element; assumming it's a sticky positioned element. `position: sticky;`.
 * If the target element's going beyond the threshold of 1px from the top of the document—it will trigger the classlist pinned to be added.
 * @requires `targetElement`
 * @param {HTMLElement} targetElement 
 * @returns {void}
 */
function pinObserveStickyElement(targetElement) {
    (async function() {
        if (!targetElement) return;
        const targetElementRequest = document.querySelector((`${targetElement.id}` ? targetElement.id !== null : `${targetElement.className}`));
        self.addEventListener("scroll", () => {
            const topStickyPoint = parseInt(getComputedStyle(targetElementRequest).top, 1);
            const currentTopStatus = targetElementRequest.getBoundingClientRect().top;

            if (currentTopStatus <= topStickyPoint) {
                el.classList.add("pinned");
            } else {
                el.classList.remove("pinned");
            }
        }, { passive: false });
    });
}

const ExportedFunctions = {
    ObserveStickyElementViewport: pinObserveStickyElement
};

export { ExportedFunctions as ModuleFunctions };
