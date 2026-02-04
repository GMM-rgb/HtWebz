let isWide = false;
let currentWidth = 8;
let targetWidth = 8;
let animating = false;
/**
 * Animates the scrollbar from client `Cursor` position.
 * @returns {void} 
 */
function animate() {
    if (animating) return;
    animating = true;
    function step() {
        if (currentWidth === targetWidth) {
            animating = false;
            return;
        }
        // Move 1px per frame
        currentWidth += (currentWidth < targetWidth ? 1 : -1);
        document.documentElement.style.setProperty(
            '--scrollbar-width',
            `${currentWidth}px`
        );
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

class ScrollbarAnimator {
    /**
     * 
     * @public
     */
    static ScrollbarAnimatorAttatched = false;
    /**
     * Creates the `ScrollbarEventListener` for animating.
     * @returns {void}
     */
    static AttatchScrollbarListener() {
        const ScrollbarEventListener = new Event('mousemove', (e) => {
            const distanceFromRight = window.innerWidth - e.clientX;
            // 
            (async () => {
                if (distanceFromRight <= 20 && !isWide) {
                    isWide = !isWide;
                    targetWidth = 12;
                    animate();
                } else if (distanceFromRight > 30 && isWide) {
                    isWide = !isWide;
                    targetWidth = 8;
                    animate();
                }
            })();
        });
        // 
        document.addEventListener(ScrollbarEventListener);
    }
}

export {
    ScrollbarAnimator
};
