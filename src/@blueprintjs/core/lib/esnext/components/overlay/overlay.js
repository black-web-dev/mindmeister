/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
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
var Overlay_1;
import { __decorate } from "tslib";
import classNames from "classnames";
import * as React from "react";
import { findDOMNode } from "react-dom";
import { polyfill } from "react-lifecycles-compat";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AbstractPureComponent2, Classes, Keys } from "../../common";
import { DISPLAYNAME_PREFIX } from "../../common/props";
import { isFunction } from "../../common/utils";
import { Portal } from "../portal/portal";
// HACKHACK: https://github.com/palantir/blueprint/issues/4342
// eslint-disable-next-line deprecation/deprecation
let Overlay = Overlay_1 = class Overlay extends AbstractPureComponent2 {
    constructor() {
        super(...arguments);
        this.isAutoFocusing = false;
        this.state = {
            hasEverOpened: this.props.isOpen,
        };
        // an HTMLElement that contains the backdrop and any children, to query for focus target
        this.containerElement = null;
        // An empty, keyboard-focusable div at the beginning of the Overlay content
        this.startFocusTrapElement = null;
        // An empty, keyboard-focusable div at the end of the Overlay content
        this.endFocusTrapElement = null;
        this.refHandlers = {
            // HACKHACK: see https://github.com/palantir/blueprint/issues/3979
            /* eslint-disable-next-line react/no-find-dom-node */
            container: (ref) => (this.containerElement = findDOMNode(ref)),
            endFocusTrap: (ref) => (this.endFocusTrapElement = ref),
            startFocusTrap: (ref) => (this.startFocusTrapElement = ref),
        };
        this.maybeRenderChild = (child) => {
            if (isFunction(child)) {
                child = child();
            }
            if (child == null) {
                return null;
            }
            // add a special class to each child element that will automatically set the appropriate
            // CSS position mode under the hood.
            const decoratedChild = typeof child === "object" ? (React.cloneElement(child, {
                className: classNames(child.props.className, Classes.OVERLAY_CONTENT),
            })) : (React.createElement("span", { className: Classes.OVERLAY_CONTENT }, child));
            const { onOpening, onOpened, onClosing, transitionDuration, transitionName } = this.props;
            // a breaking change in react-transition-group types requires us to be explicit about the type overload here,
            // using a technique similar to Select.ofType() in @blueprintjs/select
            const CSSTransitionImplicit = CSSTransition;
            return (React.createElement(CSSTransitionImplicit, { classNames: transitionName, onEntering: onOpening, onEntered: onOpened, onExiting: onClosing, onExited: this.handleTransitionExited, timeout: transitionDuration, addEndListener: this.handleTransitionAddEnd }, decoratedChild));
        };
        /**
         * Ensures repeatedly pressing shift+tab keeps focus inside the Overlay. Moves focus to
         * the `endFocusTrapElement` or the first keyboard-focusable element in the Overlay (excluding
         * the `startFocusTrapElement`), depending on whether the element losing focus is inside the
         * Overlay.
         */
        this.handleStartFocusTrapElementFocus = (e) => {
            if (!this.props.enforceFocus || this.isAutoFocusing) {
                return;
            }
            // e.relatedTarget will not be defined if this was a programmatic focus event, as is the
            // case when we call this.bringFocusInsideOverlay() after a user clicked on the backdrop.
            // Otherwise, we're handling a user interaction, and we should wrap around to the last
            // element in this transition group.
            if (e.relatedTarget != null &&
                this.containerElement.contains(e.relatedTarget) &&
                e.relatedTarget !== this.endFocusTrapElement) {
                this.endFocusTrapElement?.focus({ preventScroll: true });
            }
        };
        /**
         * Wrap around to the end of the dialog if `enforceFocus` is enabled.
         */
        this.handleStartFocusTrapElementKeyDown = (e) => {
            if (!this.props.enforceFocus) {
                return;
            }
            // HACKHACK: https://github.com/palantir/blueprint/issues/4165
            /* eslint-disable-next-line deprecation/deprecation */
            if (e.shiftKey && e.which === Keys.TAB) {
                const lastFocusableElement = this.getKeyboardFocusableElements().pop();
                if (lastFocusableElement != null) {
                    lastFocusableElement.focus();
                }
                else {
                    this.endFocusTrapElement?.focus({ preventScroll: true });
                }
            }
        };
        /**
         * Ensures repeatedly pressing tab keeps focus inside the Overlay. Moves focus to the
         * `startFocusTrapElement` or the last keyboard-focusable element in the Overlay (excluding the
         * `startFocusTrapElement`), depending on whether the element losing focus is inside the
         * Overlay.
         */
        this.handleEndFocusTrapElementFocus = (e) => {
            // No need for this.props.enforceFocus check here because this element is only rendered
            // when that prop is true.
            // During user interactions, e.relatedTarget will be defined, and we should wrap around to the
            // "start focus trap" element.
            // Otherwise, we're handling a programmatic focus event, which can only happen after a user
            // presses shift+tab from the first focusable element in the overlay.
            if (e.relatedTarget != null &&
                this.containerElement.contains(e.relatedTarget) &&
                e.relatedTarget !== this.startFocusTrapElement) {
                const firstFocusableElement = this.getKeyboardFocusableElements().shift();
                // ensure we don't re-focus an already active element by comparing against e.relatedTarget
                if (!this.isAutoFocusing && firstFocusableElement != null && firstFocusableElement !== e.relatedTarget) {
                    firstFocusableElement.focus();
                }
                else {
                    this.startFocusTrapElement?.focus({ preventScroll: true });
                }
            }
            else {
                const lastFocusableElement = this.getKeyboardFocusableElements().pop();
                if (lastFocusableElement != null) {
                    lastFocusableElement.focus();
                }
                else {
                    // Keeps focus within Overlay even if there are no keyboard-focusable children
                    this.startFocusTrapElement?.focus({ preventScroll: true });
                }
            }
        };
        this.handleTransitionExited = (node) => {
            if (this.props.shouldReturnFocusOnClose && this.lastActiveElementBeforeOpened instanceof HTMLElement) {
                this.lastActiveElementBeforeOpened.focus();
            }
            this.props.onClosed?.(node);
        };
        this.handleBackdropMouseDown = (e) => {
            const { backdropProps, canOutsideClickClose, enforceFocus, onClose } = this.props;
            if (canOutsideClickClose) {
                onClose?.(e);
            }
            if (enforceFocus) {
                this.bringFocusInsideOverlay();
            }
            backdropProps?.onMouseDown?.(e);
        };
        this.handleDocumentClick = (e) => {
            const { canOutsideClickClose, isOpen, onClose } = this.props;
            // get the actual target even in the Shadow DOM
            const eventTarget = (e.composed ? e.composedPath()[0] : e.target);
            const stackIndex = Overlay_1.openStack.indexOf(this);
            const isClickInThisOverlayOrDescendant = Overlay_1.openStack
                .slice(stackIndex)
                .some(({ containerElement: elem }) => {
                // `elem` is the container of backdrop & content, so clicking on that container
                // should not count as being "inside" the overlay.
                return elem && elem.contains(eventTarget) && !elem.isSameNode(eventTarget);
            });
            if (isOpen && !isClickInThisOverlayOrDescendant && canOutsideClickClose) {
                // casting to any because this is a native event
                onClose?.(e);
            }
        };
        /**
         * When multiple Overlays are open, this event handler is only active for the most recently
         * opened one to avoid Overlays competing with each other for focus.
         */
        this.handleDocumentFocus = (e) => {
            // get the actual target even in the Shadow DOM
            const eventTarget = e.composed ? e.composedPath()[0] : e.target;
            if (this.props.enforceFocus &&
                this.containerElement != null &&
                eventTarget instanceof Node &&
                !this.containerElement.contains(eventTarget)) {
                // prevent default focus behavior (sometimes auto-scrolls the page)
                e.preventDefault();
                e.stopImmediatePropagation();
                this.bringFocusInsideOverlay();
            }
        };
        this.handleKeyDown = (e) => {
            const { canEscapeKeyClose, onClose } = this.props;
            // HACKHACK: https://github.com/palantir/blueprint/issues/4165
            /* eslint-disable-next-line deprecation/deprecation */
            if (e.which === Keys.ESCAPE && canEscapeKeyClose) {
                onClose?.(e);
                // prevent browser-specific escape key behavior (Safari exits fullscreen)
                e.preventDefault();
            }
        };
        this.handleTransitionAddEnd = () => {
            // no-op
        };
    }
    static getDerivedStateFromProps({ isOpen: hasEverOpened }) {
        if (hasEverOpened) {
            return { hasEverOpened };
        }
        return null;
    }
    render() {
        // oh snap! no reason to render anything at all if we're being truly lazy
        if (this.props.lazy && !this.state.hasEverOpened) {
            return null;
        }
        const { autoFocus, children, className, enforceFocus, usePortal, isOpen } = this.props;
        // TransitionGroup types require single array of children; does not support nested arrays.
        // So we must collapse backdrop and children into one array, and every item must be wrapped in a
        // Transition element (no ReactText allowed).
        const childrenWithTransitions = isOpen ? React.Children.map(children, this.maybeRenderChild) ?? [] : [];
        const maybeBackdrop = this.maybeRenderBackdrop();
        if (maybeBackdrop !== null) {
            childrenWithTransitions.unshift(maybeBackdrop);
        }
        if (isOpen && (autoFocus || enforceFocus) && childrenWithTransitions.length > 0) {
            childrenWithTransitions.unshift(this.renderDummyElement("__start", {
                className: Classes.OVERLAY_START_FOCUS_TRAP,
                onFocus: this.handleStartFocusTrapElementFocus,
                onKeyDown: this.handleStartFocusTrapElementKeyDown,
                ref: this.refHandlers.startFocusTrap,
            }));
            if (enforceFocus) {
                childrenWithTransitions.push(this.renderDummyElement("__end", {
                    className: Classes.OVERLAY_END_FOCUS_TRAP,
                    onFocus: this.handleEndFocusTrapElementFocus,
                    ref: this.refHandlers.endFocusTrap,
                }));
            }
        }
        const containerClasses = classNames(Classes.OVERLAY, {
            [Classes.OVERLAY_OPEN]: isOpen,
            [Classes.OVERLAY_INLINE]: !usePortal,
        }, className);
        const transitionGroup = (React.createElement(TransitionGroup, { appear: true, "aria-live": "polite", className: containerClasses, component: "div", onKeyDown: this.handleKeyDown, ref: this.refHandlers.container }, childrenWithTransitions));
        if (usePortal) {
            return (React.createElement(Portal, { className: this.props.portalClassName, container: this.props.portalContainer }, transitionGroup));
        }
        else {
            return transitionGroup;
        }
    }
    componentDidMount() {
        if (this.props.isOpen) {
            this.overlayWillOpen();
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.isOpen && !this.props.isOpen) {
            this.overlayWillClose();
        }
        else if (!prevProps.isOpen && this.props.isOpen) {
            this.overlayWillOpen();
        }
    }
    componentWillUnmount() {
        this.overlayWillClose();
    }
    /**
     * @public for testing
     * @internal
     */
    bringFocusInsideOverlay() {
        // always delay focus manipulation to just before repaint to prevent scroll jumping
        return this.requestAnimationFrame(() => {
            // container ref may be undefined between component mounting and Portal rendering
            // activeElement may be undefined in some rare cases in IE
            if (this.containerElement == null || document.activeElement == null || !this.props.isOpen) {
                return;
            }
            const isFocusOutsideModal = !this.containerElement.contains(document.activeElement);
            if (isFocusOutsideModal) {
                this.startFocusTrapElement?.focus({ preventScroll: true });
                this.isAutoFocusing = false;
            }
        });
    }
    maybeRenderBackdrop() {
        const { backdropClassName, backdropProps, hasBackdrop, isOpen, transitionDuration, transitionName, } = this.props;
        if (hasBackdrop && isOpen) {
            return (React.createElement(CSSTransition, { classNames: transitionName, key: "__backdrop", timeout: transitionDuration, addEndListener: this.handleTransitionAddEnd },
                React.createElement("div", Object.assign({}, backdropProps, { className: classNames(Classes.OVERLAY_BACKDROP, backdropClassName, backdropProps?.className), onMouseDown: this.handleBackdropMouseDown }))));
        }
        else {
            return null;
        }
    }
    renderDummyElement(key, props) {
        const { transitionDuration, transitionName } = this.props;
        return (React.createElement(CSSTransition, { classNames: transitionName, key: key, addEndListener: this.handleTransitionAddEnd, timeout: transitionDuration, unmountOnExit: true },
            React.createElement("div", Object.assign({ tabIndex: 0 }, props))));
    }
    getKeyboardFocusableElements() {
        const focusableElements = this.containerElement !== null
            ? Array.from(
            // Order may not be correct if children elements use tabindex values > 0.
            // Selectors derived from this SO question:
            // https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus
            this.containerElement.querySelectorAll([
                'a[href]:not([tabindex="-1"])',
                'button:not([disabled]):not([tabindex="-1"])',
                'details:not([tabindex="-1"])',
                'input:not([disabled]):not([tabindex="-1"])',
                'select:not([disabled]):not([tabindex="-1"])',
                'textarea:not([disabled]):not([tabindex="-1"])',
                '[tabindex]:not([tabindex="-1"])',
            ].join(",")))
            : [];
        return focusableElements.filter(el => !el.classList.contains(Classes.OVERLAY_START_FOCUS_TRAP) &&
            !el.classList.contains(Classes.OVERLAY_END_FOCUS_TRAP));
    }
    overlayWillClose() {
        document.removeEventListener("focus", this.handleDocumentFocus, /* useCapture */ true);
        document.removeEventListener("mousedown", this.handleDocumentClick);
        const { openStack } = Overlay_1;
        const stackIndex = openStack.indexOf(this);
        if (stackIndex !== -1) {
            openStack.splice(stackIndex, 1);
            if (openStack.length > 0) {
                const lastOpenedOverlay = Overlay_1.getLastOpened();
                // Only bring focus back to last overlay if it had autoFocus _and_ enforceFocus enabled.
                // If `autoFocus={false}`, it's likely that the overlay never received focus in the first place,
                // so it would be surprising for us to send it there. See https://github.com/palantir/blueprint/issues/4921
                if (lastOpenedOverlay.props.autoFocus && lastOpenedOverlay.props.enforceFocus) {
                    lastOpenedOverlay.bringFocusInsideOverlay();
                    document.addEventListener("focus", lastOpenedOverlay.handleDocumentFocus, /* useCapture */ true);
                }
            }
            if (openStack.filter(o => o.props.usePortal && o.props.hasBackdrop).length === 0) {
                document.body.classList.remove(Classes.OVERLAY_OPEN);
            }
        }
    }
    overlayWillOpen() {
        const { getLastOpened, openStack } = Overlay_1;
        if (openStack.length > 0) {
            document.removeEventListener("focus", getLastOpened().handleDocumentFocus, /* useCapture */ true);
        }
        openStack.push(this);
        if (this.props.autoFocus) {
            this.isAutoFocusing = true;
            this.bringFocusInsideOverlay();
        }
        if (this.props.enforceFocus) {
            // Focus events do not bubble, but setting useCapture allows us to listen in and execute
            // our handler before all others
            document.addEventListener("focus", this.handleDocumentFocus, /* useCapture */ true);
        }
        if (this.props.canOutsideClickClose && !this.props.hasBackdrop) {
            document.addEventListener("mousedown", this.handleDocumentClick);
        }
        if (this.props.hasBackdrop && this.props.usePortal) {
            // add a class to the body to prevent scrolling of content below the overlay
            document.body.classList.add(Classes.OVERLAY_OPEN);
        }
        this.lastActiveElementBeforeOpened = document.activeElement;
    }
};
Overlay.displayName = `${DISPLAYNAME_PREFIX}.Overlay`;
Overlay.defaultProps = {
    autoFocus: true,
    backdropProps: {},
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false,
    lazy: true,
    shouldReturnFocusOnClose: true,
    transitionDuration: 300,
    transitionName: Classes.OVERLAY,
    usePortal: true,
};
Overlay.openStack = [];
Overlay.getLastOpened = () => Overlay_1.openStack[Overlay_1.openStack.length - 1];
Overlay = Overlay_1 = __decorate([
    polyfill
], Overlay);
export { Overlay };
//# sourceMappingURL=overlay.js.map