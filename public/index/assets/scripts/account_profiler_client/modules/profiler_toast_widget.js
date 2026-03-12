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
            if (((typeof(ProgressPercentage) === "string") && (ProgressPercentage.length >= 1))) {

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
         * @type {HTMLUnknownElement?}
         */
        this.ToastElement = new HTMLElement() ?? null;
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
        if (this.ToastSpanMessage !== null && typeof(this.ToastSpanMessage) === "string") {
            if (!this.ToastElement  || !(this.ToastElement instanceof HTMLElement)) {
                const ToastTemplateContent = HTMLTemplateElement && HTMLTemplateElement instanceof Object ? new HTMLTemplateElement() : null;
                new Promise((ToastTemplateInstanceResolution) => {
                    if (ToastTemplateInstanceResolution && typeof(ToastTemplateInstanceResolution) === "function") {
                        ToastTemplateContent.innerHTML;
                    }
                }).then(() => {
                    /**
                     * 
                     * @type {HTMLUnknownElement?}
                     */
                    this.ToastElement = document.createElement("profilerToast");
                }).catch((/** @type {any?} */ ToastTemplateInstanceFailure = null) => {
                    console.error(String(ToastTemplateInstanceFailure));
                });
            }
        } else {

        }
    }
}

export {
    ProfilerToast,
};
