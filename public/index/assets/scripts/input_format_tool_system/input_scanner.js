const body = document !== null ? document.body : null;
const FetchedInputs = body.querySelectorAll("input");
const EventListenerInputTypes = ["focus", "blur"];
/**
 * 
 */
let InputElementData = {
    InputElementAmount: 0,
    ScannedInputElements: []
};
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
            let AppliedListeners = new Array();
            if (TargetInputElement !== null && TargetInputElement instanceof HTMLInputElement) {
                for (let EventListenerTypeIndex = 0; EventListenerTypeIndex < EventListenerInputTypes.length.valueOf(); EventListenerTypeIndex++) {
                    TargetInputElement.addEventListener(
                    new String(EventListenerInputTypes.at(EventListenerTypeIndex.valueOf())),
                    (ListenerEventData) => {
                            
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
if (self && ScanForInputsInDocument && typeof(ScannedInputElements) === "function")
    self.addEventListener("change", ScanForInputsInDocument);
