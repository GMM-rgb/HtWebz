const fs = require("fs");
const path = require("path");
/**
 * @class DatabaseFetcher
 * @classdesc
 * #### Contains Function Methods such as:
 * ```javascript
 * // method types
 * FetchDatabase();
 * ```
 */
class DatabaseFetcher {
    /**
     * @private {
     *  @type {string?}
     * }
     */
    static LocalizedDatabaseDirectoryVariable = null;
    /**
     * Fetches a Database file from the requested input parameter.
     * @param {string} RequestedFileName
     * @returns {File}
     */
    static async FetchDatabaseFile(RequestedFileName) {
        if (RequestedFileName !== null && (RequestedFileName instanceof String) && fs) {
            /**
             * @type {File?}
             */
            var FetchedDatabaseFile = null;
            /**
             * 
             * @returns {string[]?}
             */
            function ScanDatabase() {
                var DirToScan = fs.opendirSync("");
            }
        }
    }
    /**
     * Fetches the `SearchEngineDatabase`; to be indexed in search process.
     * @returns {Promise<{
     *   DatabaseDirectory: string,
     *   FetchedFileData: JSON,
     * }?>}
     * `DatabaseDirectory` : `String`  
     * `FetchedFileData` : `JSON`
     * #### Asynchronous Function Usage  
     * 
     */
    static FetchDatabase = async function() {
        const FunctionName = DatabaseFetcher.FetchDatabase.name.toString();
        //
        if (fs !== null && path !== null) {
            /**
             * Fetches the directory of the SearchEngineDatabase & returns the name of it.
             * @returns {Promise<string?>}
             */
            async function GetDatabaseDirectory() {
                const DatabasePossibleFileNames = {
                    DatabaseMapperJSON: "search_engine_database_mapper",
                };
                /**
                 * Variable to return in further process; for return result of FetchDatabase function method.
                 * @type {string?}
                 */
                var Directory = null;
                /**
                 * @type {string[]?}
                 */
                var SearchSystemDirectorysAndFiles = fs.readdirSync(path.join('..'));
                /**
                 * @type {boolean}
                 */
                var CanAccess = false;

                /**
                 * @returns {string?}
                 */
                function FindDatabaseDirectory() {
                    var FoundDirectory = null;
                    // 
                    if (SearchSystemDirectorysAndFiles !== null && (SearchSystemDirectorysAndFiles instanceof Array)) {
                        var HasFoundDatabaseDirectory = false;
                        for (var ReadDirIndex = 0; ReadDirIndex < SearchSystemDirectorysAndFiles.length; ReadDirIndex++) {
                            try {
                                var ActiveDirectory = SearchSystemDirectorysAndFiles[ReadDirIndex];
                                if (ActiveDirectory !== null && (ActiveDirectory instanceof String)) {
                                    if (fs.existsSync(path.join('.', ActiveDirectory.toString()))) {
                                        if ((!ActiveDirectory.toString().trim().includes(".") && ActiveDirectory.toString().replace("_", " ").search("database"))) {
                                            if (!HasFoundDatabaseDirectory) HasFoundDatabaseDirectory = true;
                                            console.log(`Found Database directory:\t"${ActiveDirectory.toString()}"`);
                                        } else {
                                            console.log(`Didn't find Database directory `);
                                        }
                                    }
                                }
                            } catch (ScanError) {
                                console.error(`ERROR: Failed to FindDatabaseDirectory:\n${ScanError}`);
                            }
                        }
                        //
                        if (!HasFoundDatabaseDirectory) {

                        }
                    }
                    // 
                    return FoundDirectory;
                }
                // Ensures that the directory contents can be accessed.
                try {
                    const FsConstants = fs.constants;
                    fs.accessSync("search_engine_database", FsConstants.R_OK | FsConstants.W_OK);
                    CanAccess = true;
                } catch (PermissionError) {
                    CanAccess = false;
                    console.error(`Could not access SearchEngineDatabase directory, permmisions inssuficent!\nERROR:\n${PermissionError}`);
                    return null;
                }
                // 
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
            (() => {
                if (fs === null) console.warn(`[${FunctionName}]:\tFS module was not found; or not installed to Node Dependencies.`);
                if (path === null) console.warn(`[${FunctionName}]:\t"Path" module was not imported; or not installed to Node Dependencies.`);
            }) ();
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
