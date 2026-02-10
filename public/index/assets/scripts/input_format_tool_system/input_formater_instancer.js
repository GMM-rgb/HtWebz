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
        \t${new String(this.TemplateInteractables).valueOf()}
        </div>
    `;
    /**
     * @type {HTMLElement?}
     */
    static PageInputFormater = null;

    /**
     * 
     * @param {HTMLElement | undefined} FormaterToolbarParent 
     */
    constructor(TargetFormaterToolbarParent) {
        this.FormaterToolbarParent = null;
        this.CreateNewFormaterInstance = InputFormaterInstancerUtility.CreateNewFormaterInstance;
    }

    /**
     * 
     * @returns {HTMLElement?}
     */
    static async CreateNewFormaterInstance() {
        // Checks that the Formater exists currently; otherwise allows the creation of a new one.
        if (InputFormaterInstancerUtility.PageInputFormater !== null) {
            console.warn("There is currently a User Input Formater that already exists!");
        } else {
            try {
                /**
                 * 
                 * @param {HTMLElement} FormaterParentElement
                 */
                function ConstructFormaterToolbar(FormaterParentElement) {
                    if (FormaterParentElement !== null && FormaterParentElement instanceof HTMLElement) {
                        const NewFormaterInstance = new HTMLDivElement();
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
                        async function GetInitialFormaterContent () {
                            if (InputFormaterInstancerUtility.FormaterTemplateInterface !== null) {
                                if (typeof(InputFormaterInstancerUtility.FormaterTemplateInterface) === "string") {
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
                         * @returns {void}
                         */
                        function ApplyInitialFormaterContent() {
                            (async () => {
                                const FormaterInterface = await GetInitialFormaterContent(); // Fetch Interface

                            })();
                        }
                        // 
                        while (NewFormaterInstance.parentElement === null) {
                            if (FormaterParentElement !== null && FormaterParentElement instanceof HTMLElement) {
                                FormaterParentElement.appendChild(NewFormaterInstance);
                            }
                        }
                        // 
                        if (NewFormaterInstance !== null && NewFormaterInstance instanceof HTMLDivElement) {
                            InputScanner.InputFormatingData.FormaterStatus.InputFormaterToolbar = NewFormaterInstance;
                            InputFormaterInstancerUtility.PageInputFormater = NewFormaterInstance;
                            return NewFormaterInstance !== null ? NewFormaterInstance : null;
                        }
                    }
                }
                // 
                console.info("Constructing new User Input Formater Toolbar...");
                // Constructs the Formater Toolbar
                ConstructFormaterToolbar && typeof(ConstructFormaterToolbar) === "function" ? ConstructFormaterToolbar() : void null;
            } catch (FormaterCreationError) {
                throw new Error(`Whilist creating a new Formater Toolbar Instance; an Error occured:\t${new String(FormaterCreationError).toString()}`);
            }
        }
        // 
        return null;
    }
}

export {
    InputFormaterInstancerUtility,
};

// new InputFormaterInstancerUtility().CreateNewFormaterInstance();
