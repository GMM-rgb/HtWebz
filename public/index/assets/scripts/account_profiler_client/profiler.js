let AccountCookies = {};
/** @type {HTMLImageElement | null} */
let UserAccountProfilePicture = null;
/** @type {HTMLHeadingElement | null} */
let WelcomeMainContentTitle = null;

const IMAGE_PATHS = {
    loading: 'index/assets/images/load_icon_5649.gif',
    failure: 'index/assets/images/icon_loading_failure.svg',
    defaultAvatar: 'index/assets/images/avatardefault_92824.png',
};

// Preload immediately, parallel, no blocking
for (const src of Object.values(IMAGE_PATHS)) {
    new Image().src = src;
}

window.addEventListener('DOMContentLoaded', () => {
    UserAccountProfilePicture = document.getElementById('accountExpandIcon');
    WelcomeMainContentTitle = document.getElementById('pinnedContentTitle');

    if (WelcomeMainContentTitle) WelcomeMainContentTitle.textContent = 'Welcome...';
    if (UserAccountProfilePicture) UserAccountProfilePicture.src = IMAGE_PATHS.loading;

    attachSocketClientConnections();
}, { once: true });

function attachSocketClientConnections() {
    if (!UserAccountProfilePicture || !WelcomeMainContentTitle) {
        console.warn('DOM elements missing, aborting.');
        return;
    }

    // if socket is already connected, register immediately
    // instead of waiting for 'connect' to fire (it won't fire again)
    if (socket.connected) {
        console.log('Socket already connected, registering immediately.');
        registerUser();
    }

    // Still listen for future connects (page load before socket ready, or reconnects)
    socket.on('connect', () => {
        console.log('Socket connected, registering...');
        registerUser();
    });

    // If the socket drops and comes back, re-register automatically
    socket.on('reconnect', () => {
        console.log('Socket reconnected, re-registering...');
        registerUser();
    });

    socket.on('disconnect', (reason) => {
        console.warn(`Socket disconnected: ${reason}`);
        if (WelcomeMainContentTitle) {
            WelcomeMainContentTitle.textContent = 'Reconnecting...';
        }
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
