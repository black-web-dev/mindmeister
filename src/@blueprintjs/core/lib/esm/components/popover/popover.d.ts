import * as React from "react";
import { AbstractPureComponent2, IRef } from "../../common";
import { IPopoverSharedProps } from "./popoverSharedProps";
export declare const PopoverInteractionKind: {
    CLICK: "click";
    CLICK_TARGET_ONLY: "click-target";
    HOVER: "hover";
    HOVER_TARGET_ONLY: "hover-target";
};
export declare type PopoverInteractionKind = typeof PopoverInteractionKind[keyof typeof PopoverInteractionKind];
export interface IPopoverProps extends IPopoverSharedProps {
    /** HTML props for the backdrop element. Can be combined with `backdropClassName`. */
    backdropProps?: React.HTMLProps<HTMLDivElement>;
    /**
     * The content displayed inside the popover. This can instead be provided as
     * the _second_ element in `children` (first is `target`).
     */
    content?: string | JSX.Element;
    /**
     * Whether the wrapper and target should take up the full width of their container.
     * Note that supplying `true` for this prop will force  `targetTagName="div"` and
     * `wrapperTagName="div"`.
     */
    fill?: boolean;
    /**
     * The kind of interaction that triggers the display of the popover.
     *
     * @default PopoverInteractionKind.CLICK
     */
    interactionKind?: PopoverInteractionKind;
    /**
     * Enables an invisible overlay beneath the popover that captures clicks and
     * prevents interaction with the rest of the document until the popover is
     * closed. This prop is only available when `interactionKind` is
     * `PopoverInteractionKind.CLICK`. When popovers with backdrop are opened,
     * they become focused.
     *
     * @default false
     */
    hasBackdrop?: boolean;
    /**
     * Whether the application should return focus to the last active element in the
     * document after this popover closes.
     *
     * This is automatically set to `false` if this is a hover interaction popover.
     *
     * If you are attaching a popover _and_ a tooltip to the same target, you must take
     * care to either disable this prop for the popover _or_ disable the tooltip's
     * `openOnTargetFocus` prop.
     *
     * @default false
     */
    shouldReturnFocusOnClose?: boolean;
    /**
     * Ref supplied to the `Classes.POPOVER` element.
     */
    popoverRef?: IRef<HTMLElement>;
    /**
     * The target to which the popover content is attached. This can instead be
     * provided as the _first_ element in `children`.
     */
    target?: string | JSX.Element;
}
export interface IPopoverState {
    transformOrigin: string;
    isOpen: boolean;
    hasDarkParent: boolean;
}
/** @deprecated use { Popover2 } from "@blueprintjs/popover2" */
export declare class Popover extends AbstractPureComponent2<IPopoverProps, IPopoverState> {
    static displayName: string;
    private popoverRef;
    static defaultProps: IPopoverProps;
    /**
     * DOM element that contains the popover.
     * When `usePortal={true}`, this element will be portaled outside the usual DOM flow,
     * so this reference can be very useful for testing.
     */
    popoverElement: HTMLElement | null;
    /** DOM element that contains the target. */
    targetElement: HTMLElement | null;
    state: IPopoverState;
    private cancelOpenTimeout?;
    private isMouseInTargetOrPopover;
    private lostFocusOnSamePage;
    private popperScheduleUpdate?;
    private handlePopoverRef;
    private handleTargetRef;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IPopoverProps, prevState: IPopoverState): void;
    /**
     * Instance method to instruct the `Popover` to recompute its position.
     *
     * This method should only be used if you are updating the target in a way
     * that does not cause it to re-render, such as changing its _position_
     * without changing its _size_ (since `Popover` already repositions when it
     * detects a resize).
     */
    reposition: () => void | undefined;
    protected validateProps(props: IPopoverProps & {
        children?: React.ReactNode;
    }): void;
    private updateDarkParent;
    private renderPopover;
    private renderTarget;
    private understandChildren;
    private isControlled;
    private getIsOpen;
    private getPopperModifiers;
    private handleTargetFocus;
    private handleTargetBlur;
    private handleMouseEnter;
    private handleMouseLeave;
    private handlePopoverClick;
    private handleOverlayClose;
    private handleTargetClick;
    private setOpenState;
    private isArrowEnabled;
    private isElementInPopover;
    private isHoverInteractionKind;
    /** Popper modifier that updates React state (for style properties) based on latest data. */
    private updatePopoverState;
}
