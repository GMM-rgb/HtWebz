class LetterEffect {
    static letterPool = [];
    
    static initializeLetters(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            if (element.hasAttribute('data-letter-effect')) return;
            
            const text = element.textContent;
            element.setAttribute('data-letter-effect', 'true');
            
            // Create container with same styles as original
            const container = document.createElement('div');
            container.className = 'letter-effect-container';
            const computedStyle = window.getComputedStyle(element);
            container.style.fontSize = computedStyle.fontSize;
            container.style.lineHeight = computedStyle.lineHeight;
            
            element.textContent = '';
            element.appendChild(container);
            
            // Measure letter width for proper spacing
            const tempSpan = document.createElement('span');
            tempSpan.style.visibility = 'hidden';
            tempSpan.textContent = 'M';  // Use M for average width
            container.appendChild(tempSpan);
            const letterWidth = tempSpan.offsetWidth * 0.6;  // Adjust spacing
            container.removeChild(tempSpan);
            
            // Create dropping letters with proper spacing
            const letters = text.split('').map((char, i) => ({
                char,
                x: Math.random() * 1,  // Reduced random spread
                y: -50 - (Math.random() * 24),  // Reduced height
                rotation: Math.random() * 180 - 90,  // -90 to 90 degrees
                finalX: i * letterWidth,  // Use measured width
                finalY: 0,
                element: null
            }));
            
            this.letterPool.push(...letters);
            
            // Create observer with larger threshold
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateLetters(letters, container);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(element);
        });
    }
    
    static animateLetters(letters, container) {
        // Create final text container that will show after animation
        const finalText = document.createElement('div');
        finalText.className = 'final-text';
        finalText.textContent = letters.map(l => l.char).join('');
        finalText.style.opacity = '0';
        container.appendChild(finalText);

        // Create falling letters
        letters.forEach((letter, i) => {
            const span = document.createElement('span');
            span.className = 'falling-letter';
            span.textContent = letter.char;
            span.style.setProperty('--start-x', `${letter.x}px`);
            span.style.setProperty('--start-y', `${letter.y}px`);
            span.style.setProperty('--start-rotation', `${letter.rotation}deg`);
            span.style.setProperty('--final-x', `${i * (finalText.offsetWidth / letters.length)}px`);
            span.style.setProperty('--delay', `${i * 50}ms`);
            container.appendChild(span);
            letter.element = span;
        });

        // Switch to final text after animation
        setTimeout(() => {
            container.querySelectorAll('.falling-letter').forEach(el => el.remove());
            finalText.style.opacity = '1';
        }, (letters.length * 50) + 500);
    }
}

// Add required styles
const letterStyles = document.createElement('style');
letterStyles.textContent = `
    .letter-effect-container {
        position: relative;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;           // Prevent container from expanding
        line-height: 1;              // Force minimal line height
        height: 1em;                // Set container height to match font-size
        vertical-align: middle;
    }
    
    .final-text {
        transition: opacity 0.3s ease-out;
    }
    
    .falling-letter {
        position: absolute;
        display: inline-block;
        opacity: 0;
        transform-origin: center;
        transform: translate3d(var(--start-x), var(--start-y), 0) rotate(var(--start-rotation));
        animation: fallAndSettle 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        animation-delay: var(--delay);
    }
    
    @keyframes fallAndSettle {
        0% {
            opacity: 0;
            transform: translate3d(var(--start-x), var(--start-y), 0) rotate(var(--start-rotation));
        }
        70% {
            opacity: 1;
            transform: translate3d(var(--final-x), 5px, 0) rotate(0deg) scale(1.1);
        }
        100% {
            opacity: 1;
            transform: translate3d(var(--final-x), 0, 0) rotate(0deg) scale(1);
        }
    }
`;
document.head.appendChild(letterStyles);

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    LetterEffect.initializeLetters('h1, h2, h3, h4, .featured-title');
});
