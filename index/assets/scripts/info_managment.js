const motivationMessageContainer = document.getElementById("motivationMessageContainer");
let motivationMessage = document.querySelector("#motivationMessage");

const messages = [
    "Keep pushing forward!",
    "You're doing amazing!",
    "Every great coder starts with small steps!",
    "Believe in yourself!",
    "Success is built on persistence!"
];

const randomMessage = messages[Math.floor(Math.random() * messages.length)];
motivationMessage.textContent = randomMessage;
