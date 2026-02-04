const body = document.body;
/**
 * 
 */
var InputElementData = {
    InputElementAmount: 0,
    ScannedInputElements: []
};
/**
 * #### Scans for `<input/>` elements within the HTML document; the function is executed in.
 * @returns {void}
 */
function ScanForInputsInDocument() {
    if (body !== null && (body instanceof HTMLElement)) {
        for (var DocumentChildrenElementIndex = 0; DocumentChildrenElementIndex < body.childNodes.length; DocumentChildrenElementIndex++) {
            const ScannedElement = body.childNodes.item(DocumentChildrenElementIndex);
            if (ScannedElement !== null && (ScannedElement instanceof HTMLElement) && (ScannedElement instanceof HTMLInputElement)) {
                if (InputElementData && InputElementData.InputElementAmount !== null) InputElementData.InputElementAmount += 1;
                console.log(`Found new Input element within the page document.\nTotal Input Elements:\t${InputElementData.InputElementAmount.toString()}`);
                
            }
        }
    }
}

self.addEventListener("change", ScanForInputsInDocument);
