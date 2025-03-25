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
        menuBackground: 'rgba(20, 40, 60, 0.9)',
        cardBackground: '#2a2a2a',
        buttonBackground: '#2c557d',
        inputBackground: '#333',
        
        // Shadows and effects
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        glowColor: 'rgba(0, 150, 255, 0.3)',
        overlayBackground: 'rgba(0, 0, 0, 0.8)',
        
        // Specific elements
        scrollbarTrack: '#2a2a2a',
        scrollbarThumb: '#444',
        footerBackground: 'rgba(20, 40, 60, 0.8)',
        tooltipBackground: 'rgba(0, 20, 40, 0.9)'
    }
};

// Apply theme to main window
function applyTheme(themeName) {
    const theme = themes[themeName];
    const root = document.documentElement;
    
    // Apply all theme properties automatically
    Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(`--theme-${key}`, value);
    });
    
    // Add theme class to document for additional CSS targeting
    document.body.className = `theme-${themeName}`;
    
    // Store theme preference
    localStorage.setItem('theme', themeName);
    
    // Sync theme with all iframes
    document.querySelectorAll('iframe').forEach(frame => {
        try {
            frame.contentWindow.postMessage({ 
                type: 'themeChange', 
                theme: themeName,
                themeData: theme 
            }, '*');
        } catch (e) {
            console.log('Frame not yet loaded');
        }
    });
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

// Initialize on load
document.addEventListener('DOMContentLoaded', initTheme);
