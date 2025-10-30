function reloadPageWithAnimation() {
    if (window._isReloading) return;
    window._isReloading = true;

    const elements = Array.from(document.querySelectorAll('.page-element'));
    const baseOutDuration = 600; // matches CSS 0.6s
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

        // Total duration = base + last stagger + buffer
        const totalDuration =
            (elements.length ? baseOutDuration + ((elements.length - 1) * staggerStep) : 0)
            + buffer;

        let reloaded = false;
        const triggerReload = () => {
            if (reloaded) return;
            reloaded = true;
            sessionStorage.setItem('isReloading', 'true');
            // Use assign so animation paints before navigation
            window.location.assign(window.location.href);
        };

        setTimeout(triggerReload, totalDuration);
        setTimeout(triggerReload, totalDuration + 1000); // fallback
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

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const allEls = Array.from(document.querySelectorAll('.page-element'));
                const index = allEls.indexOf(entry.target);
                const delay = isReloading ? 600 + (index * 100) : index * 100;

                const rect = entry.boundingClientRect;
                const fromDirection = rect.top > window.innerHeight * 0.7 ? 'bottom' : 'top';

                handleElementAnimation(entry.target, delay, 'in', fromDirection);
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.05,
            rootMargin: '100px 0px 100px 0px'
        });

        selectors.forEach(sel => {
            const el = document.querySelector(sel);
            if (el && !el.classList.contains('page-element')) {
                el.classList.add('page-element');
                if (isFreshLoad) el.classList.add('initial-state');
                observer.observe(el);
            }
        });
    }, initialDelay);
});

// === CORE ANIMATION HANDLER ===
function handleElementAnimation(element, delay = 0, direction = 'in', fromDirection = 'top') {
    setTimeout(() => {
        element.classList.remove('animate-in', 'animate-out');
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
`;
document.head.appendChild(animCSS);
