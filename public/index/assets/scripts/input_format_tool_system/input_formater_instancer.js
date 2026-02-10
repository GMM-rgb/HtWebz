/**
 * Author: @GMM-rgb
 */
class InputFormaterInstancerUtility {
    /**
     * @readonly
     */
    static TemplateInteractables = `
        <button class="format-button bold">
            <img src="/index/assets/images/" height="50" width="50" />
        </button>
    `;
    /**
     * @readonly
     */
    static FormaterTemplateInterface = `
        <div class="formater-toolbar-interactables">

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
                        const NewFormaterInstance = document.createElement("div");
                        /**
                         * Fetches new Formater Interface Content; from this Template:
                         * 
                         * ```html
                         * 
                         * ```
                         * 
                         * @returns {Promise<string>}
                         */
                        async function GetInitialFormaterContent () {
                            
                        }
                        /**
                         * 
                         * @returns {void}
                         */
                        function ApplyInitialFormaterContent() {
                            (async () => {
                                const FormaterInterface = await GetInitialFormaterContent();
                            })();
                        }
                        // 
                        while (NewFormaterInstance.parentElement === null) {
                            if (FormaterParentElement !== null) {
                                FormaterParentElement.appendChild(NewFormaterInstance);
                            }
                        }
                        // 
                        if (NewFormaterInstance !== null && NewFormaterInstance instanceof HTMLDivElement) {
                            InputFormaterInstancerUtility.PageInputFormater = NewFormaterInstance;
                            return NewFormaterInstance !== null ? NewFormaterInstance : null;
                        }
                    }
                }
                // 
                console.info("Constructing new User Input Formater Toolbar...");
                // Constructs the Formater Toolbar
                ConstructFormaterToolbar();
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
