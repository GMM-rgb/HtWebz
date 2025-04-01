document.addEventListener('DOMContentLoaded', () => {
    // Get required elements
    const toolbarExtension = document.getElementById('toolbarExtension');
    const expandMenuToolbar = document.getElementById('expandMenuToolbar');
    const appButtonContainerWarp = document.getElementById('appButtonContainerWarp');

    // Verify elements exist
    if (!toolbarExtension || !expandMenuToolbar || !appButtonContainerWarp) {
        console.error('Required toolbar elements are missing');
        return;
    }

    // Animation configuration
    const animationClass = "expandMenuAnimation";
    const animationDuration = 500;

    // Create toolbar buttons
    const buttonCount = 10;
    for (let i = 1; i <= buttonCount; i++) {
        const button = document.createElement('button');
        button.className = 'wbt-toolbar-button';
        button.innerHTML = `Tool ${i}`;
        button.onclick = () => notify(`Tool ${i} clicked`);
        appButtonContainerWarp.appendChild(button);
    }

    // Handle animation reset
    toolbarExtension.addEventListener('animationend', () => {
        if (!toolbarExtension.classList.contains('open')) {
            toolbarExtension.style.display = "none";
        }
    });

    // Toggle toolbar visibility with repeatable animation
    expandMenuToolbar.onclick = () => {
        const isHidden = !toolbarExtension.classList.contains('open');
        
        if (isHidden) {
            toolbarExtension.style.display = "flex";
            toolbarExtension.style.opacity = "1";
            // Force reflow to restart animation
            void toolbarExtension.offsetWidth;
            toolbarExtension.classList.add(animationClass, 'open');
            notify("Toolbar opened");
        } else {
            toolbarExtension.classList.remove('open');
            toolbarExtension.style.opacity = "0";
            // Remove animation class to allow it to be added again
            toolbarExtension.classList.remove(animationClass);
            notify("Toolbar closed");
        }
    };
});

// // Add required styles
// const toolbarStyles = document.createElement('style');
// toolbarStyles.textContent = `
//     .wbt-toolbar-button {
//         padding: 8px 16px;
//         margin: 4px;
//         border: 2px solid var(--theme-border);
//         border-radius: 8px;
//         background: var(--theme-buttonBackground);
//         cursor: pointer;
//         transition: all 0.3s ease;
//     }

//     .wbt-toolbar-button:hover {
//         transform: scale(1.05);
//         background: var(--theme-hoverBackground);
//     }

//     #toolbarExtension {
//         display: none;
//         position: fixed;
//         top: 80px;
//         left: 0;
//         width: 200px;
//         background: var(--theme-menuBackground);
//         border-radius: 0 15px 15px 0;
//         padding: 10px;
//         box-shadow: 2px 0 10px rgba(0,0,0,0.2);
//         z-index: 1000;
//         opacity: 0;
//         transition: opacity ${animationDuration}ms ease;
//     }

//     #appButtonContainerWarp {
//         display: flex;
//         flex-direction: column;
//         gap: 5px;
//     }

//     .expandMenuAnimation {
//         animation: slideIn ${animationDuration}ms ease forwards;
//     }

//     @keyframes slideIn {
//         from {
//             transform: translateX(-100%);
//             opacity: 0;
//         }
//         to {
//             transform: translateX(0);
//             opacity: 1;
//         }
//     }
// `;
// document.head.appendChild(toolbarStyles);
