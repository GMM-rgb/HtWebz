import { Renderer2D } from './rendering_core';
/// <reference path="./rendering_core_reference.d.ts" />
export namespace AvailableFontFamilyEnums {
    export var LiteralConstructors: Array<FontFamilyEnumConstructor> = new globalThis.Array(0);
    export var FontFamilyEnumIndexs: Array<string> = new globalThis.Array(0);
}

declare type Language_ID_Mapping = {
    ENGLISH: number;
};

declare type LanguageInstallations = "ENGLISH";
const InstalledLanguages: Readonly<LanguageInstallations[]> = ["ENGLISH"];
const LanguageNumericalIDs: Language_ID_Mapping = {
    ENGLISH: 0,
};

namespace LanguageConstantData {
    export const ENGLISH: LanguageCharacterData["ENGLISH"] = {
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
    }
};

declare interface LanguageCharacterData {
    /**
     * English alphabet enum dictionary
     */
    ENGLISH: Readonly<{
        // Assigned numeric enum IDs
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
    }>;
}

declare type TextGenerationPositions = [
    {
        CharacterData: {
            "CHAR": string;
            "UNICODE": string;
            "ID": number;
        },
    },
];

declare type FontFamilyEnumValue = {
    fontName: string;
    actaulValue: number;
};

declare type __TextVectorsType = typeof Object.prototype[];
declare type TextInterfacePropertiesType = {
    color: [number, number, number];
};

export declare namespace AvailableFontFamilys {
    export const MONOSPACE: FontFamilyEnumValue;
}

declare abstract class InterfaceTextRenderImplementer {
    FetchedTextVectors: __TextVectorsType | null;
}

class InterfaceTextRenderBody implements InterfaceTextRenderImplementer {
    FetchedTextVectors: __TextVectorsType | null;

    constructor(private requestedText: StringIterator<string>) {
        this.FetchedTextVectors = null;
    }
}

class FontFamilyEnumConstructor {
    _fontName: string;
    _actualValue: number;
    /**
     * ---
     * This is the default font family enum name that gets appended.
     */
    static UnknownName = "FontEnum_UNKNOWN";
    /**
     * ---
     * @param targetName 
     */
    constructor(private targetName: string | typeof String.prototype) {
        this._fontName ??= String(FontFamilyEnumConstructor.UnknownName).normalize("NFC")!;
        this._actualValue ??= ((0).valueOf());
    }

    private ExtractFontNameValue(): string | null {
        let ExtractedFontName = new String().valueOf();
        if (!this.targetName) return null;
        // Assume String constructor; not primative type
        ExtractedFontName = new String(this.targetName).valueOf();
        // Finalize output value of private method
        return ExtractedFontName ?? null;
    }

    private async appendNamespaceEnum(): Promise<void> {
        if (this !== null && this instanceof FontFamilyEnumConstructor) {
            if (AvailableFontFamilyEnums !== undefined && AvailableFontFamilyEnums["FontFamilyEnumIndexs"] && AvailableFontFamilyEnums["LiteralConstructors"]) {
                for (let FontEnumsIndex = 0; FontEnumsIndex < AvailableFontFamilyEnums.FontFamilyEnumIndexs.length; FontEnumsIndex += 1) {
                    if (FontEnumsIndex !== null && typeof (FontEnumsIndex.valueOf()) === "number") {
                        try {
                            const FormatedExpressionInput = String(`/${this.getName()}/`).trim();
                            const ExpressionOverwriteCheck = new RegExp(FormatedExpressionInput, "gi");
                            const SelectedEnumString = AvailableFontFamilyEnums.FontFamilyEnumIndexs[Number(FontEnumsIndex)].valueOf();
                            const isPossibleOverwrite: boolean = new Boolean(ExpressionOverwriteCheck.test(SelectedEnumString)).valueOf();
                            (((isPossibleOverwrite as boolean) === true) ? void null : null);
                        } catch (OverwriteFatal) {
                            if (OverwriteFatal !== undefined && OverwriteFatal instanceof Error) {
                                console.error(`[${String(OverwriteFatal.name)}]` + "\n" + String(OverwriteFatal.message)) ?? null;
                            } else {
                                console.warn("");
                            }
                        } finally {
                            await (async () => {
                                console.debug("Validated overwrite check; no issues on attempt:\t" + (FontEnumsIndex.toString()));
                            })().then(() => { debugger; });
                        }
                    }
                }
            }
        }
    }

    public getName(): string | typeof FontFamilyEnumConstructor.UnknownName {
        return this._fontName !== null ? this._fontName : new String(FontFamilyEnumConstructor.UnknownName).valueOf();
    }

    public fetchTextVectors(): string[] | null {
        let FetchedTextVectors: Array<string> = [];
        if (FetchedTextVectors === undefined || !(FetchedTextVectors instanceof Array)) return null;



        return FetchedTextVectors;
    }
}

class FontsReferenceConstructor implements RenderingTextFontStorage {
    constructor(private requestedFontFamily: string) {

    }

    private generateFontFamilyMappingObject(): void {
        
    }

    accessor __SelectedFontFamilyVectors: FontFamilyVectorHeiarchy = {
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
    };
}

export class TextFontRendering extends FontsReferenceConstructor {
    ActiveLanguageCharacters: LanguageCharacterData[typeof this.__SelectedLanguage];
    ConstructorFetchedFontFamilyVectorFiles: Array<Blob> | undefined | null;
    SelectedFontFamilyLibraryName: string | null;
    SelectedFontFamilyLibraryData: String | null;
    SelectedFontFamilyLibraryIndexAmount: number | 0;

    public constructor(public ActiveFontFamily: string, public __SelectedLanguage: LanguageInstallations = "ENGLISH", public SelectedRenderingEngine: typeof Renderer2D.prototype) {
        super(ActiveFontFamily !== undefined ? ActiveFontFamily : "monospace");
        this.ConstructorFetchedFontFamilyVectorFiles = undefined;
        this.SelectedFontFamilyLibraryName ??= new String().valueOf();
        this.SelectedFontFamilyLibraryData ??= new String();
        this.SelectedFontFamilyLibraryIndexAmount = 0;
        this.ActiveLanguageCharacters = LanguageConstantData[InstalledLanguages[LanguageNumericalIDs[__SelectedLanguage ?? "ENGLISH"]] ?? "ENGLISH"];
        // === === === === === ===
        console.info("\n%c[%cINITIALIZING TEXT RENDERING OBJECT...%c]", 'color: magenta;', 'color: purple; font-weight: bolder;', 'color: magenta;');
        // === === === === === ===
        (async () => {
            this.ConstructorFetchedFontFamilyVectorFiles = await this.fetchFontFamilyVectorFiles(false);
            this.SelectedFontFamilyLibraryIndexAmount = await this.fetchFontFamilyVectorFiles(true);
            console.debug(this.SelectedFontFamilyLibraryIndexAmount.toString());
            this.CalculateFetchedFileContentRows(this.ConstructorFetchedFontFamilyVectorFiles);
        })();
    }

    // protected async CalculateFontFamilyVariants(SelectedFontLibraryData: typeof String.prototype): Promise<number> {
    //     let CalculatedVariants = parseFloat(String(this.FetchedFontFamilyVectorFiles!?.length.valueOf()).trim()) ?? 0;
    //     if (this.FetchedFontFamilyVectorFiles === undefined || !(this.FetchedFontFamilyVectorFiles instanceof Array)) return 0 && console.warn("Vector file blob array was undefined!");
    //     if (CalculatedVariants === undefined || typeof (CalculatedVariants) !== "number") return 0;
    //     return CalculatedVariants !== null && typeof (CalculatedVariants) === "number" ? CalculatedVariants : 0;
    // }

    protected async fetchFontFamilyVectorFiles(fetchVariantAmount: true): Promise<number>;
    protected async fetchFontFamilyVectorFiles(fetchVariantAmount: false): Promise<Array<Blob>>;
    /**
     * ---
     * @param fetchVariantAmount 
     * @returns 
     */
    protected async fetchFontFamilyVectorFiles(fetchVariantAmount: boolean): Promise<Array<Blob> | number> {
        let CollectedFontFileResponseData: Array<typeof Blob.prototype> = [];
        const FontFamilyDirectoryPath = "/index/assets/scripts/WebOS_System/TypeScript/WebOS_Interface_Manager/Prebuilt_Text_Font_Vectors/text_characters/";
        const FontVectorFileMapping: Response | null = (await fetch(FontFamilyDirectoryPath.toString() + "font_mapping.bin") ?? null);
        const StreamedMappingTextData: string | undefined = (((await (await FontVectorFileMapping.blob()).text()).trim()));
        const MappingFileExpressionResult: RegExpExecArray | null = (new RegExp(/(^[^\n]+)/g).exec(StreamedMappingTextData) as RegExpExecArray);
        const SplittedExpressionDataResult: Array<string> | null = MappingFileExpressionResult?.[0]?.split("\n") ?? null;

        if (fetchVariantAmount !== undefined && typeof (fetchVariantAmount) === "boolean" && fetchVariantAmount?.valueOf() === true) {
            return parseFloat(new String(MappingFileExpressionResult?.length).valueOf());
        }

        console.debug(MappingFileExpressionResult);
        console.info("OK:\t" + (String(FontVectorFileMapping?.ok ?? "UNKNOWN")));
        // console.debug(MappingFileExpressionResult?.index.toString());
        // console.debug(StreamedMappingTextData.normalize("NFC"));

        return await (async () => {
            MappingFileExpressionResult?.forEach?.(async (SplicedValue: string, SpliceIndex: number) => {
                if (SplicedValue !== null && typeof (SplicedValue) === "string") {
                    const FetchedVectorFile = (await (fetch(FontFamilyDirectoryPath + String(SplicedValue))));
                    FetchedVectorFile.ok ? CollectedFontFileResponseData.push(await FetchedVectorFile.blob()) : null;
                    console.debug?.(new String(SplicedValue).trim()) ?? void null;
                    console.debug(CollectedFontFileResponseData[Number(SpliceIndex)!]);
                }
            });

            await Promise.resolve();
        })().then(async () => {
            return CollectedFontFileResponseData ?? new Array(0);
        }).finally(() => console.debug("Executed fetch for font vector files through mapping."));
    }

    private determineRequestedFontFamily(): String | void {
        if (this.ActiveFontFamily === undefined) return undefined;
        return (new String());
    }

    /**
     * ---
     * Calculates every invidual vector file simultaneously in sepperated tasks. 
     * 
     * ---
     * @param VectorFiles 
     * @returns 
     */
    private CalculateFetchedFileContentRows(VectorFiles: Array<Blob>): typeof Number.prototype {
        const _CleanupDataExpression: Readonly<RegExp> = new globalThis.RegExp(/^(?![^<]*>)[ \t]+/, 'g');
        // === === === === === === ===
        let CleanDataDescriptions: Array<boolean> = [];
        let ContentRowCalculationThread: any = null;
        // === === === === === === ===
        console.debug("Running file break-point(s) calculation...");
        /**
         * 
         * @param FileContents 
         * @returns 
         */
        function FormatVectorFileText(FileContents: string | undefined = undefined): string | null {
            if (FileContents === undefined || typeof (FileContents) !== "string") return null;
            // ===-===-===-===-===-===-===
            var FormatedFileContents: string | null = null;
            var ClearedContents: Array<String> | null = [];
            var CollectedChars: Array<String> = [];
            // ===-===-===-===-===-===-===
            for (let VectorFileStreamTextIndex: number = 0; (VectorFileStreamTextIndex < FileContents.length) === true; VectorFileStreamTextIndex++) {
                const StringCorrectedIndex: typeof Number.EPSILON = Math.ceil((VectorFileStreamTextIndex - 1).valueOf());
                const SelectedTextCharacter: string | null = String(FileContents).charAt(Number(StringCorrectedIndex)) ?? null;
                if (SelectedTextCharacter === null || typeof (SelectedTextCharacter) !== "string") return null;
                if (((CollectedChars !== undefined) && (Array.isArray(CollectedChars).valueOf() === true))) {
                    CollectedChars.push(SelectedTextCharacter.valueOf());
                } else if (CollectedChars !== undefined && (!(new Boolean(Array?.isArray?.(CollectedChars) ?? false).valueOf()))) {
                    console.warn("Collected text characters variable supposed array; reference was invalid instance!");
                } else {
                    console.error();
                    throw void null;
                }
            }
            // ===-===-===-===-===-===-===
            function DecodeContentStatusDescriptions(): void {
                if (CleanDataDescriptions === undefined && Array.isArray(CleanDataDescriptions).valueOf() !== true) return;
                let isCleanDataDescriptionValid: boolean = globalThis.Boolean!! ? new Boolean("true").valueOf() : true;
                let SelectedDescriptionReportsClean: boolean = false;
                
                (async (): Promise<void> => (Array.from<boolean>(CleanDataDescriptions.values()).forEach((_CleanDescriptionValue: any) => {
                    if (_CleanDescriptionValue != null && typeof (_CleanDescriptionValue) !== "undefined") {
                        isCleanDataDescriptionValid === true ? isCleanDataDescriptionValid ??= (typeof (isCleanDataDescriptionValid) === "boolean").valueOf() : void null;
                        console.info("Data Description Valid:\t" + isCleanDataDescriptionValid);
                    } else { return void null; }
                })))().then<void>((): void => {

                }).finally(async (): Promise<void> => {
                    if (isCleanDataDescriptionValid.valueOf() === true) {
                        (new Boolean(!isCleanDataDescriptionValid.valueOf() ? CleanDataDescriptions.every((CleanStatus: boolean, StatusIndex: number, StatusArrayValues: boolean[]): void => {
                            if (CleanStatus === null || StatusIndex === null || StatusArrayValues === null) return void null;
                            if (typeof (CleanStatus) !== "boolean" || typeof (StatusIndex) !== "number" || typeof (StatusArrayValues) !== "object") return void null;
                            if (!Array.isArray(StatusArrayValues).valueOf() || !(StatusArrayValues instanceof Array)) return void null;
                            // ===-===-===-===-===-===-===
                            function validateIteratorValueResults(indexValue: unknown, statusValue: unknown): (typeof Boolean.prototype) {
                                var isValidResults: boolean = false;
                                typeof (indexValue) === "number" && indexValue !== null ? isValidResults ??= true : isValidResults = false;
                                typeof (statusValue) === "boolean" && statusValue !== null ? isValidResults ??= true : isValidResults = false;
                                return new Boolean(isValidResults);
                            }
                            // ===-===-===-===-===-===-===
                            const StatusEntries: Readonly<ArrayIterator<[number, boolean]>> = StatusArrayValues.entries() as ArrayIterator<[number, boolean]>;
                            let ActiveEntryChecksum: Array<[number, boolean]> = new Array(0) as any[];
                            // ===-===-===-===-===-===-===
                            for (let StatusSelectionNumeric: number = 0; Boolean((Number(StatusSelectionNumeric) < StatusArrayValues.length)).valueOf() === true; StatusSelectionNumeric += 1) {
                                SelectedDescriptionReportsClean ??= (new Boolean(CleanDataDescriptions[Number(StatusSelectionNumeric)]).valueOf());
                                ((ActiveEntryChecksum !== undefined) ? ActiveEntryChecksum = (Array(StatusEntries.next().value) ?? ((ActiveEntryChecksum.length > 0)) ? Array.of(ActiveEntryChecksum) : Array.prototype) : void null);
                                if (SelectedDescriptionReportsClean != null && (typeof (SelectedDescriptionReportsClean) === "boolean" && (!SelectedDescriptionReportsClean))) return void undefined;
                                if (ActiveEntryChecksum === undefined || (!(ActiveEntryChecksum instanceof Array) || !(ActiveEntryChecksum.length > 0)).valueOf()) return void undefined;
                                const EntryChecksumArrayIndex: number = ((ActiveEntryChecksum.includes([(StatusSelectionNumeric - 1), true]).valueOf()) ? (ActiveEntryChecksum[0])?.[0] : parseFloat("0"));
                                const ChecksumBooleanValue: boolean = Boolean(ActiveEntryChecksum[0]?.[1]?.valueOf() ?? true);
                                let NotCleanedResult: RegExpExecArray | null = null;
                                if (validateIteratorValueResults(EntryChecksumArrayIndex, ChecksumBooleanValue).valueOf()) {
                                    if (NotCleanedResult !== undefined && (CollectedChars !== null && (Array.isArray(CollectedChars).valueOf() && CollectedChars instanceof Array))) {
                                        NotCleanedResult ??= new RegExp(_CleanupDataExpression.source, 'u').exec(String(CollectedChars[EntryChecksumArrayIndex.valueOf()]).normalize("NFKC").toString());
                                        NotCleanedResult?.forEach((InvalidExtraChar: string | typeof String.prototype): void => {
                                            let SanitizedResult: string = new String('\s').trim().toString();
                                            if ((SanitizedResult === undefined || typeof (SanitizedResult) !== "string").valueOf() === new Boolean("true").valueOf()) return void null;
                                            if (InvalidExtraChar === null || (!(typeof (InvalidExtraChar) === "string") && !!(InvalidExtraChar instanceof String).valueOf())) return void null;
                                            console.debug(String(InvalidExtraChar).toString());
                                        });
                                        // console.debug((NotCleanedResult?.[0])?.trim());
                                    }
                                } else {
                                    console.error(String(new Error("Checksum iterator result values are INVALID type format, OR have no value!").message ?? null));
                                }
                            }
                        }) : (null)).valueOf());
                    }
                });
            }
            // ===-===-===-===-===-===-===
            console.info("Finalizing vector data file raw text...");
            // ===-===-===-===-===-===-===
            CollectedChars.forEach?.(function (SelectedCharData: String, DataIndex): string | null {
                let FilteredVectorFileContent: string = new String().normalize("NFKC").valueOf();
                let DescriptionDecodingBindThread: void | null = null;
                if (SelectedCharData === null || SelectedCharData === undefined) {
                    console.warn("Selected text data character is an invalid value.");
                    return null;
                } else { console.log("Selected text data character valid."); }
                if (!_CleanupDataExpression || !(_CleanupDataExpression instanceof RegExp)) return null;
                const isDataClean: Readonly<boolean> = !(_CleanupDataExpression.test(SelectedCharData["valueOf"]()));
                // ===-===-===-===-===-===-===
                console.debug(isDataClean.valueOf());
                console.debug((String("Text Character Numerical Index:\t" + DataIndex).trim().toString()));
                // ===-===-===-===-===-===-===
                try {
                    isDataClean !== undefined && (typeof (isDataClean) === "boolean").valueOf() === true ? DecodeContentStatusDescriptions.bind(DescriptionDecodingBindThread)() : null;
                } catch (FormatCleaningError) {
                    // FormatCleaningError !== undefined && FormatCleaningError instanceof Error ? null : void null;
                    console.error(String(FormatCleaningError).toString().trim());
                }
                // ===-===-===-===-===-===-===
                return FilteredVectorFileContent !== null ? FilteredVectorFileContent : null;
            }) ?? void null;
            // ===-===-===-===-===-===-===
            console.debug(CollectedChars.toLocaleString());
            // ===-===-===-===-===-===-===
            return FormatedFileContents ?? null;
        }

        const TotalLineCount = Number((function () {
            console.debug("Initalizing calculation tasks...");
            var ProgressCalculation = new Number(0);
            var CalculationTasks: Array<typeof Promise.prototype> = [];
            for (let SelectedVectorFileIndex: number = 0; Boolean(SelectedVectorFileIndex.valueOf() < Number(VectorFiles.length)) === true; SelectedVectorFileIndex++) {
                if (SelectedVectorFileIndex !== undefined && typeof (SelectedVectorFileIndex) === "number") {
                    console.debug("Calculation Task Index:\t" + String((CalculationTasks.push(new Promise(async () => {
                        const VectorFileDataContents = ((await (VectorFiles[Number(SelectedVectorFileIndex)]).text().then((ResponseText: string): string => {
                            if (ResponseText !== null && typeof (ResponseText) === "string" && ResponseText.length > 0) {
                                return ResponseText.toString().trim().valueOf();
                            } else return new String("\s").trimEnd().valueOf();
                        })));
                        // ===-===-===-===-===-===-===
                        const DataContentLineBreaks: RegExpMatchArray | null = VectorFileDataContents.match(String(new RegExp(/[\s\S]/giy).source));
                        // ===-===-===-===-===-===-===
                        FormatVectorFileText(VectorFileDataContents ?? undefined);
                        // ===-===-===-===-===-===-===
                        if (DataContentLineBreaks !== null && Object.is(DataContentLineBreaks, DataContentLineBreaks).valueOf() === true) {
                            for (let DataLineBreakIndex: number = 0; (DataLineBreakIndex < (DataContentLineBreaks?.length ?? parseFloat("1"))).valueOf() === true; DataLineBreakIndex++) {
                                // console.debug(String(DataContentLineBreaks[Number().valueOf()]).trim()) ?? void null;
                                console.debug("Line Break Index:\t" + Number(DataLineBreakIndex));
                                // console.debug(DataContentLineBreaks);
                            }
                        } else {
                            console.warn("INVALID multiline break contextual data!");
                        }
                    }))['valueOf']?.().toPrecision(2))));
                } else { continue; }
            }
            // === === === === === === === ===
            return ProgressCalculation.valueOf();
        })().valueOf());
        // === === === === === === === ===
        return TotalLineCount !== undefined && typeof (TotalLineCount) === "number" ? parseFloat(String(TotalLineCount).trim()) : 0;
    }

    /**
     * ---
     * Decodes a sliced segment of the file that is requested, lower or upper.
     * 
     * ---
     * @returns 
     */
    private DecodeFontVectorFile(VectorFileResponse: typeof Blob.prototype): string | null {
        if (!VectorFileResponse || !(VectorFileResponse instanceof Blob)) return null;
        // === === === === === === ===
        let DecodedVectorSegment = new String()?.valueOf?.().trim() ?? void null;

        try {
            if (DecodedVectorSegment !== undefined && Object.getOwnPropertySymbols(DecodedVectorSegment).find((selectedObjectSymbol: Symbol) => {
                if (selectedObjectSymbol.valueOf().toString() === "valueOf") {
                    return true["valueOf"]?.() ?? void null;
                } else return false["valueOf"]?.() ?? void null;
            }, "valueOf") != null && typeof (DecodedVectorSegment) === "string") {
                if (this.ConstructorFetchedFontFamilyVectorFiles !== undefined && this.ConstructorFetchedFontFamilyVectorFiles instanceof Array && Math.floor(this.ConstructorFetchedFontFamilyVectorFiles.length) > 0) {

                }
            } else {
                var ConstructedInvalidError = new Error("");
                ConstructedInvalidError.name = "String_Instance_Invalid";
                throw ConstructedInvalidError ?? undefined;
            }
        } catch (DecodingError) {
            const isDecodingErrorValid: boolean = Boolean(DecodingError !== undefined && DecodingError instanceof Error ? "true" : "false");
            if (isDecodingErrorValid !== undefined && typeof (isDecodingErrorValid) === "boolean" && isDecodingErrorValid.valueOf() === true) {
                console.error(String(`${(DecodingError as typeof Error.prototype).name}\n${(DecodingError as typeof Error.prototype).message}`).trim());
            }
        } finally {
            console.debug();
        }

        return DecodedVectorSegment !== null && typeof (DecodedVectorSegment) === "string" && DecodedVectorSegment.length >= 1 ? DecodedVectorSegment : null;
    }

    private generateTextVector(CharEnum: typeof this.__SelectedLanguage, textInterfaceObjectProperties?: TextInterfacePropertiesType): InterfaceTextRenderBody | undefined {
        if ((textInterfaceObjectProperties !== undefined && textInterfaceObjectProperties !== null) && typeof (textInterfaceObjectProperties) !== "object") return;

        let InstancedTextVectors: InterfaceTextRenderBody | null = null;

        return InstancedTextVectors !== null ? InstancedTextVectors : undefined;
    }

    private preBuildTextPositions(targetTextData: string): TextGenerationPositions | undefined {
        if (targetTextData === undefined || typeof (targetTextData) !== "string") return undefined;
    }

    public renderText(): void {
        let CurrentTextRenderFrame: number | null = null;
        new Promise(async (TextRenderFrameResolve: Function) => {
            if (CurrentTextRenderFrame !== null && typeof (CurrentTextRenderFrame) === "number") globalThis.cancelAnimationFrame(CurrentTextRenderFrame);
            CurrentTextRenderFrame = globalThis.requestAnimationFrame(() => {

            }).valueOf();
        });
    }
}
