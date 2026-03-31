"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupLogPackage = void 0;
var InformationAbsoluteKeys;
(function (InformationAbsoluteKeys) {
    InformationAbsoluteKeys.DebugInformationKeys = [
        "DEBUG",
        "ERROR",
        "WARN"
    ];
})(InformationAbsoluteKeys || (InformationAbsoluteKeys = {}));
class GroupLogPackage {
    ConsoleLoggingName;
    ImportedDebugInformation;
    constructor(ConsoleLoggingName) {
        this.ConsoleLoggingName = ConsoleLoggingName;
        this.ImportedDebugInformation = {
            DEBUG: [],
            WARN: [],
            ERROR: [],
        };
    }
    isDebugInformationRelativeTypeValid(RequestedInformationType) {
        return new Boolean((async () => {
            if (InformationAbsoluteKeys !== null && InformationAbsoluteKeys.DebugInformationKeys instanceof Array) {
                let ValidDebugType = false;
                return (async () => {
                    for (let AlikeTypeIndex = 0; AlikeTypeIndex < Math.ceil(InformationAbsoluteKeys.DebugInformationKeys.length); AlikeTypeIndex++) {
                        if ((AlikeTypeIndex.valueOf?.() ?? undefined) !== undefined && typeof (AlikeTypeIndex) === "number") {
                            const SelectedAlikeKey = InformationAbsoluteKeys.DebugInformationKeys[AlikeTypeIndex].toString();
                            if (SelectedAlikeKey === RequestedInformationType?.trim()) {
                                ValidDebugType = true;
                            }
                            else if (SelectedAlikeKey !== RequestedInformationType?.trim() && !ValidDebugType) {
                                ValidDebugType = false;
                            }
                        }
                        else {
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
    ExecuteCommitInformationType() {
    }
    ImportNewDebugInformation(NewDebugInformation = undefined, DebugInformationRelativeType) {
        const RelativeTypeValid = Boolean(this.isDebugInformationRelativeTypeValid(DebugInformationRelativeType ?? undefined));
        if (NewDebugInformation !== undefined && this.ImportedDebugInformation !== null && typeof (this.ImportedDebugInformation) === "object") {
            if (RelativeTypeValid.valueOf() === true) {
            }
        }
        else {
            console.warn("");
        }
    }
    CommitDebugInformation() {
        if (this.ImportedDebugInformation !== null && typeof (this.ImportedDebugInformation) === "object" && Object.entries(this.ImportedDebugInformation).length > 0) {
            const DebugInformationKeys = Object.entries(this.ImportedDebugInformation);
            DebugInformationKeys.forEach((DebugKey) => {
                if (DebugKey !== undefined && (typeof (DebugKey) === "object" && DebugKey instanceof Array)) {
                }
                else {
                    return;
                }
            });
        }
    }
}
exports.GroupLogPackage = GroupLogPackage;
