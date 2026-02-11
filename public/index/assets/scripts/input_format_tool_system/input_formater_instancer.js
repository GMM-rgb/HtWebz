import * as InputScanner from "./input_scanner.js";
/**
 * #### 
 */
class InputFormaterInstancerUtility {
    /**
     * @readonly
     */
    static TemplateInteractables = `
        <!-- Format Bold Button -->
        <button class="format-button bold" aria-label="Bold text">
            <img src="/index/assets/svg/user_formater_toolbar_icons/bold.ico.svg" height="50" width="50" alt="Bold" />
        </button>
        <!-- Format Italic Button -->
        <button class="format-button italic" aria-label="Italic text">
            <img src="/index/assets/svg/" height="50" width="50" alt="Italic">
        </button>
        <!-- Format Underline Button -->
        <button class=""format-button underline>

        </button>
    `;
    /**
     * @readonly
     */
    static FormaterTemplateInterface = `
        <div class="formater-toolbar-interactables">
            ${new String(this.TemplateInteractables).toString()}
        </div>
    `;
    /**
     * 
     * @type {HTMLElement?}
     */
    static PageInputFormater = null;
    /**
     * 
     * @type {HTMLElement?}
     */
    static FormaterToolbarParent = null;

    /**
     * 
     * @param {HTMLElement | undefined} FormaterToolbarParent 
     */
    constructor() {
        /**
         * @type {HTMLElement?}
         */
        this.CreateNewFormaterInstance = InputFormaterInstancerUtility.CreateNewFormaterInstance;
        this.SetFormaterParent = function(RequestedFormaterParent) {
            if (RequestedFormaterParent !== null && RequestedFormaterParent instanceof HTMLElement) {
                InputFormaterInstancerUtility.FormaterToolbarParent = RequestedFormaterParent;
                this.FormaterParent = RequestedFormaterParent;
            } else {
                console.warn("Requested Parent Element was not a valid type.");
            }
        }
    }

    /**
     * 
     * @returns {Promise<HTMLElement>}
     */
    static async CreateNewFormaterInstance() {
        // Checks that the Formater exists currently; otherwise allows the creation of a new one.
        if (InputFormaterInstancerUtility.PageInputFormater !== null) {
            console.warn("There is currently a User Input Formater that already exists!");
        } else {
            try {
                /**
                 * Builds a new Formater Toolbar; for future use on the Page for the User.
                 * @param {HTMLElement} FormaterParentElement
                 */
                function ConstructFormaterToolbar(FormaterParentElement) {
                    // if (FormaterParentElement !== null && FormaterParentElement instanceof HTMLElement) {
                    const NewFormaterInstance = document.createElement("div");
                    NewFormaterInstance.setAttribute("id", "UserInputFormaterToolbar");
                    /**
                     * Fetches new Formater Interface Content; from this Template:
                     * ```html
                     * <div class="formater-toolbar-interactables">
                     *      <!-- The Controled Interactable Formater Interface -->
                     * </div>
                     * ```
                     * 
                     * @returns {Promise<string>}
                     */
                    async function GetInitialFormaterContent() {
                        if (InputFormaterInstancerUtility.FormaterTemplateInterface !== null) {
                            if (typeof (InputFormaterInstancerUtility.FormaterTemplateInterface) === "string") {
                                return InputFormaterInstancerUtility.FormaterTemplateInterface;
                            }
                        }
                        // 
                        console.error("FormaterContent could not be fetched.");
                        // 
                        return "<span>Interface ERROR</span>";
                    }
                    /**
                     * 
                     * @returns {Promise<void>}
                     */
                    async function ApplyInitialFormaterContent() {
                        const FormaterInterface = await GetInitialFormaterContent(); // Fetch Interface
                        NewFormaterInstance.innerHTML = FormaterInterface !== null && typeof (FormaterInterface) === "string" ? FormaterInterface : null;
                        console.log(new String(NewFormaterInstance.innerHTML.valueOf()).toString());
                    }
                    // 
                    const PrototypeParent = InputFormaterInstancerUtility.FormaterToolbarParent;
                    // 
                    if (PrototypeParent !== null && PrototypeParent instanceof HTMLElement) {
                        console.debug("Appending Formater Toolbar...");
                        PrototypeParent.appendChild(NewFormaterInstance);
                        NewFormaterInstance.parentElement === PrototypeParent ? console.debug("%cSuccessfully Appended!", "color: lime;") : void null;
                    }
                    // 
                    if (NewFormaterInstance !== null && NewFormaterInstance instanceof HTMLDivElement) {
                        InputScanner.InputFormatingData.FormaterStatus.InputFormaterToolbar = NewFormaterInstance;
                        InputFormaterInstancerUtility.PageInputFormater = NewFormaterInstance;
                        return NewFormaterInstance !== null ? NewFormaterInstance : null;
                    }
                    //
                    ApplyInitialFormaterContent?.().then(() => {
                        console.debug("Ported Formater Interface Interactable Content; successfully.");
                    }).catch((ApplyingContentError) => {
                        if (ApplyingContentError !== null) {
                            console.error(`An Error occured; when applying the User Formater Toolbar Interface Content:\n${new String(ApplyingContentError)}`);
                        }
                    }) ?? console.error(`Could not Execute Function:\t${ApplyInitialFormaterContent.name.toString()}`);
                }
                // 
                console.info("%cConstructing new User Input Formater Toolbar...", 'color: yellow;');
                // Constructs the Formater Toolbar
                const ConstructedFormater = ConstructFormaterToolbar();
                return ConstructedFormater !== null ? ConstructedFormater : null;
            } catch (FormaterCreationError) {
                throw new Error(`Whilist creating a new Formater Toolbar Instance; an Error occured:\t${new String(FormaterCreationError).toString()}`);
            }
        }
    }
}

export {
    InputFormaterInstancerUtility,
};
