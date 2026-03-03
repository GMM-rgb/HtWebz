import * as ScriptingUtils from "../modules/JavaScript_Utility_Extras/scripting_utils.js";
import * as UserCookieFetcher from '../modules/fetch_user_cookies.js';
// user_recents_loader.js
const CookieFetchFunctions = UserCookieFetcher !== null ? (UserCookieFetcher.CookieFetchFunctions !== null ? UserCookieFetcher.CookieFetchFunctions : null) : null;
class RecentsLoader {
    static LocalTarget = "RecentLocalData";
    /**
     * Loads the users recents from the browsers `localstorage API`, or from the server if the user is registered.
     * @param {boolean} isGeust
     * @returns {void}
     */
    static loadUserRecentData(isGeust) {
        let UserRecents = null;
        /**
         * Formats JSON string data to proper format.
         * @param {...string} data 
         * @returns {Array?}
         */
        function formatRecentsData(...data) {
            let FormatedData = null;
            if (data === null) return null;
            if (data && data.length > 1) {
                FormatedData = [];
                data.forEach((dataEntry) => {
                    FormatedData.push((dataEntry !== null ? JSON.parse(dataEntry) : null));
                });
            } else if (data && data.length <= 1) {
                FormatedData = data ? JSON.parse(data) : null;
            } else {
                return null;
            }
            return (FormatedData !== null ? FormatedData : null);
        }
        if (isGeust) {
            console.log("%cLOG:%c User is %cUnregistered", "color: magenta;", "color: normal;", "color: red !important;");
            let LocalRecentsData = localStorage.getItem(this.LocalTarget);
            UserRecents = formatRecentsData(LocalRecentsData);
        } else if (!isGeust) {
            console.log("%cLOG:%c User is %cRegistered", "color: magenta;", "color: normal;", "color: lime !important;");
            // still needs work...
        } else {
            console.error("ERROR: Could not predict if the user was a geust — or was registered. [CAUSE: invalid input!]");
            return;
        }
        return UserRecents;
    }
    /**
     * Initalize recents data with something; this will write data such as, "Nothing here yet!".
     * @param {boolean} isGeust 
     * @returns {Promise<boolean>}
     */
    static async initalizeRecentsData(isGeust) {
        if (isGeust === null) return false;
        if (!isGeust) {
            // to be continued on...
        } else {
            const LocalSupposedRecentData = localStorage.getItem(this.LocalTarget) || null;
            if (LocalSupposedRecentData === null) {
                localStorage.setItem(this.LocalTarget, JSON.stringify(`<span class=""><strong>Hmm...</strong> looks like you<br/>don't have anything new!</span>`));
            } else {
                return false;
            }
        }
        return true;
    }
}

export { RecentsLoader };
