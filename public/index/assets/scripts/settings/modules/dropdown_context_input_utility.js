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
        /**
         * 
         * @type {DropdownContext}
         * @protected
         */
        this.NewDropdownContext = null;
    }
}

class DropdownContext extends DropdownContextLogistics {
    /**
     * 
     * @param {string?} DropdownLabel
     * @param {string} DropdownSelectionContent
     */
    constructor(DropdownLabel) {
        super(DropdownLabel, DropdownSelectionContent);
        /**
         * Determines the Active state of the `DropdownContext` Element.
         * @type {boolean}
         */
        this.active = false;
    }

    /**
     * #### Event for when the `DropdownContext` is triggered; and toggles the displayed content.  
     * @version `0.1`
     * @since `2.4.0`
     * @public
     */
    static DropdownContextEvent = new CustomEvent("dropdown", {
        detail: {
            DropdownActive: false,
        },
    });

    /**
     * 
     * @private
     * @returns {void}
     */
    static async DispatchDropdown() {
        if (this.DropdownContextEvent !== null && this.DropdownContextEvent instanceof CustomEvent) {
            const TargetDropdownContext = this.prototype.NewDropdownContext;
            if (TargetDropdownContext !== null && TargetDropdownContext instanceof DropdownContext) {

            }
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
    DropdownContext
};

new DropdownContext().NewDropdownContext;
