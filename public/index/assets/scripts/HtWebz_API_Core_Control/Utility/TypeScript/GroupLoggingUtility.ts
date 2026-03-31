declare namespace PackageDebugTypes {
    export type DebugInformationAbsoluteTypeKeys = ("DEBUG" | "WARN" | "ERROR")[];
    export type DebugInformationAlikes = ("DEBUG" | "WARN" | "ERROR");
    export type DebugInformationData = {
        DEBUG: any[];
        WARN: any[];
        ERROR: any[];
    };
}

namespace InformationAbsoluteKeys {
    export let DebugInformationKeys: Readonly<PackageDebugTypes.DebugInformationAbsoluteTypeKeys> = [
        "DEBUG",
        "ERROR",
        "WARN"
    ] as const;
}

class GroupLogPackage {
    ImportedDebugInformation: PackageDebugTypes.DebugInformationData;

    constructor(private ConsoleLoggingName: string) {
        this.ImportedDebugInformation = {
            DEBUG: [],
            WARN: [],
            ERROR: [],
        };
    }

    private isDebugInformationRelativeTypeValid(RequestedInformationType?: PackageDebugTypes.DebugInformationAlikes): boolean {
        let DebugInformationTypeValid = false;
        return new Boolean((async () => {
            for (let AlikeTypeIndex = 0; AlikeTypeIndex < Math.ceil(InformationAbsoluteKeys.DebugInformationKeys.length); AlikeTypeIndex++) {
                if ((AlikeTypeIndex.valueOf?.() ?? undefined) !== undefined && typeof (AlikeTypeIndex) === "number") {

                } else {
                    console.error("AlikeTypeIndex variable in *For Loop* was invalid!");
                }
            }
        })().then(() => {
            return DebugInformationTypeValid;
        })).valueOf();
    }

    private ExecuteCommitInformationType(): void {

    }

    public ImportNewDebugInformation(NewDebugInformation: any = undefined, DebugInformationRelativeType: PackageDebugTypes.DebugInformationAlikes): void {
        if (NewDebugInformation !== undefined && this.ImportedDebugInformation !== null && typeof (this.ImportedDebugInformation) === "object") {

        } else {
            return console.warn(``);
        }
    }

    public CommitDebugInformation(): void {

    }
}

export {
    GroupLogPackage,
};
