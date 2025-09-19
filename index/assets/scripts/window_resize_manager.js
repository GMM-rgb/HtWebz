const WindowResizeDebug = true;
let WindowWidth = null;

document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector("#pageTitle");

    setTimeout(() => {
        const retryAttemptInital = 3;
        let retrys = 0;
        while (retrys <= retryAttemptInital) {
            retrys += 1;
            WindowWidth = window.innerWidth || 0;
        }
        if (WindowWidth) {
            window.addEventListener("resize", (e) => {
                try {
                    e.stopImmediatePropagation();
                    if (window.innerWidth !== null) {
                        WindowWidth = window.innerWidth;
                        if (WindowResizeDebug) {
                            console.log(`${Math.floor(WindowWidth)}`);
                        }
                    }
                } catch (error) {
                    console.error(`${error}`);
                }
            });
        }
    }, 0);

    function updateTitleElement() {
        if (title) {
            
        } else {
            console.warn("Could not find PageTitle Element.");
        }

        requestAnimationFrame(updateTitleElement);
    }

    updateTitleElement();
});
