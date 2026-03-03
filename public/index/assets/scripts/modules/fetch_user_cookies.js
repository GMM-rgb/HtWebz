// fetch_user_cookies.js
// Typescript Modules
class CookieFetchFunctions {
    /**
     * 
     * @param {string} PastDurationDate
     * @returns {Promise<void>}
     */
    static async getUserRecentsDataCookie(PastDurationDate) {
        if (!PastDurationDate) PastDurationDate = "Last Hour" && console.warn();
    }
    /**
     * Functions defined in the `current` class.
     * @type {Array}
    */
    static FetchFunctionArray = [
        this.getUserRecentsDataCookie
    ];
}

/**
 * 
 * @param {string} name 
 * @returns {Promise<string>}
 */
async function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') { // Remove leading spaces
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    return ""; // Return empty string value if not found
}

function attatchUserCookieLoader() {
    (async function() {
        if (('FetchFunctionArray' in CookieFetchFunctions) !== null) {
            
        }
    });
}

export {
    CookieFetchFunctions,
    attatchUserCookieLoader,
};
