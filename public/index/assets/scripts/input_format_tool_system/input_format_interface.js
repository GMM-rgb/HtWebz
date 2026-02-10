// Import JavaScript Modules; for the Input Formater.
import * as InputScannerUtility from "./input_scanner.js";
import * as InputInstancer from "./input_formater_instancer.js";
// 
const TopUserInterface = window instanceof Window ? window.document.querySelector("#topUserInterfaceBar") : null;
const InputMutationObserverConfiguration = { attributes: true, subtree: true };
let ScannedInputElementData = InputScannerUtility !== null ? InputScannerUtility.InputFormatingData.InputScanElementData.ScannedInputElements : null;
/**
 * Applies the Mutation Listener for the `focusactive` attribute.
 * @throws {Error}
 * @returns {void}
 */
async function ApplyMutationChangeListening() {
    ScannedInputElementData.InputElements.forEach((InputElement) => {
        if (InputElement !== null && InputElement instanceof HTMLInputElement) {
            // MutationObserver for actively listening in the change of `focusactive` attribute.
            const InputMutationObserver = new MutationObserver((InputElementMutations) => {
                InputElementMutations.forEach((InputMutation) => {
                    if (InputMutation !== (null || undefined) && InputMutation.type === "attributes") {
                        const MutatedAttributeName = InputMutation.attributeName.toString();
                        if (MutatedAttributeName.toLowerCase() === "focusactive") {
                            const MutatedFocusActiveAttribute = InputElement.getAttribute(MutatedAttributeName);
                            if (MutatedFocusActiveAttribute !== null && typeof(MutatedFocusActiveAttribute) === "string" && MutatedFocusActiveAttribute === ("true" || "false")) {
                                const FocusActive = new Boolean(MutatedFocusActiveAttribute).valueOf();
                                InputScannerUtility.InputFormatingData.FormaterStatus.Enabled = FocusActive;
                            }
                        }
                    }
                });
            });
            // 
            if (InputMutationObserver !== null && InputMutationObserver instanceof MutationObserver) {
                InputMutationObserver.observe(
                    InputElement,
                    InputMutationObserverConfiguration
                        ? InputMutationObserverConfiguration
                        : undefined
                );
            } else {
                throw new Error(
                    `Mutation Observer was NULL, or was invalid.\n
                    Expected:\t${new String(MutationObserver.name).valueOf()}`
                );
            }
        }
    });
}

self.onloadstart = async () => {
    self.addEventListener("DOMContentLoaded", (LoadEvent) => {
        if (ApplyMutationChangeListening && typeof(ApplyMutationChangeListening) === "function") {
            ApplyMutationChangeListening().then(() => {
                console.debug("Applied Mutation Listener Change; to DOM Input Elements.");
            }).catch((InputMutationError) => {
                if (InputMutationError !== null) {
                    console.error(`${new String(InputMutationError).toString()}`);
                }
            });
        }

        if (InputInstancer !== null && InputInstancer.InputFormaterInstancerUtility !== null) {
            const Instancer = new InputInstancer.InputFormaterInstancerUtility(TopUserInterface);
            const FormaterToolbar = Instancer.CreateNewFormaterInstance();
        }
    }, { once: true, passive: true });
}
