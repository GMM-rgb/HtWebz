class InterfaceTextRenderBody {
    constructor(requestedText) {
        this.requestedText = requestedText;
        this.FetchedTextVectors = null;
    }
}
class PrebuiltFontsReference {
    constructor() {
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
    constructor() {
        super();
        this.SelectedFontFamilyLibraryName ?? (this.SelectedFontFamilyLibraryName = new String().valueOf());
        this.SelectedFontFamilyLibraryData = new String();
        this.SelectedFontFamilyLibraryIndexAmount = 0;
        function CalculateFontFamilyVariants(SelectedFontLibraryData) {
            let CalculatedVariants = parseFloat(new Number(0).toFixed(2));
            if (CalculatedVariants === undefined || typeof (CalculatedVariants) !== "number")
                return 0;
            new Promise(async () => {
                const TextFontVectorsFolder = await fetch("./Prebuilt_Text_Font_Vectors/");
                const TextVectors = (await (TextFontVectorsFolder.blob ?? void null)?.() ?? console.warn("Failed to fetch text vector; font family folder!")).stream().getReader();
                TextVectors.read().then((ReadDataVectors) => {
                    if (ReadDataVectors !== undefined && ReadDataVectors.done.valueOf() === true) {
                    }
                    else {
                        console.error();
                    }
                });
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