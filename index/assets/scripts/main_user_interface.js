const notification = document.getElementById('notification');
const quickSettings = document.getElementById("settingsQuick");
const gameMenu = document.getElementById('gameMenu');
const searchMenu = document.getElementById('searchMenu');
const menuBlur = document.getElementById('menuBlur');
const closeGameMenuButton = document.getElementById('closeGameMenuButton');
const closeSearchMenuBtn = document.getElementById('closeSearchMenuBtn');
const searchMenuOpen = document.getElementById('resourcesMenuOpen');
const searchPageDisplay = document.getElementById('searchPageDisplay');

// Multifunction wait timer
function wait(ms) {
    if (wait) {
        console.log("Creating Timer...");
    } try {
        return new Promise(resolve => setTimeout(resolve, ms));
    } catch (error) {
        console.log("Timer promise was not successfully created!", error);
    } finally {
        console.log("Timer Created");
    }
}

// Control to only allow one notification in a certain timeframe
let notificationShowing = false;

// Multiple use notification system
async function notify(notificationText) {
    if (notificationText && !notificationShowing) {
        notificationShowing = true;
        notification.innerText = notificationText;
        notification.classList.add("showNotification");
        notification.classList.add("animateNotification");
        wait(450).then(() => {
            notification.style.boxShadow = "inset 0 0 13.5px rgba(0, 0, 0, 0.365), 0 2px 10px rgba(0, 0, 0, 0.325)";
        });
        return wait(1850).then(() => {
            notification.classList.add("hideNotification");
            notification.style.boxShadow = "inset 0 0 13.5px rgba(0, 0, 0, 0.365)";
            wait(450).then(() => {
                notification.classList.remove("showNotification");
                notification.classList.remove("animateNotification");
                notification.classList.remove("hideNotification");
                notification.innerText = '...';
            });
            return notificationShowing = false;
        }, notificationShowing);
    }
}

appMenuOpen.onclick = () => {
    if(quickSettings.style.transform === "scale(1)" || quickSettings.style.transform === '') {
        quickSettings.style.transform = 'scale(0.85)';
    }
}

// Opens the game menu when the game button is clicked
gamesMenuOpen.onclick = () => {
    if(gameMenu.style.display === "none" || gameMenu.style.display === '') {
        notify("Game Menu Opened...");
        menuBlur.style.opacity = "0";
        menuBlur.style.display = "block";
        gameMenu.style.display = "flex";
        gameMenu.classList.add("dropDownGameMenu");
        document.title = "Game Menu";
        wait(650).then(() => {
            gameMenu.classList.remove("dropDownGameMenu");
            gameMenu.style.height = "535px";
        });
        wait(10).then(() => {
            menuBlur.style.opacity = "0.5";
        })
    } else {
        gameMenu.style.display = "none";
        menuBlur.style.edisplay = "none";
    }
}

// Closes game menu when the close button is clicked
closeGameMenuButton.onclick = () => {
    if(gameMenu.style.display === "flex" || gameMenu.style.display === '') {
        gameMenu.style.opacity = "0";
        menuBlur.style.opacity = "0";
        document.title = "HtWebz Homepage";
        wait(650).then(() => {
            gameMenu.style.display = "none";
            gameMenu.style.opacity = "1";
            menuBlur.style.display = "none";    
        });
        notify("Game Menu Closed...");
    }
}

// Opens search menu when the search button is clicked
searchMenuOpen.onclick = () => {
    if(searchMenu.style.display === "none" || searchMenu.style.display === '') {
        notify("Search Menu Opened...");
        document.title = "Search Menu";
        menuBlur.style.display = "block";
        searchMenu.style.opacity = "1";
        searchMenu.style.display = "flex";
        searchMenu.classList.add("dropDownSearchMenu");
        wait(650).then(() => {
            searchMenu.classList.remove("dropDownSearchMenu");
            searchMenu.style.height = "535px";
            searchPageDisplay.style.height = "205%";
        });
        wait(10).then(() => {
            menuBlur.style.opacity = "0.5";
        });
    } else {
        searchMenu.style.display = "none";
        menuBlur.style.display = "none";
    }
}

// Closes search menu when the close button is clicked
closeSearchMenuBtn.onclick = () => {
    if(searchMenu.style.display === "flex" || searchMenu.style.displsy === '') {
        document.title = "HtWebz Homepage";
        searchMenu.style.display = " none";
        menuBlur.style.display = "none";
        searchMenu.style.height = "fit-content";
        searchPageDisplay.style.height = "100%";
        notify("Search Menu Closed...");
    }
}
