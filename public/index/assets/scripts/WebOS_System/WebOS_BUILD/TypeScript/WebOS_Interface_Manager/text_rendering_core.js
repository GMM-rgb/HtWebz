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
var _PrebuiltFontsReference___IntegratedFontFamilyVectors_accessor_storage;
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
class PrebuiltFontsReference {
    constructor(requestedFontFamily) {
        this.requestedFontFamily = requestedFontFamily;
        _PrebuiltFontsReference___IntegratedFontFamilyVectors_accessor_storage.set(this, {
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
    get __IntegratedFontFamilyVectors() { return __classPrivateFieldGet(this, _PrebuiltFontsReference___IntegratedFontFamilyVectors_accessor_storage, "f"); }
    set __IntegratedFontFamilyVectors(value) { __classPrivateFieldSet(this, _PrebuiltFontsReference___IntegratedFontFamilyVectors_accessor_storage, value, "f"); }
}
_PrebuiltFontsReference___IntegratedFontFamilyVectors_accessor_storage = new WeakMap();
export class TextFontRendering extends PrebuiltFontsReference {
    constructor(ActiveFontFamily) {
        super(ActiveFontFamily !== undefined ? ActiveFontFamily : "monospace");
        this.ActiveFontFamily = ActiveFontFamily;
        this.FetchedFontFamilyVectorFiles = undefined;
        this.SelectedFontFamilyLibraryName ?? (this.SelectedFontFamilyLibraryName = new String().valueOf());
        this.SelectedFontFamilyLibraryData ?? (this.SelectedFontFamilyLibraryData = new String());
        this.SelectedFontFamilyLibraryIndexAmount = 0;
        console.info("[INITIALIZING TEXT RENDERING...]");
        (async () => {
            this.FetchedFontFamilyVectorFiles = await this.fetchFontFamilyVectorFiles(false);
            this.SelectedFontFamilyLibraryIndexAmount = await this.fetchFontFamilyVectorFiles(true);
            console.debug(this.SelectedFontFamilyLibraryIndexAmount.toString());
        })();
    }
    async fetchFontFamilyVectorFiles(fetchVariantAmount) {
        let CollectedFontFileResponseData = [];
        const FontFamilyDirectoryPath = "/index/assets/scripts/WebOS_System/TypeScript/WebOS_Interface_Manager/Prebuilt_Text_Font_Vectors/text_characters/";
        const FontVectorFileMapping = (await fetch(FontFamilyDirectoryPath.toString() + "font_mapping.txt") ?? null);
        const StreamedMappingTextData = ((await (await FontVectorFileMapping.blob()).text()).trim());
        const MappingFileExpressionResult = new RegExp(/(\n+)/gim).exec(StreamedMappingTextData);
        const SplittedExpressionDataResult = MappingFileExpressionResult.input.split("\n") ?? null;
        if (fetchVariantAmount !== undefined && typeof (fetchVariantAmount) === "boolean" && fetchVariantAmount?.valueOf() === true) {
            return parseFloat(new String(SplittedExpressionDataResult.length).valueOf());
        }
        console.info("OK:\t" + (String(FontVectorFileMapping?.ok ?? "UNKNOWN")));
        return await (async () => {
            SplittedExpressionDataResult?.forEach?.(async (SplicedValue, SpliceIndex) => {
                if (SplicedValue !== null && typeof (SplicedValue) === "string") {
                    const FetchedVectorFile = (await (fetch(FontFamilyDirectoryPath + String(SplicedValue))));
                    FetchedVectorFile.ok ? CollectedFontFileResponseData.push(await FetchedVectorFile.blob()) : null;
                    console.debug(CollectedFontFileResponseData[Number(SpliceIndex)]);
                    console.debug?.(new String(SplicedValue).trim()) ?? void null;
                }
            });
            await Promise.resolve();
        })().then(async () => {
            return CollectedFontFileResponseData ?? new Array(0);
        }).finally(() => console.debug("Sucessfully fetched text vector files through mapping."));
    }
    determineRequestedFontFamily() {
        if (this.ActiveFontFamily === undefined)
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