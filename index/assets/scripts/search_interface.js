/**
 * @type {string} SubmittedSearchQuery - Stores the last submitted search query.
 */
let SubmittedSearchQuery = null;
let KeyClickDebounce = null;
let isSearching = false;
let justOpened = false; // NEW: Track if search was just opened

document.addEventListener("DOMContentLoaded", () => {
    const SearchButton = document.getElementById("resourcesMenuOpen");
    const SearchLabelText = SearchButton.querySelector(".resources-menu-text");
    const SearchBarInput = document.getElementById("SearchBarInput");
    const ResultsDisplay = document.getElementById("search-results");
    const ClickSound = document.getElementById("GlobalClick");

    let WindowWidth = window.innerWidth || 0;

    window.addEventListener("resize", (e) => {
        e.stopImmediatePropagation();
        WindowWidth = window.innerWidth;
    });

    // Prompt list
    const searchPrompts = [
        "Search for something...",
        "What's on your mind?",
        "Looking for something?",
        "What's on todays agenda..."
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
            justOpened = true; // NEW: Set flag when opening
            const prompt = getNextPrompt();

            SearchButton.setAttribute(
                "onmouseenter",
                `setupTooltip('#resourcesMenuOpen', '${prompt}')`
            );

            // ResultsDisplay.style.display = "flex";

            if (prompt && prompt.length > 10) {
                SearchBarInput.style.width = `calc(175px + ${prompt.length * 1.75
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

            // NEW: Clear the flag after a delay to allow focus to settle
            setTimeout(() => {
                justOpened = false;
            }, 300);
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

    let IsInteractingTouch = false;
    if (!isMobile()) {
        // Button click opens
        SearchButton.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!isSearching) {
                toggleSearchView(true);
            }
        });
    } else {
        SearchButton.addEventListener("touchstart", (touchev) => {
            if (!IsInteractingTouch) {
                IsInteractingTouch = true;
            }
            touchev.stopPropagation();
            touchev.preventDefault(); // NEW: Prevent default touch behavior
        });
        SearchButton.addEventListener("touchend", (touchev) => {
            if (IsInteractingTouch) {
                IsInteractingTouch = false;
                if (!isSearching) {
                    toggleSearchView(true);
                }
            }
            touchev.stopPropagation();
            touchev.preventDefault(); // NEW: Prevent default touch behavior
        });
    }

    // Click outside closes
    document.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!SearchButton.contains(e.target)) {
            toggleSearchView(false);
        }
    });

    // MODIFIED: Blur closes if focus leaves (but not if just opened)
    SearchBarInput.addEventListener("blur", () => {
        // NEW: Don't close if we just opened the search
        if (justOpened) {
            return;
        }
        
        if (!SearchButton.contains(document.activeElement)) {
            clearResultsContainer();
            toggleSearchView(false);
            if (ResultsDisplay) {
                ResultsDisplay.style.display = "none";
            }
        }
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

            async function ResetClickSound() {
                ClickSound.currentTime = 0;
                return true;
            }

            /**
             * @since 1.4.0
             * Plays a click sound when typing in the search bar, except for Control and Alt keys.
             * This enhances user feedback while typing.
             */
            if (!KeyClickDebounce && SearchBarInput.value.length > 0 && e.key !== "Control" && e.key !== "Alt") {
                let ok = ResetClickSound();
                if (ok) {
                    console.log("Playing Click Sound for Keypress...");
                    ClickSound.play().catch((error) => {
                        ClickSound.play().catch(() => { /* Ignored */ });
                        console.warn("Click sound play was prevented:", error);
                    });
                    KeyClickDebounce = setTimeout(() => {
                        clearTimeout(KeyClickDebounce);
                        KeyClickDebounce = null;
                    }, 50);
                }
            }

            if (SearchBarInput.value) {
                let results = ProcessSearchRequest(SearchBarInput.value);
                DisplaySearchResults(results, "search-results", SearchBarInput.value);
            }

            if (SearchBarInput.value.length === 0) {
                clearResultsContainer();
            }

            if (ResultsDisplay && SearchBarInput.value && SearchBarInput.value.length > 0) {
                ResultsDisplay.style.display = "flex";
            } else if (ResultsDisplay) {
                ResultsDisplay.style.display = "none";
            }

            if (SearchBarInput.value.length > 0) {
                if (e.key === "Enter") {
                    /*
                        To open critical window manually: enter this in DC (Developer Console)

                        const CriticalResultPage = "./index/Error/crtitical_error.html";
                        window.open(`${CriticalResultPage}`, "_blank", "width=750,height=750");
                    */

                    const NoResultsPage = "./index/Error/content_not_found.html";
                    const CriticalResultPage = "./index/Error/crtitical_error.html";
                    console.log("Submitted Search Request: " + `${SearchBarInput.value}`);
                    SubmittedSearchQuery = SearchBarInput.value;

                    try {
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
                                window.open(`${NoResultsPage}`, "_blank", "width=750,height=750");
                            }
                        }
                    } catch (error) {
                        console.error(`Critical Error in processing search ${SearchBarInput.value}: `, error);
                        window.open(`${CriticalResultPage}`, "_blank", "width=750,height=750");
                    } finally {
                        SearchBarInput.blur();
                        toggleSearchView(false);
                    }
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

        if (e.ctrlKey && e.key.toLowerCase() === "q") {
            e.preventDefault(); // Stop browser defaults
            console.log("Detected Input of Control + Q");
            console.log("Clearing Search Input...");

            if (SearchBarInput.value) {
                SearchBarInput.value = " ";
                let results = ProcessSearchRequest(SearchBarInput.value);
                DisplaySearchResults(results, "search-results", SearchBarInput.value);
                SearchBarInput.value = "";
            }
        }
    });

    SearchBarInput.addEventListener("focus", (e) => {
        if (isSearching) {
            if (SearchBarInput.value) {
                let output = ProcessSearchRequest(SearchBarInput.value);
                DisplaySearchResults(output, "search-results", SearchBarInput.value);
                if (ResultsDisplay && ResultsDisplay.style.display === "none" && SearchBarInput.value.length > 0) {
                    ResultsDisplay.style.display = "flex";
                }
            }
        }
        ensureOutputUpdate();
        e.stopPropagation();
    });

    let EnsureUpdateTimeout = null;
    function ensureOutputUpdate() {
        if (EnsureUpdateTimeout) return;
        if (!isSearching) return;
        let SearchIV = SearchBarInput.value;

        let Results = ProcessSearchRequest(SearchIV);
        DisplaySearchResults(Results, "search-results", SearchIV);

        if (isSearching) {
            EnsureUpdateTimeout = setInterval(() => {
                ensureOutputUpdate();
                clearTimeout(EnsureUpdateTimeout);
                EnsureUpdateTimeout = null;
            }, 100);
        } else {
            return false;
        }
    }
});
