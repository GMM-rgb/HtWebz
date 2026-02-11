class DropdownContextLogistics {
    /**
     * 
     * @param {string} DropdownLabel 
     */
    constructor(DropdownLabel) {
        /**
         * @type {string?}
         */
        this.ContextLabel = DropdownLabel || null;
    }
}

class DropdownContext extends DropdownContextLogistics {
    /**
     * 
     * @param {string?} DropdownLabel 
     */
    constructor(DropdownLabel) {
        super(DropdownLabel);
        let NewDropdownContext = null;
    }

    static DropdownContextEvent = new CustomEvent("dropdown", {
        detail: {
            DropdownActive: false,
        },
    });

    /**
     * 
     * @returns {void}
     */
    static DispatchDropdown() {
        if (this.DropdownContextEvent !== null && this.DropdownContextEvent instanceof CustomEvent) {

        }
    }

    /**
     * 
     * @param {boolean} RequestedDropdownToggleState 
     * @returns {void}
     */
    TriggerDropdownEvent(RequestedDropdownToggleState) {
        if (RequestedDropdownToggleState !== null && typeof(RequestedDropdownToggleState) === "boolean") {

        }
    }
}

export {
    DropdownContext,
};
