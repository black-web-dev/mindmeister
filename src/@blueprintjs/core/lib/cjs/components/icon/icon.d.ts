import * as React from "react";
import { IconName } from "@blueprintjs/icons";
import { AbstractPureComponent2, IntentProps, Props, MaybeElement } from "../../common";
export { IconName };
export declare enum IconSize {
    STANDARD = 16,
    LARGE = 20
}
export declare type IconProps = IIconProps;
/** @deprecated use IconProps */
export interface IIconProps extends IntentProps, Props {
    /** This component does not support custom children. Use the `icon` prop. */
    children?: never;
    /**
     * Color of icon. This is used as the `fill` attribute on the `<svg>` image
     * so it will override any CSS `color` property, including that set by
     * `intent`. If this prop is omitted, icon color is inherited from
     * surrounding text.
     */
    color?: string;
    /**
     * String for the `title` attribute on the rendered element, which will appear
     * on hover as a native browser tooltip.
     */
    htmlTitle?: string;
    /**
     * Name of a Blueprint UI icon, or an icon element, to render. This prop is
     * required because it determines the content of the component, but it can
     * be explicitly set to falsy values to render nothing.
     *
     * - If `null` or `undefined` or `false`, this component will render nothing.
     * - If given an `IconName` (a string literal union of all icon names), that
     *   icon will be rendered as an `<svg>` with `<path>` tags. Unknown strings
     *   will render a blank icon to occupy space.
     * - If given a `JSX.Element`, that element will be rendered and _all other
     *   props on this component are ignored._ This type is supported to
     *   simplify icon support in other Blueprint components. As a consumer, you
     *   should avoid using `<Icon icon={<Element />}` directly; simply render
     *   `<Element />` instead.
     */
    icon: IconName | MaybeElement;
    /**
     * @deprecated use size prop instead
     */
    iconSize?: number;
    /**
     * Size of the icon, in pixels. Blueprint contains 16px and 20px SVG icon
     * images, and chooses the appropriate resolution based on this prop.
     *
     * @default IconSize.STANDARD = 16
     */
    size?: number;
    /** CSS style properties. */
    style?: React.CSSProperties;
    /**
     * HTML tag to use for the rendered element.
     *
     * @default "span"
     */
    tagName?: keyof JSX.IntrinsicElements;
    /**
     * Description string. This string does not appear in normal browsers, but
     * it increases accessibility. For instance, screen readers will use it for
     * aural feedback.
     *
     * If this value is nullish, `false`, or an empty string, the component will assume
     * that the icon is decorative and `aria-hidden="true"` will be applied.
     *
     * @see https://www.w3.org/WAI/tutorials/images/decorative/
     */
    title?: string | false | null;
}
export declare class Icon extends AbstractPureComponent2<IconProps & Omit<React.HTMLAttributes<HTMLElement>, "title">> {
    static displayName: string;
    /** @deprecated use IconSize.STANDARD */
    static readonly SIZE_STANDARD = IconSize.STANDARD;
    /** @deprecated use IconSize.LARGE */
    static readonly SIZE_LARGE = IconSize.LARGE;
    render(): JSX.Element | null;
    /** Render `<path>` elements for the given icon name. Returns `null` if name is unknown. */
    private renderSvgPaths;
}
