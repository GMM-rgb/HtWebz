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
    let overlay = document.querySelector('.page-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'page-overlay';
        document.body.appendChild(overlay);
    }
    
    sessionStorage.setItem('intentionalReload', 'true');
    sessionStorage.setItem('isReloading', 'true');
    
    const elements = document.querySelectorAll('.page-element');
    const animationDuration = 2500; // Match CSS animation duration
    const staggerDelay = 150; // Increased for more visible stagger
    
    // Ensure overlay is ready
    void overlay.offsetWidth;
    
    // Start animations
    requestAnimationFrame(() => {
        // Start element animations first
        elements.forEach((el, index) => {
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.classList.remove('animate-in', 'from-top', 'from-bottom', 'animate-out');
            
            const angle = Math.random() * 360;
            const distance = 300 + Math.random() * 200;
            const blur = 5 + Math.random() * 10;
            
            el.style.setProperty('--drift-angle', `${angle}deg`);
            el.style.setProperty('--drift-distance', `${distance}px`);
            el.style.setProperty('--drift-blur', `${blur}px`);
            
            setTimeout(() => {
                el.classList.add('animate-out');
            }, index * staggerDelay);
        });
        
        // Add overlay fade-in after a short delay
        setTimeout(() => {
            overlay.classList.add('fade-in');
        }, animationDuration * 0.3);
        
        // Reload after animations complete
        setTimeout(() => {
            window.location.reload();
        }, animationDuration + 800); // Added extra time for overlay fade
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
