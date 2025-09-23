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

// Process the users search request when provided.
// If the search input is not a string then return nothing (null).
// If the search is valid and there is a match then it will return JSON data for the user.
/**
 * @param {string} SearchQueryInput 
 * @returns {JSON?}
 */
function ProcessSearchRequest(SearchQueryInput) {
    let Results = {};
    if (SearchQueryInput && typeof SearchQueryInput === "string") console.log(SearchQueryInput);

    return Results;
}
