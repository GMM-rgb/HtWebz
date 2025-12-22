import * as Loader from "./user_recents_loader.js";

window.addEventListener("DOMContentLoaded", () => {
    /**
     * @description
     * ### [`Recent Container Interface`]
     * This is for the users personal recents. 
     * @type {HTMLDivElement?}
     */
    const RecentFrameCon = document.querySelector(".inner-frame-container.recent");
    //
    if (RecentFrameCon && (RecentFrameCon instanceof HTMLDivElement)) {
        const LoadedRecentsData = Loader.RecentsLoader.loadUserRecentData(true /* true by default for now, since every user will be geust. */);
        console.log(LoadedRecentsData);
    }
}, { once: true });
