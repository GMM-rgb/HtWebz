import { SubmittedSearchQuery } from "./search_interface";

let MaxRetryAttempts = 3;
let RetryAttempts = 0;

let SearchQueryKeywords = {
    "Homepage": "./index.html"
};

window.addEventListener("DOMContentLoaded", (e) => {
    const SearchInput = document.getElementById("SearchBarInput");
    while (!SearchInput) {
        if (RetryAttempts >= MaxRetryAttempts) { break; }
        SearchInput = document.getElementById("SearchBarInput");
        RetryAttempts += 1;
    }

    if (SearchInput) {
        if (SubmittedSearchQuery) { console.log(SubmittedSearchQuery); } 
    }

    e.stopPropagation();
});
