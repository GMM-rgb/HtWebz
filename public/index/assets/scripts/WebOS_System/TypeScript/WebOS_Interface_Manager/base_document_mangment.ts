let DisplayCanvasStyles = String().valueOf();

function browserSupportsCSS(): boolean {
    return typeof CSS !== "undefined" && typeof CSSStyleDeclaration !== "undefined";
}

(() => {
    if (!browserSupportsCSS())
        return console.error("Active browser session does not support CSS!");

    DisplayCanvasStyles = `
        border: 2px solid;
        flex: 1 1 auto;
    `.trim();
})();

namespace VirtualMachineElementManager {
    export async function InstanceCanvasRenderingElement(): Promise<HTMLCanvasElement | undefined> {
        if (!window?.document?.body) {
            console.error("Document body not available");
            return undefined;
        }

        const canvas = document.createElement("canvas");
        canvas.id = "DisplayVM";
        canvas.height = Math.abs(self?.innerHeight ?? 100);
        canvas.width = Math.abs(self?.innerWidth ?? 100);
        canvas.setAttribute("", "");
        canvas.style.cssText = DisplayCanvasStyles;

        self.addEventListener("resize", () => {

        });

        return canvas;
    }
}

// DOMContentLoaded handler
window.addEventListener("DOMContentLoaded", () => {
    VirtualMachineElementManager.InstanceCanvasRenderingElement().then(canvas => {
        if (canvas) {
            console.log("Canvas created successfully:", canvas.id);
            document.body.querySelector(".virtual-machine-display-wrapper")?.appendChild(canvas ?? undefined);
        }
    }).catch(err => console.error("Failed to create canvas:", err));
}, { once: true, passive: true });
