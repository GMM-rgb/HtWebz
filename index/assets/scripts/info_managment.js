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

// CSS styles for animations
const style = document.createElement('style');
style.textContent = `
  .message-wiggle {
    animation: wiggle 0.5s ease-in-out;
  }
  .message-morph {
    animation: morph 0.3s ease-in-out;
  }
  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg) translateY(-6px); }
    25% { transform: rotate(-5deg) scale(1.1); }
    75% { transform: rotate(5deg) scale(1.1) translateY(0); }
  }
  @keyframes morph {
    0% { transform: scale(1) scaleX(1); opacity: 1; }
    50% { transform: scale(1.2); scaleX(1.4) opacity: 0.5; }
    100% { transform: scale(1) scaleX(1); opacity: 1; }
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

// Function to handle element animations
function handleElementAnimation(element, delay = 0) {
    setTimeout(() => {
        element.classList.add('animate-in');
    }, delay);
}

// Add page load animations
document.addEventListener('DOMContentLoaded', () => {
    // List all selectors to animate
    const selectors = [
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
    
    // Skip fixed elements
    const fixedSelectors = ['#footerContainer'];

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = Array.from(document.querySelectorAll('.page-element')).indexOf(entry.target);
                handleElementAnimation(entry.target, index * 100);
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    selectors.forEach((selector) => {
        const element = document.querySelector(selector);
        if (element) {
            if (!fixedSelectors.includes(selector)) {
                element.classList.add('page-element');
                // Only observe non-fixed elements
                observer.observe(element);
            }
        }
    });

    // Animate fixed elements immediately
    fixedSelectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            handleElementAnimation(element, 0);
        }
    });
});

// End of info_managment.js