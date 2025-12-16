// fetch_user_cookies.js
//
class UserCookieFetcher {
    /**
     * 
     * @param {string} PastDurationDate
     * @returns {Promise<void>}
     */
    static async getUserRecentsDataCookie(PastDurationDate) {
        
    }
}
//
/**
 * 
 * @param {string} name 
 * @returns {Promise<string?>}
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
    return null; // Return null value if not found
}

function attatchUserCookieLoader() {
    (async function() {
        e.stopPropagation?.() ?? console.error(this.ErrorEvent);
        await getUserRecentsDataCookie();
    });
}

export {
    UserCookieFetcher,
    attatchUserCookieLoader,
    getCookie,
};
