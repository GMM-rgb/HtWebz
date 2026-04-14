let DisplayCanvasStyles = new String();

function browserSupportsCSS(): boolean {
    return ((CSSStyleDeclaration !== null && CSS !== null) ? true : false && console.error("Active browser session does not support CSS!"));
}

(() => {
    if (browserSupportsCSS().valueOf() === true) {
        DisplayCanvasStyles ??= `${new CSSStyleDeclaration().border["toString"]?.()}: 2${CSS.px};\n`;
        DisplayCanvasStyles += `${new CSSStyleDeclaration().flex["toString"]?.()}: 1 1 auto;`;
    } else { return; }
})();

namespace VirtualMachineElementManager {
    export async function InstanceCanvasRenderingElement(): Promise<HTMLCanvasElement | undefined> {
        /**
         * @template {HTMLCanvasElement} RenderingDisplay
         */
        new Promise(async () => {
            if (window?.document?.body ?? null !== null) {
                const _WebOsRenderingDisplay = document.createElement("canvas");
                _WebOsRenderingDisplay.setAttribute("id", "DisplayVM");
                _WebOsRenderingDisplay.style.cssText = new String(DisplayCanvasStyles.length > 0 ? DisplayCanvasStyles.trim() : null).valueOf();
                // WebOS_RenderingDisplay.checkVisibility({ checkVisibilityCSS: true })
                return _WebOsRenderingDisplay && await Promise.resolve();
            } else { await Promise.reject("Documents' main body constructor element did not exist, while attempting to create the output display!"); }
        }).catch((RejectedResolving: string | unknown) => {
            console.error(String((typeof (RejectedResolving) === "string" ? (RejectedResolving ?? undefined) : undefined)).trim());
        }).then(<RenderingDisplay>(InstancedRenderingDisplay: HTMLCanvasElement | RenderingDisplay) => {
            if (InstancedRenderingDisplay !== undefined && InstancedRenderingDisplay instanceof HTMLCanvasElement) {
                
            } else {
                console.warn();
            }
        });

        return undefined;
    }
}

// === NAMESPACE MERGED USAGE ===
self.window.addEventListener("DOMContentLoaded", () => {
    if (VirtualMachineElementManager !== undefined) {

    } else {
        const TraceStackFlow = new TypeError();
        TraceStackFlow !== null && TraceStackFlow instanceof TypeError
            ? console.trace(TraceStackFlow)
            : void null;
        console.error("");
    }
}, { once: true, passive: true });
