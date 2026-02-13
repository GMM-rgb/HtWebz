/**
 * @type {HTMLButtonElement?}
*/
const NotifyTestBtn = document.querySelector(".notification-test-btn");
NotifyTestBtn.addEventListener("click", () => {
    window.DeployNewNotification("test");
});
