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

// Remove or comment out the beforeunload listener to disable the unsaved changes alert.
// window.addEventListener('beforeunload', (event) => {
//     if (!sessionStorage.getItem('intentionalReload')) {
//         event.preventDefault();
//         return event.returnValue = '';
//     }
// });

// Update the reload function to ensure animations play
function reloadPageWithAnimation() {
    // Prevent multiple triggers
    if (window._isReloading) return;
    window._isReloading = true;
    
    const elements = document.querySelectorAll('.page-element');
    const animationDuration = 1500;
    
    // Create and append overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-overlay';
    document.body.appendChild(overlay);
    
    // Force all elements to their normal state first
    elements.forEach(el => {
        el.style.removeProperty('opacity');
        el.style.removeProperty('transform');
        el.style.removeProperty('visibility');
        el.classList.remove('animate-in', 'from-top', 'from-bottom');
    });
    
    // Start animation sequence
    window.requestAnimationFrame(() => {
        // Add reloading class to body for CSS targeting
        document.body.classList.add('is-reloading');
        
        // Animate each element with stagger
        elements.forEach((el, i) => {
            el.style.setProperty('--drift-angle', `${Math.random() * 360}deg`);
            el.style.setProperty('--drift-distance', `${300 + Math.random() * 200}px`);
            el.style.setProperty('--animation-delay', `${i * 100}ms`);
            el.classList.add('animate-out');
        });
        
        // Show overlay
        setTimeout(() => overlay.classList.add('fade-in'), 300);
        
        // Ensure reload happens after animations complete
        setTimeout(() => {
            sessionStorage.setItem('isReloading', 'true');
            window.location.reload();
        }, animationDuration);
    });
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
    
    // Fade out old content first
    document.querySelectorAll('.page-element').forEach(el => {
        el.classList.add('pre-animation');
    });
    
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

// Remove the duplicate animation styles since we're using the CSS file's animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in.from-top {
        animation: slideInFromTop 0.6s ease-out forwards;
    }
    .animate-in.from-bottom {
        animation: slideInFromBottom 0.6s ease-out forwards;
    }
    @keyframes slideInFromTop {
        from { transform: translateY(-30px) scale(0.95); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
    }
    @keyframes slideInFromBottom {
        from { transform: translateY(30px) scale(0.95); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
    }
`;
document.head.appendChild(animationStyles);
