document.addEventListener("DOMContentLoaded", () => {
    const title   = document.getElementById("pageTitle");
    const buttons = document.getElementById("moreFromHtWebzContainer");
    const padding = 10; // gap between title and buttons
    const debug   = false;

    function updateTitleWidth() {
        if (!title || !buttons) return;

        const btnRect = buttons.getBoundingClientRect();
        const containerRect = title.parentElement.getBoundingClientRect();
        
        const maxWidth = btnRect.left - containerRect.left - padding;
        
        // Don't set it if it's too small
        if (maxWidth > 100) { // Only set if reasonable size
            title.style.maxWidth = `${maxWidth}px`;
        }
        
        if (debug) console.log(`maxWidth: ${maxWidth}px (buttons at ${btnRect.left}px)`);
    }

    // Update on resize, scroll, and any layout shift
    window.addEventListener("resize", updateTitleWidth);
    window.addEventListener("scroll", updateTitleWidth);
    new ResizeObserver(updateTitleWidth).observe(buttons);
    new ResizeObserver(updateTitleWidth).observe(title.parentElement);

    updateTitleWidth();
});
