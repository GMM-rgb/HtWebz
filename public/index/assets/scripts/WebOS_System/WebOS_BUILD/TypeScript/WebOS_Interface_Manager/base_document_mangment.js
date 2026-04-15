let DisplayCanvasStyles = String().valueOf();
function browserSupportsCSS() {
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
var VirtualMachineElementManager;
(function (VirtualMachineElementManager) {
    async function InstanceCanvasRenderingElement() {
        if (!window?.document?.body) {
            console.error("Document body not available");
            return undefined;
        }
        const canvas = document.createElement("canvas");
        canvas.id = "DisplayVM";
        canvas.height = Math.abs(self?.innerHeight ?? 100 / 2);
        canvas.width = Math.abs(self?.innerWidth ?? 100 / 2);
        canvas.style.cssText = DisplayCanvasStyles;
        return canvas;
    }
    VirtualMachineElementManager.InstanceCanvasRenderingElement = InstanceCanvasRenderingElement;
})(VirtualMachineElementManager || (VirtualMachineElementManager = {}));
window.addEventListener("DOMContentLoaded", () => {
    VirtualMachineElementManager.InstanceCanvasRenderingElement().then(canvas => {
        if (canvas) {
            console.log("Canvas created successfully:", canvas.id);
            document.body.querySelector(".virtual-machine-display-wrapper")?.appendChild(canvas ?? undefined);
        }
    }).catch(err => console.error("Failed to create canvas:", err));
}, { once: true, passive: true });
//# sourceMappingURL=../../../TypeScript/WebOS_Interface_Manager/base_document_mangment.js.map