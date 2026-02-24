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
exports.FloatingDockWindowConstructor = void 0;
var FloatingDockWindowConstructor;
(function (FloatingDockWindowConstructor) {
    var CurrentDockMenus = new Array(0);
    /**
     *
     */
    var FloatingDockCustomizer = /** @class */ (function () {
        // Construct the Customizer for the `FloatingDockWindow`
        function FloatingDockCustomizer(WindowDock) {
            /**
             * @private
             */
            this.targetCustomizingDock = WindowDock || null;
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
    var Customizer = /** @class */ (function () {
        function Customizer() {
        }
        return Customizer;
    }());
    /**
     *
     */
    var InstanceFloatingDockMenu = /** @class */ (function (_super) {
        __extends(InstanceFloatingDockMenu, _super);
        function InstanceFloatingDockMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return InstanceFloatingDockMenu;
    }(Customizer));
    FloatingDockWindowConstructor.InstanceFloatingDockMenu = InstanceFloatingDockMenu;
})(FloatingDockWindowConstructor || (exports.FloatingDockWindowConstructor = FloatingDockWindowConstructor = {}));
