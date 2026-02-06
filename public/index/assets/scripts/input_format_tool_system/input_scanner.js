const body = document !== null ? document.body : null;
const FetchedInputs = body.querySelectorAll("input");
/**
 * 
 */
var InputElementData = {
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
    if (body !== null && (body instanceof HTMLElement)) {
        //for (var DocumentChildrenElementIndex = 0; DocumentChildrenElementIndex < body.childNodes.length; DocumentChildrenElementIndex++) {
            //const ScannedElement = body.childNodes.item(DocumentChildrenElementIndex);
            //if (ScannedElement !== null && (ScannedElement instanceof HTMLElement) && (ScannedElement instanceof HTMLInputElement)) {
                //if (InputElementData && InputElementData.InputElementAmount !== null) InputElementData.InputElementAmount += 1;
                //console.log(`Found new Input element within the page document.\nTotal Input Elements:\t${InputElementData.InputElementAmount.toString()}`);
            //}
        //}
        /**
         * 
         * @param {HTMLInputElement} TargetInputElement
         * @returns {EventListener[]?}
         */
        function ApplyInputListeners(TargetInputElement) {
            let AppliedListeners = [];
            if (TargetInputElement !== null && TargetInputElement instanceof HTMLInputElement) {
                AppliedListeners.push(TargetInputElement.addEventListener("focus", (ev) => {

                }));
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
self.addEventListener("change", ScanForInputsInDocument);
