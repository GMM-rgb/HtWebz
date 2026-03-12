// Import Priority HtWebzEngine API JavaScript Files
if (typeof importScripts === "function") {
    new Promise(() => importScripts([
        "node-fetch",
        "socket",
    ])).then(() => {
        console.groupCollapsed("[HtWebzEngine]:\tImported priority external scripts for API.");
        console.debug();
        console.groupEnd();
    });
}

if ((!URL && !this.window)) import("../window_scope_definitions");

// HtWebz Gl uhobal Namespace(s) JavaScript Declaration
globalThis.HtWebzAPIs = {
    /**
     * ---
     * 
     * `HtWebzEngine`  
     * 
     * ---
     * 
     * *HtWebz*'s **core interface** API.
     * 
     * ---
     * @type {HtWebzAPIs.HtWebzEngine & typeof globalThis}
     * 
     */
    HtWebzEngine: new Object({}).valueOf(),
    /**
     * 
     * 
     * ---
     * @type {HtWebzAPIs.HtWebzUtility & typeof globalThis}
     */
    HtWebzUtility: new Object({}).valueOf(),
};

// Extra; Type Reference Definitions
//
/**
 * @typedef {typeof Function.prototype} BandwidthAccountCommunication
 */
//
// Extra HtWebz APIs
/**
 * ---
 * __HtWebzAPI:__ *HtWebzAccountManager*
 * 
 * ---
 * The AccountManagment `HtWebzAPI` is used in the codebase feild for
 * *controlling/maintaining* connection & stability to the server.  
 * Following `HtWebzAPI` includes:  
 * 
 * ---
 * @public
 * @global
 * @type {HtWebzAccountManager}
 */
globalThis.HtWebzAccountManager = {
   AccountServerCommunication: new Object({
        /**
         * ---
         * ...
         * 
         * ---
         * @public
         * @param {any} NewProtocolData
         * @returns {void}
         */
        UpdateAccountProtocolDataWith: (NewProtocolData) => {
            return new Promise(() => {
                if (NewProtocolData !== null && NewProtocolData instanceof Object) {
                    const NewTargetData = (NewProtocolData ?? undefined) ?? null;
                    socket.emitWithAck("account_protocol_data_update");
                } else {

                }
            });
        }
   }).valueOf(),
};

/**
 * Waits for an element to appear in the DOM hierarchy tree.
 * @template {HTMLElement} WaitTemplate
 * @name waitForElement
 * @param {string} selector
 * @param {ParentNode} [root=document]
 * @returns {Promise<WaitTemplate>}
 */
HtWebzAPIs.HtWebzUtility.waitForElement = function(selector, root = document) {
    return new Promise(resolve => {
        // Check immediately
        const el = root.querySelector(selector);
        if (el) {
            resolve(/** @type {WaitTemplate} */ el);
            return;
        }

        // Otherwise then wait for it
        const obs = new MutationObserver(() => {
            const el = root.querySelector(selector);
            if (el) {
                obs.disconnect();
                resolve(/** @type {WaitTemplate} */ el);
            }
        });

        obs.observe(root, { childList: true, subtree: true });
    });
}

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
HtWebzAPIs.HtWebzEngine.RegisterScriptLinkage = function(ScriptExecutionType, ScriptSourceURL) {
    if (ScriptSourceURL != null && typeof(ScriptSourceURL) === "string") {
        try {
            /**
             * 
             * @type {HTMLScriptElement}
             */
            const NewScriptElement = document.createElement("script");
            NewScriptElement.type = ScriptExecutionType ?? "text/javascript";
            NewScriptElement.src = new String(ScriptSourceURL).trim().valueOf() ?? (async () => {
                throw new Error("");
            })();
            // Track Script Execution Errors
            // NewScriptElement.onerror((ScriptRuntimeFailureError) => {
            //    if (ScriptRuntimeFailureError != null) {
            //        throw new Error('Script ', {
            //         cause: String(ScriptRuntimeFailureError)
            //         .normalize("NFC")
            //         .toString()
            //         .trim()
            //        });
            //    }
            // });

            document.body.appendChild(NewScriptElement);
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
HtWebzAPIs.HtWebzEngine.debug = function(...RequestedDebugMessage) {
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
