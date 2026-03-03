class StoreCookieManager {
    /**
     * 
     * @param {string} cookieName
     * @param {...any?} values
     * @returns {void}
     */
    static createNewCookie(cookieName, ...values) {
        (async () => {
            if (values) values.forEach((value) => {

            }); else return;
        });
    }

    /**
     * 
     * @param {string} cookieToOverwrite 
     * @param  {...any?} newValues
     * @returns {void}
     */
    static overwriteCookie(cookieToOverwrite, ...newValues) {
        (async () => {
            if (newValues) newValues.forEach((newValue) => {

            }); else return;
        });
    }

    /**
     * 
     * 
     * @returns {void}
     */
    static deleteCookie(cookieToDelete) {
        (async () => {
            
        });
    }
}

export { StoreCookieManager };
