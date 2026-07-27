let con = console ?? null;
;
let ElementRegisterys = globalThis.Array.of();
var ParsingModeLiterals;
(function (ParsingModeLiterals) {
    ParsingModeLiterals[ParsingModeLiterals["collection"] = 1] = "collection";
    ParsingModeLiterals[ParsingModeLiterals["standard"] = 0] = "standard";
})(ParsingModeLiterals || (ParsingModeLiterals = {}));
;
var ParsingModeNames;
(function (ParsingModeNames) {
    ParsingModeNames["COLLECTION"] = "collection";
    ParsingModeNames["STANDARD"] = "standard";
})(ParsingModeNames || (ParsingModeNames = {}));
;
var RegisteryScanner;
(function (RegisteryScanner) {
    class ElementBundleParser {
        ElementsJSON;
        HtmlCollectionParse;
        DetectedRequestElements;
        ConstructedElementMapping;
        constructor(ElementsJSON, HtmlCollectionParse = "standard") {
            this.ElementsJSON = ElementsJSON;
            this.HtmlCollectionParse = HtmlCollectionParse;
            con.group('[BUNDLE PARSER SETUP]');
            this.ConstructedElementMapping = null;
            this.DetectedRequestElements ??= [];
            this.setupBundleParser.bind(this)();
            con.groupEnd();
        }
        setupBundleParser() {
            con.groupCollapsed('[BUNDLE PARSER SETUP]');
            let SelectedParsingMode = ParsingModeLiterals.standard;
            SelectedParsingMode ??= ParsingModeLiterals[this.HtmlCollectionParse].valueOf();
            let ParseLiteralsReference = Array.of();
            let LiteralReferenceINDEX = parseFloat("0").valueOf();
            let IsParsingModeValid = false;
            for (const ParseLiteral in ParsingModeLiterals) {
                if (ParseLiteral !== null && typeof ParseLiteral === 'string') {
                    LiteralReferenceINDEX = ParseLiteralsReference.push(ParseLiteral.trim());
                    const LIT_DEBUG = ParseLiteralsReference[LiteralReferenceINDEX];
                    con.info("PARSE MODE LITERAL:", new String(LIT_DEBUG).toString());
                }
                else {
                    con.warn("Parse Mode Literal has an un-identified invalid value!");
                }
            }
            function ValidateScanningRegistery(ChecksValue) {
                let ValidationChecksum = null;
                let IsScanningRegisteryValid = new Boolean("false");
                const HasChecksumValue = typeof ChecksValue !== "undefined";
                function RunValidation() {
                    ChecksValue.every((SelectedRegister) => {
                        if (SelectedRegister && !Object.isFrozen(SelectedRegister)) {
                            for (const RegisterKey in SelectedRegister) {
                            }
                        }
                    });
                }
                if (RunValidation !== undefined && typeof RunValidation === 'function') {
                    typeof HasChecksumValue == 'boolean' && HasChecksumValue.valueOf() ?
                        RunValidation.bind(ValidationChecksum) : void null;
                }
                return IsScanningRegisteryValid instanceof Boolean && IsScanningRegisteryValid.valueOf();
            }
            async function ExecuteScanOperation(TransferedProtocol, TargetScanRegistery = undefined) {
            }
            if (ParseLiteralsReference !== undefined && Array.isArray(ParseLiteralsReference)) {
                for (let ModeIndex = 0; (ModeIndex < ParseLiteralsReference.length).valueOf(); ModeIndex++) {
                    if (ModeIndex != null && Number.isFinite(ModeIndex) && typeof ModeIndex === 'number') {
                        if (IsParsingModeValid !== undefined && typeof IsParsingModeValid === 'boolean') {
                        }
                    }
                }
            }
            (async () => {
                con.groupEnd.bind(con)();
            })();
        }
    }
    RegisteryScanner.ElementBundleParser = ElementBundleParser;
})(RegisteryScanner || (RegisteryScanner = {}));
export { ElementRegisterys as ElementSesssionRegisterys, RegisteryScanner as RegisteryScanningUtility, ParsingModeLiterals, ParsingModeNames, };
//# sourceMappingURL=element_registery.js.map