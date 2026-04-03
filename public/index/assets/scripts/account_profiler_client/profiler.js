import { Socket } from "socket.io";
import { ProfilerToast } from "./modules/profiler_toast_widget.js";

let AccountCookies = {};
/** @type {HTMLImageElement | null} */
let UserAccountProfilePicture = null;
/** @type {HTMLHeadingElement | null} */
let WelcomeMainContentTitle = null;

if (!URL) import("./../window_scope_definitions");

const IMAGE_PATHS = {
    loading: 'index/assets/images/load_icon_5649.gif',
    failure: 'index/assets/images/icon_loading_failure.svg',
    defaultAvatar: 'index/assets/images/avatardefault_92824.png',
};

// Preload immediately; Parallel; No blocking
for (const src of Object.values(IMAGE_PATHS)) {
    new Image().src = src;
}

window.addEventListener('DOMContentLoaded', async () => {
    UserAccountProfilePicture ??= await HtWebzAPIs.HtWebzUtility.waitForElement("#accountExpandIcon", document.body).finally(() => console.debug("\nFetched Profile Picture Element."));
    WelcomeMainContentTitle ??= await HtWebzAPIs.HtWebzUtility.waitForElement("#pinnedContentTitle", document.body).finally(() => console.debug("\nFetched Main Content Title Element."));
    new Promise(/** @returns {Promise<boolean>} */ async (resolveProfilerSetup) => {
        console.debug(String(WelcomeMainContentTitle));
        console.debug(String(UserAccountProfilePicture));

        if (WelcomeMainContentTitle != null) WelcomeMainContentTitle.textContent = 'Welcome...'; else {
            console.warn("no content title\t", WelcomeMainContentTitle);
            await Promise.reject("There was no Content Title element, aborting!");
        }

        if (UserAccountProfilePicture != null) UserAccountProfilePicture.src = IMAGE_PATHS.loading; else {
            console.warn("no profile picture\t", UserAccountProfilePicture);
            await Promise.reject("There was no Account Profile Picture element, aborting!");
        }

        return resolveProfilerSetup(true);
    }).catch((/** @type {*} */ AttatchmentFailure) => {
        if (AttatchmentFailure !== undefined && typeof(AttatchmentFailure) === "string") {
            console.error(String(AttatchmentFailure).trim());
        }
    }).finally(() => {
        attachSocketClientConnections();
    });
}, { once: true });

function attachSocketClientConnections() {
    /**
     * ---
     * ...
     * 
     * ---
     * @param {("Reconnecting..." | "Reconnection request rejected!") | undefined} ConnectingStatusString
     * @returns {Promise<void>}
     */
    function displayConnectingStatus(ConnectingStatusString = "Reconnecting...") {
        return new Promise(() => {
            if (WelcomeMainContentTitle && ConnectingStatusString !== undefined && typeof(ConnectingStatusString) === "string") {
                WelcomeMainContentTitle.textContent = String(ConnectingStatusString).toString();
            }
        });
    }

    if (!UserAccountProfilePicture || !WelcomeMainContentTitle) {
        console.warn('%cDOM elements missing, aborting.', 'font-weight: bolder;');
        return;
    }

    // if socket is already connected, register immediately,
    // instead of waiting for 'connect' to fire (it won't fire again)
    if (socket.connected) {
        console.log('Socket already connected, registering immediately.');
        new ProfilerToast("Registering With Cache...").BuildToastElement();
        registerUser();
    }

    // Still listen for future connects (page load before socket ready, or reconnects)
    socket.on('connect', () => {
        console.log('Socket connected, registering...');
        new ProfilerToast("Registering...").BuildToastElement();
        registerUser();
    });

    // If the socket drops and comes back, re-register automatically
    socket.on('reconnect', () => {
        console.log('Socket reconnected, re-registering...');
        new ProfilerToast("Registering...").BuildToastElement();
        registerUser();
    });

    socket.on('disconnect', (reason) => {
        console.warn(`Socket disconnected: ${reason}`);
        console.log("Attempting reconnect...");
        displayConnectingStatus("Reconnecting...");
        socket.emitWithAck("reconnect_client", navigator?.onLine ?? false).then(() => {

        });
    });

    socket.on('connect_error', (err) => {
        console.error('Connection error:', err.message);
        if (WelcomeMainContentTitle) {
            WelcomeMainContentTitle.textContent = 'Connection failed. Retrying...';
        }
    });

    socket.on('welcome', (data) => {
        localStorage.setItem('guestID', data.guestID);

        const formattedName = formatGuestName(data.guestID);

        if (data.type === 'guest') {
            WelcomeMainContentTitle.textContent = `Welcome ${formattedName || data.guestID}`;
            swapProfilePicture(IMAGE_PATHS.defaultAvatar);
        } else if (data.type === 'registered') {
            WelcomeMainContentTitle.textContent = `Welcome back, ${formattedName || 'User'}`;
            if (typeof data.profilePictureURL === 'string') {
                swapProfilePicture(data.profilePictureURL);
            }
        }
    });
}

function registerUser() {
    const storedGuestID = localStorage.getItem('guestID');
    const storedAccountToken = localStorage.getItem('accountToken');

    if (!storedAccountToken) {
        console.log(`Registering as guest... ID: ${storedGuestID}`);
        socket.emit('registerGuest', { guestID: storedGuestID });
    } else {
        console.log('Registering as account user...');
        socket.emit('registerAccount', { token: storedAccountToken });
    }
}

function formatGuestName(guestID) {
    if (!guestID || typeof guestID !== 'string') return null;
    const parts = guestID.replace('_', ' ').split(' ');
    parts.pop(); // remove *trailing* numeric ID
    return parts.join(' ').trim() || null;
}

function swapProfilePicture(finalURL) {
    if (!UserAccountProfilePicture) return;

    const img = new Image();

    const timeoutId = setTimeout(() => {
        console.warn('Image load timed out.');
        UserAccountProfilePicture.src = IMAGE_PATHS.failure;
    }, 2500);

    img.onload = () => {
        clearTimeout(timeoutId);
        UserAccountProfilePicture.classList.add('fade-in');
        UserAccountProfilePicture.src = finalURL;
        UserAccountProfilePicture.addEventListener('animationend', () => {
            UserAccountProfilePicture.classList.remove('fade-in');
        }, { once: true, passive: true });
    };

    img.onerror = () => {
        clearTimeout(timeoutId);
        console.warn('Failed to load profile image.');
        UserAccountProfilePicture.src = IMAGE_PATHS.failure;
    };

    img.src = finalURL;
}
