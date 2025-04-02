document.addEventListener('DOMContentLoaded', () => {
    // Get all required elements
    const elements = {
        notification: document.getElementById("notification"),
        quickSettings: document.getElementById("settingsQuick"),
        gameMenu: document.getElementById("gameMenu"),
        searchMenu: document.getElementById("searchMenu"),
        menuBlur: document.getElementById("menuBlur"),
        closeGameMenuButton: document.getElementById("closeGameMenuButton"),
        closeSearchMenuBtn: document.getElementById("closeSearchMenuBtn"),
        searchMenuOpen: document.getElementById("resourcesMenuOpen"),
        searchPageDisplay: document.getElementById("searchPageDisplay"),
        closeSettingsMenuBtn: document.getElementById("closeSettingsMenuBtn"),
        settingsMenu: document.getElementById("settingsMenu"),
        settingsQuick: document.getElementById("settingsQuick"),
        appMenuOpen: document.getElementById("appMenuOpen"),
        gamesMenuOpen: document.getElementById("gamesMenuOpen"),
        expandMenuToolbar: document.getElementById("expandMenuToolbar")
    };

    // Validate all elements exist
    Object.entries(elements).forEach(([name, element]) => {
        if (!element) console.error(`Required element "${name}" is missing`);
    });

    // Notification system
    let notificationShowing = false;

    // Make notify function global
    window.notify = async function(text) {
        if (!text || notificationShowing || !elements.notification) return;
        
        notificationShowing = true;
        elements.notification.innerText = text;
        elements.notification.classList.add("showNotification", "animateNotification");
        
        await wait(450);
        elements.notification.style.boxShadow = 
            "inset 0 0 13.5px rgba(0, 0, 0, 0.365), 0 2px 10px rgba(0, 0, 0, 0.325)";
        
        await wait(1850);
        elements.notification.classList.add("hideNotification");
        elements.notification.style.boxShadow = "inset 0 0 13.5px rgba(0, 0, 0, 0.365)";
        
        await wait(450);
        elements.notification.classList.remove("showNotification", "animateNotification", "hideNotification");
        elements.notification.innerText = "...";
        notificationShowing = false;
    };

    // Menu handling
    function openMenu(menu, menuClass, blur = true) {
        if (!menu || menu.style.display === "flex") return;
        
        menu.style.display = "flex";
        menu.style.opacity = "1";
        menu.classList.add(menuClass); // Add animation class
        
        if (blur && elements.menuBlur) {
            elements.menuBlur.style.display = "block";
            setTimeout(() => elements.menuBlur.style.opacity = "0.5", 10);
        }
        
        // Remove animation class after animation completes
        setTimeout(() => {
            menu.classList.remove(menuClass);
        }, 650);
    }

    function closeMenu(menu, blur = true) {
        if (!menu) return;
        
        menu.style.opacity = "0";
        if (blur && elements.menuBlur) {
            elements.menuBlur.style.opacity = "0";
        }
        
        setTimeout(() => {
            menu.style.display = "none";
            menu.style.opacity = "1";
            if (blur && elements.menuBlur) {
                elements.menuBlur.style.display = "none";
            }
        }, 650);
    }

    // Attach event listeners
    if (elements.gamesMenuOpen) {
        elements.gamesMenuOpen.onclick = () => {
            openMenu(elements.gameMenu, 'dropDownGameMenu');
            notify("Game Menu Opened...");
            document.title = "Game Menu";
        };
    }

    if (elements.closeGameMenuButton) {
        elements.closeGameMenuButton.onclick = () => {
            closeMenu(elements.gameMenu);
            notify("Game Menu Closed...");
            document.title = "HtWebz Homepage";
        };
    }

    if (elements.searchMenuOpen) {
        elements.searchMenuOpen.onclick = () => {
            openMenu(elements.searchMenu, 'dropDownSearchMenu');
            notify("Search Menu Opened...");
            document.title = "Search Menu";
        };
    }

    if (elements.closeSearchMenuBtn) {
        elements.closeSearchMenuBtn.onclick = () => {
            closeMenu(elements.searchMenu);
            notify("Search Menu Closed...");
            document.title = "HtWebz Homepage";
        };
    }

    if (elements.settingsQuick) {
        elements.settingsQuick.onclick = () => {
            openMenu(elements.settingsMenu, 'dropDownSettingsMenu');
            notify("Settings Menu Opened...");
            document.title = "Settings Menu";
        };
    }

    if (elements.closeSettingsMenuBtn) {
        elements.closeSettingsMenuBtn.onclick = () => {
            closeMenu(elements.settingsMenu);
            notify("Settings Menu Closed...");
            document.title = "HtWebz Homepage";
        };
    }

    // Add sticky scroll detection
    const pinnedTitle = document.querySelector('.pinned-content-title');
    if (pinnedTitle) {
        const observer = new IntersectionObserver(
            ([e]) => {
                pinnedTitle.classList.toggle('sticky-active', e.intersectionRatio < 1);
            },
            { threshold: [1], rootMargin: '-85px 0px 0px 0px' }
        );
        observer.observe(pinnedTitle);
    }

    // Helper function
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});
