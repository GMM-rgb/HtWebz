let AccountCookie = null;
let UserAccountProfilePicture, WelcomeMainContentTitle;

window.addEventListener('DOMContentLoaded', () => {
    UserAccountProfilePicture = document.getElementById('accountExpandIcon');
    WelcomeMainContentTitle = document.getElementById('pinnedContentTitle');
    // (async () => {
    //     AccountCookie = await cookieStore.set("AccountToken");
    // })();
}, { once: true });

socket.on('connect', async () => {
    let storedAccountToken = null;
    const storedGuestID = localStorage.getItem('guestID');
    if (storedGuestID && storedAccountToken === null) {
        console.log("Registering as geust..." + `\tID: ${storedGuestID}`);
        socket.emit('registerGuest', { guestID: storedGuestID });
    }
});

function swapWithLoading(finalURL) {
    if (!UserAccountProfilePicture) return;

    // show loading gif immediately
    requestAnimationFrame(() => { UserAccountProfilePicture.src = 'index/assets/images/load_icon_5649.gif'; });

    // preload the final image
    const img = new Image();
    (async () => {
        (() => {
            img.onwaiting = () => {
                console.log("Loading profile icon...");
            }
        })();
        await fetch('index/assets/images/load_icon_5649.gif').then(async () => {
            await fetch('index/assets/images/icon_loading_failure.svg').then(async () => {
                await fetch('index/assets/images/avatardefault_92824.png');
            });
        });
    })();

    const timeoutId = setTimeout(async () => {
        console.warn("Image load timed out, falling back to failure icon.");
        UserAccountProfilePicture.src = (await fetch('index/assets/images/icon_loading_failure.svg')).url;
    }, 2500); // 2.5s timeout for Loading time set

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
    console.log("User has been registered as a temporary Geust Account.");
    localStorage.setItem('guestID', data.guestID);
    var FormatedUserName = null;
    /**
     * @type {string?}
     */
    const GeustID = data.guestID;
    const Normalized = GeustID.replace("_", "\s");
    const SlicedString = Normalized.split();
    const UserID = SlicedString[SlicedString.length];
    FormatedUserName = Normalized.replace(" " + UserID).toString();

    if (data.type === "guest") {
        console.log('User is a guest.');
        if (WelcomeMainContentTitle) {
            WelcomeMainContentTitle.textContent = `Welcome ${data.guestID}`;
        }
        swapWithLoading('index/assets/images/avatardefault_92824.png');
    } else if (data.type === "registered") {
        console.log('User is registered.');
        if (typeof data.profilePictureURL === 'string') {
            swapWithLoading(data.profilePictureURL);
        }
    }
});
