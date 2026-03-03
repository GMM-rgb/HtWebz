// document.addEventListener('DOMContentLoaded', () => {
//     // Get required elements
//     const toolbarExtension = document.getElementById('toolbarExtension');
//     const expandMenuToolbar = document.getElementById('expandMenuToolbar');
//     const appButtonContainerWarp = document.getElementById('appButtonContainerWarp');

//     // Verify elements exist
//     if (!toolbarExtension || !expandMenuToolbar || !appButtonContainerWarp) {
//         console.error('Required toolbar elements are missing');
//         return;
//     }

//     // Animation configuration
//     const animationClass = "expandMenuAnimation";
//     const animationDuration = 500;

//     // Create toolbar buttons
//     const buttonCount = 10;
//     for (let i = 1; i <= buttonCount; i++) {
//         const button = document.createElement('button');
//         button.className = 'wbt-toolbar-button';
//         button.innerHTML = `Tool ${i}`;
//         button.onclick = () => notify(`Tool ${i} clicked`);
//         appButtonContainerWarp.appendChild(button);
//     }

//     // Handle animation reset
//     toolbarExtension.addEventListener('animationend', (event) => {
//         if (event.animationName === 'retractMenuAnimation') {
//             toolbarExtension.style.display = "none";
//             toolbarExtension.classList.remove('retractMenuAnimation');
//         }
//     });

//     // Toggle toolbar visibility with repeatable animation
//     expandMenuToolbar.onclick = () => {
//         const isHidden = !toolbarExtension.classList.contains('open');
        
//         if (isHidden) {
//             toolbarExtension.style.display = "flex";
//             toolbarExtension.style.opacity = "1";
//             void toolbarExtension.offsetWidth; // Force reflow
//             toolbarExtension.classList.remove('retractMenuAnimation');
//             toolbarExtension.classList.add('expandMenuAnimation', 'open');
//             notify("Toolbar opened");
//         } else {
//             toolbarExtension.classList.remove('expandMenuAnimation', 'open');
//             toolbarExtension.classList.add('retractMenuAnimation');
//             notify("Toolbar closed");
            
//             // Wait for retract animation to finish
//             setTimeout(() => {
//                 toolbarExtension.style.display = "none";
//                 toolbarExtension.classList.remove('retractMenuAnimation');
//             }, 500);
//         }
//     };
// });
