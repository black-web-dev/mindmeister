"use strict";
/*
 * Copyright 2020 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultistepDialog = void 0;
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var react_lifecycles_compat_1 = require("react-lifecycles-compat");
var common_1 = require("../../common");
var props_1 = require("../../common/props");
var buttons_1 = require("../button/buttons");
var dialog_1 = require("./dialog");
var dialogStep_1 = require("./dialogStep");
var PADDING_BOTTOM = 0;
var MIN_WIDTH = 800;
var MultistepDialog = /** @class */ (function (_super) {
    tslib_1.__extends(MultistepDialog, _super);
    function MultistepDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = _this.getInitialIndexFromProps(_this.props);
        _this.renderDialogStep = function (step, index) {
            var _a;
            var stepNumber = index + 1;
            var hasBeenViewed = _this.state.lastViewedIndex >= index;
            var currentlySelected = _this.state.selectedIndex === index;
            return (React.createElement("div", { className: classnames_1.default(common_1.Classes.DIALOG_STEP_CONTAINER, (_a = {},
                    _a[common_1.Classes.ACTIVE] = currentlySelected,
                    _a[common_1.Classes.DIALOG_STEP_VIEWED] = hasBeenViewed,
                    _a)), key: index },
                React.createElement("div", { className: common_1.Classes.DIALOG_STEP, onClick: _this.handleClickDialogStep(index) },
                    React.createElement("div", { className: common_1.Classes.DIALOG_STEP_ICON }, stepNumber),
                    React.createElement("div", { className: common_1.Classes.DIALOG_STEP_TITLE }, step.props.title))));
        };
        _this.handleClickDialogStep = function (index) {
            if (index > _this.state.lastViewedIndex) {
                return;
            }
            return _this.getDialogStepChangeHandler(index);
        };
        return _this;
    }
    MultistepDialog.prototype.render = function () {
        var _a = this.props, showCloseButtonInFooter = _a.showCloseButtonInFooter, isCloseButtonShown = _a.isCloseButtonShown, otherProps = tslib_1.__rest(_a, ["showCloseButtonInFooter", "isCloseButtonShown"]);
        // Only one close button should be displayed. If the footer close button
        // is shown, we need to ensure the dialog close button is not displayed.
        var isCloseButtonVisible = !showCloseButtonInFooter && isCloseButtonShown;
        return (React.createElement(dialog_1.Dialog, tslib_1.__assign({ isCloseButtonShown: isCloseButtonVisible }, otherProps, { style: this.getDialogStyle() }),
            React.createElement("div", { className: common_1.Classes.MULTISTEP_DIALOG_PANELS },
                this.renderLeftPanel(),
                this.maybeRenderRightPanel())));
    };
    MultistepDialog.prototype.componentDidUpdate = function (prevProps) {
        if ((prevProps.resetOnClose || prevProps.initialStepIndex !== this.props.initialStepIndex) &&
            !prevProps.isOpen &&
            this.props.isOpen) {
            this.setState(this.getInitialIndexFromProps(this.props));
        }
    };
    MultistepDialog.prototype.getDialogStyle = function () {
        return tslib_1.__assign({ minWidth: MIN_WIDTH, paddingBottom: PADDING_BOTTOM }, this.props.style);
    };
    MultistepDialog.prototype.renderLeftPanel = function () {
        return (React.createElement("div", { className: common_1.Classes.MULTISTEP_DIALOG_LEFT_PANEL }, this.getDialogStepChildren().filter(isDialogStepElement).map(this.renderDialogStep)));
    };
    MultistepDialog.prototype.maybeRenderRightPanel = function () {
        var steps = this.getDialogStepChildren();
        if (steps.length <= this.state.selectedIndex) {
            return null;
        }
        var _a = steps[this.state.selectedIndex].props, className = _a.className, panel = _a.panel, panelClassName = _a.panelClassName;
        return (React.createElement("div", { className: classnames_1.default(common_1.Classes.MULTISTEP_DIALOG_RIGHT_PANEL, className, panelClassName) },
            panel,
            this.renderFooter()));
    };
    MultistepDialog.prototype.renderFooter = function () {
        var _a = this.props, closeButtonProps = _a.closeButtonProps, isCloseButtonShown = _a.isCloseButtonShown, showCloseButtonInFooter = _a.showCloseButtonInFooter, onClose = _a.onClose;
        var isFooterCloseButtonVisible = showCloseButtonInFooter && isCloseButtonShown;
        var maybeCloseButton = !isFooterCloseButtonVisible ? undefined : (React.createElement(buttons_1.Button, tslib_1.__assign({ text: "Close", onClick: onClose }, closeButtonProps)));
        return (React.createElement("div", { className: common_1.Classes.MULTISTEP_DIALOG_FOOTER },
            maybeCloseButton,
            React.createElement("div", { className: common_1.Classes.DIALOG_FOOTER_ACTIONS }, this.renderButtons())));
    };
    MultistepDialog.prototype.renderButtons = function () {
        var _a, _b;
        var selectedIndex = this.state.selectedIndex;
        var steps = this.getDialogStepChildren();
        var buttons = [];
        if (this.state.selectedIndex > 0) {
            var backButtonProps = (_a = steps[selectedIndex].props.backButtonProps) !== null && _a !== void 0 ? _a : this.props.backButtonProps;
            buttons.push(React.createElement(buttons_1.Button, tslib_1.__assign({ key: "back", onClick: this.getDialogStepChangeHandler(selectedIndex - 1), text: "Back" }, backButtonProps)));
        }
        if (selectedIndex === this.getDialogStepChildren().length - 1) {
            buttons.push(React.createElement(buttons_1.Button, tslib_1.__assign({ intent: "primary", key: "final", text: "Submit" }, this.props.finalButtonProps)));
        }
        else {
            var nextButtonProps = (_b = steps[selectedIndex].props.nextButtonProps) !== null && _b !== void 0 ? _b : this.props.nextButtonProps;
            buttons.push(React.createElement(buttons_1.Button, tslib_1.__assign({ intent: "primary", key: "next", onClick: this.getDialogStepChangeHandler(selectedIndex + 1), text: "Next" }, nextButtonProps)));
        }
        return buttons;
    };
    MultistepDialog.prototype.getDialogStepChangeHandler = function (index) {
        var _this = this;
        return function (event) {
            if (_this.props.onChange !== undefined) {
                var steps = _this.getDialogStepChildren();
                var prevStepId = steps[_this.state.selectedIndex].props.id;
                var newStepId = steps[index].props.id;
                _this.props.onChange(newStepId, prevStepId, event);
            }
            _this.setState({
                lastViewedIndex: Math.max(_this.state.lastViewedIndex, index),
                selectedIndex: index,
            });
        };
    };
    /** Filters children to only `<DialogStep>`s */
    MultistepDialog.prototype.getDialogStepChildren = function (props) {
        if (props === void 0) { props = this.props; }
        return React.Children.toArray(props.children).filter(isDialogStepElement);
    };
    MultistepDialog.prototype.getInitialIndexFromProps = function (props) {
        if (props.initialStepIndex !== undefined) {
            var boundedInitialIndex = Math.max(0, Math.min(props.initialStepIndex, this.getDialogStepChildren(props).length - 1));
            return {
                lastViewedIndex: boundedInitialIndex,
                selectedIndex: boundedInitialIndex,
            };
        }
        else {
            return {
                lastViewedIndex: 0,
                selectedIndex: 0,
            };
        }
    };
    MultistepDialog.displayName = props_1.DISPLAYNAME_PREFIX + ".MultistepDialog";
    MultistepDialog.defaultProps = {
        canOutsideClickClose: true,
        isOpen: false,
        resetOnClose: true,
        showCloseButtonInFooter: false,
    };
    MultistepDialog = tslib_1.__decorate([
        react_lifecycles_compat_1.polyfill
    ], MultistepDialog);
    return MultistepDialog;
}(common_1.AbstractPureComponent2));
exports.MultistepDialog = MultistepDialog;
function isDialogStepElement(child) {
    return common_1.Utils.isElementOfType(child, dialogStep_1.DialogStep);
}
//# sourceMappingURL=multistepDialog.js.map