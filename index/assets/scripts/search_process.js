let MaxRetryAttempts = 3;
let RetryAttempts = 0;

window.addEventListener("DOMContentLoaded", (e) => {
    const SearchInput = document.getElementById("SearchBarInput");
    while (!SearchInput) {
        if (RetryAttempts >= MaxRetryAttempts) break;
        SearchInput = document.getElementById("SearchBarInput");
        RetryAttempts += 1;
    }
    let SearchValueText = SearchInput.value || null;

    SearchInput.addEventListener("keydown", (e) => {
        if (SearchInput.textContent && SearchInput.value) {
            SearchValueText = SearchInput.value;
        }
        e.stopPropagation();
    });

    e.stopPropagation();
});
