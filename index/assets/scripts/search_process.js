let MaxRetryAttempts = 3;
let RetryAttempts = 0;

// const SearchQueryKeywords_ThisWebsite = {
//     "Homepage": "./index.html",
//     "Game Library": "./Games/library.html",
//     "Dino Game": "./Games/DinoGame.html",
//     "Basics - Wiki": `./Wiki/HtWiki.html?${new URLSearchParams("topic=htwebz-basics")}`,
//     "About - Wiki": `/Wiki/HtWiki.html?${new URLSearchParams("topic=about-htwebz")}`,
// };

const defaultsearch = {
    "Homepage": "./index.html",
    "Game Library": "./Games/library.html",
    "Dino Game": "./Games/DinoGame.html",
};

const wikisearch = {
    "Basics - Wiki": `./Wiki/HtWiki.html?${new URLSearchParams("topic=htwebz-basics")}`,
    "About - Wiki": `/Wiki/HtWiki.html?${new URLSearchParams("topic=about-htwebz")}`,
};

const SearchQueryKeywords_Command = {
    "wiki": "/wiki".toLowerCase(),
};

let SearchQueryKeywords_ThisWebsite = defaultsearch;

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
 */
function MultiWordIncludes(v) {
    if (v) {
        const words = v.split(" ").filter(word => word !== "");
        return words.length > 1;
    } else {
        return false;
    }
}

// Find partial matches for a search term
/**
 * @param {string} searchTerm 
 * @returns {Array} Array of matched results with scores
 */
function FindPartialMatches(searchTerm) {
    const results = [];
    const lowerSearchTerm = searchTerm.toLowerCase();

    for (const [key, url] of Object.entries(SearchQueryKeywords_ThisWebsite)) {
        const lowerKey = key.toLowerCase();
        let score = 0;

        // Exact match gets highest score
        if (lowerKey === lowerSearchTerm) {
            score = 100;
        }
        // Starts with search term gets high score
        else if (lowerKey.startsWith(lowerSearchTerm)) {
            score = 90;
        }
        // Contains search term gets medium score
        else if (lowerKey.includes(lowerSearchTerm)) {
            score = 70;
        }
        // Partial character matching for typos/incomplete words
        else {
            // Calculate similarity based on character overlap
            let matchCount = 0;
            for (let i = 0; i < Math.min(lowerSearchTerm.length, lowerKey.length); i++) {
                if (lowerSearchTerm[i] === lowerKey[i]) {
                    matchCount++;
                } else {
                    break; // Stop at first mismatch for prefix matching
                }
            }

            if (matchCount > 0) {
                score = Math.floor((matchCount / lowerSearchTerm.length) * 50);
            }
        }

        if (score > 0) {
            results.push({
                key: key,
                url: url,
                score: score,
                matchType: score === 100 ? 'exact' : score === 90 ? 'startsWith' : score === 70 ? 'contains' : 'partial'
            });
        }
    }

    // Sort by score (highest first)
    return results.sort((a, b) => b.score - a.score);
}

// Process multi-word search queries
/**
 * @param {Array} words 
 * @returns {Array} Combined results from all words
 */
function ProcessMultiWordSearch(words) {
    const allResults = [];

    for (const word of words) {
        const wordResults = FindPartialMatches(word);
        allResults.push(...wordResults);
    }

    // Remove duplicates and combine scores
    const combinedResults = {};
    for (const result of allResults) {
        if (combinedResults[result.key]) {
            combinedResults[result.key].score += result.score;
        } else {
            combinedResults[result.key] = { ...result };
        }
    }

    return Object.values(combinedResults).sort((a, b) => b.score - a.score);
}

// Process the users search request when provided.
// If the search input is not a string then return nothing (null).
// If the search is valid and there is a match then it will return JSON data for the user.
/**
 * @param {string} SearchQueryInput 
 * @returns {Object|null} Search results object
 */
function ProcessSearchRequest(SearchQueryInput) {
    let Results = {
        query: SearchQueryInput,
        matches: [],
        bestMatch: null,
        hasResults: false
    };

    try {
        if (SearchQueryInput && typeof SearchQueryInput === "string") {
            console.log(`Processing search for: ${SearchQueryInput}`);

            /**
             * Removes command keyword(s) from input and cleans up whitespace.
             * @param {string} InputValue
             * @returns {{ Filtered: string, success: boolean }}
             */
            function removeCommandSplice(InputValue) {
                if (!InputValue) return { Filtered: "", success: false };

                try {
                    // Always normalize to a string
                    let newValue = (InputValue ?? "").toString();

                    // Remove the specific command keyword (example: wiki)
                    if (SearchQueryKeywords_Command?.wiki) {
                        const cmd = String(SearchQueryKeywords_Command.wiki)
                            .replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape regex chars
                        const regex = new RegExp(cmd, "g");
                        newValue = newValue.replace(regex, "");
                    }

                    // Collapse multiple spaces and trim edges
                    newValue = newValue.replace(/\s+/g, " ").trim();

                    return { Filtered: newValue, success: newValue.length > 0 };
                } catch (error) {
                    console.error("Error in removing command segment:", error);
                    return { Filtered: "", success: false };
                }
            }

            function detectCommandInput() {
                if (typeof SearchQueryInput === "string" && SearchQueryInput !== null) {
                    if (SearchQueryInput.includes(SearchQueryKeywords_Command.wiki)) {
                        SearchQueryKeywords_ThisWebsite = wikisearch;
                        SearchQueryInput = removeCommandSplice(SearchQueryInput);
                    } else {
                        SearchQueryKeywords_ThisWebsite = defaultsearch;
                    }
                }
            }
            requestAnimationFrame(detectCommandInput);

            const trimmedInput = SearchQueryInput.trim();
            if (!trimmedInput) return Results;

            let matches = [];

            if (MultiWordIncludes(trimmedInput)) {
                const WordSplit = trimmedInput.split(" ").filter(word => word !== "");
                console.log("Multi-word search:", WordSplit);
                matches = ProcessMultiWordSearch(WordSplit);
            } else {
                console.log("Single-word search:", trimmedInput);
                matches = FindPartialMatches(trimmedInput);
            }

            Results.matches = matches;
            Results.bestMatch = matches.length > 0 ? matches[0] : null;
            Results.hasResults = matches.length > 0;

            console.log("Search results:", Results);
        } else {
            console.warn("Search Input for Query was not a valid format.");
            return null;
        }

    } catch (error) {
        console.error("Error processing search request:", error);
        Results.error = error.message;
    }

    return Results;
}

// Function to display search results in HTML
/**
 * @param {Object} searchResults - Results from ProcessSearchRequest
 * @param {string} containerId - ID of HTML container to display results
 * @param {string} CurrentInputData - The Real Time status of the search input
 */
function DisplaySearchResults(searchResults, containerId, CurrentInputData) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!containerId) return;

    if (!searchResults.hasResults) {
        container.innerHTML = '<span class="search-result-item no-results"><strong>No results found</strong></span>';
        return;
    }

    // Split input into array of characters
    const inputChars = CurrentInputData.split("");

    // Helper: highlight matching characters in the same position
    function highlightMatch(text, inputChars) {
        let highlighted = "";
        for (let i = 0; i < text.length; i++) {
            if (inputChars[i] && text[i].toLowerCase() === inputChars[i].toLowerCase()) {
                highlighted += `<strong>${text[i]}</strong>`;
            } else {
                highlighted += text[i];
            }
        }
        return highlighted;
    }

    let html = '<div class="search-results">';
    searchResults.matches.forEach((result, index) => {
        const highlightedKey = highlightMatch(result.key, inputChars);
        if (index < 1) {
            html += `
                <li style="list-style-type:none;" class="search-result-item best-match" data-index="${index}">
                    <p>${highlightedKey}</p> 
                    <!--<span class="score">(Score: ${result.score})</span>-->
                    <span class="match-type">[${result.matchType}]</span>
                </li>
            `;
            // let bestResultItem = container.querySelector(".search-result-item best");
        } else if (index >= 1) {
            html += `
                <li style="list-style-type:none;" class="search-result-item" data-index="${index}">
                    <p>${highlightedKey}</p> 
                    <!--<span class="score">(Score: ${result.score})</span>-->
                    <span class="match-type">[${result.matchType}]</span>
                </li>
            `;
        } else {
            html += `
                <li style="list-style-type:none;" class="search-result-item error" data-index="${index}">
                    <strong>[Error]</strong>
                </li>
            `;
        }
    });
    html += '</div>';

    container.innerHTML = html;
    return container;
}