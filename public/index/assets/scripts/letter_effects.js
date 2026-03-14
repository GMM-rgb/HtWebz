class LetterEffect {
    static animatedElements = new Set();

    static initializeLetters(selector) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(async (/** @type {HTMLHeadingElement} */ element) => {
            await HtWebzAPIs.HtWebzUtility.waitForElement(String(element.nodeName.toLowerCase()), window.document).then(() => {
                /** @type {"on"|"off"} */
                const LetterEffectEnabledState = element?.getAttribute("lettereffect");
                if (this.animatedElements.has(element)) return;
                this.animatedElements.add(element);

                const text = element.textContent.trim();
                if (!text) return;

                if ((LetterEffectEnabledState ?? null) != null) {
                    /**
                     * ---
                     * 
                     * 
                     * @returns {void}
                     */
                    function checkLetterEffectEnabledStatus() {
                        if (!(LetterEffectEnabledState === "on")) return new Boolean(false).valueOf();
                        return new Boolean(true).valueOf();
                    }

                    if (!checkLetterEffectEnabledStatus()) {
                        console.debug(`\nLetter effect was reqested to be DISABLED.
                            \nElement Source Type:\t"${element.nodeName.toWellFormed().normalize("NFC")}"
                            \nElement Name:\t${String((
                                element.id.length > 0
                                ? element.id
                                : element.className.length > 0
                                ? element.className
                                : '["id" and "className" was available]').toString()
                            )}`);
                        return void null;
                    }
                } else {
                    console.group("LetterEffectSystem");
                    console.warn(`%c"lettereffect"%c was not found on notification list heading element textcontent!`, 'font-weight: bold;', 'font-weight: normal;');
                    console.info("Continuing since the attribute doesn't exist... (Assumming ON)");
                    console.groupEnd();
                }

                // Get the ACTUAL color before we modify anything
                const computedStyle = window.getComputedStyle(element);
                let originalColor = computedStyle.color;
                const originalDisplay = computedStyle.display;
                const webkitStroke = computedStyle.getPropertyValue('-webkit-text-stroke');
                const webkitFill = computedStyle.getPropertyValue('-webkit-text-fill-color');

                // If color is black/default, try to get it from parent or inline styles
                if (originalColor === 'rgb(0, 0, 0)' || originalColor === 'rgba(0, 0, 0, 1)') {
                    // Check if element has inline color
                    if (element.style.color) {
                        originalColor = element.style.color;
                    } else {
                        // Walk up the DOM to find a non-black color
                        let parent = element.parentElement;
                        while (parent && (originalColor === 'rgb(0, 0, 0)' || originalColor === 'rgba(0, 0, 0, 1)')) {
                            const parentStyle = window.getComputedStyle(parent);
                            const parentColor = parentStyle.color;
                            if (parentColor !== 'rgb(0, 0, 0)' && parentColor !== 'rgba(0, 0, 0, 1)') {
                                originalColor = parentColor;
                                break;
                            }
                            parent = parent.parentElement;
                        }
                    }
                }

                // console.log('Animating:', element.tagName, 'Color:', originalColor, 'Display:', originalDisplay);

                // Don't change display properties - preserve layout
                const preservedStyles = {
                    display: originalDisplay,
                    position: element.style.position || computedStyle.position
                };

                // Clear text content only
                element.textContent = '';

                // Only set position relative if it's not already positioned
                if (preservedStyles.position === 'static') {
                    element.style.position = 'relative';
                }

                // Create letter spans
                text.split('').forEach((char, i) => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.className = 'letter-drop';
                    span.style.display = 'inline-block';
                    span.style.whiteSpace = 'pre';
                    span.style.opacity = '0';

                    // FORCE the color with !important
                    span.style.setProperty('color', originalColor, 'important');

                    // Apply webkit properties if they exist
                    if (webkitStroke && webkitStroke !== '0px none') {
                        span.style.setProperty('-webkit-text-stroke', webkitStroke, 'important');
                    }
                    if (webkitFill && webkitFill !== 'rgb(0, 0, 0)') {
                        span.style.setProperty('-webkit-text-fill-color', webkitFill, 'important');
                    }

                    // Random start position
                    const startX = (Math.random() * 60 - 30);
                    const startY = -(150 + Math.random() * 100);
                    const startRotation = (Math.random() * 180 - 90);

                    span.style.setProperty('--start-x', `${startX}px`);
                    span.style.setProperty('--start-y', `${startY}px`);
                    span.style.setProperty('--start-rotation', `${startRotation}deg`);
                    span.style.setProperty('--delay', `${i * 30}ms`);

                    element.appendChild(span);
                });

                // Create observer for EACH element individually
                const observer = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        // console.log('Observer fired for:', entry.target.tagName, 'isIntersecting:', entry.isIntersecting, 'ratio:', entry.intersectionRatio);
                        if (entry.isIntersecting) {
                            // console.log('✓ Triggering animation for:', entry.target.tagName);
                            const spans = entry.target.querySelectorAll('.letter-drop');
                            console.log('Found spans:', spans.length);
                            spans.forEach(span => {
                                span.style.animation = 'letterDrop 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                                span.style.animationDelay = span.style.getPropertyValue('--delay');
                            });
                            obs.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: [0, 0.05, 0.1, 0.5],  // Multiple thresholds to catch it
                    rootMargin: '200px 0px'  // Look 200px ahead
                });

                observer.observe(element);
                // console.log('Observer set up for:', element.tagName, element.textContent.substring(0, 20));

                // Also check if element is already in view immediately
                setTimeout(() => {
                    const rect = element.getBoundingClientRect();
                    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
                    if (isInView) {
                        console.log('Element already in view:', element.tagName);
                        const spans = element.querySelectorAll('.letter-drop');
                        spans.forEach(span => {
                            span.style.animation = 'letterDrop 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                            span.style.animationDelay = span.style.getPropertyValue('--delay');
                        });
                    }
                }, 100);
            });
        });
    }
}

// Add required styles
const letterStyles = document.createElement('style');
letterStyles.textContent = `
    .letter-drop {
        display: inline-block !important;
        opacity: 0;
        white-space: pre;
        transform: translate(var(--start-x), var(--start-y)) rotate(var(--start-rotation));
    }
    
    @keyframes letterDrop {
        0% {
            opacity: 0;
            transform: translate(var(--start-x), var(--start-y)) rotate(var(--start-rotation));
        }
        60% {
            opacity: 1;
            transform: translate(0, 5px) rotate(0deg) scale(1.05);
        }
        100% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg) scale(1);
        }
    }
`;
document.head.appendChild(letterStyles);

// Wait for everything to load
window.addEventListener('DOMContentLoaded', () => {
    HtWebzAPIs.HtWebzUtility.waitForElement("body", window.document).then(() => {
        setTimeout(() => {
            LetterEffect.initializeLetters('h1, h2, h3');
        }, 100);
    });
}, { once: true });
