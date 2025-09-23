let MaxRetryAttempts = 3;
let RetryAttempts = 0;

const SearchQueryKeywords_ThisWebsite = {
    "Homepage": "./index.html",
};

window.addEventListener("DOMContentLoaded", (e) => {
    const SearchInput = document.getElementById("SearchBarInput");
    while (!SearchInput) {
        if (RetryAttempts >= MaxRetryAttempts) { break; }
        SearchInput = document.getElementById("SearchBarInput");
        RetryAttempts += 1;
    }

    e.stopPropagation();
});

// If the string has more than one word, this returns `true`
// If the string is just one word, then this returns `false`
/**
 * @param {string} v 
 * @returns {true|false}
 * 
 */
function MultiWordIncludes(v) {
    if (v) {
        const words = v.split(" ").filter(word => word !== "");
        return words.length > 1;
    } else {
        return false;
    }
}

// Process the users search request when provided.
// If the search input is not a string then return nothing (null).
// If the search is valid and there is a match then it will return JSON data for the user.
/**
 * @param {string} SearchQueryInput 
 * @returns {JSON?}
 * 
 */
function ProcessSearchRequest(SearchQueryInput) {
    let Results = {};
    try {
        if (SearchQueryInput && typeof SearchQueryInput === "string") {
            console.log(`${SearchQueryInput}`);
        } else {
            console.warn("Search Input for Query was not a valid format.");
            return null;
        }

        function process() {
            if (MultiWordIncludes(SearchQueryInput)) {
                let WordSplit = SearchQueryInput.split(" ");
                let SplittedRaw = WordSplit.split("");
                if (WordSplit && SplittedRaw)
                for (let searchSegmentAnalyze = 0; searchSegmentAnalyze < SearchQueryInput.length; searchSegmentAnalyze++) {

                }
            } else {
                let SplittedRaw = SearchQueryInput.split("");
                console.log(SplittedRaw);
            }
        }
        process();
    } catch (error) {
        console.error(error);
    }
    return Results;
}
