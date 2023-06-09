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
import { __decorate } from "tslib";
import classNames from "classnames";
import * as React from "react";
import { polyfill } from "react-lifecycles-compat";
import { AbstractPureComponent2, Classes, Utils } from "../../common";
import { DISPLAYNAME_PREFIX } from "../../common/props";
import { Button } from "../button/buttons";
import { Dialog } from "./dialog";
import { DialogStep } from "./dialogStep";
const PADDING_BOTTOM = 0;
const MIN_WIDTH = 800;
let MultistepDialog = class MultistepDialog extends AbstractPureComponent2 {
    constructor() {
        super(...arguments);
        this.state = this.getInitialIndexFromProps(this.props);
        this.renderDialogStep = (step, index) => {
            const stepNumber = index + 1;
            const hasBeenViewed = this.state.lastViewedIndex >= index;
            const currentlySelected = this.state.selectedIndex === index;
            return (React.createElement("div", { className: classNames(Classes.DIALOG_STEP_CONTAINER, {
                    [Classes.ACTIVE]: currentlySelected,
                    [Classes.DIALOG_STEP_VIEWED]: hasBeenViewed,
                }), key: index },
                React.createElement("div", { className: Classes.DIALOG_STEP, onClick: this.handleClickDialogStep(index) },
                    React.createElement("div", { className: Classes.DIALOG_STEP_ICON }, stepNumber),
                    React.createElement("div", { className: Classes.DIALOG_STEP_TITLE }, step.props.title))));
        };
        this.handleClickDialogStep = (index) => {
            if (index > this.state.lastViewedIndex) {
                return;
            }
            return this.getDialogStepChangeHandler(index);
        };
    }
    render() {
        const { showCloseButtonInFooter, isCloseButtonShown, ...otherProps } = this.props;
        // Only one close button should be displayed. If the footer close button
        // is shown, we need to ensure the dialog close button is not displayed.
        const isCloseButtonVisible = !showCloseButtonInFooter && isCloseButtonShown;
        return (React.createElement(Dialog, Object.assign({ isCloseButtonShown: isCloseButtonVisible }, otherProps, { style: this.getDialogStyle() }),
            React.createElement("div", { className: Classes.MULTISTEP_DIALOG_PANELS },
                this.renderLeftPanel(),
                this.maybeRenderRightPanel())));
    }
    componentDidUpdate(prevProps) {
        if ((prevProps.resetOnClose || prevProps.initialStepIndex !== this.props.initialStepIndex) &&
            !prevProps.isOpen &&
            this.props.isOpen) {
            this.setState(this.getInitialIndexFromProps(this.props));
        }
    }
    getDialogStyle() {
        return { minWidth: MIN_WIDTH, paddingBottom: PADDING_BOTTOM, ...this.props.style };
    }
    renderLeftPanel() {
        return (React.createElement("div", { className: Classes.MULTISTEP_DIALOG_LEFT_PANEL }, this.getDialogStepChildren().filter(isDialogStepElement).map(this.renderDialogStep)));
    }
    maybeRenderRightPanel() {
        const steps = this.getDialogStepChildren();
        if (steps.length <= this.state.selectedIndex) {
            return null;
        }
        const { className, panel, panelClassName } = steps[this.state.selectedIndex].props;
        return (React.createElement("div", { className: classNames(Classes.MULTISTEP_DIALOG_RIGHT_PANEL, className, panelClassName) },
            panel,
            this.renderFooter()));
    }
    renderFooter() {
        const { closeButtonProps, isCloseButtonShown, showCloseButtonInFooter, onClose } = this.props;
        const isFooterCloseButtonVisible = showCloseButtonInFooter && isCloseButtonShown;
        const maybeCloseButton = !isFooterCloseButtonVisible ? undefined : (React.createElement(Button, Object.assign({ text: "Close", onClick: onClose }, closeButtonProps)));
        return (React.createElement("div", { className: Classes.MULTISTEP_DIALOG_FOOTER },
            maybeCloseButton,
            React.createElement("div", { className: Classes.DIALOG_FOOTER_ACTIONS }, this.renderButtons())));
    }
    renderButtons() {
        const { selectedIndex } = this.state;
        const steps = this.getDialogStepChildren();
        const buttons = [];
        if (this.state.selectedIndex > 0) {
            const backButtonProps = steps[selectedIndex].props.backButtonProps ?? this.props.backButtonProps;
            buttons.push(React.createElement(Button, Object.assign({ key: "back", onClick: this.getDialogStepChangeHandler(selectedIndex - 1), text: "Back" }, backButtonProps)));
        }
        if (selectedIndex === this.getDialogStepChildren().length - 1) {
            buttons.push(React.createElement(Button, Object.assign({ intent: "primary", key: "final", text: "Submit" }, this.props.finalButtonProps)));
        }
        else {
            const nextButtonProps = steps[selectedIndex].props.nextButtonProps ?? this.props.nextButtonProps;
            buttons.push(React.createElement(Button, Object.assign({ intent: "primary", key: "next", onClick: this.getDialogStepChangeHandler(selectedIndex + 1), text: "Next" }, nextButtonProps)));
        }
        return buttons;
    }
    getDialogStepChangeHandler(index) {
        return (event) => {
            if (this.props.onChange !== undefined) {
                const steps = this.getDialogStepChildren();
                const prevStepId = steps[this.state.selectedIndex].props.id;
                const newStepId = steps[index].props.id;
                this.props.onChange(newStepId, prevStepId, event);
            }
            this.setState({
                lastViewedIndex: Math.max(this.state.lastViewedIndex, index),
                selectedIndex: index,
            });
        };
    }
    /** Filters children to only `<DialogStep>`s */
    getDialogStepChildren(props = this.props) {
        return React.Children.toArray(props.children).filter(isDialogStepElement);
    }
    getInitialIndexFromProps(props) {
        if (props.initialStepIndex !== undefined) {
            const boundedInitialIndex = Math.max(0, Math.min(props.initialStepIndex, this.getDialogStepChildren(props).length - 1));
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
    }
};
MultistepDialog.displayName = `${DISPLAYNAME_PREFIX}.MultistepDialog`;
MultistepDialog.defaultProps = {
    canOutsideClickClose: true,
    isOpen: false,
    resetOnClose: true,
    showCloseButtonInFooter: false,
};
MultistepDialog = __decorate([
    polyfill
], MultistepDialog);
export { MultistepDialog };
function isDialogStepElement(child) {
    return Utils.isElementOfType(child, DialogStep);
}
//# sourceMappingURL=multistepDialog.js.map