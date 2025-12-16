function truncateEllipsis(el, { suffix = '...', minChars = 2 } = {}) {
    const node = typeof el === 'string' ? document.getElementById(el) : el;
    if (!node) return;

    // Always keep the original text stored
    const original = node.getAttribute('data-fulltext') || node.textContent;
    node.setAttribute('data-fulltext', original);

    // Reset before measuring
    node.textContent = original;

    // If it already fits, nothing to do
    if (node.scrollWidth <= node.clientWidth) return;

    // Binary search for the longest substring that fits
    let lo = 0;
    let hi = original.length;
    let best = 0;

    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        node.textContent = original.slice(0, Math.max(mid, minChars)) + suffix;

        if (node.scrollWidth <= node.clientWidth) {
            best = mid;      // this length fits
            lo = mid + 1;    // try longer
        } else {
            hi = mid - 1;    // too long, try shorter
        }
    }

    // Final write with trailing space trimmed
    const finalLen = Math.max(best, minChars);
    let truncated = original.slice(0, finalLen).trimEnd();
    node.textContent = truncated + suffix;

    // Show full text on hover
    node.title = original;
}
