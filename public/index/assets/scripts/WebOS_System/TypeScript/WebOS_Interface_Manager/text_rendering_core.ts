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
}

class PrebuiltFontsReference implements RenderingTextFontStorage {
    constructor(private requestedFontFamily: string) { }

    IntegratedFontFamilyVectors: PreBuiltFontFamilyVectors = {
        1: {
            "lower": undefined,
            "upper": undefined,
        },
        2: {
            "lower": undefined,
            "upper": undefined,
        },
    };
}

export class TextFontRendering extends PrebuiltFontsReference {
    SelectedFontFamilyLibraryName: string;
    SelectedFontFamilyLibraryData: String | null;
    SelectedFontFamilyLibraryIndexAmount: number;

    constructor(public fontFamily: string) {
        super(fontFamily !== undefined ? fontFamily : "monospace");
        this.SelectedFontFamilyLibraryName ??= new String().valueOf();
        this.SelectedFontFamilyLibraryData = new String();
        this.SelectedFontFamilyLibraryIndexAmount = 0;
        // === === === === === ===
        function CalculateFontFamilyVariants(SelectedFontLibraryData: typeof String.prototype): number {
            let CalculatedVariants = parseFloat(new Number(0).toFixed(2));
            if (CalculatedVariants === undefined || typeof (CalculatedVariants) !== "number") return 0;

            new Promise(async () => {
                const TextFontVectorsFolder = await fetch("./Prebuilt_Text_Font_Vectors/");
                const TextVectors = (await (TextFontVectorsFolder.blob ?? void null)?.()).stream().getReader();

                TextVectors.read?.().then?.((ReadDataVectors) => {
                    if (ReadDataVectors !== undefined && ReadDataVectors.done.valueOf() === true) {

                    } else {
                        console.error();
                    }
                }) ?? void null;

                try {
                    // for () {

                    // }
                } catch (VariantCalculationError) {
                    VariantCalculationError !== undefined ? console.error(String(VariantCalculationError)) : void null;
                }
            });

            return (CalculatedVariants ?? 0);
        }

        if (this.SelectedFontFamilyLibraryData !== null && this.SelectedFontFamilyLibraryData instanceof String) {
            this.SelectedFontFamilyLibraryIndexAmount = CalculateFontFamilyVariants?.(this.SelectedFontFamilyLibraryData !== null ? this.SelectedFontFamilyLibraryData : new String()) ?? 0;
        }
        // === === === === === ===
        new Promise(async () => {
            await (async () => {
                for (let selectedFontLetter = 0; selectedFontLetter; selectedFontLetter++) {

                }
            })().then(async () => {
                await Promise!.resolve?.() ?? void null;
            });
        });
    }

    private determineRequestedFontFamily(): String | undefined {
        if (this.fontFamily === undefined ) return undefined;

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
