"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var GroupLogPackage = (function () {
    function GroupLogPackage(ConsoleLoggingName) {
        this.ConsoleLoggingName = ConsoleLoggingName;
        this.ImportedDebugInformation = {
            DEBUG: [],
            WARN: [],
            ERROR: [],
        };
        this.CurrentCommitingDebug = String.prototype.valueOf();
    }
    GroupLogPackage.prototype.isDebugInformationRelativeTypeValid = function (RequestedInformationType) {
        var _this = this;
        return new Boolean((function () { return __awaiter(_this, void 0, void 0, function () {
            var ValidDebugType_1;
            var _this = this;
            return __generator(this, function (_a) {
                if (InformationAbsoluteKeys !== null && InformationAbsoluteKeys.DebugInformationKeys instanceof Array) {
                    ValidDebugType_1 = false;
                    return [2, (function () { return __awaiter(_this, void 0, void 0, function () {
                            var AlikeTypeIndex, SelectedAlikeKey;
                            var _a, _b;
                            return __generator(this, function (_c) {
                                for (AlikeTypeIndex = 0; AlikeTypeIndex < Math.ceil(InformationAbsoluteKeys.DebugInformationKeys.length); AlikeTypeIndex++) {
                                    if (((_b = (_a = AlikeTypeIndex.valueOf) === null || _a === void 0 ? void 0 : _a.call(AlikeTypeIndex)) !== null && _b !== void 0 ? _b : undefined) !== undefined && typeof (AlikeTypeIndex) === "number") {
                                        SelectedAlikeKey = InformationAbsoluteKeys.DebugInformationKeys[AlikeTypeIndex].toString();
                                        if (SelectedAlikeKey === (RequestedInformationType === null || RequestedInformationType === void 0 ? void 0 : RequestedInformationType.trim())) {
                                            ValidDebugType_1 = true;
                                        }
                                        else if (SelectedAlikeKey !== (RequestedInformationType === null || RequestedInformationType === void 0 ? void 0 : RequestedInformationType.trim()) && !ValidDebugType_1) {
                                            ValidDebugType_1 = false;
                                        }
                                    }
                                    else {
                                        console.error("AlikeTypeIndex variable in *For Loop* was invalid!");
                                    }
                                }
                                return [2];
                            });
                        }); })().then(function () {
                            return ValidDebugType_1;
                        })];
                }
                return [2];
            });
        }); })().then(function (ProcessedBooleanValue) {
            return ProcessedBooleanValue;
        }).finally(function () {
            console.debug();
        })).valueOf();
    };
    GroupLogPackage.prototype.ExecuteCommitInformationType = function (CommitType, CommitLogMessage) {
        if (CommitLogMessage === void 0) { CommitLogMessage = undefined; }
        if (CommitType === undefined || CommitType === null)
            return;
        if ((CommitLogMessage !== undefined && typeof (CommitLogMessage) === "string") && (typeof (CommitType) === "string")) {
        }
    };
    GroupLogPackage.prototype.ImportNewDebugInformation = function (NewDebugInformation, DebugInformationRelativeType) {
        if (NewDebugInformation === void 0) { NewDebugInformation = undefined; }
        var RelativeTypeValid = Boolean(this.isDebugInformationRelativeTypeValid(DebugInformationRelativeType !== null && DebugInformationRelativeType !== void 0 ? DebugInformationRelativeType : undefined));
        if (NewDebugInformation !== undefined && this.ImportedDebugInformation !== null && typeof (this.ImportedDebugInformation) === "object") {
            if (RelativeTypeValid.valueOf() === true) {
                this.ImportedDebugInformation[DebugInformationRelativeType].push(NewDebugInformation);
            }
        }
    };
    GroupLogPackage.prototype.CommitDebugInformation = function () {
        var _this = this;
        if (this.ImportedDebugInformation !== null && typeof (this.ImportedDebugInformation) === "object" && Object.entries(this.ImportedDebugInformation).length > 0) {
            new Promise(function () {
                return Object.entries(_this.ImportedDebugInformation);
            }).then(function (DebugInformationKeys) {
                if (DebugInformationKeys !== null && DebugInformationKeys instanceof Array) {
                    DebugInformationKeys.forEach(function (DebugKey) {
                        var _a, _b, _c;
                        if (DebugKey !== undefined && (typeof (DebugKey) === "object" && DebugKey instanceof Array)) {
                            var DebugInfoDataEntries = DebugKey.entries();
                            for (var DebugDataIndex = 0; DebugDataIndex < DebugKey.length; DebugDataIndex++) {
                                var CurrentArrayIteration = DebugInfoDataEntries.next();
                                var CommitMessageInformation = DebugKey[(_b = (_a = CurrentArrayIteration.value) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : 0];
                                var CommitMessageType = String((_c = CurrentArrayIteration.value) === null || _c === void 0 ? void 0 : _c[1]);
                                _this.CurrentCommitingDebug = CommitMessageInformation[DebugDataIndex].trim();
                                _this.ExecuteCommitInformationType(CommitMessageType, _this.CurrentCommitingDebug);
                            }
                        }
                        else {
                            return;
                        }
                    });
                }
            });
        }
    };
    return GroupLogPackage;
}());
exports.GroupLogPackage = GroupLogPackage;
