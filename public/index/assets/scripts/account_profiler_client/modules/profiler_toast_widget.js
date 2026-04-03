class ProfilerToast {
    /**
     * ---
     * ...
     * 
     * ---
     * @private 
     * @param {number | string} ProgressPercentage 
     * @param {HTMLUnknownElement} [ToastElementReference=undefined] 
     * @returns {(typeof DOMRect.prototype.width.valueOf())?} 
     */
    static FormatNetworkCommunicationProgress(ProgressPercentage = Number(0).valueOf(), ToastElementReference = undefined) {
        if (ProgressPercentage !== null) {
            /**
             * ---
             * 
             * 
             * ---
             * @type {number}
             */
            let SantizedProgressPercentage = new Number().valueOf();
            const SanitizePercentageRegexPattern = new RegExp(/(.{(\s|\t|\n)|px|e})\$[1]/gi) ?? null;
            // 
            if (((typeof (ProgressPercentage) === "string") && (ProgressPercentage.length >= 1))) {

            }
            // 
            if (!(Math.ceil(ProgressPercentage) < 0)) {
                if (ToastElementReference !== undefined && ToastElementReference instanceof HTMLElement) {

                }
            }
        }
    }

    /**
     * 
     * @param {string} ToastMessage 
     */
    constructor(ToastMessage) {
        /**
         * 
         * @type {HTMLDivElement}
         */
        this.ToastElement = document.createElement("div");
        // ...
        if (!this.ToastElement.hasAttribute("ProfilerToastVisual")) {
            this.ToastElement.setAttribute("id", "ProfilerToastVisual");
        }
        /**
         * 
         * @type {string}
         */
        this.ToastSpanMessage = new String().valueOf();
    }

    /**
     * ---
     * Creates a new profiler toast popup, to be attatched into the footer element.
     * 
     * ---
     * @public
     * @returns {Promise<void>}
     */
    async BuildToastElement() {
        if (this.ToastSpanMessage !== null && typeof (this.ToastSpanMessage) === "string") {
            if (this.ToastElement instanceof HTMLElement) {
                const ToastTemplateContent = document.createElement("template") ?? null;
                new Promise((ToastTemplateInstanceResolution) => {
                    if (ToastTemplateInstanceResolution && typeof (ToastTemplateInstanceResolution) === "function") {
                        console.debug("%cBuilding Profiler Toast Template; %cSTAND-BY...", 'color: lime;', 'color: orange;');
                        ToastTemplateContent.innerHTML = String(`
                            <div class="profiler-toast-content-container">
                                <span class="profiler-toast-message-text"></span>
                                <div class="toast-progress-bar"></div>
                            </div>
                        `).trim().valueOf();
                    } else {
                        console.warn();
                    }
                }).then(() => {

                }).catch((/** @type {any?} */ ToastTemplateInstanceFailure = null) => {
                    console.error(String(ToastTemplateInstanceFailure));
                });
            } else {
                console.warn("...");
            }
        } else {
            console.error("There was no message to be referenced for the profiler toast element; NULL!");
        }
    }
}

export {
    ProfilerToast,
};
