const fs = require("fs");
const path = require("path");
/**
 * @class DatabaseFetcher
 */
class DatabaseFetcher {
    /**
     * Fetches the `SearchEngineDatabase`; to be indexed in search process.
     * @returns {Promise<{
     *   DatabaseDirectory: string,
     *   FetchedFileData: JSON
     * }?>}
     */
    static FetchDatabase = async function() {
        if (fs !== null && path !== null) {
            /**
             * @type {string?}
             */
            var DatabaseDirectory = null;
            

            return;
        } else {
            if (fs === null) console.warn(``);
            if (path === null) console.warn(`[${DatabaseFetcher.FetchDatabase.name.toString()}]:\t`);
            return null;
        }
    }
    /**
     * 
     * @returns {void}
     */
    static FindSearchRequestInDatabase = function() {
        
    }
}
/**
 * @class SearchProcesser
 */
class SearchProcesser {
    /**
     * #### Processes the requested `SearchQuery` & returns an object constructor.
     * - ...
     * - ...
     * @param {string} SearchString 
     * @returns {object?}
     */
    static ProcessSearchRequestQuery = async function(SearchString) {
        if (!(SearchString instanceof String)) {
            var SearchQuery = {
                WordIndivuals: SearchString.split(" "),
                WordCount: Math.floor(SearchString.split(" ").length)
            };
            //
            if (SearchQuery !== null && (SearchQuery instanceof Object)) {
                
            }
        }
        //
        return;
    }
}
//
module.exports = {
    DatabaseFetcher,
    SearchProcesser,
};
