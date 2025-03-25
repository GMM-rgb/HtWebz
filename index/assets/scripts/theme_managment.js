// Theme configurations
const themes = {
    light: {
        background: 'aquamarine',
        primary: '#479dda',
        secondary: '#80b5db',
        text: 'black',
        border: '#ccc',
        menuBackground: 'rgba(5, 134, 227, 0.75)',
        cardBackground: 'white',
        buttonBackground: '#afdeff'
    },
    dark: {
        background: '#1a1a1a',
        primary: '#2c557d',
        secondary: '#1e3a54',
        text: 'white',
        border: '#333',
        menuBackground: 'rgba(20, 40, 60, 0.9)',
        cardBackground: '#2a2a2a',
        buttonBackground: '#2c557d'
    }
};

// Apply theme to main window
function applyTheme(themeName) {
    const theme = themes[themeName];
    const root = document.documentElement;
    
    // Apply theme variables
    Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(`--theme-${key}`, value);
    });
    
    // Add theme class to body
    document.body.className = themeName;
    
    // Store theme preference
    localStorage.setItem('theme', themeName);
    
    // Sync theme with all iframes
    document.querySelectorAll('iframe').forEach(frame => {
        try {
            frame.contentWindow.postMessage({ type: 'themeChange', theme: themeName }, '*');
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
