// NodeJS Modules
const fs = require("fs");
const path = require("path");

class SearchProcesser {
    /**
     * 
     */
    static RequestSearchEngineSegmentData() {
        
    }
    /**
     * @param {string} RequestedSearchString
     * 
     * @returns {JSON?}
     */
    static async ProcessSearch(RequestedSearchString) {
        console.log(`${this.name.toString()}: `);
        //
        let PulledSearchData = {};
        //
        if (RequestedSearchString !== null && (RequestedSearchString instanceof String)) {
            const SearchArgumentWordAmount = RequestedSearchString.split(" ").length;
        }
        // Returns back the search data; that was pulled from SearchEngine JSON.
        if (PulledSearchData === null) return null;
        return PulledSearchData;
    }
}

module.exports = {

};
