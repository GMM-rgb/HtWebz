const fs = require("fs");
const path = require("path");
/**
 * @class 
 */
class DatabaseFetcher {

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
            if (SearchQuery !== null) {
                
            }
        }
        //
        return;
    }
}
//
module.exports = {
    SearchProcesser,
};
