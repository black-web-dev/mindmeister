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
var _a, _b, _c, _d;
import { Alignment } from "./alignment";
import { Elevation } from "./elevation";
import { Intent } from "./intent";
import { Position } from "./position";
var NS = "bp3";
if (typeof process !== "undefined") {
    NS = (_d = (_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.BLUEPRINT_NAMESPACE) !== null && _b !== void 0 ? _b : (_c = process.env) === null || _c === void 0 ? void 0 : _c.REACT_APP_BLUEPRINT_NAMESPACE) !== null && _d !== void 0 ? _d : NS;
}
// modifiers
export var ACTIVE = NS + "-active";
export var ALIGN_LEFT = NS + "-align-left";
export var ALIGN_RIGHT = NS + "-align-right";
export var DARK = NS + "-dark";
export var DISABLED = NS + "-disabled";
export var FILL = NS + "-fill";
export var FIXED = NS + "-fixed";
export var FIXED_TOP = NS + "-fixed-top";
export var INLINE = NS + "-inline";
export var INTERACTIVE = NS + "-interactive";
export var LARGE = NS + "-large";
export var LOADING = NS + "-loading";
export var MINIMAL = NS + "-minimal";
export var OUTLINED = NS + "-outlined";
export var MULTILINE = NS + "-multiline";
export var ROUND = NS + "-round";
export var SMALL = NS + "-small";
export var VERTICAL = NS + "-vertical";
export var POSITION_TOP = positionClass(Position.TOP);
export var POSITION_BOTTOM = positionClass(Position.BOTTOM);
export var POSITION_LEFT = positionClass(Position.LEFT);
export var POSITION_RIGHT = positionClass(Position.RIGHT);
export var ELEVATION_0 = elevationClass(Elevation.ZERO);
export var ELEVATION_1 = elevationClass(Elevation.ONE);
export var ELEVATION_2 = elevationClass(Elevation.TWO);
export var ELEVATION_3 = elevationClass(Elevation.THREE);
export var ELEVATION_4 = elevationClass(Elevation.FOUR);
export var INTENT_PRIMARY = intentClass(Intent.PRIMARY);
export var INTENT_SUCCESS = intentClass(Intent.SUCCESS);
export var INTENT_WARNING = intentClass(Intent.WARNING);
export var INTENT_DANGER = intentClass(Intent.DANGER);
export var FOCUS_DISABLED = NS + "-focus-disabled";
// text utilities
export var UI_TEXT = NS + "-ui-text";
export var RUNNING_TEXT = NS + "-running-text";
export var MONOSPACE_TEXT = NS + "-monospace-text";
export var TEXT_LARGE = NS + "-text-large";
export var TEXT_SMALL = NS + "-text-small";
export var TEXT_MUTED = NS + "-text-muted";
export var TEXT_DISABLED = NS + "-text-disabled";
export var TEXT_OVERFLOW_ELLIPSIS = NS + "-text-overflow-ellipsis";
// textual elements
export var BLOCKQUOTE = NS + "-blockquote";
export var CODE = NS + "-code";
export var CODE_BLOCK = NS + "-code-block";
export var HEADING = NS + "-heading";
export var LIST = NS + "-list";
export var LIST_UNSTYLED = NS + "-list-unstyled";
export var RTL = NS + "-rtl";
// layout utilities
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
 * @deprecated this is no longer needed for ContextMenu2, will be removed in v4.0
 */
export var FIXED_POSITIONING_CONTAINING_BLOCK = NS + "-fixed-positioning-containing-block";
// components
export var ALERT = NS + "-alert";
export var ALERT_BODY = ALERT + "-body";
export var ALERT_CONTENTS = ALERT + "-contents";
export var ALERT_FOOTER = ALERT + "-footer";
export var BREADCRUMB = NS + "-breadcrumb";
export var BREADCRUMB_CURRENT = BREADCRUMB + "-current";
export var BREADCRUMBS = BREADCRUMB + "s";
export var BREADCRUMBS_COLLAPSED = BREADCRUMB + "s-collapsed";
export var BUTTON = NS + "-button";
export var BUTTON_GROUP = BUTTON + "-group";
export var BUTTON_SPINNER = BUTTON + "-spinner";
export var BUTTON_TEXT = BUTTON + "-text";
export var CALLOUT = NS + "-callout";
export var CALLOUT_ICON = CALLOUT + "-icon";
export var CARD = NS + "-card";
export var COLLAPSE = NS + "-collapse";
export var COLLAPSE_BODY = COLLAPSE + "-body";
export var COLLAPSIBLE_LIST = NS + "-collapse-list";
export var CONTEXT_MENU = NS + "-context-menu";
export var CONTEXT_MENU_POPOVER_TARGET = CONTEXT_MENU + "-popover-target";
export var CONTROL_GROUP = NS + "-control-group";
export var DIALOG = NS + "-dialog";
export var DIALOG_CONTAINER = DIALOG + "-container";
export var DIALOG_BODY = DIALOG + "-body";
export var DIALOG_CLOSE_BUTTON = DIALOG + "-close-button";
export var DIALOG_FOOTER = DIALOG + "-footer";
export var DIALOG_FOOTER_ACTIONS = DIALOG + "-footer-actions";
export var DIALOG_HEADER = DIALOG + "-header";
export var DIALOG_STEP = NS + "-dialog-step";
export var DIALOG_STEP_CONTAINER = DIALOG_STEP + "-container";
export var DIALOG_STEP_TITLE = DIALOG_STEP + "-title";
export var DIALOG_STEP_ICON = DIALOG_STEP + "-icon";
export var DIALOG_STEP_VIEWED = DIALOG_STEP + "-viewed";
export var DIVIDER = NS + "-divider";
export var DRAWER = NS + "-drawer";
export var DRAWER_BODY = DRAWER + "-body";
export var DRAWER_FOOTER = DRAWER + "-footer";
export var DRAWER_HEADER = DRAWER + "-header";
export var EDITABLE_TEXT = NS + "-editable-text";
export var EDITABLE_TEXT_CONTENT = EDITABLE_TEXT + "-content";
export var EDITABLE_TEXT_EDITING = EDITABLE_TEXT + "-editing";
export var EDITABLE_TEXT_INPUT = EDITABLE_TEXT + "-input";
export var EDITABLE_TEXT_PLACEHOLDER = EDITABLE_TEXT + "-placeholder";
export var FLEX_EXPANDER = NS + "-flex-expander";
export var HTML_SELECT = NS + "-html-select";
/** @deprecated prefer `<HTMLSelect>` component */
export var SELECT = NS + "-select";
export var HTML_TABLE = NS + "-html-table";
export var HTML_TABLE_BORDERED = HTML_TABLE + "-bordered";
export var HTML_TABLE_CONDENSED = HTML_TABLE + "-condensed";
export var HTML_TABLE_STRIPED = HTML_TABLE + "-striped";
export var INPUT = NS + "-input";
export var INPUT_GHOST = INPUT + "-ghost";
export var INPUT_GROUP = INPUT + "-group";
export var INPUT_LEFT_CONTAINER = INPUT + "-left-container";
export var INPUT_ACTION = INPUT + "-action";
export var CONTROL = NS + "-control";
export var CONTROL_INDICATOR = CONTROL + "-indicator";
export var CONTROL_INDICATOR_CHILD = CONTROL_INDICATOR + "-child";
export var CHECKBOX = NS + "-checkbox";
export var RADIO = NS + "-radio";
export var SWITCH = NS + "-switch";
export var SWITCH_INNER_TEXT = SWITCH + "-inner-text";
export var FILE_INPUT = NS + "-file-input";
export var FILE_INPUT_HAS_SELECTION = NS + "-file-input-has-selection";
export var FILE_UPLOAD_INPUT = NS + "-file-upload-input";
export var FILE_UPLOAD_INPUT_CUSTOM_TEXT = NS + "-file-upload-input-custom-text";
export var KEY = NS + "-key";
export var KEY_COMBO = KEY + "-combo";
export var MODIFIER_KEY = NS + "-modifier-key";
export var HOTKEY = NS + "-hotkey";
export var HOTKEY_LABEL = HOTKEY + "-label";
export var HOTKEY_COLUMN = HOTKEY + "-column";
export var HOTKEY_DIALOG = HOTKEY + "-dialog";
export var LABEL = NS + "-label";
export var FORM_GROUP = NS + "-form-group";
export var FORM_CONTENT = NS + "-form-content";
export var FORM_HELPER_TEXT = NS + "-form-helper-text";
export var FORM_GROUP_SUB_LABEL = NS + "-form-group-sub-label";
export var MENU = NS + "-menu";
export var MENU_ITEM = MENU + "-item";
export var MENU_ITEM_LABEL = MENU_ITEM + "-label";
export var MENU_SUBMENU = NS + "-submenu";
export var MENU_DIVIDER = MENU + "-divider";
export var MENU_HEADER = MENU + "-header";
export var MULTISTEP_DIALOG = NS + "-multistep-dialog";
export var MULTISTEP_DIALOG_PANELS = MULTISTEP_DIALOG + "-panels";
export var MULTISTEP_DIALOG_LEFT_PANEL = MULTISTEP_DIALOG + "-left-panel";
export var MULTISTEP_DIALOG_RIGHT_PANEL = MULTISTEP_DIALOG + "-right-panel";
export var MULTISTEP_DIALOG_FOOTER = MULTISTEP_DIALOG + "-footer";
export var NAVBAR = NS + "-navbar";
export var NAVBAR_GROUP = NAVBAR + "-group";
export var NAVBAR_HEADING = NAVBAR + "-heading";
export var NAVBAR_DIVIDER = NAVBAR + "-divider";
export var NON_IDEAL_STATE = NS + "-non-ideal-state";
export var NON_IDEAL_STATE_VISUAL = NON_IDEAL_STATE + "-visual";
export var NUMERIC_INPUT = NS + "-numeric-input";
export var OVERFLOW_LIST = NS + "-overflow-list";
export var OVERFLOW_LIST_SPACER = OVERFLOW_LIST + "-spacer";
export var OVERLAY = NS + "-overlay";
export var OVERLAY_BACKDROP = OVERLAY + "-backdrop";
export var OVERLAY_CONTAINER = OVERLAY + "-container";
export var OVERLAY_CONTENT = OVERLAY + "-content";
export var OVERLAY_INLINE = OVERLAY + "-inline";
export var OVERLAY_OPEN = OVERLAY + "-open";
export var OVERLAY_SCROLL_CONTAINER = OVERLAY + "-scroll-container";
export var OVERLAY_START_FOCUS_TRAP = OVERLAY + "-start-focus-trap";
export var OVERLAY_END_FOCUS_TRAP = OVERLAY + "-end-focus-trap";
export var PANEL_STACK = NS + "-panel-stack";
export var PANEL_STACK_HEADER = PANEL_STACK + "-header";
export var PANEL_STACK_HEADER_BACK = PANEL_STACK + "-header-back";
export var PANEL_STACK_VIEW = PANEL_STACK + "-view";
export var PANEL_STACK2 = NS + "-panel-stack2";
export var PANEL_STACK2_HEADER = PANEL_STACK + "-header";
export var PANEL_STACK2_HEADER_BACK = PANEL_STACK + "-header-back";
export var PANEL_STACK2_VIEW = PANEL_STACK + "-view";
export var POPOVER = NS + "-popover";
export var POPOVER_ARROW = POPOVER + "-arrow";
export var POPOVER_BACKDROP = POPOVER + "-backdrop";
export var POPOVER_CAPTURING_DISMISS = POPOVER + "-capturing-dismiss";
export var POPOVER_CONTENT = POPOVER + "-content";
export var POPOVER_CONTENT_SIZING = POPOVER_CONTENT + "-sizing";
export var POPOVER_DISMISS = POPOVER + "-dismiss";
export var POPOVER_DISMISS_OVERRIDE = POPOVER_DISMISS + "-override";
export var POPOVER_OPEN = POPOVER + "-open";
export var POPOVER_TARGET = POPOVER + "-target";
export var POPOVER_WRAPPER = POPOVER + "-wrapper";
export var TRANSITION_CONTAINER = NS + "-transition-container";
export var PROGRESS_BAR = NS + "-progress-bar";
export var PROGRESS_METER = NS + "-progress-meter";
export var PROGRESS_NO_STRIPES = NS + "-no-stripes";
export var PROGRESS_NO_ANIMATION = NS + "-no-animation";
export var PORTAL = NS + "-portal";
export var SKELETON = NS + "-skeleton";
export var SLIDER = NS + "-slider";
export var SLIDER_AXIS = SLIDER + "-axis";
export var SLIDER_HANDLE = SLIDER + "-handle";
export var SLIDER_LABEL = SLIDER + "-label";
export var SLIDER_TRACK = SLIDER + "-track";
export var SLIDER_PROGRESS = SLIDER + "-progress";
export var START = NS + "-start";
export var END = NS + "-end";
export var SPINNER = NS + "-spinner";
export var SPINNER_ANIMATION = SPINNER + "-animation";
export var SPINNER_HEAD = SPINNER + "-head";
export var SPINNER_NO_SPIN = NS + "-no-spin";
export var SPINNER_TRACK = SPINNER + "-track";
export var TAB = NS + "-tab";
export var TAB_INDICATOR = TAB + "-indicator";
export var TAB_INDICATOR_WRAPPER = TAB_INDICATOR + "-wrapper";
export var TAB_LIST = TAB + "-list";
export var TAB_PANEL = TAB + "-panel";
export var TABS = TAB + "s";
export var TAG = NS + "-tag";
export var TAG_REMOVE = TAG + "-remove";
export var TAG_INPUT = NS + "-tag-input";
export var TAG_INPUT_ICON = TAG_INPUT + "-icon";
export var TAG_INPUT_VALUES = TAG_INPUT + "-values";
export var TOAST = NS + "-toast";
export var TOAST_CONTAINER = TOAST + "-container";
export var TOAST_MESSAGE = TOAST + "-message";
export var TOOLTIP = NS + "-tooltip";
export var TOOLTIP_INDICATOR = TOOLTIP + "-indicator";
export var TREE = NS + "-tree";
export var TREE_NODE = NS + "-tree-node";
export var TREE_NODE_CARET = TREE_NODE + "-caret";
export var TREE_NODE_CARET_CLOSED = TREE_NODE_CARET + "-closed";
export var TREE_NODE_CARET_NONE = TREE_NODE_CARET + "-none";
export var TREE_NODE_CARET_OPEN = TREE_NODE_CARET + "-open";
export var TREE_NODE_CONTENT = TREE_NODE + "-content";
export var TREE_NODE_EXPANDED = TREE_NODE + "-expanded";
export var TREE_NODE_ICON = TREE_NODE + "-icon";
export var TREE_NODE_LABEL = TREE_NODE + "-label";
export var TREE_NODE_LIST = TREE_NODE + "-list";
export var TREE_NODE_SECONDARY_LABEL = TREE_NODE + "-secondary-label";
export var TREE_NODE_SELECTED = TREE_NODE + "-selected";
export var TREE_ROOT = NS + "-tree-root";
export var ICON = NS + "-icon";
/** @deprecated use <Icon> components and iconName prop APIs instead */
export var ICON_STANDARD = ICON + "-standard";
/** @deprecated use <Icon> components and iconName prop APIs instead */
export var ICON_LARGE = ICON + "-large";
/**
 * Returns the namespace prefix for all Blueprint CSS classes.
 * Customize this namespace at build time with the `process.env.BLUEPRINT_NAMESPACE` environment variable.
 */
export function getClassNamespace() {
    return NS;
}
/** Return CSS class for alignment. */
export function alignmentClass(alignment) {
    switch (alignment) {
        case Alignment.LEFT:
            return ALIGN_LEFT;
        case Alignment.RIGHT:
            return ALIGN_RIGHT;
        default:
            return undefined;
    }
}
export function elevationClass(elevation) {
    if (elevation === undefined) {
        return undefined;
    }
    return NS + "-elevation-" + elevation;
}
export function iconClass(iconName) {
    if (iconName == null) {
        return undefined;
    }
    return iconName.indexOf(NS + "-icon-") === 0 ? iconName : NS + "-icon-" + iconName;
}
export function intentClass(intent) {
    if (intent == null || intent === Intent.NONE) {
        return undefined;
    }
    return NS + "-intent-" + intent.toLowerCase();
}
export function positionClass(position) {
    if (position === undefined) {
        return undefined;
    }
    return NS + "-position-" + position;
}
//# sourceMappingURL=classes.js.map