import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { ButtonProps } from "../button/buttons";
import { DialogProps } from "./dialog";
import { DialogStepId, DialogStepButtonProps } from "./dialogStep";
export declare type MultistepDialogProps = IMultistepDialogProps;
/** @deprecated use MultistepDialogProps */
export interface IMultistepDialogProps extends DialogProps {
    /**
     * Props for the back button.
     */
    backButtonProps?: DialogStepButtonProps;
    /**
     * Props for the close button that appears in the footer when there is no
     * title.
     */
    closeButtonProps?: Partial<ButtonProps>;
    /**
     * Props for the button to display on the final step.
     */
    finalButtonProps?: Partial<ButtonProps>;
    /**
     * Props for the next button.
     */
    nextButtonProps?: DialogStepButtonProps;
    /**
     * A callback that is invoked when the user selects a different step by clicking on back, next, or a step itself.
     */
    onChange?(newDialogStepId: DialogStepId, prevDialogStepId: DialogStepId | undefined, event: React.MouseEvent<HTMLElement>): void;
    /**
     * Whether to reset the dialog state to its initial state on close.
     * By default, closing the dialog will reset its state.
     *
     * @default true
     */
    resetOnClose?: boolean;
    /**
     * Whether the footer close button is shown. The button will only appear if
     * `isCloseButtonShown` is `true`. The close button in the dialog title will
     * not be shown when this is `true`.
     *
     * @default false
     */
    showCloseButtonInFooter?: boolean;
    /**
     * A 0 indexed initial step to start off on, to start in the middle of the dialog, for example.
     * If the provided index exceeds the number of steps, it defaults to the last step.
     * If a negative index is provided, it defaults to the first step.
     */
    initialStepIndex?: number;
}
interface IMultistepDialogState {
    lastViewedIndex: number;
    selectedIndex: number;
}
export declare class MultistepDialog extends AbstractPureComponent2<MultistepDialogProps, IMultistepDialogState> {
    static displayName: string;
    static defaultProps: Partial<MultistepDialogProps>;
    state: IMultistepDialogState;
    render(): JSX.Element;
    componentDidUpdate(prevProps: MultistepDialogProps): void;
    private getDialogStyle;
    private renderLeftPanel;
    private renderDialogStep;
    private handleClickDialogStep;
    private maybeRenderRightPanel;
    private renderFooter;
    private renderButtons;
    private getDialogStepChangeHandler;
    /** Filters children to only `<DialogStep>`s */
    private getDialogStepChildren;
    private getInitialIndexFromProps;
}
export {};
