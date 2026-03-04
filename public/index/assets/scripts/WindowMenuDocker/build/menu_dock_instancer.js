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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingDockWindowConstructor = exports.InstanceFloatingDockWindow = void 0;
var InstanceFloatingDockWindow = /** @class */ (function () {
    function InstanceFloatingDockWindow() {
        this.DockWindow = null;
    }
    InstanceFloatingDockWindow.prototype.NewDockWindowElement = function () {
        var DockWindow = document.createElement("dockwindow");
        return;
    };
    return InstanceFloatingDockWindow;
}());
exports.InstanceFloatingDockWindow = InstanceFloatingDockWindow;
/**
 *
 */
var FloatingDockWindowConstructor;
(function (FloatingDockWindowConstructor) {
    var DefaultName = "NewDockWindow";
    var CurrentDockMenus = new Array(0);
    /**
     *
     */
    var FloatingDockCustomizer = /** @class */ (function () {
        function FloatingDockCustomizer() {
        }
        /**
         * Sets the `FloatingDock`'s height; the specified amount.
         * @param RequestedDimensionAxis
         * @param RequestedHeightAmount
         * @returns {void}
         */
        FloatingDockCustomizer.prototype.SetSizDimension = function (RequestedDimensionAxis, RequestedHeightAmount) {
            var _this = this;
            if (RequestedDimensionAxis === "height" || RequestedDimensionAxis === "width") {
                if (RequestedHeightAmount !== null && (RequestedHeightAmount === null || RequestedHeightAmount === void 0 ? void 0 : RequestedHeightAmount.valueOf()) || 0 > 0) {
                    try {
                        var IsValidDockMenu_1 = false;
                        var ValidDockMenuIndex_1 = new Number(0).valueOf();
                        // Ensures this customizer is pointing to the correct `FloatingDockMenu`
                        CurrentDockMenus.forEach(function (DockMenu, CurrentMenuIndex) {
                            if (_this.targetCustomizingDock !== null || _this.targetCustomizingDock !== undefined) {
                                if (_this.targetCustomizingDock.DockWindowName.trim() === DockMenu.DockWindowName.trim()) {
                                    IsValidDockMenu_1 = true;
                                }
                            }
                            // Match the Index; with the current item
                            ValidDockMenuIndex_1 = Math.ceil(Math.abs(CurrentMenuIndex.valueOf()));
                        });
                        if ((IsValidDockMenu_1 !== null && IsValidDockMenu_1)) {
                        }
                        else {
                            throw new Error("Incorrect DockMenu Type, expected:\t".concat(new String(typeof (HTMLElement)).valueOf()));
                        }
                    }
                    catch (SizeDimensionSettingError) {
                        console.error("Whilelist Instancing a new FloatingDockMenu, the utility crashed.\n" + String(SizeDimensionSettingError).trim());
                    }
                }
            }
        };
        return FloatingDockCustomizer;
    }());
    /**
     *
     */
    var Instance = /** @class */ (function (_super) {
        __extends(Instance, _super);
        function Instance(FloatingDockWindowName, DockMoveable) {
            var _a, _b;
            var _this = _super.call(this) || this;
            // Customizer Constructor Variables
            _this.targetCustomizingDock = null;
            // Main Property Variables
            _this.newInstancedFloatingWindowDock = null;
            _this.moveable = false;
            // Miscellaneous Variables
            _this.dockName = undefined;
            // Object Inital Function(s) Runtime
            (_a = InstanceFloatingDock === null || InstanceFloatingDock === void 0 ? void 0 : InstanceFloatingDock()) !== null && _a !== void 0 ? _a : console.error("Uh oh! The nain utility failed to Initalize the new FloatingDockWindow!");
            (_b = _this.SetDefaultDockName) === null || _b === void 0 ? void 0 : _b.call(_this);
            function InstanceFloatingDock() {
                try {
                    if ((FloatingDockWindowName !== null && typeof (FloatingDockWindowName) === "string")) {
                    }
                    else {
                        throw new TypeError("\n                            (Floating Dock Window)'s name is NULL, or incorrect value type;\n                            \nEXPECTED:\t\n                            ".concat(new String(String)
                            .toLowerCase()
                            .valueOf()
                            .trim(), "\n                        "));
                    }
                }
                catch (DockWindowInstancingErr) {
                    if (DockWindowInstancingErr != null) {
                        var Stringified = new String(DockWindowInstancingErr).valueOf();
                        console.error(String(Stringified.toString()));
                    }
                }
            }
            return _this;
        }
        /**
         *
         * ---
         *
         * Sets the default name to `NewDockWindow` incase of **NO** *Custom Name*.
         *
         * ---
         *
         * @returns
         *
         */
        Instance.prototype.SetDefaultDockName = function (ReturnsName) {
            if (ReturnsName === undefined)
                ReturnsName = false;
            if (DefaultName !== null
                && typeof (DefaultName) === "string"
                && this.dockName !== DefaultName) {
                if (!ReturnsName) {
                    this.dockName = DefaultName !== null && DefaultName !== void 0 ? DefaultName : "NewUnknown";
                }
                else
                    return DefaultName !== null && DefaultName !== void 0 ? DefaultName : "NewUnknown";
            }
            else {
                console.error("\n", new Error());
            }
        };
        /**
         *
         * @param value
         * @param requestedType
         * @returns
         */
        Instance.prototype.valueTypeMatch = function (value, requestedType) {
            var typeMatches = false;
            var ValueType = typeof (value);
            var StringedRequestType = new String(requestedType).valueOf();
            function setTypeMatch(matchValue) {
                try {
                    if (typeof (matchValue) === "boolean") {
                        typeMatches = matchValue;
                    }
                    else {
                        throw new TypeError();
                    }
                }
                catch (SetValueErr) {
                    if (SetValueErr != null)
                        console.error();
                }
            }
            if (ValueType === StringedRequestType.trim()) {
                setTypeMatch(true);
            }
            else {
                setTypeMatch(false);
                console.warn('Value does not match requested, or does not exist.');
            }
            return typeMatches.valueOf();
        };
        Instance.prototype.getDockerSize = function (GetAxis) {
            var FetchedDockerSize = 0;
            if (this.newInstancedFloatingWindowDock !== null
                && this.newInstancedFloatingWindowDock instanceof InstanceFloatingDockWindow) {
                var DockerSizeRect = {
                    SizeConstraints: {
                        SizeY: this.newInstancedFloatingWindowDock.DockHeight.valueOf(),
                        SizeX: this.newInstancedFloatingWindowDock.DockWidth.valueOf(),
                    },
                    PositionConstraints: {
                        PosY: parseFloat(this.newInstancedFloatingWindowDock.PositionValues.y),
                        PosX: parseFloat(this.newInstancedFloatingWindowDock.PositionValues.x),
                    },
                };
            }
            return FetchedDockerSize !== null && FetchedDockerSize !== void 0 ? FetchedDockerSize : 0;
        };
        Instance.prototype.setDockName = function (RequestedDockName) {
            if (RequestedDockName != null) {
                if (this.valueTypeMatch(RequestedDockName, "string")) {
                    this.dockName = RequestedDockName !== undefined ? RequestedDockName : this.SetDefaultDockName(true);
                }
            }
        };
        Instance.prototype.getDockName = function () {
            var SequenceFetchedDockName = "";
            if (this.dockName != null && typeof (this.dockName) === "string") {
                SequenceFetchedDockName = this.dockName !== null ? this.dockName : null;
            }
            else {
                console.warn("Dock Name was null, or invalid to fetch.");
            }
            return SequenceFetchedDockName !== null && SequenceFetchedDockName !== void 0 ? SequenceFetchedDockName : null;
        };
        return Instance;
    }(FloatingDockCustomizer));
    FloatingDockWindowConstructor.Instance = Instance;
})(FloatingDockWindowConstructor || (exports.FloatingDockWindowConstructor = FloatingDockWindowConstructor = {}));
