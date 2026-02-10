/**
 * 
 * @
 */
class InputFormaterInstancerUtility {
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
                        const NewFormaterInstance = document.createElement("div", { is: "div" });
                        // 
                        while (
                            NewFormaterInstance.parentElement === null
                        ) {
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

new InputFormaterInstancerUtility().CreateNewFormaterInstance();
