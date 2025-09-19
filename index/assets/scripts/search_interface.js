let isSearching = false;

document.addEventListener("DOMContentLoaded", () => {
    const SearchButton = document.getElementById("resourcesMenuOpen");
    const SearchLabelText = SearchButton.querySelector(".resources-menu-text");
    const SearchBarInput = SearchButton.querySelector(".search-bar-input");

    // Prompt list
    const searchPrompts = [
        "Search for something...",
        "What’s on your mind?",
        "Summon the results.",
        "Looking for something?"
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

    function toggleSearchView(open) {
        isSearching = open;

        if (open) {
            const prompt = getNextPrompt();

            SearchButton.setAttribute(
                "onmouseenter",
                `setupTooltip('#resourcesMenuOpen', '${prompt}')`
            );
            SearchButton.style.paddingLeft = "10px";
            SearchBarInput.setAttribute("placeholder", prompt);

            SearchLabelText.style.display = "none";
            SearchBarInput.classList.add("open");
            SearchBarInput.focus();
        } else {
            SearchButton.setAttribute(
                "onmouseenter",
                "setupTooltip('#resourcesMenuOpen', 'Click to open Search Menu.')"
            );
            SearchBarInput.setAttribute("placeholder", "");

            SearchLabelText.style.display = "block";
            SearchBarInput.classList.remove("open");
            SearchBarInput.blur();

            setTimeout(() => {
                if (!open) {
                    SearchButton.style.paddingLeft = "0";
                }
            }, 0);
        }
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
                toggleSearchView(false);
            }
        }, 0);
    });

    // Listen for search action keybind
    SearchBarInput.addEventListener("keydown", (e) => {
        e.stopImmediatePropagation();
        if (SearchBarInput.value.length > 0) {
            if (e.key === "Enter") {
                console.log("Submitted Search Request");
                setTimeout(() => {
                    SearchBarInput.blur();
                    toggleSearchView(false);
                }, 0);
            }
        }
    });
});
