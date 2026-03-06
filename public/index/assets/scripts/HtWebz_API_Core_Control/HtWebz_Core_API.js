// Import Priority HtWebzEngine API JavaScript Files
new Promise(() => importScripts([
    "node-fetch",
    "socket",
])).then(() => {
    console.groupCollapsed("[HtWebzEngine]:\tImported priority external scripts for API.");
    console.debug();
    console.groupEnd();
});

import("../window_scope_definitions");

// HtWebz Global Namespace(s) JavaScript Declaration
/**
 * ---
 * 
 * ...
 * 
 * ---
 * @type {HtWebzEngine & typeof globalThis}
 * 
 */
const HtWebzEngineLocal = new Object({}).valueOf();

globalThis.HtWebzEngine = HtWebzEngineLocal;
globalThis.HtWebzUtility = new Object({}).valueOf();

Object.assign(globalThis, HtWebzEngineLocal);

class _Registered_HTMLScriptElement {
    /**
     * 
     * @param {HTMLScriptElement} ScriptElement 
     */
    constructor(ScriptElement) {
        /**
         * 
         * @type {(HTMLScriptElement | null)?}
         */
        this.RegisteredScript = ScriptElement ?? null;
    }
}

class RegisteredScript extends _Registered_HTMLScriptElement {
    constructor() {
        super();
    }
}

/**
 * 
 * ---
 * 
 * Registers a new JavaScript execution **HTMLScriptElement**.
 * 
 * ---
 * 
 * @param {("text/javascript" | "module" | undefined)?} ScriptExecutionType
 * @param {string} ScriptSourceURL 
 * 
 * ---
 * 
 * @returns {void}
 * 
 */
HtWebzEngine.RegisterScriptLinkage = function(ScriptExecutionType, ScriptSourceURL) {
    if (ScriptSourceURL != null && typeof(ScriptSourceURL) === "string") {
        try {
            /**
             * 
             * @type {HTMLScriptElement}
             */
            const NewScriptElement = window.document.createElement("script");
            NewScriptElement.type = ScriptExecutionType !== null ?? "text/javascript";
            NewScriptElement.src = new String(ScriptSourceURL).trim().valueOf();
            NewScriptElement.parentNode = document.body.getRootNode(undefined);
            // Track Script Execution Errors
            NewScriptElement.onerror((ScriptRuntimeFailureError) => {
               if (ScriptRuntimeFailureError != null) {
                   throw new Error('Script ', {
                    cause: String(ScriptRuntimeFailureError)
                    .normalize("NFC")
                    .toString()
                    .trim()
                   });
               }
            });
        } catch (ScriptRegisterError) {
            if (ScriptRegisterError != null) {
                console.error(`While registering script linkage; process encountered a FATAL Error:\n${String(ScriptRegisterError).trim()}`);
            }
        }
    } else {
        console.warn('The provided "ScriptSourceURL"; was either invalid or NULL!');
    }
}

/**
 * 
 * ---
 * 
 * '...'
 * 
 * @param {string[]} RequestedDebugMessage 
 * @returns {void}
 * 
 */
HtWebzEngine.debug = function(...RequestedDebugMessage) {
    if (RequestedDebugMessage != null) {
        RequestedDebugMessage.concat(["[HtWebz]:\t"]);
        const MessageContent = RequestedDebugMessage.copyWithin(
            -1,
            0,
            Math.abs(RequestedDebugMessage.length - 2)
        );
    } else {
        console.groupCollapsed("HtWebz Debug Logger");
        console.warn();
        console.groupEnd();
    }
}
