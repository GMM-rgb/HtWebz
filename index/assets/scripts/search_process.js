let MaxRetryAttempts = 3;
let RetryAttempts = 0;

let SubmittedSearchQuery = null;

window.addEventListener("DOMContentLoaded", (e) => {
    const SearchInput = document.getElementById("SearchBarInput");
    while (!SearchInput) {
        if (RetryAttempts >= MaxRetryAttempts) break;
        SearchInput = document.getElementById("SearchBarInput");
        RetryAttempts += 1;
    }
    let SearchValueText = SearchInput.value || null;

    SearchInput.addEventListener("keypress", (e) => {
        e.stopPropagation();
        if (SearchInput.textContent && SearchInput.value) {
            SearchValueText = SearchInput.value;
        }
    });

    SearchInput.addEventListener("keydown", (e) => {
        e.stopPropagation();
        if (e.key === "Enter" || e.key === "Return") {
            SubmittedSearchQuery = SearchValueText;
        }
    });

    e.stopPropagation();
});
