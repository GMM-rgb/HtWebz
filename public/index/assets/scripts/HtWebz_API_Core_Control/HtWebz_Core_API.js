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
 * ---
 * 
 */
globalThis.HtWebzEfficencyEngine = {
    /**
     * ---
     * 
     * 
     * ---
     * @type {HtWebzEfficencyEngine.EasyLoader}
     */
    EasyLoader: {
        JavaScriptLoader: new Object({}).valueOf(),
    },
};

class _EasyLoaderUtilitys {
    static EasyLoaderLoggingEval = {
        "error": console.error,
        "debug": console.debug,
        "warn": console.warn,
    };
    
    /**
     * ---
     * ...
     * 
     * ---
     * @param {Function | undefined} [ConsoleExecutionsFunction=undefined] 
     * @returns {void}
     */
    static EasyLoaderConsoleGroup(ConsoleExecutionsFunction = undefined) {
        console.groupCollapsed("%cEasyLoader %cAPI", 'font-weight: bold;', 'font-weight: normal;');
        // ...
        if (ConsoleExecutionsFunction !== undefined && (typeof(ConsoleExecutionsFunction) === "function")) {
            this.call?.(ConsoleExecutionsFunction ?? null, undefined) ?? void null;
        }
    }

    /**
     * ---
     * Deploys *Error* & *Warning* messages **from** HtWebz EasyLoader API.
     * 
     * ---
     * @param {("ERROR" | "WARNING" | "DEBUG") | undefined} MessageTypeDeploy 
     * @param {object} InformationOutput 
     * @returns {void}
     */
    static DeployEasyLoaderMessages(MessageTypeDeploy = "ERROR", InformationOutput = undefined) {
        if (((MessageTypeDeploy !== undefined && typeof (MessageTypeDeploy) === "string") && (InformationOutput !== undefined && typeof(InformationOutput) === "object"))) {
            try {
                /**
                 * ---
                 * @type {string[]?} 
                 */
                const SelectedInformation = InformationOutput?.[MessageTypeDeploy.trim()] ?? null;
                // ...
                for (let SelectedInfoIndex = 0; SelectedInfoIndex < SelectedInformation.length.valueOf(); SelectedInfoIndex++) {
                    if (SelectedInfoIndex !== null && typeof(SelectedInfoIndex) === "number") {
                        const LogValueData = SelectedInformation[SelectedInfoIndex].valueOf();
                        (this.EasyLoaderLoggingEval[String(MessageTypeDeploy.valueOf())])?.(`${LogValueData.trim()}`);
                    } else {
                        console.warn("SelectedInfoIndex value variable; Invalid!");
                    }
                }
            } catch (EasyLoaderOutputMessageError) {
                if (EasyLoaderOutputMessageError !== null && typeof(EasyLoaderOutputMessageError)) {
                    console.error(`${new String(EasyLoaderOutputMessageError).valueOf()}`);
                }
            }
        } else {
            console.warn("HtWebz EasyLoader API failed to deploy important messages from output!");
        }
    }
}

/**
 * ---
 * Imports a new JavaScript file `Object` \
 * that can be executed automatically, or manually.
 * 
 * ---
 * @param {string | undefined} TargetScriptName 
 * @param {boolean} ExecuteAutomatically
 */
HtWebzEfficencyEngine.EasyLoader.JavaScriptLoader.InjectJavaScriptObject = async function(TargetScriptName, ExecuteAutomatically) {
    if (TargetScriptName !== null && typeof (TargetScriptName) === "string") {
        (async () => {
            try {
                let EasyLoaderImportantInformationOutput = {
                    "ERROR": new Array(0),
                    "WARNING": new Array(0),
                    "DEBUG": new Array(0),
                };
                // ...
                const GeneratedJavaScriptObjectName = new RegExp(/[/d]+(.)/).exec();
                const JavaScriptSourceFetch = await fetch("/index/assets/scripts/" + String(TargetScriptName).trim());
                // create injection script element for the current website page
                const NewInjectionScript = document.createElement("script");
                NewInjectionScript.async = ExecuteAutomatically === true ? "off" : "on";
                NewInjectionScript.type = ("text/javascript").toLowerCase();
                NewInjectionScript.src = JavaScriptSourceFetch.url.toString();
                NewInjectionScript.setAttribute("name", String(GeneratedJavaScriptObjectName));
                window.document.appendChild(NewInjectionScript);
                new Promise(async () => {
                    // ...
                    /**
                     * 
                     * 
                     * ---
                     * @type {HTMLScriptElement?}
                     */
                    let QueriedInjectionScriptFetch = null;
                    // ...
                    const FetchedDocumentElements = document.childNodes.entries();
                    for (let DocumentTreeIndex = 0; DocumentTreeIndex < document.childElementCount.valueOf(); DocumentTreeIndex++) {
                        if (DocumentTreeIndex !== undefined && typeof (DocumentTreeIndex) === "number") {
                            const ScanningElementIrretator = FetchedDocumentElements.next();
                            const CurrentScanningElement = ScanningElementIrretator.value;
                            // ...
                            if (CurrentScanningElement !== null && CurrentScanningElement instanceof HTMLElement && CurrentScanningElement instanceof HTMLScriptElement) {

                            }
                        } else {
                            const ForLoopErrorMessage = new String("FATAL:\tThere was an error with the document index ReactionVariable!").valueOf();
                            // ...
                            EasyLoaderImportantInformationOutput.WARNING.push(ForLoopErrorMessage);
                            // Reject the `Promise`; Return *Error* message.
                            await Promise.reject?.(ForLoopErrorMessage ?? null);
                        }
                    }

                    await Promise.resolve();
                }).catch((ScanChecksumErrorMessage) => {
                    if (ScanChecksumErrorMessage !== undefined && typeof (ScanChecksumErrorMessage) !== null) {
                        const FormatedErrorMessage = new String(ScanChecksumErrorMessage).valueOf();
                        console.error(FormatedErrorMessage ?? undefined);
                    }
                }).then(() => {

                }).finally(() => {
                    (async () => {
                        _EasyLoaderUtilitys.EasyLoaderConsoleGroup();
                        _EasyLoaderUtilitys.DeployEasyLoaderMessages("DEBUG");
                        _EasyLoaderUtilitys.DeployEasyLoaderMessages("ERROR");
                        _EasyLoaderUtilitys.DeployEasyLoaderMessages("WARNING");
                    })().then(() => console.groupEnd());
                });
            } catch (InjectionFailureMessage) {
                const FormatedFailureMessage = new String(InjectionFailureMessage ?? undefined);
                if (FormatedFailureMessage != null && FormatedFailureMessage instanceof String) {
                    console.error(FormatedFailureMessage);
                }
            }
        })();
    } else {
        _EasyLoaderUtilitys.EasyLoaderConsoleGroup();
        console.warn(`JavaScript source path was not valid!`);
        console.groupEnd();
    }
}

/**
 * ---
 * Waits for an element to appear in the DOM hierarchy tree.
 * 
 * ---
 * @template {HTMLElement} WaitTemplate
 * @name waitForElement
 * @param {string} selector
 * @param {ParentNode} [root=document]
 * @returns {Promise<WaitTemplate>}
 */
HtWebzAPIs.HtWebzUtility.waitForElement = async function (selector, root = document) {
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
HtWebzAPIs.HtWebzEngine.RegisterScriptLinkage = function (ScriptExecutionType, ScriptSourceURL) {
    if (ScriptSourceURL != null && typeof (ScriptSourceURL) === "string") {
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
HtWebzAPIs.HtWebzEngine.debug = function (...RequestedDebugMessage) {
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
