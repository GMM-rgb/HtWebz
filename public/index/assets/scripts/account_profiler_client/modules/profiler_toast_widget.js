class ProfilerToast {
    /**
     * ---
     * ...
     * 
     * ---
     * @private 
     * @param {number | string} ProgressPercentage 
     * @returns {(typeof DOMRect.prototype.width.valueOf())?} 
     */
    static FormatProgress(ProgressPercentage = 50) {
        /**
         * ---
         * 
         * 
         * ---
         * @type {number?}
         */
        let SantizedProgressPercentage;
        if (ProgressPercentage !== undefined && !(Math.ceil(ProgressPercentage) < 0)) {

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
     * ...
     * 
     * ---
     * @public
     * @returns {void}
     */
    BuildToastElement() {
        if (this.ToastSpanMessage !== null && typeof(this.ToastSpanMessage) === "string") {

        } else {

        }
    }
}

export {
    ProfilerToast,
};
