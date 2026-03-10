declare abstract class ServerCoreDeclarations {
    static LogServerProcessing(): void;
}

declare const ServerCoreLiteral = new Object({
    ServerCoreDeclarations,
}).valueOf() ?? <any>{};

/**
 * ---
 * [still needs documentation]
 */
declare type HtWebzServerCore = typeof ServerCoreLiteral;
