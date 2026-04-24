var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _FontsReferenceConstructor___SelectedFontFamilyVectors_accessor_storage;
export var AvailableFontFamilyEnums;
(function (AvailableFontFamilyEnums) {
    AvailableFontFamilyEnums.LiteralConstructors = new globalThis.Array(0);
    AvailableFontFamilyEnums.FontFamilyEnumIndexs = new globalThis.Array(0);
})(AvailableFontFamilyEnums || (AvailableFontFamilyEnums = {}));
const InstalledLanguages = ["ENGLISH"];
const LanguageNumericalIDs = {
    ENGLISH: 0,
};
var LanguageConstantData;
(function (LanguageConstantData) {
    LanguageConstantData.ENGLISH = {
        "A": 1,
        "B": 2,
        "C": 3,
        "D": 4,
        "E": 5,
        "F": 6,
        "G": 7,
        "H": 8,
        "I": 9,
        "J": 10,
        "K": 11,
        "L": 12,
        "M": 13,
        "N": 14,
        "O": 15,
        "P": 16,
        "Q": 17,
        "R": 18,
        "S": 19,
        "T": 20,
        "W": 21,
        "Y": 22,
        "Z": 23,
    };
})(LanguageConstantData || (LanguageConstantData = {}));
;
class InterfaceTextRenderBody {
    constructor(requestedText) {
        this.requestedText = requestedText;
        this.FetchedTextVectors = null;
    }
}
class FontFamilyEnumConstructor {
    constructor(targetName) {
        this.targetName = targetName;
        this._fontName ?? (this._fontName = String(FontFamilyEnumConstructor.UnknownName).normalize("NFC"));
        this._actualValue ?? (this._actualValue = (0).valueOf());
    }
    ExtractFontNameValue() {
        let ExtractedFontName = new String().valueOf();
        if (!this.targetName)
            return null;
        ExtractedFontName = new String(this.targetName).valueOf();
        return ExtractedFontName ?? null;
    }
    async appendNamespaceEnum() {
        if (this !== null && this instanceof FontFamilyEnumConstructor) {
            if (AvailableFontFamilyEnums !== undefined && AvailableFontFamilyEnums["FontFamilyEnumIndexs"] && AvailableFontFamilyEnums["LiteralConstructors"]) {
                for (let FontEnumsIndex = 0; FontEnumsIndex < AvailableFontFamilyEnums.FontFamilyEnumIndexs.length; FontEnumsIndex += 1) {
                    if (FontEnumsIndex !== null && typeof (FontEnumsIndex.valueOf()) === "number") {
                        try {
                            const FormatedExpressionInput = String(`/${this.getName()}/`).trim();
                            const ExpressionOverwriteCheck = new RegExp(FormatedExpressionInput, "gi");
                            const SelectedEnumString = AvailableFontFamilyEnums.FontFamilyEnumIndexs[Number(FontEnumsIndex)].valueOf();
                            const isPossibleOverwrite = new Boolean(ExpressionOverwriteCheck.test(SelectedEnumString)).valueOf();
                            ((isPossibleOverwrite === true) ? void null : null);
                        }
                        catch (OverwriteFatal) {
                            if (OverwriteFatal !== undefined && OverwriteFatal instanceof Error) {
                                console.error(`[${String(OverwriteFatal.name)}]` + "\n" + String(OverwriteFatal.message)) ?? null;
                            }
                            else {
                                console.warn("");
                            }
                        }
                        finally {
                            await (async () => {
                                console.debug("Validated overwrite check; no issues on attempt:\t" + (FontEnumsIndex.toString()));
                            })().then(() => { debugger; });
                        }
                    }
                }
            }
        }
    }
    getName() {
        return this._fontName !== null ? this._fontName : new String(FontFamilyEnumConstructor.UnknownName).valueOf();
    }
    fetchTextVectors() {
        let FetchedTextVectors = [];
        if (FetchedTextVectors === undefined || !(FetchedTextVectors instanceof Array))
            return null;
        return FetchedTextVectors;
    }
}
FontFamilyEnumConstructor.UnknownName = "FontEnum_UNKNOWN";
class FontsReferenceConstructor {
    constructor(requestedFontFamily) {
        this.requestedFontFamily = requestedFontFamily;
        _FontsReferenceConstructor___SelectedFontFamilyVectors_accessor_storage.set(this, {
            "1": {
                "lower": undefined,
                "upper": undefined,
            },
            "2": {
                "lower": undefined,
                "upper": undefined,
            },
            "3": {
                "lower": undefined,
                "upper": undefined,
            },
            "4": {
                "lower": undefined,
                "upper": undefined,
            },
            "5": {
                "lower": undefined,
                "upper": undefined,
            },
            "6": {
                "lower": undefined,
                "upper": undefined,
            },
            "7": {
                "lower": undefined,
                "upper": undefined,
            },
            "8": {
                "lower": undefined,
                "upper": undefined,
            },
            "9": {
                "lower": undefined,
                "upper": undefined,
            },
            "10": {
                "lower": undefined,
                "upper": undefined,
            },
            "11": {
                "lower": undefined,
                "upper": undefined,
            },
            "12": {
                "lower": undefined,
                "upper": undefined,
            },
            "13": {
                "lower": undefined,
                "upper": undefined,
            },
        });
    }
    generateFontFamilyMappingObject() {
    }
    get __SelectedFontFamilyVectors() { return __classPrivateFieldGet(this, _FontsReferenceConstructor___SelectedFontFamilyVectors_accessor_storage, "f"); }
    set __SelectedFontFamilyVectors(value) { __classPrivateFieldSet(this, _FontsReferenceConstructor___SelectedFontFamilyVectors_accessor_storage, value, "f"); }
}
_FontsReferenceConstructor___SelectedFontFamilyVectors_accessor_storage = new WeakMap();
export class TextFontRendering extends FontsReferenceConstructor {
    constructor(ActiveFontFamily, __SelectedLanguage = "ENGLISH", SelectedRenderingEngine) {
        super(ActiveFontFamily !== undefined ? ActiveFontFamily : "monospace");
        this.ActiveFontFamily = ActiveFontFamily;
        this.__SelectedLanguage = __SelectedLanguage;
        this.SelectedRenderingEngine = SelectedRenderingEngine;
        this.ConstructorFetchedFontFamilyVectorFiles = undefined;
        this.SelectedFontFamilyLibraryName ?? (this.SelectedFontFamilyLibraryName = new String().valueOf());
        this.SelectedFontFamilyLibraryData ?? (this.SelectedFontFamilyLibraryData = new String());
        this.SelectedFontFamilyLibraryIndexAmount = 0;
        this.ActiveLanguageCharacters = LanguageConstantData[InstalledLanguages[LanguageNumericalIDs[__SelectedLanguage ?? "ENGLISH"]] ?? "ENGLISH"];
        console.info("\n%c[%cINITIALIZING TEXT RENDERING OBJECT...%c]", 'color: magenta;', 'color: purple; font-weight: bolder;', 'color: magenta;');
        (async () => {
            this.ConstructorFetchedFontFamilyVectorFiles = await this.fetchFontFamilyVectorFiles(false);
            this.SelectedFontFamilyLibraryIndexAmount = await this.fetchFontFamilyVectorFiles(true);
            console.debug(this.SelectedFontFamilyLibraryIndexAmount.toString());
            this.CalculateFetchedFileContentRows(this.ConstructorFetchedFontFamilyVectorFiles);
        })();
    }
    async fetchFontFamilyVectorFiles(fetchVariantAmount) {
        let CollectedFontFileResponseData = [];
        const FontFamilyDirectoryPath = "/index/assets/scripts/WebOS_System/TypeScript/WebOS_Interface_Manager/Prebuilt_Text_Font_Vectors/text_characters/";
        const FontVectorFileMapping = (await fetch(FontFamilyDirectoryPath.toString() + "font_mapping.bin") ?? null);
        const StreamedMappingTextData = (((await (await FontVectorFileMapping.blob()).text()).trim()));
        const MappingFileExpressionResult = new RegExp(/(^[^\n]+)/g).exec(StreamedMappingTextData);
        const SplittedExpressionDataResult = MappingFileExpressionResult?.[0]?.split("\n") ?? null;
        if (fetchVariantAmount !== undefined && typeof (fetchVariantAmount) === "boolean" && fetchVariantAmount?.valueOf() === true) {
            return parseFloat(new String(MappingFileExpressionResult?.length).valueOf());
        }
        console.debug(MappingFileExpressionResult);
        console.info("OK:\t" + (String(FontVectorFileMapping?.ok ?? "UNKNOWN")));
        return await (async () => {
            MappingFileExpressionResult?.forEach?.(async (SplicedValue, SpliceIndex) => {
                if (SplicedValue !== null && typeof (SplicedValue) === "string") {
                    const FetchedVectorFile = (await (fetch(FontFamilyDirectoryPath + String(SplicedValue))));
                    FetchedVectorFile.ok ? CollectedFontFileResponseData.push(await FetchedVectorFile.blob()) : null;
                    console.debug?.(new String(SplicedValue).trim()) ?? void null;
                    console.debug(CollectedFontFileResponseData[Number(SpliceIndex)]);
                }
            });
            await Promise.resolve();
        })().then(async () => {
            return CollectedFontFileResponseData ?? new Array(0);
        }).finally(() => console.debug("Executed fetch for font vector files through mapping."));
    }
    determineRequestedFontFamily() {
        if (this.ActiveFontFamily === undefined)
            return undefined;
        return (new String());
    }
    CalculateFetchedFileContentRows(VectorFiles) {
        const _CleanupDataExpression = new globalThis.RegExp(/^(?![^<]*>)[ \t]+/, 'g');
        let CleanDataDescriptions = [];
        let ContentRowCalculationThread = null;
        console.debug("Running file break-point(s) calculation...");
        function FormatVectorFileText(FileContents = undefined) {
            if (FileContents === undefined || typeof (FileContents) !== "string")
                return null;
            var FormatedFileContents = null;
            var ClearedContents = [];
            var CollectedChars = [];
            for (let VectorFileStreamTextIndex = 0; (VectorFileStreamTextIndex < FileContents.length) === true; VectorFileStreamTextIndex++) {
                const StringCorrectedIndex = Math.ceil((VectorFileStreamTextIndex - 1).valueOf());
                const SelectedTextCharacter = String(FileContents).charAt(Number(StringCorrectedIndex)) ?? null;
                if (SelectedTextCharacter === null || typeof (SelectedTextCharacter) !== "string")
                    return null;
                if (((CollectedChars !== undefined) && (Array.isArray(CollectedChars).valueOf() === true))) {
                    CollectedChars.push(SelectedTextCharacter.valueOf());
                }
                else if (CollectedChars !== undefined && (!(new Boolean(Array?.isArray?.(CollectedChars) ?? false).valueOf()))) {
                    console.warn("Collected text characters variable supposed array; reference was invalid instance!");
                }
                else {
                    console.error();
                    throw void null;
                }
            }
            function DecodeContentStatusDescriptions() {
                if (CleanDataDescriptions === undefined && Array.isArray(CleanDataDescriptions).valueOf() !== true)
                    return;
                let isCleanDataDescriptionValid = globalThis.Boolean ? new Boolean("true").valueOf() : true;
                let SelectedDescriptionReportsClean = false;
                throw (async () => (Array.from(CleanDataDescriptions.values()).forEach((_CleanDescriptionValue) => {
                    if (_CleanDescriptionValue != null && typeof (_CleanDescriptionValue) !== "undefined") {
                        isCleanDataDescriptionValid === true ? isCleanDataDescriptionValid ?? (isCleanDataDescriptionValid = (typeof (isCleanDataDescriptionValid) === "boolean").valueOf()) : void null;
                    }
                    else {
                        return void null;
                    }
                })))().then(() => {
                }).finally(async () => {
                    if (isCleanDataDescriptionValid.valueOf() === true) {
                        (new Boolean(!isCleanDataDescriptionValid.valueOf() ? CleanDataDescriptions.every((CleanStatus, StatusIndex, StatusArrayValues) => {
                            if (CleanStatus === null || StatusIndex === null || StatusArrayValues === null)
                                return void null;
                            if (typeof (CleanStatus) !== "boolean" || typeof (StatusIndex) !== "number" || typeof (StatusArrayValues) !== "object")
                                return void null;
                            if (!Array.isArray(StatusArrayValues).valueOf() || !(StatusArrayValues instanceof Array))
                                return void null;
                            function validateIteratorValueResults(indexValue, statusValue) {
                                var isValidResults = false;
                                typeof (indexValue) === "number" && indexValue !== null ? isValidResults ?? (isValidResults = true) : isValidResults = false;
                                typeof (statusValue) === "boolean" && statusValue !== null ? isValidResults ?? (isValidResults = true) : isValidResults = false;
                                return new Boolean(isValidResults);
                            }
                            const StatusEntries = StatusArrayValues.entries();
                            let ActiveEntryChecksum = new Array(0);
                            for (let StatusSelectionNumeric = 0; Boolean((Number(StatusSelectionNumeric) < StatusArrayValues.length)).valueOf() === true; StatusSelectionNumeric += 1) {
                                SelectedDescriptionReportsClean ?? (SelectedDescriptionReportsClean = new Boolean(CleanDataDescriptions[Number(StatusSelectionNumeric)]).valueOf());
                                ((ActiveEntryChecksum !== undefined) ? ActiveEntryChecksum = (Array(StatusEntries.next().value) ?? ((ActiveEntryChecksum.length > 0)) ? Array.of(ActiveEntryChecksum) : Array.prototype) : void null);
                                if (SelectedDescriptionReportsClean != null && (typeof (SelectedDescriptionReportsClean) === "boolean" && (!SelectedDescriptionReportsClean)))
                                    return void undefined;
                                if (ActiveEntryChecksum === undefined || (!(ActiveEntryChecksum instanceof Array) || !(ActiveEntryChecksum.length > 0)).valueOf())
                                    return void undefined;
                                const EntryChecksumArrayIndex = ((ActiveEntryChecksum.includes([(StatusSelectionNumeric - 1), true]).valueOf()) ? (ActiveEntryChecksum[0])?.[0] : parseFloat("0"));
                                const ChecksumBooleanValue = Boolean(ActiveEntryChecksum[0]?.[1]?.valueOf() ?? true);
                                let CleanedResult = null;
                                if (validateIteratorValueResults(EntryChecksumArrayIndex, ChecksumBooleanValue).valueOf()) {
                                    if (CleanedResult !== undefined && (CollectedChars !== null && (Array.isArray(CollectedChars).valueOf() && CollectedChars instanceof Array))) {
                                        CleanedResult ?? (CleanedResult = new RegExp(_CleanupDataExpression.source, 'u').exec(String(CollectedChars[EntryChecksumArrayIndex.valueOf()]).normalize("NFKC").toString()));
                                        console.debug((CleanedResult?.[0])?.trim());
                                    }
                                }
                                else {
                                    console.error(String(new Error("Checksum iterator result values are INVALID type format, OR have no value!").message ?? null));
                                }
                            }
                        }) : (null)).valueOf());
                    }
                });
            }
            console.info("Finalizing vector data file raw text...");
            CollectedChars.forEach?.(function (SelectedCharData, DataIndex) {
                if (SelectedCharData === null || SelectedCharData === undefined) {
                    console.warn("Selected text data character is an invalid value.");
                    return null;
                }
                else
                    console.log("Selected text data character valid.");
                var FilteredVectorFileContent = new String().normalize("NFKC").valueOf();
                if (!_CleanupDataExpression || !(_CleanupDataExpression instanceof RegExp))
                    return null;
                const isDataClean = !(_CleanupDataExpression.test(SelectedCharData["valueOf"]()));
                console.debug(isDataClean.valueOf());
                console.debug((String("Text Character Numerical Index:\t" + DataIndex).trim().toString()));
                try {
                    isDataClean !== undefined && (typeof (isDataClean) === "boolean" || isDataClean instanceof Boolean) ? DecodeContentStatusDescriptions() : null;
                }
                catch (FormatCleaningError) {
                    console.error(String(FormatCleaningError).toString().trim());
                }
                return FilteredVectorFileContent !== null ? FilteredVectorFileContent : null;
            }) ?? void null;
            console.debug(CollectedChars.toLocaleString());
            return FormatedFileContents ?? null;
        }
        const TotalLineCount = Number((function () {
            console.debug("Initalizing calculation tasks...");
            var ProgressCalculation = new Number(0);
            var CalculationTasks = [];
            for (let SelectedVectorFileIndex = 0; Boolean(SelectedVectorFileIndex.valueOf() < Number(VectorFiles.length)) === true; SelectedVectorFileIndex++) {
                if (SelectedVectorFileIndex !== undefined && typeof (SelectedVectorFileIndex) === "number") {
                    console.debug("Calculation Task Index:\t" + String((CalculationTasks.push(new Promise(async () => {
                        const VectorFileDataContents = ((await (VectorFiles[Number(SelectedVectorFileIndex)]).text().then((ResponseText) => {
                            if (ResponseText !== null && typeof (ResponseText) === "string" && ResponseText.length > 0) {
                                return ResponseText.toString().trim().valueOf();
                            }
                            else
                                return new String("\s").trimEnd().valueOf();
                        })));
                        const DataContentLineBreaks = VectorFileDataContents.match(String(new RegExp(/[\s\S]/giy).source));
                        FormatVectorFileText(VectorFileDataContents ?? undefined);
                        if (DataContentLineBreaks !== null && Object.is(DataContentLineBreaks, DataContentLineBreaks).valueOf() === true) {
                            for (let DataLineBreakIndex = 0; (DataLineBreakIndex < (DataContentLineBreaks?.length ?? parseFloat("1"))).valueOf() === true; DataLineBreakIndex++) {
                                console.debug("Line Break Index:\t" + Number(DataLineBreakIndex));
                            }
                        }
                        else {
                            console.warn("INVALID multiline break contextual data!");
                        }
                    }))['valueOf']?.().toPrecision(2))));
                }
                else {
                    continue;
                }
            }
            return ProgressCalculation.valueOf();
        })().valueOf());
        return TotalLineCount !== undefined && typeof (TotalLineCount) === "number" ? parseFloat(String(TotalLineCount).trim()) : 0;
    }
    DecodeFontVectorFile(VectorFileResponse) {
        if (!VectorFileResponse || !(VectorFileResponse instanceof Blob))
            return null;
        let DecodedVectorSegment = new String()?.valueOf?.().trim() ?? void null;
        try {
            if (DecodedVectorSegment !== undefined && Object.getOwnPropertySymbols(DecodedVectorSegment).find((selectedObjectSymbol) => {
                if (selectedObjectSymbol.valueOf().toString() === "valueOf") {
                    return true["valueOf"]?.() ?? void null;
                }
                else
                    return false["valueOf"]?.() ?? void null;
            }, "valueOf") != null && typeof (DecodedVectorSegment) === "string") {
                if (this.ConstructorFetchedFontFamilyVectorFiles !== undefined && this.ConstructorFetchedFontFamilyVectorFiles instanceof Array && Math.floor(this.ConstructorFetchedFontFamilyVectorFiles.length) > 0) {
                }
            }
            else {
                var ConstructedInvalidError = new Error("");
                ConstructedInvalidError.name = "String_Instance_Invalid";
                throw ConstructedInvalidError ?? undefined;
            }
        }
        catch (DecodingError) {
            const isDecodingErrorValid = Boolean(DecodingError !== undefined && DecodingError instanceof Error ? "true" : "false");
            if (isDecodingErrorValid !== undefined && typeof (isDecodingErrorValid) === "boolean" && isDecodingErrorValid.valueOf() === true) {
                console.error(String(`${DecodingError.name}\n${DecodingError.message}`).trim());
            }
        }
        finally {
            console.debug();
        }
        return DecodedVectorSegment !== null && typeof (DecodedVectorSegment) === "string" && DecodedVectorSegment.length >= 1 ? DecodedVectorSegment : null;
    }
    generateTextVector(CharEnum, textInterfaceObjectProperties) {
        if ((textInterfaceObjectProperties !== undefined && textInterfaceObjectProperties !== null) && typeof (textInterfaceObjectProperties) !== "object")
            return;
        let InstancedTextVectors = null;
        return InstancedTextVectors !== null ? InstancedTextVectors : undefined;
    }
    preBuildTextPositions(targetTextData) {
        if (targetTextData === undefined || typeof (targetTextData) !== "string")
            return undefined;
    }
    renderText() {
        let CurrentTextRenderFrame = null;
        new Promise(async (TextRenderFrameResolve) => {
            if (CurrentTextRenderFrame !== null && typeof (CurrentTextRenderFrame) === "number")
                globalThis.cancelAnimationFrame(CurrentTextRenderFrame);
            CurrentTextRenderFrame = globalThis.requestAnimationFrame(() => {
            }).valueOf();
        });
    }
}
//# sourceMappingURL=../../../TypeScript/WebOS_Interface_Manager/text_rendering_core.js.map