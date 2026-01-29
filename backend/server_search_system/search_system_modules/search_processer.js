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
     *   FetchedFileData: JSON,
     * }?>}
     */
    static FetchDatabase = async function() {
        const FunctionName = DatabaseFetcher.FetchDatabase.name.toString();
        //
        if (fs !== null && path !== null) {
            /**
             * Fetches a Database file from the requested input parameter.
             * @param {string} RequestedFileName
             */
            async function FetchDatabaseFile(RequestedFileName) {

            }
            /**
             * Fetches the directory of the SearchEngineDatabase & returns the name of it.
             * @returns {Promise<string?>}
             */
            async function GetDatabaseDirectory() {
                const DatabasePossibleFileNames = {
                    DatabaseMapperJSON: "search_engine_database_mapper",
                };

                /**
                 * @type {string?}
                 */
                var Directory = null;
                /**
                 * @type {string[]?}
                 */
                var SearchSystemDirectorysAndFiles = fs.readdirSync(path.join("../"));
                /**
                 * @returns {string?}
                 */
                function FindDatabaseDirectory() {
                    var FD = null;

                    if (SearchSystemDirectorysAndFiles !== null && (SearchSystemDirectorysAndFiles instanceof Array)) {
                        for (let ReadDirIndex = 0; ReadDirIndex < SearchSystemDirectorysAndFiles.length; ReadDirIndex++) {
                            
                        }
                    }

                    return FD;
                }

                // Ensures that the directory contents can be accessed.
                try {
                    var FsConstants = fs.constants;
                    fs.accessSync("search_engine_database", FsConstants.R_OK | FsConstants.W_OK);
                    
                } catch (PermissionError) {
                    console.error(`Could not access SearchEngineDatabase directory, permmisions inssuficent!\nERROR:\n${PermissionError}`);
                    return null;
                }

                if (Directory !== null && !(Directory instanceof String)) {
                    return null;
                } else {
                    return Directory;
                }
            }
            /**
             * @type {string?}
             */
            var DatabaseDirectory = await GetDatabaseDirectory();
            /**
             * @type {JSON?}
             */
            var FetchedData = null;
            //
            fs.readFileSync(null, "utf-8");
            //
            return;
        } else {
            if (fs === null) console.warn(`[${FunctionName}]:\t`);
            if (path === null) console.warn(`[${FunctionName}]:\t"Path" module was not imported; or not installed to Node Dependencies.`);
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
