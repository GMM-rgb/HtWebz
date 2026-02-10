const body = document !== null ? document.body : null;
const FetchedInputs = body.querySelectorAll("input");
const EventListenerInputTypes = ["focus", "blur"];

/**
 * #### Data Objects
 * Data for the `FormaterToolbar`; underneath the `topUserInterface` Element.
 */
class InputFormaterData {
    /**
     * #### Input Editor Format Status Data.
     */
    static FormaterStatus = {
        Enabled: false,
        Displaying: false,
        Interactable: true,
        AvailableFormatToolOptions: []
    };
    /**
     * #### Scanned User Editable Inputs in the DOM Content.
     */
    static InputScanElementData = {
        InputElementAmount: 0,
        ScannedInputElements: {
            InputElementIDs: new Array(0),
            InputElements: new Array(0)
        }
    };
}

/**
 * 
 */
class InputEditFormaterEvents {
    /**
     * 
     * @private
     */
    static EditFormaterEnabledStateChanged = new CustomEvent("formatertoolschanged", {
        detail: InputFormaterData.FormaterStatus
    });
    /**
     * 
     * @public
     * @param {boolean} EnabledState
     * @param {boolean} DisplayingState
     * @param {boolean} InteractableState
     * @returns {void}
     */
    static TriggerFormaterEnabledChanged(EnabledState, DisplayingState, InteractableState) {
        const FormaterChangeEvent = this.EditFormaterEnabledStateChanged;
        let TriggeredEvent = false;

        /**
         * 
         * @returns {void}
         */
        function ChangEventStatus() {
            if (FormaterChangeEvent !== null && FormaterChangeEvent instanceof CustomEvent) {
                
            }
        }

        /**
         * 
         * @returns {boolean}
         */
        async function FireChangeEvent() {
            if (FormaterChangeEvent !== null && FormaterChangeEvent instanceof CustomEvent) {

            }
        }
        
        if (TriggeredEvent !== null && typeof(TriggeredEvent) === 'boolean') {
            try {

            } catch (TriggerEventError) {
                console.error(`Formater Trigger Event Listener Function; experience an error & failed.\nError Details:\n${new String(TriggerEventError).toString()}`);
                return void null;
            } finally {
                if (TriggeredEvent) {
                    console.info("");
                } else {
                    console.warn("");
                }
            }
        }

        return void null;
    }
}

/**
 * 
 * @param {boolean} FormatToolsEnabledState
 */
async function ToggleFormatTools(FormatToolsEnabledState) {
    /**
     * Triggers the display of the `HTMLInputElement` formating tools.  
     * The boolean input type results:
     * - `true` -> Enabled : Focusing Input
     * - `false` -> Disabled : Not Focusing
     * @returns {HTMLElement?}
     */
    function FormatToolsDisplay() {
        try {
            
        } catch (FormatToolsStateError) {
            if (FormatToolsEnabledState === true)
                console.error(`Formating Tools encountered an error while setting up`);
            if (FormatToolsEnabledState !== true)
                console.error();
            return void null;
        }
    }
    // 
    if (FormatToolsEnabledState !== null) {
        if (typeof(FormatToolsEnabledState) === "boolean") {
            if (FormatToolsEnabledState === true) {
                console.debug(`Enabling Formating Tools...`);

            } else {
                console.debug(`Disabling Formating Tools...`);
            }
        }
    }
}

/**
 * #### Scans for `<input/>` elements within the HTML document; the function is executed in.
 * @returns {void}
 */
function ScanForInputsInDocument() {
    if (body !== null && (body instanceof HTMLElement)) {            //if (ScannedElement !== null && (ScannedElement instanceof HTMLElement) && (ScannedElement instanceof HTMLInputElement)) {
        /**
         * 
         * @param {HTMLInputElement} TargetInputElement
         * @returns {EventListener[]?}
         */
        function ApplyInputListeners(TargetInputElement) {
            let AppliedListeners = new Array(0);
            let WarningMessage = new String();
            if (TargetInputElement !== null && TargetInputElement instanceof HTMLInputElement) {
                console.debug(`Applying Event Listener Objects; to Scanned Inputs`);
                for (let EventListenerTypeIndex = 0; EventListenerTypeIndex < EventListenerInputTypes.length.valueOf(); EventListenerTypeIndex++) {
                    TargetInputElement.addEventListener(new String(EventListenerInputTypes.at(EventListenerTypeIndex.valueOf())),
                    (ListenerEventData) => {
                        if (ToggleFormatTools !== null && typeof(ToggleFormatTools) === "function") {
                            ToggleFormatTools();
                        } else {
                            if (WarningMessage !== null && typeof(WarningMessage) === "string") {
                                if (ToggleFormatTools === null) {
                                    WarningMessage += `ToggleFormatTools was NULL!` + '\n';
                                }
                                if (typeof(ToggleFormatTools) !== "function") {
                                    WarningMessage += `Expected function for ToggleFormatTools; but got:\t${new String(typeof(ToggleFormatTools))}`;
                                }
                                console.warn(WarningMessage ? WarningMessage.trimStart() : new String(null).toString());
                            }
                            return null;
                        }
                    });
                    AppliedListeners.push(EventListenerInputTypes.at(parseFloat(EventListenerTypeIndex.valueOf())).toString());
                }
            }
        }
        // 
        FetchedInputs.forEach((FetchedInput) => {
            if (FetchedInput !== null && FetchedInput instanceof HTMLInputElement) {
                if (ApplyInputListeners && typeof(ApplyInputListeners) === "function") {
                    ApplyInputListeners();
                }
            }
        });
    }
}

//
if (self && ScanForInputsInDocument && typeof(ScanForInputsInDocument) === "function")
    self.addEventListener("change", ScanForInputsInDocument);

export {
    InputFormaterData as InputFormatingData,
    ScanForInputsInDocument as ScanInputsInDocument
};
