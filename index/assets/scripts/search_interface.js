/**
 * @type {string}
 */
let SubmittedSearchQuery = null;
let isSearching = false;

document.addEventListener("DOMContentLoaded", () => {
    const SearchButton = document.getElementById("resourcesMenuOpen");
    const SearchLabelText = SearchButton.querySelector(".resources-menu-text");
    const SearchBarInput = document.getElementById("SearchBarInput");
    const ResultsDisplay = document.getElementById("search-results");

    let WindowWidth = window.innerWidth || 0;

    window.addEventListener("resize", (e) => {
        e.stopImmediatePropagation();
        WindowWidth = window.innerWidth;
    });

    // Prompt list
    const searchPrompts = [
        "Search for something...",
        "What’s on your mind?",
        "Looking for something?",
        "What's on todays agenda...",
    ];

    let promptQueue = [];
    let lastPrompt = null;

    function refillPromptQueue() {
        // Fisher–Yates shuffle
        promptQueue = [...searchPrompts];
        for (let i = promptQueue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [promptQueue[i], promptQueue[j]] = [promptQueue[j], promptQueue[i]];
        }

        // Avoid starting with the same as last time
        if (promptQueue[0] === lastPrompt && promptQueue.length > 1) {
            [promptQueue[0], promptQueue[1]] = [promptQueue[1], promptQueue[0]];
        }
    }

    function getNextPrompt() {
        if (promptQueue.length === 0) refillPromptQueue();
        const prompt = promptQueue.shift();
        lastPrompt = prompt;
        return prompt;
    }

    function clearResultsContainer() {
        if (ResultsDisplay !== null) {
            ResultsDisplay.innerHTML = "";
        } else {
            return;
        }
    }

    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );
    }

    if (isMobile()) {
        ResultsDisplay.remove();
        ResultsDisplay = null;
    }

    function toggleSearchView(open) {
        isSearching = open;

        if (open) {
            const prompt = getNextPrompt();

            SearchButton.setAttribute(
                "onmouseenter",
                `setupTooltip('#resourcesMenuOpen', '${prompt}')`
            );

            // ResultsDisplay.style.display = "flex";

            if (prompt && prompt.length > 10) {
                SearchBarInput.style.width = `calc(175px + ${prompt.length * 1.5
          }px - 15px)`;
            } else {
                SearchBarInput.style.width = "calc(175px - 15px)";
            }

            SearchLabelText.style.display = "none";
            SearchBarInput.classList.add("open");
            SearchBarInput.focus();

            if (WindowWidth && WindowWidth <= 762) {
                SearchBarInput.setAttribute("placeholder", "Search...");
                SearchBarInput.style.textIndent = "5px";
            } else {
                SearchBarInput.setAttribute("placeholder", prompt);
            }
        } else {
            SearchButton.setAttribute(
                "onmouseenter",
                "setupTooltip('#resourcesMenuOpen', 'Click to Expand Search.')"
            );
            SearchBarInput.setAttribute("placeholder", "");

            SearchBarInput.style.width = "0px";
            SearchBarInput.style.textIndent = "8.5px";

            SearchLabelText.style.display = "block";
            SearchBarInput.classList.remove("open");
            SearchBarInput.blur();
        }
    }

    /**
     * @param {string} url
     * @returns {boolean}
     */
    function loadSearchPage(url) {
        if (!url) return;
        window.open(`${url}`, "_blank");
        return true;
    }

    // Button click opens
    SearchButton.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!isSearching) {
            toggleSearchView(true);
        }
    });

    // Click outside closes
    document.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!SearchButton.contains(e.target)) {
            toggleSearchView(false);
        }
    });

    // Blur closes if focus leaves
    SearchBarInput.addEventListener("blur", () => {
        setTimeout(() => {
            if (!SearchButton.contains(document.activeElement)) {
                clearResultsContainer();
                toggleSearchView(false);
                ResultsDisplay.style.display = "none";
            }
        }, 0);
    });

    // Listen for keyboard input
    SearchBarInput.addEventListener("keypress", (e) => {
        e.stopPropagation();
        const inputValue = SearchBarInput.value;
        if (inputValue && inputValue.length > 0) {
            let output = ProcessSearchRequest(inputValue);
            DisplaySearchResults(output, "search-results", inputValue);
        }
    });

    // Listen for search action keybind
    SearchBarInput.addEventListener("keydown", (e) => {
        if (isSearching) {
            e.stopPropagation();

            if (SearchBarInput.value) {
                let results = ProcessSearchRequest(SearchBarInput.value);
                DisplaySearchResults(results, "search-results", SearchBarInput.value);
            }

            if (SearchBarInput.value.length < 1) {
                clearResultsContainer();
            }

            if (SearchBarInput.value && SearchBarInput.value.length > 0) {
                ResultsDisplay.style.display = "flex";
            } else {
                ResultsDisplay.style.display = "none";
            }

            if (SearchBarInput.value.length > 0) {
                if (e.key === "Enter") {
                    console.log("Submitted Search Request: " + `${SearchBarInput.value}`);
                    SubmittedSearchQuery = SearchBarInput.value;

                    setTimeout(() => {
                        if (SubmittedSearchQuery) {
                            let results = ProcessSearchRequest(SubmittedSearchQuery);

                            if (results.hasResults && results.matches && results.bestMatch) {
                                let BestMatchURL = results.bestMatch.url;
                                window.notify("Redirecting...");
                                setTimeout(() => {
                                    loadSearchPage(BestMatchURL);
                                }, Math.random(750, 1000));
                            } else {
                                console.warn(
                                    "Could not find a page to load, nothing matched the input."
                                );
                            }
                        }

                        SearchBarInput.blur();
                        toggleSearchView(false);
                    }, 0);
                }
            }
        }
    });

    SearchBarInput.addEventListener("keydown", (e) => {
        console.log(e.key);

        e.stopPropagation();

        if (e.key === "Escape" && isSearching) {
            e.preventDefault();
            SearchBarInput.blur();
            toggleSearchView(false);
        }

        // Correct way to detect Ctrl + Q
        if (e.ctrlKey && e.key.toLowerCase() === "q") {
            e.preventDefault(); // optional, to stop browser defaults
            console.log("Detected Input of Control + Q");
            console.log("Clearing Search Input...");

            if (SearchBarInput.value) {
                SearchBarInput.value = " ";
                setTimeout(() => {
                    let results = ProcessSearchRequest(SearchBarInput.value);
                    DisplaySearchResults(results, "search-results", SearchBarInput.value);
                    SearchBarInput.value = "";
                }, 0);
            }
        }
    });

    SearchBarInput.addEventListener("focus", (e) => {
        if (isSearching) {
            if (SearchBarInput.value) {
                let output = ProcessSearchRequest(SearchBarInput.value);
                DisplaySearchResults(output, "search-results", SearchBarInput.value);
                if (ResultsDisplay.style.display === "none" && SearchBarInput.value.length > 0) {
                    ResultsDisplay.style.display = "flex";
                }
            }
        }
        e.stopPropagation();
    });
});