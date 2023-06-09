import * as React from "react";
import { AbstractPureComponent2, Alignment, ActionProps, IElementRefProps, MaybeElement } from "../../common";
import { IconName } from "../icon/icon";
export declare type ButtonProps<E extends HTMLButtonElement | HTMLAnchorElement = HTMLButtonElement> = IButtonProps<E>;
/** @deprecated use ButtonProps */
export interface IButtonProps<E extends HTMLButtonElement | HTMLAnchorElement = HTMLButtonElement> extends ActionProps, IElementRefProps<E> {
    /**
     * If set to `true`, the button will display in an active state.
     * This is equivalent to setting `className={Classes.ACTIVE}`.
     *
     * @default false
     */
    active?: boolean;
    /**
     * Text alignment within button. By default, icons and text will be centered
     * within the button. Passing `"left"` or `"right"` will align the button
     * text to that side and push `icon` and `rightIcon` to either edge. Passing
     * `"center"` will center the text and icons together.
     *
     * @default Alignment.CENTER
     */
    alignText?: Alignment;
    /** Whether this button should expand to fill its container. */
    fill?: boolean;
    /** Whether this button should use large styles. */
    large?: boolean;
    /**
     * If set to `true`, the button will display a centered loading spinner instead of its contents, and the button will be disabled.
     * The width of the button is not affected by the value of this prop.
     *
     * @default false
     */
    loading?: boolean;
    /** Whether this button should use minimal styles. */
    minimal?: boolean;
    /** Whether this button should use outlined styles. */
    outlined?: boolean;
    /** Name of a Blueprint UI icon (or an icon element) to render after the text. */
    rightIcon?: IconName | MaybeElement;
    /** Whether this button should use small styles. */
    small?: boolean;
    /**
     * HTML `type` attribute of button. Accepted values are `"button"`, `"submit"`, and `"reset"`.
     * Note that this prop has no effect on `AnchorButton`; it only affects `Button`.
     *
     * @default "button"
     */
    type?: "submit" | "reset" | "button";
}
/** @deprecated use AnchorButtonProps */
export declare type IAnchorButtonProps = ButtonProps<HTMLAnchorElement>;
export declare type AnchorButtonProps = IAnchorButtonProps;
export interface IButtonState {
    isActive: boolean;
}
export declare abstract class AbstractButton<E extends HTMLButtonElement | HTMLAnchorElement> extends AbstractPureComponent2<ButtonProps<E> & (E extends HTMLButtonElement ? React.ButtonHTMLAttributes<HTMLButtonElement> : React.AnchorHTMLAttributes<HTMLAnchorElement>), IButtonState> {
    state: {
        isActive: boolean;
    };
    protected abstract buttonRef: HTMLElement | null;
    private currentKeyDown?;
    abstract render(): JSX.Element;
    protected getCommonButtonProps(): {
        className: string;
        disabled: (ButtonProps<E> & (E extends HTMLButtonElement ? React.ButtonHTMLAttributes<HTMLButtonElement> : React.AnchorHTMLAttributes<HTMLAnchorElement>))["loading"] | (ButtonProps<E> & (E extends HTMLButtonElement ? React.ButtonHTMLAttributes<HTMLButtonElement> : React.AnchorHTMLAttributes<HTMLAnchorElement>))["disabled"] | undefined;
        onBlur: (e: React.FocusEvent<any>) => void;
        onClick: (ButtonProps<E> & (E extends HTMLButtonElement ? React.ButtonHTMLAttributes<HTMLButtonElement> : React.AnchorHTMLAttributes<HTMLAnchorElement>))["onClick"] | undefined;
        onKeyDown: (e: React.KeyboardEvent<any>) => void;
        onKeyUp: (e: React.KeyboardEvent<any>) => void;
        tabIndex: number | (ButtonProps<E> & (E extends HTMLButtonElement ? React.ButtonHTMLAttributes<HTMLButtonElement> : React.AnchorHTMLAttributes<HTMLAnchorElement>))["tabIndex"] | undefined;
    };
    protected handleKeyDown: (e: React.KeyboardEvent<any>) => void;
    protected handleKeyUp: (e: React.KeyboardEvent<any>) => void;
    protected handleBlur: (e: React.FocusEvent<any>) => void;
    protected renderChildren(): React.ReactNode;
}
