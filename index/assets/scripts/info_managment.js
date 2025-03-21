const motivationMessageContainer = document.getElementById("motivationMessageContainer");
let motivationMessage = document.querySelector("#motivationMessage");

// Array of motivational messages
const messages = [
    "Keep pushing forward!",
    "You're doing amazing!",
    "Every great passion starts with small steps!",
    "Believe in yourself!",
    "Success is built on persistence!",
    "You're capable of amazing things!",
    "You are unstoppable!",
    "You can do it!",
    "Don't give up!",
    "You're on the right path!",
];

// Retrieve the last selected message from localStorage
const lastMessage = localStorage.getItem("lastMotivationMessage");

// Filter out the last message from the pool of messages
const filteredMessages = messages.filter(message => message !== lastMessage);

// Select a new random message from the filtered pool
const randomMessage = filteredMessages[Math.floor(Math.random() * filteredMessages.length)];

// Update the DOM with the new message
motivationMessage.innerHTML = `<span>${randomMessage}</span>`;

// Store the new message in localStorage
localStorage.setItem("lastMotivationMessage", randomMessage);
