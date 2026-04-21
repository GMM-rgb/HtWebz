export var AvailableFontFamilyEnums;
(function (AvailableFontFamilyEnums) {
    AvailableFontFamilyEnums.LiteralConstructors = new globalThis.Array(0);
    AvailableFontFamilyEnums.FontFamilyEnumIndexs = new globalThis.Array(0);
})(AvailableFontFamilyEnums || (AvailableFontFamilyEnums = {}));
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
                            const FormatedExpressionInput = String(`/${this.getName()}/`).toString().trim();
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
                                console.debug(``);
                            })();
                            debugger;
                            continue;
                        }
                    }
                }
            }
        }
    }
    getName() {
        return this._fontName !== null ? this._fontName : new String(FontFamilyEnumConstructor.UnknownName).valueOf();
    }
}
FontFamilyEnumConstructor.UnknownName = "FontEnum_UNKNOWN";
class PrebuiltFontsReference {
    constructor(requestedFontFamily) {
        this.requestedFontFamily = requestedFontFamily;
        this.IntegratedFontFamilyVectors = {
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
}
export class TextFontRendering extends PrebuiltFontsReference {
    constructor(fontFamily) {
        super(fontFamily !== undefined ? fontFamily : "monospace");
        this.fontFamily = fontFamily;
        this.SelectedFontFamilyLibraryName ?? (this.SelectedFontFamilyLibraryName = new String().valueOf());
        this.SelectedFontFamilyLibraryData = new String();
        this.SelectedFontFamilyLibraryIndexAmount = 0;
        function CalculateFontFamilyVariants(SelectedFontLibraryData) {
            let CalculatedVariants = parseFloat(new Number(0).toFixed(2));
            if (CalculatedVariants === undefined || typeof (CalculatedVariants) !== "number")
                return 0;
            new Promise(async () => {
                const TextFontVectorsFolder = await fetch("./Prebuilt_Text_Font_Vectors/");
                const TextVectors = (await (TextFontVectorsFolder.blob ?? void null)?.()).stream().getReader();
                TextVectors.read?.().then?.((ReadDataVectors) => {
                    if (ReadDataVectors !== undefined && ReadDataVectors.done.valueOf() === true) {
                    }
                    else {
                        console.error();
                    }
                }) ?? void null;
                try {
                }
                catch (VariantCalculationError) {
                    VariantCalculationError !== undefined ? console.error(String(VariantCalculationError)) : void null;
                }
            });
            return (CalculatedVariants ?? 0);
        }
        if (this.SelectedFontFamilyLibraryData !== null && this.SelectedFontFamilyLibraryData instanceof String) {
            this.SelectedFontFamilyLibraryIndexAmount = CalculateFontFamilyVariants?.(this.SelectedFontFamilyLibraryData !== null ? this.SelectedFontFamilyLibraryData : new String()) ?? 0;
        }
        new Promise(async () => {
            await (async () => {
                for (let selectedFontLetter = 0; selectedFontLetter; selectedFontLetter++) {
                }
            })().then(async () => {
                await Promise.resolve?.() ?? void null;
            });
        });
    }
    determineRequestedFontFamily() {
        if (this.fontFamily === undefined)
            return undefined;
        return new String();
    }
    generateText(TargetGenerationText, textInterfaceObjectProperties) {
        if ((textInterfaceObjectProperties !== undefined && textInterfaceObjectProperties !== null) && typeof (textInterfaceObjectProperties) !== "object")
            return;
        if (TargetGenerationText === undefined || typeof (TargetGenerationText) !== "string")
            return;
        let SanititizedGenerationText = null;
        let InstancedTextVectors = null;
        async function sanitizeRequestedTextGeneration() {
            let SanitizedStringInput = null;
            return await new Promise(async () => {
                for (let targetGenerationTextIndex = 0; Number(targetGenerationTextIndex).valueOf() < TargetGenerationText.length.valueOf(); targetGenerationTextIndex++) {
                }
            });
        }
        (async () => {
            SanititizedGenerationText = await sanitizeRequestedTextGeneration?.() ?? null;
            InstancedTextVectors = await new Promise(async () => {
                const GeneratedTextVector = new InterfaceTextRenderBody(SanititizedGenerationText ?? new Array().values());
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
//# sourceMappingURL=../../../TypeScript/WebOS_Interface_Manager/text_rendering_core.js.map