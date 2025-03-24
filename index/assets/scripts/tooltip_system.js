// Create tooltip element once script loads
const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
tooltip.style.cssText = `
    display: none;
    position: fixed;
    background: rgba(0, 65, 156, 0.8);
    font-weight: bold;
    color: white;
    padding: 5px 10px;
    border: 2px solid cyan;
    border-radius: 5px 10px 7.5px;
    font-size: 14px;
    pointer-events: none;
    z-index: 99999;
    max-width: 200px;
    transition: opacity 0.2s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(0, 225, 255, 0.4);
`;
document.body.appendChild(tooltip);

// Main tooltip setup function
function setupTooltip(element, message) {
    // Accept either element or selector
    const target = typeof element === 'string' ? 
        document.querySelector(element) : element;
    
    if (!target) return;

    const showTooltip = (e) => {
        tooltip.textContent = message;
        tooltip.style.display = 'block';
        tooltip.style.opacity = '1';
        
        // Position tooltip
        const rect = target.getBoundingClientRect();
        const offset = 10;
        
        // Default position below element
        let x = e.clientX + offset;
        let y = e.clientY + offset;
        
        // Check if tooltip would go off screen
        if (x + tooltip.offsetWidth > window.innerWidth) {
            x = window.innerWidth - tooltip.offsetWidth - offset;
        }
        if (y + tooltip.offsetHeight > window.innerHeight) {
            y = window.innerHeight - tooltip.offsetHeight - offset;
        }
        
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
    };

    const hideTooltip = () => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            tooltip.style.display = 'none';
        }, 200);
    };

    target.addEventListener('mouseover', showTooltip);
    target.addEventListener('mousemove', showTooltip);
    target.addEventListener('mouseout', hideTooltip);
    target.addEventListener('click', hideTooltip);
}

// Helper function for multiple elements
function setupTooltips(selector, message) {
    document.querySelectorAll(selector).forEach(element => {
        setupTooltip(element, message);
    });
}
