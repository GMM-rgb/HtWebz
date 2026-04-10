"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var UiRenderingSystem = (function () {
    function UiRenderingSystem() {
        this.RenderingContext = new WebGLRenderingContext();
        this.InterfaceRenderingPipeline = new WebGLBuffer();
        Object.assign(this.InterfaceRenderingPipeline, {});
    }
    UiRenderingSystem.prototype.GenerateWindowDisplay = function (WindowInterfaceConstructionData) {
    };
    return UiRenderingSystem;
}());
var WindowConstructor = (function () {
    function WindowConstructor() {
        this.InstancedWindowConstructorObject = new Object({
            InstanceWindow: function () {
                return __awaiter(this, arguments, void 0, function (TargetwindowTitle, RequestedWindowStyles) {
                    var NewWindowRendering;
                    if (TargetwindowTitle === void 0) { TargetwindowTitle = "Untitled#Window"; }
                    return __generator(this, function (_a) {
                        NewWindowRendering = {
                            toolbar: {},
                            logical: {
                                TitleName: new String().valueOf(),
                            },
                            visual: {},
                            sizing: {
                                height: 200,
                                width: 300,
                            },
                        };
                        if (TargetwindowTitle !== undefined && typeof (TargetwindowTitle) === "string" && NewWindowRendering.logical !== undefined && typeof (NewWindowRendering.logical) === "object") {
                            NewWindowRendering.logical.TitleName = TargetwindowTitle !== null && TargetwindowTitle !== void 0 ? TargetwindowTitle : "TITLE#ERROR";
                        }
                        else {
                            console.warn("Requested window title was INVALID, or UNDEFINED.\nExpected:\tSTRING\nReceived:\t".concat(new String(TargetwindowTitle !== undefined ? typeof (TargetwindowTitle) : null).valueOf()));
                        }
                        return [2];
                    });
                });
            },
        }).valueOf();
    }
    return WindowConstructor;
}());
var UiWebO = (function (_super) {
    __extends(UiWebO, _super);
    function UiWebO() {
        var _this = _super.call(this) || this;
        _this.WindowConstructor = new WindowConstructor();
        _this.CurrentWindows = new Object({
            WelcomeWindow: {
                sizing: {},
                visual: {},
                toolbar: {
                    TOOLBAR_ENABLED: true,
                    _enabled_elements: {
                        title: false,
                        controls: true,
                    }
                }
            },
        });
        return _this;
    }
    UiWebO.FormatWindowTitle = function (TargetWindow) {
        if (TargetWindow === void 0) { TargetWindow = undefined; }
        if (TargetWindow !== undefined && typeof (TargetWindow) === "object") {
        }
        else {
            console.error();
        }
    };
    UiWebO.prototype.DestroyRenderingSystem = function () {
        throw void null;
    };
    return UiWebO;
}(WindowConstructor));
//# sourceMappingURL=interface_rendering_kit.js.map