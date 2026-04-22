/// <reference path="./rendering_core_reference.d.ts" />
export namespace AvailableFontFamilyEnums {
    export var LiteralConstructors: Array<FontFamilyEnumConstructor> = new globalThis.Array(0);
    export var FontFamilyEnumIndexs: Array<string> = new globalThis.Array(0);
}

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

class PrebuiltFontsReference implements RenderingTextFontStorage {
    constructor(private requestedFontFamily: string) { }
    accessor __IntegratedFontFamilyVectors: PreBuiltFontFamilyVectors = {
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

export class TextFontRendering extends PrebuiltFontsReference {
    FetchedFontFamilyVectorFiles: Blob[] | undefined;
    SelectedFontFamilyLibraryName: string;
    SelectedFontFamilyLibraryData: String | null;
    SelectedFontFamilyLibraryIndexAmount: number;

    public constructor(public ActiveFontFamily: string) {
        super(ActiveFontFamily !== undefined ? ActiveFontFamily : "monospace");
        this.FetchedFontFamilyVectorFiles = undefined;
        this.SelectedFontFamilyLibraryName ??= new String().valueOf();
        this.SelectedFontFamilyLibraryData ??= new String();
        this.SelectedFontFamilyLibraryIndexAmount = 0;
        // === === === === === ===
        console.info("[INITIALIZING TEXT RENDERING...]");
        // === === === === === ===
        (async () => {
            this.FetchedFontFamilyVectorFiles = await this.fetchFontFamilyVectorFiles(false);
            this.SelectedFontFamilyLibraryIndexAmount = await this.fetchFontFamilyVectorFiles(true);
            console.debug(this.SelectedFontFamilyLibraryIndexAmount.toString());
        })();
    }

    // protected async CalculateFontFamilyVariants(SelectedFontLibraryData: typeof String.prototype): Promise<number> {
    //     let CalculatedVariants = parseFloat(String(this.FetchedFontFamilyVectorFiles!?.length.valueOf()).trim()) ?? 0;
    //     if (this.FetchedFontFamilyVectorFiles === undefined || !(this.FetchedFontFamilyVectorFiles instanceof Array)) return 0 && console.warn("Vector file blob array was undefined!");
    //     if (CalculatedVariants === undefined || typeof (CalculatedVariants) !== "number") return 0;
    //     return CalculatedVariants !== null && typeof (CalculatedVariants) === "number" ? CalculatedVariants : 0;
    // }

    private async fetchFontFamilyVectorFiles(fetchVariantAmount?: true): Promise<number>;
    private async fetchFontFamilyVectorFiles(fetchVariantAmount?: false | undefined): Promise<Array<Blob>>;

    private async fetchFontFamilyVectorFiles(fetchVariantAmount?: boolean): Promise<Array<Blob> | number> {
        let CollectedFontFileResponseData: Array<typeof Blob.prototype> = [];
        const FontFamilyDirectoryPath = "/index/assets/scripts/WebOS_System/TypeScript/WebOS_Interface_Manager/Prebuilt_Text_Font_Vectors/text_characters/";
        const FontVectorFileMapping: Response | null = (await fetch(FontFamilyDirectoryPath.toString() + "font_mapping.txt") ?? null);
        const StreamedMappingTextData: string = ((await (await FontVectorFileMapping.blob()).text()).trim());
        const MappingFileExpressionResult: RegExpExecArray = (new RegExp(/(\n+)/gim).exec(StreamedMappingTextData) as RegExpExecArray);
        const SplittedExpressionDataResult: Array<string> | null = MappingFileExpressionResult.input.split("\n") ?? null;

        if (fetchVariantAmount !== undefined && typeof (fetchVariantAmount) === "boolean" && fetchVariantAmount?.valueOf() === true) {
            return new Number(SplittedExpressionDataResult.length).valueOf();
        }

        console.info("OK:\t" + (String(FontVectorFileMapping?.ok ?? "UNKNOWN")));
        // console.debug(MappingFileExpressionResult?.index.toString());
        // console.debug(StreamedMappingTextData.normalize("NFC"));

        return await (async () => {
            SplittedExpressionDataResult?.forEach?.(async (SplicedValue: string, SpliceIndex: number) => {
                if (SplicedValue !== null && typeof (SplicedValue) === "string") {
                    const FetchedVectorFile = (await (fetch(FontFamilyDirectoryPath + String(SplicedValue))));
                    FetchedVectorFile.ok ? CollectedFontFileResponseData.push(await FetchedVectorFile.blob()) : null;
                    console.debug(CollectedFontFileResponseData[Number(SpliceIndex)!]);
                    console.debug?.(new String(SplicedValue).trim()) ?? void null;
                }
            });

            await Promise.resolve();
        })().then(async () => {
            return CollectedFontFileResponseData ?? new Array(0);
        }).finally(() => console.debug("Sucessfully fetched text vector files through mapping."));
    }

    private determineRequestedFontFamily(): String | undefined {
        if (this.ActiveFontFamily === undefined ) return undefined;

        return new String();
    }

    public generateText(TargetGenerationText: string, textInterfaceObjectProperties?: TextInterfacePropertiesType): InterfaceTextRenderBody | undefined {
        if ((textInterfaceObjectProperties !== undefined && textInterfaceObjectProperties !== null) && typeof (textInterfaceObjectProperties) !== "object") return;
        if (TargetGenerationText === undefined || typeof (TargetGenerationText) !== "string") return;

        let SanititizedGenerationText: StringIterator<string> | null = null;
        let InstancedTextVectors: InterfaceTextRenderBody | null = null;

        async function sanitizeRequestedTextGeneration(): Promise<ArrayIterator<string> | null> {
            let SanitizedStringInput: ArrayIterator<string> | null = null;
            return await new Promise(async () => {
                for (let targetGenerationTextIndex: number = 0; Number(targetGenerationTextIndex).valueOf() < TargetGenerationText.length.valueOf(); targetGenerationTextIndex++) {

                }
            });
        }

        (async () => {
            SanititizedGenerationText = await sanitizeRequestedTextGeneration?.() ?? null;
            InstancedTextVectors = await new Promise<InterfaceTextRenderBody>(async () => {
                const GeneratedTextVector = new InterfaceTextRenderBody(SanititizedGenerationText ?? new Array().values() as ArrayIterator<string>);
                await Promise.resolve(GeneratedTextVector ?? null);
                return GeneratedTextVector;
            }).then((GeneratedText) => {
                return GeneratedText;
            }).finally(async () => {
                await Promise.resolve();
            });
        })().then(() => {

        });

        return InstancedTextVectors !== null ? InstancedTextVectors : undefined;
    }
}
