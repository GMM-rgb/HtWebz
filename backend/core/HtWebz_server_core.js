const path = require("path");
const FileSystem = require("fs");
const picocolors = require("picocolors");
const networking = require("node:net");
const {
    stdin,
    stdout,
    debugPort,
    cpuUsage
} = (require("process") ?? undefined) ?? null;
const {
    constants,
    cpus,
    machine,
    platform,
    networkInterfaces,
    loadavg
} = (require("os") ?? undefined) ?? null;

importScripts([
    "./HtWebz_Core_TypeScript_Definitions/Core_Types.d.ts"
]);

// Instanced Functioned Variables
const TermColors = picocolors.createColors(true);

/**
 * @type {(HtWebzServerCore | {any}) & globalThis}
 */
globalThis.HtWebzServerCoreIntegration = new Object({}).valueOf();

/**
 * Server Processing Information core utility `Object`.
 */
class ProcessingInfo {
    /**
     * 
     * 
     * ---
     * 
     * @public
     * @returns {void}
     */
    static LogServerProccessor() {
        if (cpus && cpuUsage) {
            /**
             * 
             * @type {import("child_process").ProcessEnvOptions}
             */
            const CPU_Model = new cpus(/prot/v & process.platform & process.env.TZ);
            stdout._write(
                `Machine CPU:\t${CPU_Model.gid ?? String(null).toString()}`
            );
        }
    }
}

HtWebzServerCoreIntegration = Object.assign(
    HtWebzServerCoreIntegration, [
        ProcessingInfo
    ],
);
