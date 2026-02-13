const expandCollapse = document.getElementById("expandOrCollapseSM");
const settingsCon = document.getElementById("settingsContainer");
const closeAppMenu = document.getElementById("closeAppMenu");
const appMenu = document.getElementById("appMenu");
const appMenuOpen = document.getElementById("appMenuOpen");
const HtWebzEditor = document.getElementById("textEditorAppButton");

let isAppMenuOpen = false;

function awaitAnimation(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function TriggerCloseAppMenu() {
  if (appMenu.style.display === "flex" || appMenu.style.display === "") {
    appMenu.style.display = "none";
    notify("App Menu Closed...");
    // document.title = "HtWebz Homepage";
    isAppMenuOpen = false;
  } else {
    return;
  }
}

closeAppMenu.onclick = () => {
  TriggerCloseAppMenu();
}

appMenuOpen.onclick = () => {
  if (appMenu.style.display === "none" || appMenu.style.display === "") {
    appMenu.style.display = "flex";
    notify("App Menu Opened...");
    // document.title = "Apps Menu";
    isAppMenuOpen = true;
    appMenu.classList.add("dragAppMenuIn");
    awaitAnimation(650).then(() => {
      appMenu.classList.remove("dragAppMenuIn");
    });
  } else {
    return;
  }
}

document.addEventListener("click", (e) => {
  const clicked = e.target;

  const clickedInsideMenu = appMenu.contains(clicked);
  const clickedOpenButton = appMenuOpen.contains(clicked);

  // If click is on the open button, toggle or ignore
  if (clickedOpenButton) {
    return;
  }

  // If menu is open and click is outside it → close
  if (appMenuOpen && !clickedInsideMenu && isAppMenuOpen === true) {
    TriggerCloseAppMenu();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (HtWebzEditor !== null) {
    HtWebzEditor.onclick = () => {
      window.open('/e-doc', '_blank');
    };
  }
});
