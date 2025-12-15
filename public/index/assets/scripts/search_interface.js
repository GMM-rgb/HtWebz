/**
 * @type {string} SubmittedSearchQuery - Stores the last submitted search query.
 */
let SubmittedSearchQuery = null;
let KeyClickDebounce = null;
let isSearching = false;
let justOpened = false;

let isFocused = false;
let justLostFocus = false;
let isTogglingView = false;

window.addEventListener("DOMContentLoaded", (e) => {
    const SearchButton = document.getElementById("resourcesMenuOpen");
    const SearchLabelText = SearchButton.querySelector(".resources-menu-text");
    const SearchLabelIconWrapper = SearchButton.querySelector("#resourcesIconWrapper");
    const SearchBarInput = document.getElementById("SearchBarInput");
    const ClickSound = document.getElementById("GlobalClick");

    let ResultsDisplay = document.getElementById("search-results");
    let WindowWidth = window.innerWidth || 0;
    let PlayedFocusAnimationSpin = false;

    /**
     * Plays the menu open sound normally, or reversed based on the boolean input.
     * @param {boolean} reversed
     * @param {number} volume
     */
    function playSearchBarEffect(reversed, volume) {
        // Fire and forget - no Promise return! Cause there were issues with the animation getting out of sync.
        setTimeout(() => {
            (async () => {
                try {
                    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    const audioFile = await fetch(reversed ? 
                        "/index/assets/audio/UI_Effects/menu_open_sound_reverse.mp3" : 
                        "/index/assets/audio/UI_Effects/menu_open_sound.mp3"
                    );
                    const audioArrayBuffer = await audioFile.arrayBuffer();
                    const audioBuffer = await audioCtx.decodeAudioData(audioArrayBuffer);

                    const playSound = () => {
                        const source = audioCtx.createBufferSource();
                        source.buffer = audioBuffer;
                        
                        const gainNode = audioCtx.createGain();
                        gainNode.gain.value = volume ? volume : 2.0;
                        
                        source.connect(gainNode);
                        gainNode.connect(audioCtx.destination);
                        
                        source.start(0, 0.2);
                        console.log("✓ Audio played!");
                    };
                    
                    if (audioCtx.state === 'suspended') {
                        await audioCtx.resume();
                    }
                    playSound();
                } catch (playbackError) {
                    console.error(playbackError);
                }
            })();
        }, 0);
    }

    function ToggleBlueBorderGradient(toggle_bool) {
        if (SearchButton && (SearchButton instanceof HTMLButtonElement)) {
            if (toggle_bool) {
                SearchButton.classList.add("Focused");
                playSearchBarEffect(false);
            } else {
                SearchButton.classList.remove("Focused");
                playSearchBarEffect(true);
            }
        } else {
            console.warn(`WARNING: Invalid Search Button Element.`);
        }
    }

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
        }
    }

    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );
    }

    const isMobileDevice = isMobile();
    
    if (isMobileDevice && ResultsDisplay) {
        ResultsDisplay.remove();
        ResultsDisplay = null;
    }

    function toggleSearchView(open, shouldFocus = true) {
        isSearching = open;

        if (open) {
            justOpened = true;
            const prompt = getNextPrompt();

            SearchButton.setAttribute(
                "onmouseenter",
                `setupTooltip('#resourcesMenuOpen', '${prompt}')`
            );

            if (prompt && prompt.length > 10) {
                SearchBarInput.style.width = `calc(175px + ${prompt.length * 1.75}px - 15px)`;
            } else {
                SearchBarInput.style.width = "calc(175px - 15px)";
            }

            SearchLabelText.style.display = "none";
            SearchBarInput.classList.add("open");

            if (WindowWidth && WindowWidth <= 762) {
                SearchBarInput.setAttribute("placeholder", "Search...");
                SearchBarInput.style.textIndent = "5px";
            } else {
                SearchBarInput.setAttribute("placeholder", prompt);
            }

            // CRITICAL: Focus must happen synchronously for iOS Safari
            if (shouldFocus) {
                SearchBarInput.focus();
            }

            // Clear the flag after allowing focus to settle
            setTimeout(() => {
                justOpened = false;
            }, 400);
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
            
            // Set flag BEFORE blur to prevent event cascade
            isTogglingView = true;
            SearchBarInput.blur();
            setTimeout(() => {
                isTogglingView = false;
            }, 50);
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

    // Desktop/non-mobile event handling
    if (!isMobileDevice) {
        SearchButton.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!isSearching) {
                toggleSearchView(true);
            }
        });
    } else {
        // Mobile: use click event which iOS allows to focus inputs
        // Track that it's from a real touch to prevent issues
        let realTouch = false;
        
        SearchButton.addEventListener("touchstart", (e) => {
            realTouch = true;
        }, { passive: true });
        
        SearchButton.addEventListener("click", (e) => {
            if (!realTouch) return; // Ignore synthetic clicks
            realTouch = false;
            
            e.stopPropagation();
            
            if (!isSearching) {
                // Set up the UI
                isSearching = true;
                justOpened = true;
                const prompt = getNextPrompt();

                SearchButton.setAttribute(
                    "onmouseenter",
                    `setupTooltip('#resourcesMenuOpen', '${prompt}')`
                );

                if (prompt && prompt.length > 10) {
                    SearchBarInput.style.width = `calc(175px + ${prompt.length * 1.75}px - 15px)`;
                } else {
                    SearchBarInput.style.width = "calc(175px - 15px)";
                }

                SearchLabelText.style.display = "none";
                SearchBarInput.classList.add("open");

                if (WindowWidth && WindowWidth <= 762) {
                    SearchBarInput.setAttribute("placeholder", "Search...");
                    SearchBarInput.style.textIndent = "5px";
                } else {
                    SearchBarInput.setAttribute("placeholder", prompt);
                }

                // Focus synchronously in click handler (iOS allows this)
                SearchBarInput.focus();

                setTimeout(() => {
                    justOpened = false;
                }, 400);
            }
        });
    }

    // Click outside closes
    document.addEventListener("click", (e) => {
        if (!SearchButton.contains(e.target)) {
            toggleSearchView(false);
        }
    });

    // Touch outside closes (for mobile)
    if (isMobileDevice) {
        document.addEventListener("touchend", (e) => {
            if (!SearchButton.contains(e.target)) {
                toggleSearchView(false);
            }
        }, { passive: true });
    }

    // Blur handler with guard
    SearchBarInput.addEventListener("blur", () => {
        if (isTogglingView) {  // REMOVED justOpened check
            return;
        }

        isFocused = false;
        justLostFocus = true;
        
        // IMMEDIATE classList change
        ToggleBlueBorderGradient(false);
        
        setTimeout(() => {
            justLostFocus = false;
        }, 200);

        setTimeout(() => {
            if (!justOpened || !isSearching) SearchBarInput.value = "";
        }, 500);

        setTimeout(() => {
            if (!SearchButton.contains(document.activeElement) && !justOpened) {
                clearResultsContainer();
                toggleSearchView(false, false);
                if (ResultsDisplay) {
                    ResultsDisplay.style.display = "none";
                }
            }
        }, 100);
        PlayedFocusAnimationSpin = false;
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

            function ResetClickSound() {
                ClickSound.currentTime = 0;
                return true;
            }

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
                    const NoResultsPage = "./index/Error/content_not_found.html";
                    const CriticalResultPage = "./index/Error/crtitical_error.html";
                    console.log("Submitted Search Request: " + `${SearchBarInput.value}`);
                    SubmittedSearchQuery = SearchBarInput.value;

                    try {
                        if (SubmittedSearchQuery) {
                            let results = ProcessSearchRequest(SubmittedSearchQuery);
                            
                            if (results.hasResults && results.matches && results.bestMatch) {
                                let BestMatchURL = results.bestMatch.url;
                                window.notify?.("Redirecting...");
                                setTimeout(() => {
                                    loadSearchPage?.(BestMatchURL) ?? console.error("Failed to load search page request.");
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
            e.preventDefault();
            console.log("Detected Input of Control + Q");
            console.log("Clearing Search Input...");

            if (SearchBarInput.value) {
                SearchBarInput.value = " ";
                let results = ProcessSearchRequest?.(SearchBarInput.value) ?? console.warn("Could not process search.");
                DisplaySearchResults?.(results, "search-results", SearchBarInput.value) ?? (console.warn("Could not display search results.") && window.notify?.("Search Result Display Failure"));
                SearchBarInput.value = "";
            }
        }
    });

    SearchBarInput.addEventListener("focus", (e) => {
        if (isSearching) {
            if (SearchBarInput.value) {
                isFocused = true;
                let output = ProcessSearchRequest?.(SearchBarInput.value) ?? console.warn("Could not process search.");
                if (output) DisplaySearchResults?.(output, "search-results", SearchBarInput.value) ?? (console.warn("Could not display search results.") && window.notify?.("Search Result Display Failure"));
                if (ResultsDisplay && ResultsDisplay.style.display === "none" && SearchBarInput.value.length > 0) {
                    ResultsDisplay.style.display = "flex";
                }
            }
            // IMMEDIATE classList change
            ToggleBlueBorderGradient(true);
        }
        ensureOutputUpdate?.();
        e.stopPropagation();
    });

    SearchBarInput.addEventListener("focusin", (e) => {
        if (!PlayedFocusAnimationSpin && justOpened) {
            isFocused = true;
            SearchLabelIconWrapper.classList.add("FocusSpin");
            SearchLabelIconWrapper.addEventListener("animationend", (e) => {
                if (e.animationName === "FocusSpinAnimation") {
                    PlayedFocusAnimationSpin = true;
                    SearchLabelIconWrapper.classList.remove("FocusSpin");
                }
            }, { once: true });
        }
    });

    SearchButton.addEventListener("click", () => {
        if (isSearching && !SearchButton.classList.contains("Focused") && !justLostFocus) {
            SearchBarInput.focus();
        }
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
}, { once: true });

console.log("✓ Search Interface Loaded & Operational.");
