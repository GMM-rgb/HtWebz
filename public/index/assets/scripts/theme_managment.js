// Theme configurations
const themes = {
    light: {
        // Base colors
        background: 'aquamarine',
        primary: '#479dda',
        secondary: '#80b5db',
        text: 'black',
        border: '#ccc',
        accent: 'cyan',
        
        // Components
        menuBackground: 'rgba(5, 134, 227, 0.75)',
        cardBackground: 'white',
        buttonBackground: '#afdeff',
        inputBackground: 'white',
        
        // Shadows and effects
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        glowColor: 'rgba(0, 238, 255, 0.4)',
        overlayBackground: 'rgba(255, 255, 255, 0.8)',
        
        // Specific elements
        scrollbarTrack: 'lightseagreen',
        scrollbarThumb: 'darkcyan',
        footerBackground: 'rgba(0, 120, 139, 0.5)',
        tooltipBackground: 'rgba(0, 65, 156, 0.8)'
    },
    dark: {
        // Base colors
        background: '#1a1a1a',
        primary: '#2c557d',
        secondary: '#1e3a54',
        text: '#ffffff',
        border: '#333',
        accent: '#00ffff',
        
        // Components
        menuBackground: 'rgba(20, 40, 60, 0.95)',
        cardBackground: '#2a2a2a',
        buttonBackground: '#2c557d',
        inputBackground: '#333',
        headerBackground: '#1e3a54',
        
        // UI Elements
        topBar: '#1e3a54',
        sideMenu: 'rgba(20, 40, 60, 0.95)',
        modalBackground: '#2a2a2a',
        
        // Gradients
        gradient1: 'linear-gradient(#2c557d, #1e3a54)',
        gradient2: 'linear-gradient(rgba(20, 40, 60, 0.95), rgba(26, 26, 26, 0.9))',
        
        // Effects
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        glowColor: 'rgba(0, 150, 255, 0.3)',
        overlayBackground: 'rgba(0, 0, 0, 0.8)',
        hoverBackground: '#3c658d',
        activeBackground: '#4c759d',
        
        // Specific elements
        scrollbarTrack: '#2a2a2a',
        scrollbarThumb: '#444',
        footerBackground: 'rgba(20, 40, 60, 0.95)',
        tooltipBackground: 'rgba(0, 20, 40, 0.95)',
        motivationBackground: '#2c557d',
        showcaseBackground: '#1e3a54',
        appCardBackground: '#2c557d'
    }
};

let themeTransitionInProgress = false;

// Apply theme to main window
function applyTheme(themeName) {
    // Prevent multiple rapid theme changes
    if (themeTransitionInProgress) return;
    
    const theme = themes[themeName];
    const root = document.documentElement;
    
    themeTransitionInProgress = true;
    root.classList.add('theme-transitioning');
    
    // Apply theme after a brief delay to ensure transition is active
    setTimeout(() => {
        // Apply all theme properties
        Object.entries(theme).forEach(([key, value]) => {
            root.style.setProperty(`--theme-${key}`, value);
        });
        
        // Update theme class without triggering observer
        const currentClass = document.body.className;
        if (!currentClass.includes(`theme-${themeName}`)) {
            document.body.className = `theme-${themeName}`;
        }
        
        // Store preference
        localStorage.setItem('theme', themeName);
        
        // Sync with iframes
        document.querySelectorAll('iframe').forEach(frame => {
            try {
                frame.contentWindow.postMessage({ 
                    type: 'themeChange', 
                    theme: themeName,
                    themeData: theme 
                }, '*');
            } catch (e) { /* Frame not loaded */ }
        });

        // Remove transition class and reset flag
        setTimeout(() => {
            root.classList.remove('theme-transitioning');
            themeTransitionInProgress = false;
        }, 300);
    }, 50);
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
}

// Listen for theme changes from settings
window.addEventListener('message', (event) => {
    if (event.data.type === 'themeChange') {
        applyTheme(event.data.theme);
    }
});

// Add real-time theme update handler
function setupThemeUpdates() {
    const observer = new MutationObserver((mutations) => {
        if (themeTransitionInProgress) return;
        
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' && 
                mutation.target.className.includes('theme-')) {
                const newTheme = mutation.target.className.includes('theme-dark') ? 'dark' : 'light';
                const currentTheme = localStorage.getItem('theme');
                
                if (newTheme !== currentTheme) {
                    applyTheme(newTheme);
                }
            }
        });
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
}

// Initialize on load with transitions
document.addEventListener('DOMContentLoaded', () => {
    setupThemeUpdates();
    initTheme();
});
