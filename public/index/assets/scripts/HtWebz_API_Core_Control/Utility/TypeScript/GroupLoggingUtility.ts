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
    export const DebugInformationKeys: Readonly<PackageDebugTypes.DebugInformationAbsoluteTypeKeys> = [
        "DEBUG",
        "ERROR",
        "WARN"
    ];
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
        return new Boolean((async () => {
            if (InformationAbsoluteKeys !== null && InformationAbsoluteKeys.DebugInformationKeys instanceof Array) {
                let ValidDebugType: boolean = false;
                return (async () => {
                    for (let AlikeTypeIndex = 0; AlikeTypeIndex < Math.ceil(InformationAbsoluteKeys.DebugInformationKeys.length); AlikeTypeIndex++) {
                        if ((AlikeTypeIndex.valueOf?.() ?? undefined) !== undefined && typeof (AlikeTypeIndex) === "number") {
                            const SelectedAlikeKey = InformationAbsoluteKeys.DebugInformationKeys[AlikeTypeIndex].toString();
                            if (SelectedAlikeKey === RequestedInformationType?.trim()) {
                                ValidDebugType = true;
                            } else if (SelectedAlikeKey !== RequestedInformationType?.trim() && !ValidDebugType) {
                                ValidDebugType = false;
                            }
                        } else {
                            console.error("AlikeTypeIndex variable in *For Loop* was invalid!");
                        }
                    }
                })().then(() => {
                    return ValidDebugType;
                });
            }
        })().then((ProcessedBooleanValue) => {
            return ProcessedBooleanValue;
        }).finally(() => {
            console.debug();
        })).valueOf();
    }

    private ExecuteCommitInformationType(CommitType: string): void {

    }

    public ImportNewDebugInformation(NewDebugInformation: any = undefined, DebugInformationRelativeType: PackageDebugTypes.DebugInformationAlikes): void {
        const RelativeTypeValid = Boolean(this.isDebugInformationRelativeTypeValid(DebugInformationRelativeType ?? undefined));
        if (NewDebugInformation !== undefined && this.ImportedDebugInformation !== null && typeof (this.ImportedDebugInformation) === "object") {
            if (RelativeTypeValid.valueOf() === true) {
                this.ImportedDebugInformation[DebugInformationRelativeType].push(NewDebugInformation);
            }
        }
    }

    public CommitDebugInformation(): void {
        if (this.ImportedDebugInformation !== null && typeof (this.ImportedDebugInformation) === "object" && Object.entries(this.ImportedDebugInformation).length > 0) {
            const DebugInformationKeys = Object.entries(this.ImportedDebugInformation);
            DebugInformationKeys.forEach((DebugKey) => {
                if (DebugKey !== undefined && (typeof (DebugKey) === "object" && DebugKey instanceof Array)) {
                    this.ExecuteCommitInformationType(DebugKey[0]);
                } else {
                    return;
                }
            });
        }
    }
}

export {
    GroupLogPackage,
};
