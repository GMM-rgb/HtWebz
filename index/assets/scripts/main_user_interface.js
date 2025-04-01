const notification = document.getElementById("notification");
const quickSettings = document.getElementById("settingsQuick");
const gameMenu = document.getElementById("gameMenu");
const searchMenu = document.getElementById("searchMenu");
const menuBlur = document.getElementById("menuBlur");
const closeGameMenuButton = document.getElementById("closeGameMenuButton");
const closeSearchMenuBtn = document.getElementById("closeSearchMenuBtn");
const searchMenuOpen = document.getElementById("resourcesMenuOpen");
const searchPageDisplay = document.getElementById("searchPageDisplay");
const closeSettingsMenuBtn = document.getElementById("closeSettingsMenuBtn");
const settingsMenu = document.getElementById("settingsMenu");
const settingsQuick = document.getElementById("settingsQuick");
const appMenuOpen = document.getElementById("appMenuOpen");
const gamesMenuOpen = document.getElementById("gamesMenuOpen");
const resourcesMenuOpen = document.getElementById("resourcesMenuOpen");

// Moved toolbar elements up so later code can use them:
const expandMenuToolbar = document.getElementById("expandMenuToolbar");
const toolbarExtension = document.getElementById("toolbarExtension");

// Multifunction wait timer
function wait(time) {
  if (wait) {
  }
  try {
    return new Promise((resolve) => setTimeout(resolve, time)); // Return the timer promise.
  } catch (error) {
    console.error("Timer promise was not successfully created!", error); // Added for debugging
  } finally {
    console.log("Timer promise successfully created!"); // Added for debugging
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
      notification.style.boxShadow =
        "inset 0 0 13.5px rgba(0, 0, 0, 0.365), 0 2px 10px rgba(0, 0, 0, 0.325)";
    });
    return wait(1850).then(() => {
      notification.classList.add("hideNotification");
      notification.style.boxShadow = "inset 0 0 13.5px rgba(0, 0, 0, 0.365)";
      wait(450).then(() => {
        notification.classList.remove("showNotification");
        notification.classList.remove("animateNotification");
        notification.classList.remove("hideNotification");
        notification.innerText = "...";
      });
      return (notificationShowing = false);
    }, notificationShowing);
  }
}

appMenuOpen.onclick = () => {
  if (
    quickSettings.style.transform === "scale(1)" ||
    quickSettings.style.transform === ""
  ) {
    quickSettings.style.transform = "scale(0.85)";
  }
};

// Opens the game menu when the game button is clicked
gamesMenuOpen.onclick = () => {
  if (gameMenu.style.display === "none" || gameMenu.style.display === "") {
    notify("Game Menu Opened...");
    menuBlur.style.opacity = "0";
    menuBlur.style.display = "block";
    gameMenu.style.display = "flex";
    gameMenu.classList.add("dropDownGameMenu");
    document.title = "Game Menu";
    wait(650).then(() => {
      gameMenu.classList.remove("dropDownGameMenu");
      gameMenu.style.height = "fit-content";
      gameMenu.style.flex = "1 1 auto";
    });
    wait(10).then(() => {
      menuBlur.style.opacity = "0.5";
    });
  } else {
    gameMenu.style.display = "none";
    gameMenu.style.flex = "0";
    menuBlur.style.edisplay = "none";
  }
};

// Closes game menu when the close button is clicked
closeGameMenuButton.onclick = () => {
  if (gameMenu.style.display === "flex" || gameMenu.style.display === "") {
    gameMenu.style.opacity = "0";
    menuBlur.style.opacity = "0";
    document.title = "HtWebz Homepage";
    wait(650).then(() => {
      gameMenu.style.display = "none";
      gameMenu.style.opacity = "1";
      menuBlur.style.display = "none";
      gameMenu.style.flex = "0";
    });
    notify("Game Menu Closed...");
  }
};

// Opens search menu when the search button is clicked
searchMenuOpen.onclick = () => {
  if (searchMenu.style.display === "none" || searchMenu.style.display === "") {
    notify("Search Menu Opened...");
    document.title = "Search Menu";
    menuBlur.style.display = "block";
    searchMenu.style.opacity = "1";
    searchMenu.style.display = "flex";
    searchMenu.classList.add("dropDownSearchMenu");
    wait(650).then(() => {
      searchPageDisplay.style.minHeight = "25%";
      searchPageDisplay.style.maxHeight = "100%";
      searchMenu.classList.remove("dropDownSearchMenu");
      searchMenu.style.flex = "auto";
      searchPageDisplay.style.flex = "auto";
    });
    wait(10).then(() => {
      menuBlur.style.opacity = "0.5";
    });
  } else {
    searchMenu.style.display = "none";
    menuBlur.style.display = "none";
  }
};

// Closes search menu when the close button is clicked
closeSearchMenuBtn.onclick = () => {
  if (searchMenu.style.display === "flex" || searchMenu.style.displsy === "") {
    document.title = "HtWebz Homepage";
    menuBlur.style.opacity = "0";
    searchMenu.style.opacity = "0";
    wait(650).then(() => {
      searchMenu.style.display = " none";
      searchMenu.style.opacity = "1";
      menuBlur.style.display = "none";
      searchMenu.style.flex = "0";
      searchMenu.style.height = "90%";
    });
    searchPageDisplay.style.minHeight = "none";
    searchPageDisplay.style.maxHeight = "none";
    notify("Search Menu Closed...");
  }
};

// Opens the settings menu when the settings button is clicked
settingsQuick.onclick = () => {
  if (
    settingsMenu.style.display === "none" ||
    settingsMenu.style.display === ""
  ) {
    document.title = "Settings Menu";
    notify("Settings Menu Opened...");
    menuBlur.style.display = "block";
    settingsMenu.style.display = "flex";
    settingsMenu.classList.add("dropDownSettingsMenu");
    settingsMenu.style.flex = "1 1 auto";
    settingsMenu.style.height = "100%";
    wait(650).then(() => {
      settingsMenu.classList.remove("dropDownSettingsMenu");
      settingsMenu.style.height = "fit-content";
    });
    wait(10).then(() => {
      menuBlur.style.opacity = "0.5";
    });
  } else {
    settingsMenu.style.display = "none";
    menuBlur.style.display = "none";
  }
};

// Closes the settings menu when the close button is clicked
closeSettingsMenuBtn.onclick = () => {
  if (
    settingsMenu.style.display === "flex" ||
    settingsMenu.style.display === ""
  ) {
    document.title = "HtWebz Homepage";
    menuBlur.style.opacity = "0";
    settingsMenu.style.opacity = "0";
    wait(650).then(() => {
      settingsMenu.style.display = "none";
      settingsMenu.style.opacity = "1";
      settingsMenu.style.flex = "0";
      settingsMenu.style.height = "100%";
      menuBlur.style.display = "none";
    });
    notify("Settings Menu Closed...");
  }
};

// Add cursor tracking for liquid effects
function handleButtonInteraction(event, element) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    element.style.setProperty('--liquid-x', `${x}px`);
    element.style.setProperty('--liquid-y', `${y}px`);
}

// Add event listeners for all buttons
[appMenuOpen, settingsQuick, expandMenuToolbar, gamesMenuOpen, resourcesMenuOpen].forEach(button => {
    button.addEventListener('mousemove', (e) => handleButtonInteraction(e, button));
    button.addEventListener('mouseenter', (e) => handleButtonInteraction(e, button));
    button.addEventListener('click', (e) => {
        handleButtonInteraction(e, button);
        button.classList.add('clicked');
        setTimeout(() => button.classList.remove('clicked'), 1000);
    });
});

let animationClass = "expandMenuAnimation"; // Animation name for the toolbarMenuExtension
let animationDuration = 500; // Duration in milliseconds
let toolbarExtensionStyle = window.getComputedStyle(toolbarExtension);

expandMenuToolbar.onclick = () => {
  let currentDisplay = toolbarExtension.style.display || toolbarExtensionStyle.display;

  if (currentDisplay === "none" || currentDisplay === "") {
    toolbarExtension.style.display = "flex";
    toolbarExtension.classList.add("expandMenuAnimation");
    alert("Toolbar is now visible!"); // Debugging log
    wait(animationDuration).then(() => {
      toolbarExtension.classList.remove("expandMenuAnimation");
      toolbarExtension.style.height = "fit-content";
      toolbarExtension.style.flex = "1 1 auto";
    });
  } else {
    alert("Toolbar is now hidden!"); // Debugging log
    toolbarExtension.style.display = "none"; // Hide the toolbar
  }

  console.log("Toolbar display state:", toolbarExtension.style.display); // Debugging log
};
