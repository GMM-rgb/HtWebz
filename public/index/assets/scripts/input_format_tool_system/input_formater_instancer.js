let PageInputFormater = null;

/**
 * 
 */
class InputFormaterInstancerUtility {
    static async CreateNewFormaterInstance() {
        // Checks that the Formater exists currently; otherwise allows the creation of a new one.
        if (PageInputFormater !== null) {
            console.warn("");
        } else {
            try {
                console.info("Constructing new User Input Formater Toolbar...");
                // Constructs the Formater Toolbar

            } catch (FormaterCreationError) {
                console.error(`${new String(FormaterCreationError).toString()}`);
            }
        }
        // 
        return null;
    }
}

export {
    InputFormaterInstancerUtility
};
