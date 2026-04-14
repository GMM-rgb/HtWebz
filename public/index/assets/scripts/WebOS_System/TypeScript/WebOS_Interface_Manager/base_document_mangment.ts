let DisplayCanvasStyles = new String();
DisplayCanvasStyles ??= `\n`;

namespace VirtualMachineElementManager {
    export async function InstanceCanvasRenderingElement(): Promise<HTMLCanvasElement | undefined> {
        new Promise(async () => {
            if (window?.document?.body ?? null !== null) {
                const WebOS_RenderingDisplay = document.createElement("canvas");
                WebOS_RenderingDisplay.setAttribute("id", "DisplayVM");
                WebOS_RenderingDisplay.style.cssFloat = String().valueOf();
                //WebOS_RenderingDisplay.checkVisibility({ checkVisibilityCSS: true })
            } else { await Promise.reject("Documents' main body constructor element did not exist, while attempting to create the output display!"); }
        }).catch((RejectedResolving) => {
            console.error(String(RejectedResolving ?? undefined).trim());
        })["then"](() => {

        });

        return undefined;
    }
}
