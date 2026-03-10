declare abstract class ServerCoreDeclarations {
    abstract static LogServerProcessing(): void;
}

declare const CoreLiterals = {
    LogServerProcessing: ServerCoreDeclarations.LogServerProcessing as Function,
};

declare const ServerCoreLiteral = new Object({
    CoreLiterals,
}).valueOf() ?? null;

/**
 * ---
 * [still needs documentation]
 */
declare type HtWebzServerCore = typeof ServerCoreLiteral;
