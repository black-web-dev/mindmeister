import * as React from "react";
import { AbstractPureComponent2 } from "../../common";
import { IntentProps, Props } from "../../common/props";
export declare enum SpinnerSize {
    SMALL = 20,
    STANDARD = 50,
    LARGE = 100
}
export declare type SpinnerProps = ISpinnerProps;
/** @deprecated use SpinnerProps */
export interface ISpinnerProps extends Props, IntentProps {
    /**
     * Width and height of the spinner in pixels. The size cannot be less than
     * 10px.
     *
     * Constants are available for common sizes:
     * - `SpinnerSize.SMALL = 20px`
     * - `SpinnerSize.STANDARD = 50px`
     * - `SpinnerSize.LARGE = 100px`
     *
     * @default SpinnerSize.STANDARD = 50
     */
    size?: number;
    /**
     * HTML tag for the two wrapper elements. If rendering a `<Spinner>` inside
     * an `<svg>`, change this to an SVG element like `"g"`.
     *
     * @default "div"
     */
    tagName?: keyof JSX.IntrinsicElements;
    /**
     * A value between 0 and 1 (inclusive) representing how far along the operation is.
     * Values below 0 or above 1 will be interpreted as 0 or 1 respectively.
     * Omitting this prop will result in an "indeterminate" spinner where the head spins indefinitely.
     */
    value?: number;
}
export declare class Spinner extends AbstractPureComponent2<SpinnerProps> {
    static displayName: string;
    /** @deprecated use SpinnerSize.SMALL */
    static readonly SIZE_SMALL = SpinnerSize.SMALL;
    /** @deprecated use SpinnerSize.STANDARD */
    static readonly SIZE_STANDARD = SpinnerSize.STANDARD;
    /** @deprecated use SpinnerSize.LARGE */
    static readonly SIZE_LARGE = SpinnerSize.LARGE;
    componentDidUpdate(prevProps: SpinnerProps): void;
    render(): React.ReactElement<{
        className: string;
        role: string;
    }, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
    protected validateProps({ className, size }: SpinnerProps): void;
    /**
     * Resolve size to a pixel value.
     * Size can be set by className, props, default, or minimum constant.
     */
    private getSize;
    /** Compute viewbox such that stroked track sits exactly at edge of image frame. */
    private getViewBox;
}
