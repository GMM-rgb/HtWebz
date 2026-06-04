import type {
    QueriedValuesTemplate,
    ValueCheckingFetch,
} from "./../scripting_utilities/scripting_utilties_types";

import {
    ValueChecker,
} from "./../scripting_utilities/value_managment";

let con: Readonly<typeof console> = console ?? null;

declare namespace RegisteryTypeComponents {
    export type ParsingModes =
        "standard" | "collection";
    export type SessionElementRegister = {
        SourceContents?: SessionElementRegister;
        ElementNodeType?: globalThis.HTMLElementTagNameMap;
        /**
         * ---
         * `OVERVIEW`: Holds the element's target name.
         * `CLASS`   : Marks style listing class definition.
         * `_ID`      : Sets high priority fetching origin.
         */
        ElementNameComponent?: {
            OVERVIEW?: string;
            CLASS?: string;
            _ID?: string;
        };
    };
};

declare type ElementRegistersType =
    Array<RegisteryTypeComponents.SessionElementRegister>;
let ElementRegisterys: ElementRegistersType = [];

export enum ParsingModeLiterals {
    standard = 0,
    collection = 1,
};

export enum ParsingModeNames {
    COLLECTION = "collection",
    STANDARD = "standard",
};

export namespace RegisteryScanner {
    interface _scanner {
        /**
         * ---
         * Stores picked up elements that have been scanned 
         * in the parameter JSON object for procedural bundling.
         */
        DetectedRequestElements: HTMLElementTagNameMap[];
    }

    declare abstract class BundleParsingReference {
        public HtmlCollectionParse:
            RegisteryTypeComponents.ParsingModes;
        public ElementsJSON?:
            typeof Object.prototype;
    }

    export class ElementBundleParser implements _scanner, BundleParsingReference {
        public DetectedRequestElements: HTMLElementTagNameMap[];
        public ConstructedElementMapping: object;

        public constructor(
            public ElementsJSON?: typeof Object.prototype,
            public HtmlCollectionParse: RegisteryTypeComponents.ParsingModes = "standard",
        ) /* . . . */ {
            this.ConstructedElementMapping = {};
            this.DetectedRequestElements ??= [];
            this.setupBundleParser.bind(this)();
            console.group('BUNDLE PARSER SETUP');
            console.groupEnd();
        }

        private setupBundleParser(): void {
            con.groupCollapsed('[BUNDLE PARSER SETUP]');
            let SelectedParsingMode: ParsingModeLiterals = ParsingModeLiterals.standard;
            SelectedParsingMode ??= ParsingModeLiterals[this.HtmlCollectionParse].valueOf();
            let ParseLiteralsReference: Array<string> = Array.of() as string[];
            let LiteralReferenceINDEX: number = parseFloat("0").valueOf();
            let IsParsingModeValid: boolean = false;

            for (const ParseLiteral in ParsingModeLiterals) {
                if (ParseLiteral !== null && typeof ParseLiteral === 'string') {
                    LiteralReferenceINDEX = ParseLiteralsReference.push(ParseLiteral.trim());
                    const LIT_DEBUG: string = ParseLiteralsReference[LiteralReferenceINDEX];
                    con.info("PARSE MODE LITERAL:", new String(LIT_DEBUG).toString());
                } else {
                    con.warn("Parse Mode Literal has an un-identified invalid value!");
                }
            }

            async function RecursiveScanOperation(TransferedScannerProtocol: ThisType<typeof ElementBundleParser>) {

            }

            if (ParseLiteralsReference !== undefined && Array.isArray(ParseLiteralsReference)) {
                for (let ModeIndex: number = 0; (ModeIndex < ParseLiteralsReference.length).valueOf(); ModeIndex++) {
                    if (ModeIndex != null && Number.isFinite(ModeIndex) && typeof ModeIndex === 'number') {
                        if (IsParsingModeValid !== undefined && typeof IsParsingModeValid === 'boolean') {

                        }
                    }
                }
            }

            (async (): Promise<void> => {
                con.groupEnd.bind(con)();
            })();
        }
    }
}
