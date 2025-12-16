/**
 * @extends {Function<PropertyDefinition>}
 */
const socket = io();
let AccountCookie = null;
let UserAccountProfilePicture, WelcomeMainContentTitle;

window.addEventListener('DOMContentLoaded', () => {
    UserAccountProfilePicture = document.getElementById('accountExpandIcon');
    WelcomeMainContentTitle = document.getElementById('pinnedContentTitle');
    (async () => {
        AccountCookie = await cookieStore.set("AccountToken");
    });
});

socket.on('connect', () => {
    const storedID = localStorage.getItem('guestID');
    var storedAccountToken;
    socket.emit('registerGuest', { guestID: storedID });
});

function swapWithLoading(finalURL) {
    if (!UserAccountProfilePicture) return;

    // Step 1: show loading gif immediately
    requestAnimationFrame(() => { UserAccountProfilePicture.src = 'index/assets/images/load_icon_5649.gif'; });

    // Step 2: preload the final image
    const img = new Image();

    let timeoutId = setTimeout(async () => {
        console.warn("Image load timed out, falling back to default.");
        UserAccountProfilePicture.src = (await fetch('index/assets/images/icon_loading_failure.svg')).url;
    }, 5000); // 5s timeout for Loading time set

    img.onload = () => {
        clearTimeout(timeoutId); // Clear the timeout to prevent fallback from continueing
        setTimeout(() => {
            UserAccountProfilePicture.classList.add('fade-in');
            UserAccountProfilePicture.src = finalURL;
            UserAccountProfilePicture.addEventListener('animationend', () => {
                UserAccountProfilePicture.classList.remove('fade-in');
            }, { once: true, passive: true });
        }, Math.random() * 750 + 500);
    };

    img.onerror = async () => {
        clearTimeout(timeoutId);
        console.warn("Failed to load profile image, falling back to default.");
        UserAccountProfilePicture.src = (await fetch('index/assets/images/icon_loading_failure.svg')).url;
    };

    img.src = finalURL;
}

socket.on('welcome', async (data) => {
    localStorage.setItem('guestID', data.guestID);

    if (data.type === "guest") {
        console.log('User is a guest.');
        if (WelcomeMainContentTitle) {
            WelcomeMainContentTitle.textContent = `Welcome, ${data.guestID}`;
        }
        swapWithLoading('index/assets/images/avatardefault_92824.png');
    } else if (data.type === "registered") {
        console.log('User is registered.');
        if (typeof data.profilePictureURL === 'string') {
            swapWithLoading(data.profilePictureURL);
        }
    }
});
