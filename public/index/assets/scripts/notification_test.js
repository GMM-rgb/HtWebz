const TestMessages = ["test", "hello world", "hi world"];
/**
 * @type {HTMLButtonElement?}
*/
const NotifyTestBtn = document.querySelector(".notification-test-btn");
// 
NotifyTestBtn.addEventListener("click", () => {
    console.log(TestMessages.length);
    self.DeployNewNotification(TestMessages[Math.ceil(Math.random() * Math.floor(TestMessages.length)) - 1]);
});
