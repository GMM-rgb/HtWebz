declare namespace PackageDebugTypes {
    export type DebugInformationAbsoluteTypeKeys = ("DEBUG" | "WARN" | "ERROR")[];
    export type DebugInformationAlikes = ("DEBUG" | "WARN" | "ERROR");
    export type DebugKeyTemplate = string[];
    export type DebugInformationData = {
        DEBUG: string[];
        WARN: string[];
        ERROR: string[];
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
    CurrentCommitingDebug: string;

    constructor(private ConsoleLoggingName: string) {
        this.ImportedDebugInformation = {
            DEBUG: [],
            WARN: [],
            ERROR: [],
        };
        this.CurrentCommitingDebug = String.prototype.valueOf();
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

    private ExecuteCommitInformationType(CommitType: PackageDebugTypes.DebugInformationAlikes, CommitLogMessage: string | undefined = undefined): void {
        if (CommitType === undefined || CommitType === null) return;
        if ((CommitLogMessage !== undefined && typeof(CommitLogMessage) === "string") && (typeof(CommitType) === "string")) {
            if (this.isDebugInformationRelativeTypeValid(String(CommitType) as PackageDebugTypes.DebugInformationAlikes)) {
                
            }
        }
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
            new Promise(() => {
                return Object.entries(this.ImportedDebugInformation);
            }).then((DebugInformationKeys) => {
                if (DebugInformationKeys !== null && DebugInformationKeys instanceof Array) {
                    DebugInformationKeys.forEach((DebugKey: PackageDebugTypes.DebugKeyTemplate) => {
                        if (DebugKey !== undefined && (typeof (DebugKey) === "object" && DebugKey instanceof Array)) {
                            console.group(new String(this?.ConsoleLoggingName).trim().valueOf());
                            const DebugInfoDataEntries = DebugKey.entries() ?? undefined;
                            if (DebugInfoDataEntries === null || DebugInfoDataEntries === undefined) return;
                            for (let DebugDataIndex = 0; DebugDataIndex < DebugKey.length; DebugDataIndex++) {
                                const CurrentArrayIteration = DebugInfoDataEntries.next() ?? null;
                                const CommitMessageInformation = DebugKey[CurrentArrayIteration.value?.[0] ?? 0];
                                const CommitMessageType = String(CurrentArrayIteration.value?.[1]) as PackageDebugTypes.DebugInformationAlikes;
                                this.CurrentCommitingDebug = CommitMessageInformation[DebugDataIndex].trim();
                                this.ExecuteCommitInformationType(CommitMessageType, this.CurrentCommitingDebug);
                            }
                        } else {
                            return;
                        }
                    });
                }
            });
        }
    }
}

export {
    GroupLogPackage,
};
