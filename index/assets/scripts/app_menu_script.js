const expandCollapse = document.getElementById('expandOrCollapseSM');
const settingsCon = document.getElementById('settingsContainer');
const closeAppMenu = document.getElementById('closeAppMenu');
const appMenu = document.getElementById('appMenu');
const appMenuOpen = document.getElementById('appMenuOpen');

let computeStyle = getComputedStyle;

function awaitAnimation(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

closeAppMenu.onclick = () => {
    if (appMenu.style.display === "flex" || appMenu.style.display === '') {
        appMenu.style.display = "none";
        notify("App Menu Closed...");
        document.title = "HtWebz Homepage";
    } else {
        return;
    }
}

appMenuOpen.onclick = () => {
    if (appMenu.style.display === "none" || appMenu.style.display === '') {
        appMenu.style.display = "flex";
        notify("App Menu Opened...");
        document.title = "Apps Menu";
    } else {
        return;
    }
}