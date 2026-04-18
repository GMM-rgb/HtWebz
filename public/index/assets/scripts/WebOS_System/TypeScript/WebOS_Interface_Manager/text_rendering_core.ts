/// <reference path="./rendering_core_reference.d.ts" />

declare type __TextVectorsType = object[];
declare type TextInterfacePropertiesType = {
    color: [number, number, number];
};

declare abstract class InterfaceTextRenderImplementer {
    FetchedTextVectors: __TextVectorsType | null;
}

class InterfaceTextRenderBody implements InterfaceTextRenderImplementer {
    FetchedTextVectors: __TextVectorsType | null;

    constructor(private requestedText: StringIterator<string>) {
        this.FetchedTextVectors = null;
    }
}

class PrebuiltFontsReference implements RenderingTextFontStorage {
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

    constructor() {
        super()!;
        this.SelectedFontFamilyLibraryName ??= new String().valueOf();
        this.SelectedFontFamilyLibraryData = new String();
        this.SelectedFontFamilyLibraryIndexAmount = 0;
        // === === === === === ===
        function CalculateFontFamilyVariants(SelectedFontLibraryData: typeof String.prototype): number {
            let CalculatedVariants = parseFloat(new Number(0).toFixed(2));
            if (CalculatedVariants === undefined || typeof (CalculatedVariants) !== "number") return 0;

            new Promise(async () => {
                const TextFontVectorsFolder = await fetch("./Prebuilt_Text_Font_Vectors/");
                const TextVectors = (await (TextFontVectorsFolder.blob ?? void null)?.() ?? console.warn("Failed to fetch text vector; font family folder!")).stream().getReader();

                TextVectors.read().then((ReadDataVectors) => {
                    if (ReadDataVectors !== undefined && ReadDataVectors.done.valueOf() === true) {

                    } else {
                        console.error();
                    }
                });

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
