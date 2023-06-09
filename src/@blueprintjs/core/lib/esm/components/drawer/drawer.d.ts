import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { Position } from "../../common/position";
import { Props, MaybeElement } from "../../common/props";
import { IconName } from "../icon/icon";
import { IBackdropProps, OverlayableProps } from "../overlay/overlay";
export declare enum DrawerSize {
    SMALL = "360px",
    STANDARD = "50%",
    LARGE = "90%"
}
export declare type DrawerProps = IDrawerProps;
/** @deprecated use DrawerProps */
export interface IDrawerProps extends OverlayableProps, IBackdropProps, Props {
    /**
     * Name of a Blueprint UI icon (or an icon element) to render in the
     * drawer's header. Note that the header will only be rendered if `title` is
     * provided.
     */
    icon?: IconName | MaybeElement;
    /**
     * Whether to show the close button in the dialog's header.
     * Note that the header will only be rendered if `title` is provided.
     *
     * @default true
     */
    isCloseButtonShown?: boolean;
    /**
     * Toggles the visibility of the overlay and its children.
     * This prop is required because the component is controlled.
     */
    isOpen: boolean;
    /**
     * Position of a drawer. All angled positions will be casted into pure positions
     * (TOP, BOTTOM, LEFT or RIGHT).
     *
     * @default Position.RIGHT
     */
    position?: Position;
    /**
     * CSS size of the drawer. This sets `width` if `vertical={false}` (default)
     * and `height` otherwise.
     *
     * Constants are available for common sizes:
     * - `DrawerSize.SMALL = 360px`
     * - `DrawerSize.STANDARD = 50%`
     * - `DrawerSize.LARGE = 90%`
     *
     * @default DrawerSize.STANDARD = "50%"
     */
    size?: number | string;
    /**
     * CSS styles to apply to the dialog.
     *
     * @default {}
     */
    style?: React.CSSProperties;
    /**
     * Title of the dialog. If provided, an element with `Classes.DIALOG_HEADER`
     * will be rendered inside the dialog before any children elements.
     */
    title?: React.ReactNode;
    /**
     * Name of the transition for internal `CSSTransition`. Providing your own
     * name here will require defining new CSS transition properties.
     */
    transitionName?: string;
    /**
     * Whether the drawer should appear with vertical styling.
     * It will be ignored if `position` prop is set
     *
     * @default false
     * @deprecated use `position` instead
     */
    vertical?: boolean;
}
export declare class Drawer extends AbstractPureComponent2<DrawerProps> {
    static displayName: string;
    static defaultProps: DrawerProps;
    /** @deprecated use DrawerSize.SMALL */
    static readonly SIZE_SMALL = DrawerSize.SMALL;
    /** @deprecated use DrawerSize.STANDARD */
    static readonly SIZE_STANDARD = DrawerSize.STANDARD;
    /** @deprecated use DrawerSize.LARGE */
    static readonly SIZE_LARGE = DrawerSize.LARGE;
    render(): JSX.Element;
    protected validateProps(props: DrawerProps): void;
    private maybeRenderCloseButton;
    private maybeRenderHeader;
}
