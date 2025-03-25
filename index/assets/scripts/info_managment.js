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

// Removed the previous message selection code and replace with interval
setInterval(updateMessage, 3000);

// Initial message
updateMessage();

// Function to handle element animations - updated to support direction detection
function handleElementAnimation(element, delay = 0, direction = 'in', fromDirection = 'top') {
    setTimeout(() => {
        element.classList.add(`animate-${direction}`);
        element.classList.add(`from-${fromDirection}`); // Add direction-specific class
    }, delay);
}

// Handle page reload animations
window.addEventListener('beforeunload', (event) => {
    // Only show warning if there are actual unsaved changes
    if (!sessionStorage.getItem('intentionalReload')) {
        event.preventDefault();
        return event.returnValue = '';
    }
});

// Add reload function that handles animations properly
function reloadPageWithAnimation() {
    // Mark this as an intentional reload
    sessionStorage.setItem('intentionalReload', 'true');
    
    // Get all animated elements
    const elements = document.querySelectorAll('.page-element');
    
    // Animate all elements out
    elements.forEach((element, index) => {
        handleElementAnimation(element, index * 50, 'out');
    });
    
    // Calculate total animation time
    const totalDelay = (elements.length * 50) + 600;
    
    // Reload after animations complete
    setTimeout(() => {
        sessionStorage.removeItem('intentionalReload'); // Clean up
        window.location.reload();
    }, totalDelay);
}

// Replace any direct reload calls with the animated version
// For example, if we have a reload button:
// document.getElementById('reloadButton').onclick = reloadPageWithAnimation;

// Add page load unfold animations with Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const isReloading = sessionStorage.getItem('isReloading') === 'true';
    sessionStorage.removeItem('isReloading');
    
    // Add initial delay if reloading
    const initialDelay = isReloading ? 500 : 0;
    
    setTimeout(() => {
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
            '#footerContainer',
            '#topAppsSection',
            '#topAppsBackdrop',
            '#appsTrayBackdropContent',
            '#searcherApp',
            '#gamesApp',
            '#resourcesApp',
        ];
        
        // Animate selected fixed elements
        const fixedSelectors = ['#footerContainer'];

        // Create intersection observer with direction detection
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Array.from(document.querySelectorAll('.page-element')).indexOf(entry.target);
                    const delay = isReloading ? 600 + (index * 100) : index * 100;
                    
                    // Determine animation direction based on element position relative to viewport
                    const elementRect = entry.boundingClientRect;
                    const viewportHeight = window.innerHeight;
                    const fromDirection = elementRect.top > viewportHeight ? 'bottom' : 'top';
                    
                    handleElementAnimation(entry.target, delay, 'in', fromDirection);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.01,  // Trigger when just 1% of element is visible
            rootMargin: "50px 0px 50px 0px"  // Equal margins for bidirectional detection
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
    }, initialDelay);
});

// Add CSS styles for directional animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in.from-top {
        animation: slideInFromTop 0.6s ease-out forwards;
    }
    .animate-in.from-bottom {
        animation: slideInFromBottom 0.6s ease-out forwards;
    }
    @keyframes slideInFromTop {
        from { transform: translateY(-30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    @keyframes slideInFromBottom {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(animationStyles);
