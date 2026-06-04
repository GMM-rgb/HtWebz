import { ParsingModeNames, RegisteryScanningUtility, } from "./element_registery";
const ElementConstructionParser = new RegisteryScanningUtility.ElementBundleParser([
    {
        ElementNodeType: {
            "div": HTMLDivElement.prototype,
        },
        SourceContents: [
            {},
        ],
    },
], ParsingModeNames.COLLECTION);
//# sourceMappingURL=element_bundling_core.js.map