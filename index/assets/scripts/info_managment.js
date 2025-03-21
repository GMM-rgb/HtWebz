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

// Add CSS styles for animations
const style = document.createElement('style');
style.textContent = `
  .message-wiggle {
    animation: wiggle 0.5s ease-in-out;
  }
  .message-morph {
    animation: morph 0.3s ease-in-out;
  }
  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-5deg) scale(1.1); }
    75% { transform: rotate(5deg) scale(1.1); }
  }
  @keyframes morph {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
  }
`;
document.head.appendChild(style);

// Function to update message with animations
function updateMessage() {
    const lastMessage = motivationMessage.textContent;
    const availableMessages = messages.filter(msg => msg !== lastMessage);
    const newMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)];
    
    motivationMessage.classList.add('message-wiggle');
    
    setTimeout(() => {
        motivationMessage.classList.add('message-morph');
        motivationMessage.innerHTML = `<span>${newMessage}</span>`;
        
        setTimeout(() => {
            motivationMessage.classList.remove('message-wiggle', 'message-morph');
        }, 300);
    }, 500);
}

// Remove the previous message selection code and replace with interval
setInterval(updateMessage, 3000);

// Initial message
updateMessage();

// Add page load animations
document.addEventListener('DOMContentLoaded', () => {
    // List all selectors to animate but skip fixed elements.
    const selectors = [
        '#topUserInterfaceBar',
        '.main-content-section',
        '#pinnedContentTop',
        '.about-page-container',
        '.content-one',
        '#InfoTheDay',
        '#motivationMessageContainer',
        '.featuredTagBackdrop',
        '#featuredContentSection',
        '#verticalShowcase',
        '#footerContainer'
    ];
    const fixedSelectors = ['#topUserInterfaceBar', '#footerContainer'];
    selectors.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            // For fixed elements, remove any animation classes so they remain fixed.
            if (!fixedSelectors.includes(selector)) {
                element.classList.add('page-element');
                setTimeout(() => {
                    element.classList.add('animate-in');
                }, index * 200);
            }
        }
    });
    // Final flourish animation: [Optional] (Removed for Rendering Issues)
    /*
    setTimeout(() => {
        document.body.style.transition = 'all 0.3s ease';
        document.body.style.transform = 'scale(1.02)';
        setTimeout(() => {
            document.body.style.transform = 'scale(1)';
        }, 300);
    }, (selectors.length + 1) * 200);
    */
});
