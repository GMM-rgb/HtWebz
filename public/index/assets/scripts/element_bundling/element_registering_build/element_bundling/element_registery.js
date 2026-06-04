let con = console ?? null;
;
let ElementRegisterys = [];
export var ParsingModeLiterals;
(function (ParsingModeLiterals) {
    ParsingModeLiterals[ParsingModeLiterals["standard"] = 0] = "standard";
    ParsingModeLiterals[ParsingModeLiterals["collection"] = 1] = "collection";
})(ParsingModeLiterals || (ParsingModeLiterals = {}));
;
export var ParsingModeNames;
(function (ParsingModeNames) {
    ParsingModeNames["COLLECTION"] = "collection";
    ParsingModeNames["STANDARD"] = "standard";
})(ParsingModeNames || (ParsingModeNames = {}));
;
export var RegisteryScanner;
(function (RegisteryScanner) {
    class ElementBundleParser {
        ElementsJSON;
        HtmlCollectionParse;
        DetectedRequestElements;
        ConstructedElementMapping;
        constructor(ElementsJSON, HtmlCollectionParse = "standard") {
            this.ElementsJSON = ElementsJSON;
            this.HtmlCollectionParse = HtmlCollectionParse;
            this.ConstructedElementMapping = {};
            this.DetectedRequestElements ??= [];
            this.setupBundleParser.bind(this)();
            console.group('BUNDLE PARSER SETUP');
            console.groupEnd();
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
            async function RecursiveScanOperation(TransferedScannerProtocol) {
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
//# sourceMappingURL=element_registery.js.map