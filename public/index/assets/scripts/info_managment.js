function reloadPageWithAnimation() {
    if (window._isReloading) return;
    window._isReloading = true;

    const elements = Array.from(document.querySelectorAll('.page-element'));
    const baseOutDuration = 600;
    const staggerStep = 80;
    const buffer = 300;

    // === Create & inject overlay ===
    const overlay = document.createElement('div');
    overlay.className = 'page-overlay';
    document.body.appendChild(overlay);

    // === Reset all elements ===
    elements.forEach(element => {
        element.classList.remove(
            'animate-in', 'animate-out',
            'from-top', 'from-bottom',
            'fade-transition', 'initial-state'
        );
        element.style.removeProperty('opacity');
        element.style.removeProperty('transform');
        element.style.removeProperty('visibility');
        element.style.removeProperty('animationDelay');
        element.style.removeProperty('--animation-delay');
    });

    // Force reflow so animations paint
    void document.body.offsetHeight;

    // === Trigger OUT animations ===
    requestAnimationFrame(() => {
        document.body.classList.add('is-reloading');

        elements.forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            const fromDirection = rect.top > window.innerHeight * 0.7 ? 'bottom' : 'top';
            const delayMs = i * staggerStep;
            el.style.animationDelay = `${delayMs}ms`;
            el.style.setProperty('--animation-delay', `${delayMs}ms`);
            el.classList.add('animate-out', `from-${fromDirection}`);
        });

        setTimeout(() => overlay.classList.add('fade-in'), 300);

        const totalDuration =
            (elements.length ? baseOutDuration + ((elements.length - 1) * staggerStep) : 0)
            + buffer;

        let reloaded = false;
        const triggerReload = () => {
            if (reloaded) return;
            reloaded = true;
            sessionStorage.setItem('isReloading', 'true');
            window.location.assign(window.location.href);
        };

        setTimeout(triggerReload, totalDuration);
        setTimeout(triggerReload, totalDuration + 1000);
    });
}

// === ON LOAD: Detect reload → trigger IN animations ===
document.addEventListener('DOMContentLoaded', () => {
    const isReloading = sessionStorage.getItem('isReloading') === 'true';
    sessionStorage.removeItem('isReloading');

    const isFreshLoad = !document.referrer && !isReloading;
    const elements = Array.from(document.querySelectorAll('.page-element'));

    if (isFreshLoad) {
        document.body.classList.add('fresh-load');
        elements.forEach(el => el.classList.add('initial-state'));
    } else {
        elements.forEach(el => el.classList.add('fade-transition'));
    }

    const initialDelay = isFreshLoad ? 0 : 300;

    setTimeout(() => {
        const selectors = [
            `.main-content-section`,
            `#pinnedContentTop`,
            `.about-page-container`,
            `.content-one`,
            `#featured-section-A`,
            `#recent-section-A`,
            `.developer.updated`,
            `.developer.name`,
            `.developer.site-name`,
            `.developer.license`
        ];

        let animationCounter = 0;
        let observer;
        let activeAnimations = 0;

        const createObserver = () => {
            if (observer) {
                observer.disconnect();
            }

            animationCounter = 0;
            activeAnimations = 0; // Reset active animations count

            observer = new IntersectionObserver((entries) => {
                // Sort entries by their DOM order
                const sortedEntries = entries.sort((a, b) => {
                    const allEls = Array.from(document.querySelectorAll('.page-element'));
                    return allEls.indexOf(a.target) - allEls.indexOf(b.target);
                });

                sortedEntries.forEach((entry, batchIndex) => {
                    if (!entry.isIntersecting) return;

                    const delay = animationCounter * 100;
                    animationCounter++;
                    activeAnimations++;

                    const rect = entry.boundingClientRect;
                    const fromDirection = rect.top > window.innerHeight * 0.7 ? 'bottom' : 'top';

                    handleElementAnimation(entry.target, delay, 'in', fromDirection);
                    
                    // Decrease counter after animation completes
                    setTimeout(() => {
                        activeAnimations = Math.max(0, activeAnimations - 1);
                    }, delay + 600);
                    
                    observer.unobserve(entry.target);
                });
            }, {
                threshold: 0.05,
                rootMargin: '100px 0px 100px 0px'
            });

            return observer;
        };

        observer = createObserver();

        const observeElements = () => {
            selectors.forEach(sel => {
                const matchingElements = document.querySelectorAll(sel);
                
                matchingElements.forEach(el => {
                    if (!el.classList.contains('page-element')) {
                        el.classList.add('page-element');
                        if (isFreshLoad) el.classList.add('initial-state');
                    }
                    observer.observe(el);
                });
            });
        };

        // Initial observation
        observeElements();

        // Watch for display property changes and re-animate in sequence
        let reanimateTimeout;
        
        const mutationObserver = new MutationObserver(() => {
            clearTimeout(reanimateTimeout);
            reanimateTimeout = setTimeout(() => {
                let hasVisibilityChange = false;
                
                // First check if any elements changed from hidden to visible
                selectors.forEach(sel => {
                    const matchingElements = document.querySelectorAll(sel);
                    
                    matchingElements.forEach(el => {
                        const isVisible = el.offsetParent !== null;
                        const wasHidden = el.dataset.wasHidden === 'true';
                        
                        if (isVisible && wasHidden) {
                            hasVisibilityChange = true;
                        }
                    });
                });
                
                // If something became visible, restart immediately. Otherwise check if animating
                if (!hasVisibilityChange && activeAnimations > 0) return;
                
                let hasChanges = false;
                
                selectors.forEach(sel => {
                    const matchingElements = document.querySelectorAll(sel);
                    
                    matchingElements.forEach(el => {
                        const isVisible = el.offsetParent !== null;
                        const wasHidden = el.dataset.wasHidden === 'true';
                        
                        // Element just became visible
                        if (isVisible && wasHidden) {
                            el.dataset.wasHidden = 'false';
                            hasChanges = true;
                            
                            // Reset animation state
                            el.classList.remove('animate-in', 'animate-out');
                            el.classList.add('initial-state');
                        }
                        // Element just became hidden
                        else if (!isVisible && !wasHidden) {
                            el.dataset.wasHidden = 'true';
                        }
                        // Track initial visibility state
                        else if (!el.dataset.wasHidden) {
                            el.dataset.wasHidden = isVisible ? 'false' : 'true';
                        }
                    });
                });
                
                // Completely restart the observer from scratch
                if (hasChanges) {
                    observer = createObserver();
                    observeElements();
                }
            }, 100);
        });

        mutationObserver.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }, initialDelay);
});

// === CORE ANIMATION HANDLER ===
function handleElementAnimation(element, delay = 0, direction = 'in', fromDirection = 'top') {
    setTimeout(() => {
        element.classList.remove('animate-in', 'animate-out', 'initial-state');
        element.style.animationDelay = '0ms';
        element.classList.add(`animate-${direction}`, `from-${fromDirection}`);
    }, delay);
}

// === Safety net for native reloads ===
window.addEventListener("beforeunload", () => {
    document.body.classList.add('quick-fade');
});

// === CSS INJECTION ===
const animCSS = document.createElement('style');
animCSS.textContent = `
    /* Initial state for fresh loads */
    .initial-state {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }

    /* IN animations */
    .animate-in.from-top {
        animation: slideInFromTop 0.6s ease-out forwards;
    }
    .animate-in.from-bottom {
        animation: slideInFromBottom 0.6s ease-out forwards;
    }

    @keyframes slideInFromTop {
        from { transform: translateY(-30px) scale(0.95); opacity: 0; }
        to   { transform: translateY(0) scale(1); opacity: 1; }
    }
    @keyframes slideInFromBottom {
        from { transform: translateY(30px) scale(0.95); opacity: 0; }
        to   { transform: translateY(0) scale(1); opacity: 1; }
    }

    /* OUT animations (reverse) */
    .animate-out.from-top {
        animation: slideOutToTop 0.6s ease-in forwards;
        animation-delay: var(--animation-delay, 0ms);
    }
    .animate-out.from-bottom {
        animation: slideOutToBottom 0.6s ease-in forwards;
        animation-delay: var(--animation-delay, 0ms);
    }

    @keyframes slideOutToTop {
        from { transform: translateY(0) scale(1); opacity: 1; }
        to   { transform: translateY(-30px) scale(0.95); opacity: 0; }
    }
    @keyframes slideOutToBottom {
        from { transform: translateY(0) scale(1); opacity: 1; }
        to   { transform: translateY(30px) scale(0.95); opacity: 0; }
    }

    /* Overlay fade */
    .page-overlay {
        position: fixed;
        inset: 0;
        background: #000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s ease;
        z-index: 9999;
    }
    .page-overlay.fade-in {
        opacity: 0.4;
    }

    /* Quick fade safety net */
    .quick-fade {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    /* Fade transition for reloads */
    .fade-transition {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
`;
document.head.appendChild(animCSS);
