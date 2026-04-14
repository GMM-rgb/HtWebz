if ((!URL && !this.window)) import("../window_scope_definitions");
// import * as EfficencyGroupLogging from "./Utility/TypeScript/GroupLoggingUtility";
// HtWebz Global Namespace(s) JavaScript Declaration
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
// ...
/**
 * @typedef {typeof Function.prototype} BandwidthAccountCommunication
 */
// ...
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
 * (@type {HtWebzAccountManager})
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
        if (ConsoleExecutionsFunction !== undefined && (typeof (ConsoleExecutionsFunction) === "function")) {
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
        if (((MessageTypeDeploy !== undefined && typeof (MessageTypeDeploy) === "string") && (InformationOutput !== undefined && typeof (InformationOutput) === "object"))) {
            try {
                /**
                 * ---
                 * @type {string[]?} 
                 */
                const SelectedInformation = InformationOutput?.[MessageTypeDeploy.trim()] ?? null;
                // ...
                for (let SelectedInfoIndex = 0; SelectedInfoIndex < SelectedInformation.length.valueOf(); SelectedInfoIndex++) {
                    if (SelectedInfoIndex !== null && typeof (SelectedInfoIndex) === "number") {
                        const LogValueData = SelectedInformation[SelectedInfoIndex].valueOf();
                        (this.EasyLoaderLoggingEval[String(MessageTypeDeploy.valueOf())])?.(`${LogValueData.trim()}`) ?? void null;
                    } else {
                        console.warn("SelectedInfoIndex value variable; Invalid!");
                    }
                }
            } catch (EasyLoaderOutputMessageError) {
                if (EasyLoaderOutputMessageError !== null && typeof (EasyLoaderOutputMessageError)) {
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
HtWebzEfficencyEngine.EasyLoader.JavaScriptLoader.LoadJavaScriptObject = async function (TargetScriptName = undefined, ExecuteAutomatically = true) {
    if ((TargetScriptName !== undefined && TargetScriptName !== null) && typeof (TargetScriptName) === "string") {
        (async () => {
            try {
                let EasyLoaderImportantInformationOutput = {
                    "ERROR": new Array(0),
                    "WARNING": new Array(0),
                    "DEBUG": new Array(0),
                };

                /**
                 * ---
                 * @param {HTMLScriptElement} [TargetScriptObject=undefined] 
                 * @returns {boolean}
                 */
                function HasJavaScriptAttributeName(TargetScriptObject = undefined) {
                    if ((TargetScriptObject !== undefined && TargetScriptObject instanceof HTMLScriptElement)
                        && (SelectedHTMLScript.hasAttribute("name"))) {
                        return true;
                    } else {
                        return false;
                    }
                }

                /**
                 * ---
                 * ...
                 * 
                 * ---
                 * @param {HTMLScriptElement} [SelectedHTMLScript=undefined] 
                 * @returns {boolean}
                 */
                function LoadedJavaScriptValidSource(SelectedHTMLScript = undefined) {
                    /**
                     * @type {boolean}
                     */
                    let isSourceValid = false;
                    // ...
                    if ((isSourceValid !== undefined && isSourceValid !== null) && typeof (isSourceValid) === "boolean") {
                        if (SelectedHTMLScript !== undefined && (SelectedHTMLScript instanceof HTMLElement && SelectedHTMLScript instanceof HTMLScriptElement)) {
                            if (HasJavaScriptAttributeName() === true) {
                                const FetchedJavaScriptObjectName = SelectedHTMLScript.getAttribute("name").toString();
                                const JavaScriptObjectStatus = new RegExp(/(.<=?::)/).exec(FetchedJavaScriptObjectName)[0].trim();
                                console.debug(new String(JavaScriptObjectStatus).valueOf());
                            } else {
                                console.warn();
                            }
                        } else {
                            console.error();
                        }
                    }

                    return isSourceValid ?? false;
                }

                /**
                 * ---
                 * @param {URL | string} FullScriptUrl 
                 * @returns {boolean}
                 */
                function LoadedJavaScriptObjectAlreadyExists(FullScriptUrl) {
                    /**
                     * ---
                     * @type {boolean}
                     */
                    let JavaScriptObjectExists = false;
                    /**
                     * ---
                     * @type {(HTMLElement[] | undefined[])}
                     */
                    let ChecksumFetchedDocumentElements = [];
                    // ...
                    if (JavaScriptObjectExists !== undefined && ChecksumFetchedDocumentElements !== undefined && (ChecksumFetchedDocumentElements instanceof Array)) {
                        for (let iv = 0; iv.valueOf() < Math.ceil(document.body.childElementCount); iv++) {
                            if (iv === null) return;
                            
                        }
                    }

                    return JavaScriptObjectExists ?? false;
                }

                /**
                 * ---
                 * @template {"text/javascript" | "module"} ScriptCompilationUsage
                 * @param {(Blob | Response)} [FetchedScriptFile=undefined]
                 * @returns {(ScriptCompilationUsage | null)?}
                 */
                function CompilationTypeCommonJS(FetchedScriptFile = undefined) {
                    if (FetchedScriptFile !== undefined && FetchedScriptFile !== null) {
                        if (FetchedScriptFile instanceof Blob || FetchedScriptFile instanceof Response) {
                            /**
                             * ---
                             * @type {string[]} 
                             */
                            const ModuleTypeKeywords = ['import', 'export'];
                            /**
                             * ---
                             * @type {(ScriptCompilationUsage)[]} 
                             */
                            const CompilationTypes = ["text/javascript", "module"];
                            /**
                             * ---
                             * @type {(Blob | undefined)?} 
                             */
                            const BlobFileResponse = FetchedScriptFile instanceof Response
                                ? FetchedScriptFile.blob
                                : FetchedScriptFile instanceof Blob
                                    ? FetchedScriptFile
                                    : (undefined ?? null);
                            let CommonJS_CompilationTypeMethod = String(CompilationTypes[0].toLowerCase()).toString();
                            let ModulePatternExpression = new RegExp(/(.<=?)[\w]+/gi);
                            const ModulePatternSource = ModulePatternExpression.source.trim().normalize("NFC");
                            const SelectedPatternSegment = ModulePatternSource.at(Math.floor(parseFloat(String(Math.abs((ModulePatternSource.length.valueOf() - (1 + 3)))))));
                            console.debug(`${SelectedPatternSegment}`);
                            const FinalizedModulePattern = ModulePatternSource.replace();
                            ModulePatternExpression.source = String(FinalizedModulePattern).trim();
                            // ...
                            const isModule = new Boolean(ModulePatternExpression.test(String(BlobFileResponse.text()).trim())).valueOf();
                            // ...
                            CommonJS_CompilationTypeMethod = (isModule ? CompilationTypes[1] : CompilationTypes[0]).toString();
                            // ...
                            return CommonJS_CompilationTypeMethod ?? null;
                        } else {
                            console.error("JavaScript Loading Method Type Determination Error:\n" + ``);
                        }
                    }
                }

                /**
                 * ---
                 * 
                 * 
                 * ---
                 * @type {HTMLScriptElement?}
                 */
                let QueriedInjectionScriptFetch = null;
                // ...
                const JavaScriptSourceFetch = await fetch("/index/assets/scripts/" + String(TargetScriptName).trim());
                const GeneratedJavaScriptObjectName = String(`${JavaScriptSourceFetch.status.valueOf()}::LoadedJavaScript::${Math.ceil(Math.random() * Math.abs(100 * 10))}`);
                // ...
                console.debug(`${GeneratedJavaScriptObjectName.toString() ?? "Name NOT Available!"}`);
                console.debug(CompilationTypeCommonJS(JavaScriptSourceFetch));
                // create injection script element for the current website page
                const NewInjectionScript = document.createElement("script");
                NewInjectionScript.async = ExecuteAutomatically === true ? "off" : "on";
                NewInjectionScript.type = ("text/javascript").toLowerCase();
                NewInjectionScript.src = JavaScriptSourceFetch.url.toString();
                NewInjectionScript.setAttribute("scriptvalidated", "FALSE");
                NewInjectionScript.setAttribute("name", String(GeneratedJavaScriptObjectName));
                document.body.appendChild(NewInjectionScript);
                // ...
                console.debug("Validating loaded JavaScript...");
                /**
                 * @template {HTMLScriptElement} FetchChecksum
                 */
                new Promise(async () => {
                    for (let DocumentTreeIndex = 0; (DocumentTreeIndex.valueOf() < Number(document.body.childElementCount)); DocumentTreeIndex++) {
                        if (DocumentTreeIndex !== undefined && typeof (DocumentTreeIndex) === "number") {
                            const SelectedElement = document.body.children.item(DocumentTreeIndex.valueOf());
                            // ...
                            console.debug(parseFloat(DocumentTreeIndex.toString()));
                            // ...
                            if (SelectedElement !== null && SelectedElement instanceof HTMLScriptElement) {
                                console.info(LoadedJavaScriptValidSource());
                                console.debug("%cELEMENT MATCH!", 'font-weight: bold;');
                                if (SelectedElement.hasAttribute("scriptvalidated") === true) {
                                    NewInjectionScript.setAttribute("scriptvalidated", "TRUE");
                                }
                                return void null;
                            } else {
                                console.warn("VALIDATION ELEMENT MISMATCH!");
                                continue;
                            }
                        } else {
                            const ForLoopErrorMessage = new String("FATAL:\tThere was an error with the document index ReactionVariable!").valueOf();
                            EasyLoaderImportantInformationOutput.WARNING.push(ForLoopErrorMessage);
                            await Promise.reject?.(ForLoopErrorMessage ?? null); // Reject the `Promise`; Return *Error* message.
                        }
                    }

                    await Promise.resolve(QueriedInjectionScriptFetch !== null ? QueriedInjectionScriptFetch : null);
                }).catch((ScanChecksumErrorMessage) => {
                    if (ScanChecksumErrorMessage !== undefined && typeof (ScanChecksumErrorMessage) !== null) {
                        const FormatedErrorMessage = new String(ScanChecksumErrorMessage).valueOf();
                        console.error(FormatedErrorMessage ?? undefined);
                    } else {
                        EasyLoaderImportantInformationOutput.WARNING.push(`Checksum scan error message was not available!`.trim());
                    }
                }).then((/** @type {FetchChecksum} */ FetchedChecksumScript = /* ...or just create a blank script element so this doesn't _*fail / crash*_ */ new HTMLScriptElement()) => {
                    /**
                     * ---
                     * [needs ***JSDoc*** comment]  
                     * 
                     * ---
                     * @param {HTMLScriptElement | undefined} [TargetSelector=undefined] 
                     * @returns {boolean} 
                     */
                    function ChecksumElementValidated(TargetSelector = undefined) {
                        return (async () => {
                            let isValidated = false;
                            if (TargetSelector !== undefined && TargetSelector instanceof HTMLScriptElement && Object.entries(TargetSelector) !== null) {
                                const FetchedScriptValidatedAttribute = TargetSelector.getAttribute("scriptvalidated").trim().toLowerCase();
                                typeof (isValidated) === "boolean" ? (isValidated = new Boolean(FetchedScriptValidatedAttribute).valueOf()) : void null;
                                return isValidated ?? false;
                            } else {
                                EasyLoaderImportantInformationOutput.ERROR.push(`>>> TargetSelector <<< is invalid, expected an HTMLScriptElement;\nReceived unexpected HTML Object:\t${TargetSelector.getRootNode().nodeName.toString().trim()}`);
                            }
                        })().then((ProcessedValue) => {
                            return ProcessedValue !== null && ProcessedValue ? ProcessedValue : false;
                        }).finally(() => {
                            EasyLoaderImportantInformationOutput.DEBUG.push("Validated script has a validation attribute, and is truthy / false.");
                        });
                    }

                    if (FetchedChecksumScript !== undefined) {
                        const ValidatedSuccessfully = ChecksumElementValidated?.(FetchedChecksumScript) ?? console.warn();
                        ValidatedSuccessfully ? EasyLoaderImportantInformationOutput.DEBUG.push() : (/** @type {HTMLScriptElement} */ QueriedInjectionScriptFetch.remove());
                    }
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

// Import Priority HtWebzEngine API JavaScript Files
if (typeof importScripts === "function") {
    new Promise(() => importScripts([
        "node-fetch",
        "socket",
    ])).then(() => {
        console.groupCollapsed("[HtWebzEngine]:\tImported priority external backend hosted scripts for API.");
        console.debug();
        console.groupEnd();
    });
}
