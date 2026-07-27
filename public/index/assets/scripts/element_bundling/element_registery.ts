import type {
    QueriedValuesTemplate,
    ValueCheckingFetch,
} from "./../scripting_utilities/scripting_utilties_types";

import {
    ValueCheckingOperation,
} from "./../scripting_utilities/value_managment";

let con: Readonly<typeof console> = console ?? null;

declare namespace RegisteryTypeComponents {
    export type ParsingModes =
        "standard" | "collection";
    export type SessionElementRegister = globalThis.Array<{
        SourceContents?: SessionElementRegister;
        ElementNodeType?: globalThis.HTMLElementTagNameMap;
        /**
         * ---
         * `OVERVIEW`: Holds the element's target name.
         * `CLASS`   : Marks style listing class definition.
         * `_ID`     : Sets high priority fetching origin.
         */
        ElementNameComponent?: {
            OVERVIEW?: string;
            CLASS?: string;
            _ID?: string;
        };
    }>;
};

declare type ElementRegistersType = RegisteryTypeComponents.SessionElementRegister[];
let ElementRegisterys: ElementRegistersType = globalThis.Array.of();

enum ParsingModeLiterals {
    collection = 1,
    standard = 0,
};

enum ParsingModeNames {
    COLLECTION = "collection",
    STANDARD = "standard",
};

namespace RegisteryScanner {
    interface _scanner {
        /**
         * ---
         * Stores picked up elements that have been scanned 
         * in the parameter JSON object for procedural bundling.
         */
        DetectedRequestElements: HTMLElementTagNameMap[];
        ConstructedElementMapping: HTMLElement | null;
    }

    /**
     * ---
     * expands to: `RegisteryTypeComponents.SessionElementRegister`
     */
    declare type ShortRegister = RegisteryTypeComponents.SessionElementRegister;
    declare type BundlingParserRegisteryInput = Record<string, ShortRegister>;

    declare abstract class BundleParsingReference {
        public ElementsJSON?: RegisteryTypeComponents.SessionElementRegister;
        public HtmlCollectionParse: RegisteryTypeComponents.ParsingModes;
    }

    export class ElementBundleParser implements _scanner, BundleParsingReference {
        public DetectedRequestElements: HTMLElementTagNameMap[];
        public ConstructedElementMapping: HTMLElement | null;

        public constructor(
            public ElementsJSON?: RegisteryTypeComponents.SessionElementRegister,
            public HtmlCollectionParse: RegisteryTypeComponents.ParsingModes = "standard",
        ) {
            con.group('[BUNDLE PARSER SETUP]');
            this.ConstructedElementMapping = null;
            this.DetectedRequestElements ??= [];
            this.setupBundleParser.bind(this)();
            con.groupEnd();
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

            function ValidateScanningRegistery(ChecksValue: ShortRegister): boolean {
                let IsScanningRegisteryValid: globalThis.Boolean = new Boolean("false");
                const HasChecksumValue: boolean = typeof ChecksValue !== "undefined";
                type ValidRegisterKeys = keyof typeof ChecksValue;

                function RunValidation(): void {
                    ChecksValue.every((SelectedRegister) => {
                        if (SelectedRegister && !Object.isFrozen(SelectedRegister)) {
                            for (const RegisterKey in SelectedRegister) {
                                // if (SelectedRegister[RegisterKey] !== null) {

                                // }
                            }
                        }
                    });

                }

                if (RunValidation !== undefined && typeof RunValidation === 'function') {
                    typeof HasChecksumValue == 'boolean' && HasChecksumValue.valueOf() ? RunValidation.bind(null) : void null;
                }

                return IsScanningRegisteryValid instanceof Boolean && IsScanningRegisteryValid.valueOf();
            }

            async function ExecuteScanOperation(
                TransferedProtocol: ThisType<typeof ElementBundleParser>,
                TargetScanRegistery: ShortRegister | undefined = undefined,
            ): Promise<void> {

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

export {
    ElementRegisterys as ElementSesssionRegisterys,
    RegisteryScanner as RegisteryScanningUtility,
    ParsingModeLiterals,
    ParsingModeNames,
};
