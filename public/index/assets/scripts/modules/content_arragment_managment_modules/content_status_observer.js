class StickyContent {
    /**
     * Observes the target element; assumming it's a sticky positioned element. `position: sticky;`.
     * If the target element's going beyond the threshold of 1px from the top of the document—it will trigger the classlist pinned to be added.
     * @type {function}
     * @param {HTMLElement} targetElement 
     * @returns {Promise<void>}
     */
    static async pinObserveStickyElement(targetElement) {
        (async function () {
            if (!targetElement) return;
            const targetElementRequest = document.querySelector((`${targetElement.id}` ? targetElement.id !== null : `${targetElement.className}`));
            self.addEventListener("scroll", () => {
                // Fetched element position points
                const topStickyPoint = parseInt(getComputedStyle(targetElementRequest).top, 1);
                const currentTopStatus = targetElementRequest.getBoundingClientRect().top;

                if (currentTopStatus <= topStickyPoint) {
                    targetElementRequest.classList.add("pinned");
                } else {
                    targetElementRequest.classList.remove("pinned");
                }
            }, { passive: true });
        });
    }
}

/**
 * Field: `Content Status Observer` module functions.
*/
const ExportedFunctions = {
    ObserveStickyElementViewport: StickyContent.pinObserveStickyElement,
};

export { ExportedFunctions as ModuleFunctions };
