import { PureComponent, createElement, Component, Fragment, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import styled, { css, ThemeProvider } from 'styled-components';
import debug from 'debug';
import { Checkbox, Menu, MenuItem, Breadcrumbs, PopoverPosition, Breadcrumb, Tooltip, Hotkey, Hotkeys, HotkeysTarget, Dialog, Classes, ContextMenuTarget, PopoverInteractionKind, Popover, Position, Drawer, Tabs, Divider, Button, NumericInput, InputGroup, Tab, Alert } from '@blueprintjs/core';
import { FocusMode, OpType, DiagramLayoutType, ModelModifier, getRelationship, TopicRelationship, getAllSubTopicKeys, BlockType, TopicDirection, isThemeType, TopicVisualLevel, Controller } from '@blink-mind/core';
import '@blink-mind/icons';
import '@blueprintjs/core/lib/css/blueprint.css';
import SimpleTextEditorPlugin from '@blink-mind/plugin-simple-text-editor';
import memoizeOne from 'memoize-one';
import { Stack, List } from 'immutable';
import cx from 'classnames';
import { Select } from '@blueprintjs/select';
import { SketchPicker } from 'react-color';
import { merge, clone, isEqual } from 'lodash';
// import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, j = Object.getOwnPropertySymbols(s); i < j.length; i++) {
            if (e.indexOf(j[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, j[i]))
                t[j[i]] = s[j[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var BaseWidget = /** @class */ (function (_super) {
    __extends(BaseWidget, _super);
    function BaseWidget(props) {
        return _super.call(this, props) || this;
    }
    BaseWidget.prototype.operation = function (opType, arg) {
        this.props.controller.run('operation', __assign({ opType: opType }, arg));
    };
    BaseWidget.prototype.run = function (name, arg) {
        this.props.controller.run(name, arg);
    };
    Object.defineProperty(BaseWidget.prototype, "topic", {
        get: function () {
            return this.props.model.getTopic(this.props.topicKey);
        },
        enumerable: true,
        configurable: true
    });
    return BaseWidget;
}(PureComponent));

var templateObject_1, templateObject_2;
var log = debug('node:drag-scroll-widget');
var DragScrollView = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: scroll;\n"], ["\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: scroll;\n"])));
var DragScrollContent = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  width: max-content;\n"], ["\n  position: relative;\n  width: max-content;\n"])));
var DragScrollWidget = /** @class */ (function (_super) {
    __extends(DragScrollWidget, _super);
    function DragScrollWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.contentResizeCallback = function (entries, observer) {
            if (_this.oldContentRect) {
                var widgetStyle = {
                    width: _this.content.clientWidth + _this.viewBox.clientWidth * 2,
                    height: _this.content.clientHeight + _this.viewBox.clientHeight * 2
                };
                _this.bigView.style.width = widgetStyle.width + 'px';
                _this.bigView.style.height = widgetStyle.height + 'px';
            }
            _this.oldContentRect = entries[0].contentRect;
        };
        _this.contentResizeObserver = new ResizeObserver(_this.contentResizeCallback);
        _this.contentRef = function (ref) {
            if (ref) {
                _this.content = ref;
                _this.contentResizeObserver.observe(_this.content);
            }
        };
        _this.viewBoxRef = function (ref) {
            if (ref) {
                _this.viewBox = ref;
                if (!_this.props.enableMouseWheel) {
                    log('addEventListener onwheel');
                    _this.viewBox.addEventListener('wheel', function (e) {
                        log('onwheel');
                        (e.ctrlKey || e.altKey) && e.preventDefault();
                    }, {
                        passive: false
                    });
                }
                _this.setViewBoxScroll(_this.viewBox.clientWidth, _this.viewBox.clientHeight);
            }
        };
        _this.bigViewRef = function (ref) {
            if (ref) {
                _this.bigView = ref;
            }
        };
        _this.setWidgetStyle = function () {
            if (_this.content && _this.viewBox && _this.bigView) {
                _this.bigView.style.width =
                    (_this.content.clientWidth + _this.viewBox.clientWidth) * 2 + 'px';
                _this.bigView.style.height =
                    (_this.content.clientHeight + _this.viewBox.clientHeight) * 2 + 'px';
                _this.content.style.left = _this.viewBox.clientWidth + 'px';
                _this.content.style.top = _this.viewBox.clientHeight + 'px';
            }
        };
        _this.setViewBoxScroll = function (left, top) {
            log("setViewBoxScroll " + left + " " + top);
            if (_this.viewBox) {
                _this.viewBox.scrollLeft = left;
                _this.viewBox.scrollTop = top;
            }
        };
        _this.setViewBoxScrollDelta = function (deltaLeft, deltaTop) {
            log("setViewBoxScrollDelta " + deltaLeft + " " + deltaTop);
            if (_this.viewBox) {
                _this.viewBox.scrollLeft += deltaLeft;
                _this.viewBox.scrollTop += deltaTop;
            }
        };
        _this.onMouseDown = function (e) {
            // log('Drag Scroll onMouseDown');
            // log(e.nativeEvent.target);
            // mouseKey 表示鼠标按下那个键才可以进行拖动，左键或者右键
            // needKeyPressed 为了支持是否需要按下ctrl键，才可以进行拖动
            // canDragFunc是一个函数，它是为了支持使用者以传入函数的方式，这个函数的返回值表示当前的内容是否可以被拖拽而移动
            var _a = _this.props, mouseKey = _a.mouseKey, needKeyPressed = _a.needKeyPressed, canDragFunc = _a.canDragFunc;
            if (canDragFunc && !canDragFunc())
                return;
            if ((e.button === 0 && mouseKey === 'left') ||
                (e.button === 2 && mouseKey === 'right')) {
                if (needKeyPressed) {
                    if (!e.ctrlKey)
                        return;
                }
                _this._lastCoordX = _this.viewBox.scrollLeft + e.nativeEvent.clientX;
                _this._lastCoordY = _this.viewBox.scrollTop + e.nativeEvent.clientY;
                var ele = _this.viewBox;
                ele.addEventListener('mousemove', _this.onMouseMove);
                ele.addEventListener('mouseup', _this.onMouseUp);
            }
        };
        _this.onMouseUp = function (e) {
            var ele = _this.viewBox;
            ele.removeEventListener('mousemove', _this.onMouseMove);
            ele.removeEventListener('mouseup', _this.onMouseUp);
        };
        _this.onMouseMove = function (e) {
            _this.viewBox.scrollLeft = _this._lastCoordX - e.clientX;
            _this.viewBox.scrollTop = _this._lastCoordY - e.clientY;
            // log(`onMouseMove ${this.viewBox.scrollLeft} ${this.viewBox.scrollTop}`);
        };
        _this.handleContextMenu = function (e) {
            e.preventDefault();
        };
        _this.state = {
            widgetStyle: {
                width: '10000px',
                height: '10000px'
            }
        };
        return _this;
    }
    DragScrollWidget.prototype.componentDidMount = function () {
        this.setWidgetStyle();
        document.addEventListener('contextmenu', this.handleContextMenu);
    };
    DragScrollWidget.prototype.componentWillUnmount = function () {
        document.removeEventListener('contextmenu', this.handleContextMenu);
    };
    DragScrollWidget.prototype.setZoomFactor = function (zoomFactor) {
        this.bigView.style.transform = "scale(" + zoomFactor + ")";
        this.bigView.style.transformOrigin = '50% 50%';
    };
    DragScrollWidget.prototype.render = function () {
        var style = __assign({}, this.state.widgetStyle
            // zoom:this.props.zoomFactor,
            // transform: `scale(${this.props.zoomFactor})`,
            // transformOrigin: '50% 50%'
        );
        return (createElement(DragScrollView, { ref: this.viewBoxRef, onMouseDown: this.onMouseDown },
            createElement("div", { style: style, ref: this.bigViewRef },
                createElement(DragScrollContent, { ref: this.contentRef, style: this.state.contentStyle }, this.props.children(this.setViewBoxScroll, this.setViewBoxScrollDelta)))));
    };
    DragScrollWidget.defaultProps = {
        mouseKey: 'left',
        needKeyPressed: false
    };
    return DragScrollWidget;
}(Component));

var log$1 = debug('node:save-ref');
//TODO 可能会引起内存泄露,在删除一个topic时
var SaveRef = /** @class */ (function (_super) {
    __extends(SaveRef, _super);
    function SaveRef() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getRef = function (name) {
            log$1(_this);
            return _this[name];
        };
        _this.saveRef = function (name) {
            return function (node) {
                if (node) {
                    _this[name] = node;
                    _this.fireListener(name, node);
                }
            };
        };
        _this.deleteRef = function (name) {
            log$1('deleteRef:', name);
            delete _this[name];
        };
        _this.observers = new Map();
        _this.fireListener = function (name, ref) {
            var e_1, _a;
            if (_this.observers.has(name)) {
                var listeners = _this.observers.get(name);
                try {
                    for (var listeners_1 = __values(listeners), listeners_1_1 = listeners_1.next(); !listeners_1_1.done; listeners_1_1 = listeners_1.next()) {
                        var listener = listeners_1_1.value;
                        listener(name, ref);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (listeners_1_1 && !listeners_1_1.done && (_a = listeners_1.return)) _a.call(listeners_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        _this.registerRefListener = function (name, listener) {
            if (!_this.observers.has(name)) {
                _this.observers.set(name, [listener]);
            }
            else {
                _this.observers.get(name).push(listener);
            }
        };
        return _this;
    }
    SaveRef.prototype.render = function () {
        return this.props.children(this.saveRef, this.getRef, this.deleteRef, this.registerRefListener.bind(this));
    };
    return SaveRef;
}(Component));

var templateObject_1$1, templateObject_2$1, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
var Flex = styled.div(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: ", ";\n  align-items: ", ";\n  justify-content: ", ";\n"], ["\n  display: flex;\n  flex-direction: ",
    ";\n  align-items: ", ";\n  justify-content: ", ";\n"])), function (props) {
        return props.flexDirection ? props.flexDirection : 'row';
    }, function (props) { return props.alignItems; }, function (props) { return props.justifyContent; });
var Margin = styled.div(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n  margin: ", ";\n"], ["\n  margin: ", ";\n"])), function (props) { return props.margin; });
var ShowMenuIcon = styled.a(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-size: 20px !important;\n"], ["\n  font-size: 20px !important;\n"])));
var IconBg = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  padding: 5px;\n  cursor: pointer;\n"], ["\n  padding: 5px;\n  cursor: pointer;\n"])));
var Btn = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  cursor: pointer;\n  &:hover {\n    color: #1ea7fd;\n  }\n"], ["\n  cursor: pointer;\n  &:hover {\n    color: #1ea7fd;\n  }\n"])));
var StyledCheckbox = styled(Checkbox)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  margin-bottom: 0px !important;\n"], ["\n  margin-bottom: 0px !important;\n"])));
var CloseIcon = styled(Btn)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  position: absolute;\n  right: 5px;\n  top: 5px;\n  //padding: 5px;\n"], ["\n  position: absolute;\n  right: 5px;\n  top: 5px;\n  //padding: 5px;\n"])));
var Title = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  height: 16px;\n"], ["\n  height: 16px;\n"])));
var TopicBlockIcon = styled.span(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  margin: 0px 10px;\n  &:hover {\n    color: palevioletred;\n  }\n"], ["\n  margin: 0px 10px;\n  &:hover {\n    color: palevioletred;\n  }\n"])));
var ZIndex = styled.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  z-index: ", ";\n"], ["\n  z-index: ", ";\n"])), function (props) { return props.zIndex; });
var PanelTabRoot = styled.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  min-width: 360px;\n  max-height: 470px;\n  overflow: auto;\n"], ["\n  min-width: 360px;\n  max-height: 470px;\n  overflow: auto;\n"])));

var log$2 = debug('plugin:event');
function EventPlugin() {
    var eventListeners = {};
    return {
        handleTopicClick: function (props) {
            log$2('handleTopicClick');
            var controller = props.controller, model = props.model, topicKey = props.topicKey;
            log$2(model.zoomFactor);
            //TODO
            if (model.editingDescKey !== null)
                return;
            if (model.editingContentKey === topicKey)
                return;
            if (model.editingCommentKey === topicKey)
                return;
            if (model.focusKey === topicKey &&
                model.focusMode === FocusMode.EDITING_CONTENT)
                return;
            controller.run('operation', __assign(__assign({}, props), { opType: OpType.FOCUS_TOPIC, focusMode: FocusMode.NORMAL }));
        },
        handleTopicDoubleClick: function (props) {
            var controller = props.controller, model = props.model;
            if (model.editingDescKey !== null)
                return;
            if (model.editingCommentKey !== null)
                return;
            controller.run('operation', __assign(__assign({}, props), { opType: OpType.FOCUS_TOPIC, focusMode: FocusMode.EDITING_CONTENT }));
        },
        handleTopicContextMenu: function (props) {
            var controller = props.controller;
            controller.run('operation', __assign(__assign({}, props), { opType: OpType.FOCUS_TOPIC, focusMode: FocusMode.SHOW_POPUP }));
        },
        handleActiveModalClose: function (props) {
            var controller = props.controller;
            var activeModalProps = controller.run('getActiveModalProps', props);
            if (activeModalProps == null)
                return null;
            if (activeModalProps.name === 'edit-desc') {
                return function () {
                    controller.run('operation', __assign(__assign({}, props), { focusMode: FocusMode.NORMAL, opType: OpType.FOCUS_TOPIC }));
                };
            }
            if (activeModalProps.name === 'edit-comment') {
                return function () {
                    controller.run('operation', __assign(__assign({}, props), { focusMode: FocusMode.NORMAL, opType: OpType.FOCUS_TOPIC }));
                };
            }
        },
        addEventListener: function (props) {
            var key = props.key, listener = props.listener, once = props.once, controller = props.controller;
            if (!eventListeners[key])
                eventListeners[key] = [];
            if (once) {
                only.origin = listener;
                eventListeners[key].push(only);
            }
            else {
                eventListeners[key].push(listener);
            }
            function only() {
                listener();
                controller.run('removeEventListener', {
                    key: key,
                    listener: listener
                });
            }
        },
        removeEventListener: function (props) {
            var key = props.key, listener = props.listener;
            if (eventListeners[key]) {
                eventListeners[key] = eventListeners[key].filter(function (fn) {
                    return fn !== listener && fn.origin !== listener;
                });
            }
        },
        fireEvent: function (props) {
            var key = props.key;
            if (eventListeners[key]) {
                eventListeners[key].forEach(function (fn) { return fn(); });
            }
        }
    };
}

var IconName = {
    SHOW_MENU: 'show-menu',
    CLOSE: 'close',
    COLOR_PICKER: 'color-picker',
    NOTES: 'notes',
    PLUS: 'plus',
    MINUS: 'minus',
    COLLAPSE_ALL: 'collapse',
    EXPAND_ALL: 'expand',
    CENTER: 'center',
    TRASH: 'trash',
    SEARCH: 'search',
    THEME: 'theme',
    EXPORT: 'export',
    OPEN_FILE: 'openfile'
};
function iconClassName(name) {
    return "icon iconfont bm-" + name;
}
function Icon(iconName) {
    return createElement("span", { className: iconClassName(iconName) });
}

function contentRefKey(key) {
    return "content-" + key;
}
function contentEditorRefKey(key) {
    return "content-editor-" + key;
}
function descEditorRefKey(key) {
    return "desc-editor-" + key;
}
function commentEditorRefKey(key) {
    return "comment-editor-" + key;
}
function topicWidgetRefKey(key) {
    return "topic-widget-" + key;
}
function topicRefKey(key) {
    return "topic-" + key;
}
function linksRefKey(key) {
    return "links-" + key;
}
function linksSvgRefKey(key) {
    return "links-svg-" + key;
}
function collapseRefKey(key) {
    return "collapse-" + key;
}
function dropAreaRefKey(key, dir) {
    return "dropArea-" + dir + "-" + key;
}
var RefKey = {
    DIAGRAM_ROOT_KEY: 'DIAGRAM-ROOT',
    DRAG_SCROLL_WIDGET_KEY: 'DragScrollWidget',
    SVG_HIGHLIGHT_KEY: 'svg-highlight',
    FOCUS_HIGHLIGHT_KEY: 'focus-highlight',
    DROP_EFFECT_KEY: 'drop-effect'
};
var EventKey = {
    CENTER_ROOT_TOPIC: 'CENTER_ROOT_TOPIC'
};
var PropKey = {
    DIAGRAM_CUSTOMIZE_BASE_Z_INDEX: 'DIAGRAM_CUSTOMIZE_BASE_Z_INDEX',
    TOPIC_CONTEXT_MENU_ENABLED: 'TOPIC_CONTEXT_MENU_ENABLED',
    TOPIC_TITLE: 'TOPIC_TITLE'
};

var cancelEvent = function (e) {
    e.stopPropagation();
};

function browserDownloadFile(url, filename) {
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
}
function browserDownloadText(text, filename) {
    var url = "data:text/plain," + encodeURIComponent(text);
    browserDownloadFile(url, filename);
}
function browserOpenFile(accept) {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    return new Promise(function (resolve, reject) {
        input.addEventListener('change', function (evt) {
            //@ts-ignore
            var file = evt.target.files[0];
            var fr = new FileReader();
            fr.onload = function (evt) {
                var txt = evt.target.result;
                //@ts-ignore
                resolve(txt);
            };
            fr.onerror = function (evt) {
                reject(evt.target.error);
            };
            fr.readAsText(file);
        });
        input.click();
    });
}

function paddingCss(arg) {
    var _a = arg.top, top = _a === void 0 ? 0 : _a, _b = arg.right, right = _b === void 0 ? 0 : _b, _c = arg.bottom, bottom = _c === void 0 ? 0 : _c, _d = arg.left, left = _d === void 0 ? 0 : _d;
    return top + "px " + right + "px " + bottom + "px " + left + "px";
}

function getLinkKey(fromKey, toKey) {
    return "link-" + fromKey + "-" + toKey;
}
function centerY(rect) {
    return (rect.top + rect.bottom) / 2;
}
function centerX(rect) {
    return (rect.left + rect.right) / 2;
}
function centerPointX(p1, p2) {
    return (p1.x + p2.x) / 2;
}
function centerPointY(p1, p2) {
    return (p1.y + p2.y) / 2;
}
function center(rect) {
    return [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2];
}
function getRelativeRect(el, rel, scale) {
    if (scale === void 0) { scale = 1; }
    var rect = el.getBoundingClientRect();
    var relRect = rel.getBoundingClientRect();
    var relCenter = center(relRect);
    var elCenter = center(rect);
    elCenter[0] = (elCenter[0] - relCenter[0]) / scale;
    elCenter[1] = (elCenter[1] - relCenter[1]) / scale;
    var width = rect.width / scale;
    var height = rect.height / scale;
    return {
        left: elCenter[0] - width / 2,
        right: elCenter[0] + width / 2,
        top: elCenter[1] - height / 2,
        bottom: elCenter[1] + height / 2,
        width: width,
        height: height
    };
}
function getRelativeVector(el, rel) {
    var rect = el.getBoundingClientRect();
    var relRect = rel.getBoundingClientRect();
    var relCenter = center(relRect);
    var elCenter = center(rect);
    return [elCenter[0] - relCenter[0], elCenter[1] - relCenter[1]];
}

function GetValuePlugin() {
    return {
        getValue: function (props, next) {
            var propKey = props.propKey, controller = props.controller;
            switch (propKey) {
                case PropKey.DIAGRAM_CUSTOMIZE_BASE_Z_INDEX:
                    return 3;
                case PropKey.TOPIC_CONTEXT_MENU_ENABLED:
                    return controller.run('isOperationEnabled', props);
                case PropKey.TOPIC_TITLE:
                    return controller.run('getTopicTitle', props);
            }
            return next();
        }
    };
}

var HotKeyName = {
    ADD_CHILD: 'ADD_CHILD',
    ADD_SIBLING: 'ADD_SIBLING',
    DELETE_TOPIC: 'DELETE_TOPIC',
    EDIT_CONTENT: 'EDIT_CONTENT',
    EDIT_NOTES: 'EDIT_NOTES',
    EDIT_COMMENT: 'EDIT_COMMENT',
    SET_EDITOR_ROOT: 'SET_EDITOR_ROOT'
};
function op(opType, props) {
    var topicKey = props.topicKey, model = props.model, controller = props.controller;
    if (topicKey === undefined) {
        props = __assign(__assign({}, props), { topicKey: model.focusKey });
    }
    controller.run('operation', __assign(__assign({}, props), { opType: opType }));
}
function HotKeyPlugin() {
    return {
        customizeHotKeys: function (props) {
            var handleKeyDown = function (opType) {
                return function (e) {
                    op(opType, props);
                    e.preventDefault();
                };
            };
            var topicHotKeys = new Map([
                [
                    HotKeyName.ADD_CHILD,
                    {
                        label: 'add child',
                        combo: 'tab',
                        onKeyDown: handleKeyDown(OpType.ADD_CHILD)
                    }
                ],
                [
                    HotKeyName.ADD_SIBLING,
                    {
                        label: 'add sibling',
                        combo: 'enter',
                        onKeyDown: handleKeyDown(OpType.ADD_SIBLING)
                    }
                ],
                [
                    HotKeyName.DELETE_TOPIC,
                    {
                        label: 'delete topic',
                        combo: 'del',
                        onKeyDown: handleKeyDown(OpType.DELETE_TOPIC)
                    }
                ],
                [
                    HotKeyName.EDIT_CONTENT,
                    {
                        label: 'edit content',
                        combo: 'space',
                        onKeyDown: handleKeyDown(OpType.START_EDITING_CONTENT)
                    }
                ],
                [
                    HotKeyName.EDIT_NOTES,
                    {
                        label: 'edit notes',
                        combo: 'alt + d',
                        onKeyDown: handleKeyDown(OpType.START_EDITING_DESC)
                    }
                ],
                [
                    HotKeyName.EDIT_COMMENT,
                    {
                        label: 'edit comment',
                        combo: 'alt + c',
                        onKeyDown: handleKeyDown(OpType.START_EDITING_COMMENT)
                    }
                ],
                [
                    HotKeyName.SET_EDITOR_ROOT,
                    {
                        label: 'set editor root',
                        combo: 'alt + shift + f',
                        onKeyDown: handleKeyDown(OpType.SET_EDITOR_ROOT)
                    }
                ]
            ]);
            var globalHotKeys = new Map();
            return {
                topicHotKeys: topicHotKeys,
                globalHotKeys: globalHotKeys
            };
        }
    };
}

function LayoutPlugin() {
    var _zoomFactor = 1;
    return {
        getPartTopics: function (_a) {
            var layout = _a.layout, model = _a.model, topicKey = _a.topicKey;
            var topic = model.getTopic(topicKey);
            var subTopicCount = topic.subKeys.size;
            var topics = topic.subKeys.toArray();
            switch (layout) {
                case DiagramLayoutType.LEFT_TO_RIGHT:
                    return { R: topics };
                case DiagramLayoutType.RIGHT_TO_LEFT:
                    return { L: topics };
                case DiagramLayoutType.LEFT_AND_RIGHT:
                    return {
                        L: topics.slice(Math.ceil(subTopicCount / 2), subTopicCount),
                        R: topics.slice(0, Math.ceil(subTopicCount / 2))
                    };
                case DiagramLayoutType.TOP_TO_BOTTOM:
                    return {
                        B: topics
                    };
            }
        },
        createSubTopics: function (props) {
            var model = props.model, topicKey = props.topicKey, controller = props.controller, topics = props.topics, saveRef = props.saveRef;
            var topic = model.getTopic(topicKey);
            if (topics.size === 0 || topic.collapse)
                return null;
            var subTopics = [];
            topics.forEach(function (tKey) {
                var topicProps = __assign(__assign({}, props), { topicKey: tKey, key: tKey, ref: saveRef(topicWidgetRefKey(tKey)) });
                subTopics.push(controller.run('renderTopicWidget', topicProps));
            });
            return { subTopics: subTopics };
        },
        layout: function (props) {
            var getRef = props.getRef, model = props.model;
            var links = getRef(linksRefKey(model.editorRootTopicKey));
            var highlight = getRef(RefKey.FOCUS_HIGHLIGHT_KEY);
            var dropEffect = getRef(RefKey.DROP_EFFECT_KEY);
            links && links.layout();
            highlight && highlight.layout();
            dropEffect && dropEffect.layout();
            var editorRootTopic = model.getTopic(model.editorRootTopicKey);
            layoutTopic(editorRootTopic);
            function layoutTopic(topic) {
                var e_1, _a;
                if (topic.key !== model.editorRootTopicKey) {
                    var topicWidget = getRef(topicWidgetRefKey(topic.key));
                    topicWidget && topicWidget.layoutLinks();
                }
                if (!topic.collapse) {
                    try {
                        for (var _b = __values(topic.subKeys), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var subKey = _c.value;
                            layoutTopic(model.getTopic(subKey));
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
        },
        setLayoutDir: function (props) {
            var layoutDir = props.layoutDir, model = props.model, controller = props.controller;
            controller.change(ModelModifier.setLayoutDir({ model: model, layoutDir: layoutDir }));
        },
        getRelativeRect: function (props) {
            var element = props.element, controller = props.controller, getRef = props.getRef;
            var zoomFactor = controller.run('getZoomFactor', props);
            var bigView = getRef(RefKey.DRAG_SCROLL_WIDGET_KEY).bigView;
            return getRelativeRect(element, bigView, zoomFactor);
        },
        getRelativeRectFromViewPort: function (props) {
            var element = props.element, controller = props.controller, getRef = props.getRef;
            var zoomFactor = controller.run('getZoomFactor', props);
            var viewBox = getRef(RefKey.DRAG_SCROLL_WIDGET_KEY).viewBox;
            return getRelativeRect(element, viewBox, zoomFactor);
        },
        getRelativeVectorFromViewPort: function (props) {
            var element = props.element, getRef = props.getRef;
            var viewBox = getRef(RefKey.DRAG_SCROLL_WIDGET_KEY).viewBox;
            return getRelativeVector(element, viewBox);
        },
        addZoomFactorChangeEventListener: function (props) {
            var controller = props.controller;
            controller.run('addTempValueChangeListener', __assign({ key: 'ZoomFactor' }, props));
        },
        removeZoomFactorChangeEventListener: function (props) {
            var controller = props.controller;
            controller.run('removeTempValueChangeListener', __assign({ key: 'ZoomFactor' }, props));
        },
        setZoomFactor: function (props) {
            var controller = props.controller, zoomFactor = props.zoomFactor;
            return controller.run('setTempValue', {
                key: 'ZoomFactor',
                value: zoomFactor
            });
        },
        getZoomFactor: function (props) {
            var controller = props.controller;
            return (controller.run('getTempValue', { key: 'ZoomFactor' }) || _zoomFactor);
        },
        moveTopicToCenter: function (props) {
            var getRef = props.getRef, topicKey = props.topicKey, model = props.model;
            if (model.editorRootTopicKey !== topicKey &&
                getRelationship(model, topicKey, model.editorRootTopicKey) !==
                TopicRelationship.DESCENDANT) {
                throw new Error("moveTopicToCenter error: topicKey " + topicKey + " is not the DESCENDANT of editor root topic");
            }
            var topic = getRef(topicRefKey(topicKey));
            var dragScroll = getRef(RefKey.DRAG_SCROLL_WIDGET_KEY);
            var viewBox = dragScroll.viewBox;
            if (!topic || !viewBox) {
                throw new Error("moveTopicToCenter error: topic or viewBox is null");
            }
            var vector = getRelativeVector(topic, viewBox);
            //TODO
            dragScroll.setViewBoxScrollDelta(vector[0], vector[1]);
        },
        focusTopicAndMoveToCenter: function (props) {
            var controller = props.controller, topicKey = props.topicKey;
            controller.run('operation', __assign(__assign({}, props), {
                opArray: [
                    {
                        opType: OpType.FOCUS_TOPIC,
                        topicKey: topicKey,
                        focusMode: FocusMode.NORMAL
                    },
                    {
                        opType: OpType.EXPAND_TO,
                        topicKey: topicKey
                    }
                ], callback: function () {
                    controller.run('moveTopicToCenter', __assign(__assign({}, props), { topicKey: topicKey }));
                }
            }));
        }
    };
}

var log$3 = debug('plugin:operation');
function OperationPlugin() {
    var startEditingContent = function (_a) {
        var model = _a.model, topicKey = _a.topicKey;
        return ModelModifier.focusTopic({
            model: model,
            topicKey: topicKey,
            focusMode: FocusMode.EDITING_CONTENT
        });
    };
    var startEditingDesc = function (_a) {
        var model = _a.model, topicKey = _a.topicKey;
        var topic = model.getTopic(topicKey);
        var desc = topic.getBlock(BlockType.DESC);
        if (desc.block == null || desc.block.data == null) {
            model = ModelModifier.setBlockData({
                model: model,
                topicKey: topicKey,
                blockType: BlockType.DESC,
                data: ''
            });
        }
        model = ModelModifier.focusTopic({
            model: model,
            topicKey: topicKey,
            focusMode: FocusMode.EDITING_DESC
        });
        return model;
    };
    var startEditingComment = function (_a) {
        var model = _a.model, topicKey = _a.topicKey;
        var topic = model.getTopic(topicKey);
        var comment = topic.getBlock(BlockType.COMMENT);
        if (comment.block == null || comment.block.data == null) {
            model = ModelModifier.setBlockData({
                model: model,
                topicKey: topicKey,
                blockType: BlockType.COMMENT,
                data: ''
            });
        }
        model = ModelModifier.focusTopic({
            model: model,
            topicKey: topicKey,
            focusMode: FocusMode.EDITING_COMMENT
        });
        return model;
    };
    function dragAndDrop(props) {
        var srcKey = props.srcKey, dstKey = props.dstKey, dropDir = props.dropDir;
        var model = props.model;
        var srcTopic = model.getTopic(srcKey);
        var dstTopic = model.getTopic(dstKey);
        var srcParentKey = srcTopic.parentKey;
        var srcParentTopic = model.getTopic(srcParentKey);
        var srcParentSubKeys = srcParentTopic.subKeys;
        var srcIndex = srcParentSubKeys.indexOf(srcKey);
        srcParentSubKeys = srcParentSubKeys.delete(srcIndex);
        if (dropDir === 'in') {
            var dstSubKeys_1 = dstTopic.subKeys;
            dstSubKeys_1 = dstSubKeys_1.push(srcKey);
            model = model.withMutations(function (m) {
                m.setIn(['topics', srcParentKey, 'subKeys'], srcParentSubKeys)
                    .setIn(['topics', srcKey, 'parentKey'], dstKey)
                    .setIn(['topics', dstKey, 'subKeys'], dstSubKeys_1)
                    .setIn(['topics', dstKey, 'collapse'], false);
            });
        }
        else {
            var dstParentKey_1 = dstTopic.parentKey;
            var dstParentItem = model.getTopic(dstParentKey_1);
            var dstParentSubKeys_1 = dstParentItem.subKeys;
            var dstIndex = dstParentSubKeys_1.indexOf(dstKey);
            //src 和 dst 的父亲相同，这种情况要做特殊处理
            if (srcParentKey === dstParentKey_1) {
                var newDstParentSubKeys_1 = List();
                dstParentSubKeys_1.forEach(function (key) {
                    if (key !== srcKey) {
                        if (key === dstKey) {
                            if (dropDir === 'prev') {
                                newDstParentSubKeys_1 = newDstParentSubKeys_1
                                    .push(srcKey)
                                    .push(key);
                            }
                            else {
                                newDstParentSubKeys_1 = newDstParentSubKeys_1
                                    .push(key)
                                    .push(srcKey);
                            }
                        }
                        else {
                            newDstParentSubKeys_1 = newDstParentSubKeys_1.push(key);
                        }
                    }
                });
                model = model.withMutations(function (m) {
                    m.setIn(['topics', dstParentKey_1, 'subKeys'], newDstParentSubKeys_1);
                });
            }
            else {
                if (dropDir === 'prev') {
                    dstParentSubKeys_1 = dstParentSubKeys_1.insert(dstIndex, srcKey);
                }
                else if (dropDir === 'next') {
                    dstParentSubKeys_1 = dstParentSubKeys_1.insert(dstIndex + 1, srcKey);
                }
                model = model.withMutations(function (m) {
                    m.setIn(['topics', srcParentKey, 'subKeys'], srcParentSubKeys)
                        .setIn(['topics', srcKey, 'parentKey'], dstParentKey_1)
                        .setIn(['topics', dstParentKey_1, 'subKeys'], dstParentSubKeys_1)
                        .setIn(['topics', dstParentKey_1, 'collapse'], false);
                });
            }
        }
        return model;
    }
    var OpMap = new Map([
        [OpType.TOGGLE_COLLAPSE, ModelModifier.toggleCollapse],
        [OpType.COLLAPSE_ALL, ModelModifier.collapseAll],
        [OpType.EXPAND_ALL, ModelModifier.expandAll],
        [OpType.EXPAND_TO, ModelModifier.expandTo],
        [OpType.ADD_CHILD, ModelModifier.addChild],
        [OpType.ADD_EMOJI, ModelModifier.addEmoji],
        [OpType.ADD_SIBLING, ModelModifier.addSibling],
        [OpType.DELETE_TOPIC, ModelModifier.deleteTopic],
        [OpType.FOCUS_TOPIC, ModelModifier.focusTopic],
        [OpType.SET_FOCUS_MODE, ModelModifier.setFocusMode],
        [OpType.SET_STYLE, ModelModifier.setStyle],
        [OpType.SET_THEME, ModelModifier.setTheme],
        [OpType.SET_TOPIC_BLOCK, ModelModifier.setBlockData],
        [OpType.DELETE_TOPIC_BLOCK, ModelModifier.deleteBlock],
        [OpType.START_EDITING_CONTENT, startEditingContent],
        [OpType.START_EDITING_DESC, startEditingDesc],
        [OpType.START_EDITING_COMMENT, startEditingComment],
        [OpType.DRAG_AND_DROP, dragAndDrop],
        [OpType.SET_EDITOR_ROOT, ModelModifier.setEditorRootTopicKey]
    ]);
    var undoStack = Stack();
    var redoStack = Stack();
    var enabled = true;
    var whiteListOperation = new Set();
    return {
        isOperationEnabled: function (props) {
            return enabled;
        },
        enableOperation: function () {
            enabled = true;
        },
        disableOperation: function (_a) {
            var whiteList = _a.whiteList;
            enabled = false;
            if (whiteList)
                whiteListOperation = new Set(whiteList);
            else
                whiteListOperation.clear();
        },
        /** plugin can extend Operation Map
         * for example: A plugin can write a function
         * getOpMap(props,next) {
         *   let opMap = next();
         *   opMap.set("OpTypeName",opFunc);
         *   return opMap;
         * }
         * @param props
         */
        getOpMap: function (props) {
            return OpMap;
        },
        getAllowUndo: function (props) {
            var model = props.model, opType = props.opType;
            if (opType) {
                switch (opType) {
                    case OpType.FOCUS_TOPIC:
                    case OpType.START_EDITING_CONTENT:
                    case OpType.START_EDITING_DESC:
                        return false;
                }
            }
            switch (model.focusMode) {
                case 'EDITING_DESC':
                case 'EDITING_CONTENT':
                    return false;
            }
            return model.config.allowUndo;
        },
        getUndoRedoStack: function () {
            return {
                undoStack: undoStack,
                redoStack: redoStack
            };
        },
        setUndoStack: function (props) {
            log$3('setUndoStack', props.undoStack);
            undoStack = props.undoStack;
        },
        setRedoStack: function (props) {
            log$3('setRedoStack', props.redoStack);
            redoStack = props.redoStack;
        },
        canUndo: function (props) {
            var controller = props.controller;
            var undoStack = controller.run('getUndoRedoStack', props).undoStack;
            var allowUndo = controller.run('getAllowUndo', props);
            return undoStack.size > 0 && allowUndo;
        },
        canRedo: function (props) {
            var controller = props.controller;
            var redoStack = controller.run('getUndoRedoStack', props).redoStack;
            var allowUndo = controller.run('getAllowUndo', props);
            return redoStack.size > 0 && allowUndo;
        },
        undo: function (props) {
            var controller = props.controller, model = props.model;
            if (!controller.run('getAllowUndo', props)) {
                return;
            }
            var _a = controller.run('getUndoRedoStack', props), undoStack = _a.undoStack, redoStack = _a.redoStack;
            var newModel = undoStack.peek();
            if (!newModel)
                return;
            controller.run('setUndoStack', __assign(__assign({}, props), { undoStack: undoStack.shift() }));
            controller.run('setRedoStack', __assign(__assign({}, props), { redoStack: redoStack.push(model) }));
            log$3(newModel);
            controller.change(newModel);
        },
        redo: function (props) {
            var controller = props.controller, model = props.model;
            if (!controller.run('getAllowUndo', props)) {
                return;
            }
            var _a = controller.run('getUndoRedoStack', props), undoStack = _a.undoStack, redoStack = _a.redoStack;
            var newModel = redoStack.peek();
            if (!newModel)
                return;
            controller.run('setUndoStack', __assign(__assign({}, props), { undoStack: undoStack.push(model) }));
            controller.run('setRedoStack', __assign(__assign({}, props), { redoStack: redoStack.shift() }));
            controller.change(newModel);
        },
        add: function (props) {
            var topicKey = props.topicKey, model = props.model, controller = props.controller;
            if (topicKey === undefined) {
                props = __assign(__assign({}, props), { topicKey: model.focusKey });
            }
            controller.run('operation', __assign(__assign({}, props), { opType: OpType.ADD_CHILD }));
        },
        //TODO 有空重构这个函数
        operation: function (props) {
            var controller = props.controller, opType = props.opType, model = props.model, opArray = props.opArray, callback = props.callback;
            if (opArray != null && !Array.isArray(opArray)) {
                throw new Error('operation: the type of opArray must be array!');
            }
            if (opType != null && opArray != null) {
                throw new Error('operation: opType and opArray conflict!');
            }
            var isOperationEnabled = controller.run('isOperationEnabled', props);
            if (!isOperationEnabled) {
                // warning(
                //   true,
                //   `You have disabled operation,but you run operation ${props} now!`
                // );
                if (whiteListOperation.size === 0)
                    return;
                if (opArray != null) {
                    var opNotInWhiteList = opArray.filter(function (op) { return !whiteListOperation.has(op.opType); });
                    if (opNotInWhiteList && opNotInWhiteList.length > 0) {
                        return;
                    }
                }
                else if (!whiteListOperation.has(opType)) {
                    return;
                }
            }
            log$3('operation:', opType);
            log$3('operation:', model);
            log$3('operation:', props);
            var opMap = controller.run('getOpMap', props);
            controller.run('beforeOperation', props);
            if (controller.run('getAllowUndo', props)) {
                var undoStack_1 = controller.run('getUndoRedoStack', props).undoStack;
                controller.run('setUndoStack', __assign(__assign({}, props), { undoStack: undoStack_1.push(model) }));
            }
            var newModel;
            if (opArray != null) {
                newModel = opArray.reduce(function (acc, cur) {
                    var opType = cur.opType;
                    if (!opMap.has(opType))
                        throw new Error("opType:" + opType + " not exist!");
                    var opFunc = opMap.get(opType);
                    var opFuncProps = __assign(__assign({ controller: controller }, cur), { model: acc });
                    var res = controller.run('beforeOpFunction', opFuncProps);
                    res = opFunc(__assign(__assign({}, opFuncProps), { model: res }));
                    res = controller.run('afterOpFunction', __assign(__assign({}, opFuncProps), { model: res }));
                    return res;
                }, model);
            }
            else {
                if (!opMap.has(opType))
                    throw new Error("opType:" + opType + " not exist!");
                var opFunc = opMap.get(opType);
                newModel = controller.run('beforeOpFunction', props);
                newModel = opFunc(__assign(__assign({}, props), { model: newModel }));
                newModel = controller.run('afterOpFunction', __assign(__assign({}, props), { model: newModel }));
            }
            log$3('newModel:', newModel);
            controller.change(newModel, callback);
            controller.run('afterOperation', props);
        },
        deleteRefKey: function (props) {
            var e_1, _a;
            var model = props.model, topicKey = props.topicKey, deleteRef = props.deleteRef;
            var allSubKeys = getAllSubTopicKeys(model, topicKey);
            allSubKeys.push(topicKey);
            try {
                for (var allSubKeys_1 = __values(allSubKeys), allSubKeys_1_1 = allSubKeys_1.next(); !allSubKeys_1_1.done; allSubKeys_1_1 = allSubKeys_1.next()) {
                    var key = allSubKeys_1_1.value;
                    deleteRef(linksRefKey(key));
                    deleteRef(linksSvgRefKey(key));
                    deleteRef(contentRefKey(key));
                    deleteRef(contentEditorRefKey(key));
                    deleteRef(descEditorRefKey(key));
                    deleteRef(commentEditorRefKey(key));
                    deleteRef(topicWidgetRefKey(key));
                    deleteRef(topicRefKey(key));
                    deleteRef(collapseRefKey(key));
                    deleteRef(dropAreaRefKey(key, 'next'));
                    deleteRef(dropAreaRefKey(key, 'prev'));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (allSubKeys_1_1 && !allSubKeys_1_1.done && (_a = allSubKeys_1.return)) _a.call(allSubKeys_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        },
        // 在整个Operation执行之前被调用
        beforeOperation: function (props) { },
        afterOperation: function (props) { },
        // 在单个OpFunction执行之前被调用
        beforeOpFunction: function (props) {
            var controller = props.controller, opType = props.opType, model = props.model, topicKey = props.topicKey;
            if (opType === OpType.DELETE_TOPIC &&
                topicKey !== model.editorRootTopicKey) {
                controller.run('deleteRefKey', props);
            }
            return model;
        },
        afterOpFunction: function (props) {
            return props.model;
        }
    };
}

var TopicContextMenu = /** @class */ (function (_super) {
    __extends(TopicContextMenu, _super);
    function TopicContextMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopicContextMenu.prototype.render = function () {
        var controller = this.props.controller;
        return (createElement(Menu, null, controller.run('customizeTopicContextMenu', this.props)));
    };
    return TopicContextMenu;
}(BaseWidget));

var items = [
    {
        icon: 'edit',
        label: 'edit',
        shortcut: 'Space',
        rootCanUse: true,
        opType: OpType.START_EDITING_CONTENT
    },
    {
        icon: 'add-sibling',
        label: 'add sibling',
        shortcut: 'Enter',
        opType: OpType.ADD_SIBLING
    },
    {
        icon: 'add-child',
        label: 'add child',
        shortcut: 'Tab',
        rootCanUse: true,
        opType: OpType.ADD_CHILD
    },
    {
        icon: 'notes',
        label: 'edit notes',
        shortcut: 'Alt + D',
        rootCanUse: true,
        opType: OpType.START_EDITING_DESC
    },
    {
        icon: 'notes',
        label: 'edit comments',
        shortcut: 'Alt + C',
        rootCanUse: true,
        opType: OpType.START_EDITING_COMMENT
    },
    {
        icon: 'delete-node',
        label: 'delete node',
        shortcut: 'Del',
        opType: OpType.DELETE_TOPIC
    },
    {
        icon: 'root',
        label: 'set as editor root',
        shortcut: 'Alt + Shift + F',
        opType: OpType.SET_EDITOR_ROOT
    }
];
function ContextMenuPlugin() {
    return {
        renderTopicContextMenu: function (props) {
            return createElement(TopicContextMenu, __assign({}, props));
        },
        customizeTopicContextMenu: function (props) {
            var topicKey = props.topicKey, model = props.model, controller = props.controller;
            var isRoot = topicKey === model.editorRootTopicKey;
            function onClickItem(item) {
                return function (e) {
                    item.opType &&
                        controller.run('operation', __assign(__assign({}, props), { opType: item.opType }));
                };
            }
            return items.map(function (item) {
                return isRoot && !item.rootCanUse ? null : (createElement(MenuItem, { key: item.label, icon: Icon(item.icon), text: item.label, labelElement: createElement("kbd", null, item.shortcut), onClick: onClickItem(item) }));
            });
        }
    };
}

var templateObject_1$2;
var log$4 = debug('node:topic-drop-effect');
var DropEffectSvg = styled.svg(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 2;\n  pointer-events: none;\n"], ["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 2;\n  pointer-events: none;\n"])));
var TopicDropEffect = /** @class */ (function (_super) {
    __extends(TopicDropEffect, _super);
    function TopicDropEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            content: null
        };
        return _this;
    }
    TopicDropEffect.prototype.layout = function () {
        var props = this.props;
        var _a = this.props, getRef = _a.getRef, model = _a.model, zoomFactor = _a.zoomFactor, controller = _a.controller;
        var targetProps = controller.run('getDragTargetProps', props);
        var key = targetProps.key, dropDir = targetProps.dropDir;
        log$4('layout', dropDir);
        if (key === null) {
            this.setState({
                content: null
            });
            return;
        }
        var refKey;
        if (dropDir === 'in') {
            refKey = contentRefKey(key);
        }
        else {
            refKey = dropAreaRefKey(key, dropDir);
        }
        var content = getRef(refKey);
        var svg = getRef('svg-drop-effect');
        var bigView = getRef(RefKey.DRAG_SCROLL_WIDGET_KEY).bigView;
        var contentRect = getRelativeRect(content, bigView, zoomFactor);
        var svgRect = getRelativeRect(svg, bigView, zoomFactor);
        var padding = 3;
        var x = contentRect.left - svgRect.left - padding;
        var y = contentRect.top - svgRect.top - padding;
        var width = contentRect.width + 2 * padding;
        var height = contentRect.height + 2 * padding;
        this.setState({
            content: (createElement("g", null,
                createElement("rect", { x: x, y: y, width: width, height: height, fill: "none", stroke: model.config.theme.highlightColor, strokeDasharray: "5,5", strokeWidth: 2 })))
        });
    };
    TopicDropEffect.prototype.render = function () {
        var saveRef = this.props.saveRef;
        return (createElement(DropEffectSvg, { ref: saveRef('svg-drop-effect') }, this.state.content));
    };
    return TopicDropEffect;
}(BaseWidget));

var templateObject_1$3;
var log$5 = debug('plugin:drag-and-drop');
var DropArea = styled.div(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  height: ", ";\n  width: 100%;\n  margin: 5px 0px;\n"], ["\n  height: ", ";\n  width: 100%;\n  margin: 5px 0px;\n"])), function (props) { return props.height + "px"; });
function DragAndDropPlugin() {
    var dragTargetKey = null;
    var dragTargetDir = null;
    return {
        renderTopicDropArea: function (props) {
            var topicKey = props.topicKey, dropDir = props.dropDir, saveRef = props.saveRef, controller = props.controller, model = props.model;
            var onDragEnter = function (ev) {
                log$5('onDragEnter', topicKey, dropDir);
                controller.run('handleTopicDragEnter', __assign(__assign({}, props), { ev: ev, dropDir: dropDir }));
            };
            var onDragLeave = function (ev) {
                log$5('onDragLeave', topicKey, dropDir);
                controller.run('handleTopicDragLeave', __assign(__assign({}, props), { ev: ev, dropDir: dropDir }));
            };
            var onDragOver = function (ev) {
                ev.preventDefault();
            };
            var onDrop = function (ev) {
                log$5('onDrop', topicKey, dropDir);
                controller.run('handleTopicDrop', __assign(__assign({}, props), { ev: ev, dropDir: dropDir }));
            };
            var eventHandlers = {
                onDragEnter: onDragEnter,
                onDragLeave: onDragLeave,
                onDragOver: onDragOver,
                onDrop: onDrop
            };
            return (createElement(DropArea, __assign({ height: model.config.theme.marginV / 2, ref: saveRef(dropAreaRefKey(topicKey, dropDir)) }, eventHandlers)));
        },
        renderDragAndDropEffect: function (props) {
            log$5('renderDragAndDropEffect');
            var saveRef = props.saveRef;
            return (createElement(TopicDropEffect, __assign({ ref: saveRef(RefKey.DROP_EFFECT_KEY) }, props)));
        },
        getDragTargetProps: function (props) {
            return {
                key: dragTargetKey,
                dropDir: dragTargetDir
            };
        },
        handleTopicDragStart: function (props) {
            var controller = props.controller, ev = props.ev;
            ev.stopPropagation();
            controller.run('operation', __assign(__assign({}, props), { opType: OpType.FOCUS_TOPIC, focusMode: FocusMode.DRAGGING }));
        },
        canDrop: function (props) {
            var srcKey = props.srcKey, dstKey = props.dstKey, model = props.model, dropDir = props.dropDir;
            if (srcKey === model.editorRootTopicKey ||
                srcKey === dstKey ||
                getRelationship(model, srcKey, dstKey) === TopicRelationship.ANCESTOR)
                return false;
            if (dstKey === model.editorRootTopicKey && dropDir !== 'in')
                return false;
            var srcTopic = model.getTopic(srcKey);
            if (srcTopic.parentKey === dstKey && dropDir === 'in')
                return false;
            return true;
        },
        handleTopicDragEnter: function (props) {
            var dropDir = props.dropDir, topicKey = props.topicKey, controller = props.controller, model = props.model;
            log$5('handleTopicDragEnter:', topicKey, dropDir);
            var canDrop = controller.run('canDrop', __assign(__assign({}, props), { srcKey: model.focusKey, dstKey: topicKey }));
            if (canDrop) {
                dragTargetKey = topicKey;
                dragTargetDir = dropDir;
                controller.change(model);
            }
        },
        handleTopicDragLeave: function (props) {
            var controller = props.controller, model = props.model, topicKey = props.topicKey, dropDir = props.dropDir, getRef = props.getRef, ev = props.ev;
            var relatedTarget = ev.nativeEvent.relatedTarget;
            log$5('handleTopicDragLeave:', topicKey, dropDir);
            var content = getRef(contentRefKey(topicKey));
            if (content == relatedTarget || content.contains(relatedTarget)) {
                return;
            }
            dragTargetKey = null;
            dragTargetDir = null;
            controller.change(model);
        },
        handleTopicDrop: function (props) {
            log$5('handleTopicDrop');
            var controller = props.controller, topicKey = props.topicKey, model = props.model;
            props = __assign(__assign({}, props), { srcKey: model.focusKey, dstKey: topicKey });
            dragTargetKey = null;
            dragTargetDir = null;
            if (controller.run('canDrop', props)) {
                controller.run('operation', __assign(__assign({}, props), { opType: OpType.DRAG_AND_DROP }));
            }
        }
    };
}

var templateObject_1$4, templateObject_2$2, templateObject_3$1;
var EditorRootBreadcrumbsRoot = styled(ZIndex)(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n  position: absolute;\n  width: 20%;\n  padding: 0 5px;\n  background: white;\n  left: 30px;\n  top: 20px;\n  border-radius: 2px;\n"], ["\n  position: absolute;\n  width: 20%;\n  padding: 0 5px;\n  background: white;\n  left: 30px;\n  top: 20px;\n  border-radius: 2px;\n"])));
var TooltipContent = styled.div(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n  max-width: 600px;\n"], ["\n  max-width: 600px;\n"])));
var BreadcrumbTitle = styled.span(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject([""], [""])));
var EditorRootBreadcrumbs = /** @class */ (function (_super) {
    __extends(EditorRootBreadcrumbs, _super);
    function EditorRootBreadcrumbs(props) {
        var _this = _super.call(this, props) || this;
        _this.setEditorRootTopicKey = function (topicKey) {
            return function () {
                var _a = _this.props, model = _a.model, controller = _a.controller;
                if (model.editorRootTopicKey !== topicKey) {
                    controller.change(ModelModifier.setEditorRootTopicKey({
                        model: model,
                        topicKey: topicKey
                    }));
                }
            };
        };
        _this.breadcrumbRenderer = function (props) {
            var text = props.text, breadProps = __rest(props, ["text"]);
            var needTooltip = text.length > 8;
            var title = needTooltip ? text.substr(0, 8) + '...' : text;
            //TODO
            var content = createElement(TooltipContent, null, text);
            var tooltipProps = {
                content: content,
                position: PopoverPosition.BOTTOM_RIGHT
            };
            var breadcrumb = (createElement(Breadcrumb, __assign({}, breadProps),
                createElement(BreadcrumbTitle, null, title)));
            return needTooltip ? (createElement(Tooltip, __assign({}, tooltipProps), breadcrumb)) : (breadcrumb);
            // return (
            //   <Breadcrumb {...breadProps}>
            //     <BreadcrumbTitle>{title}</BreadcrumbTitle>
            //   </Breadcrumb>
            // );
        };
        _this.state = {
            show: false
        };
        return _this;
    }
    EditorRootBreadcrumbs.prototype.render = function () {
        var props = this.props;
        var model = props.model, controller = props.controller, zIndex = props.zIndex;
        var editingRootKey = model.editorRootTopicKey;
        if (editingRootKey === model.rootTopicKey)
            return null;
        var items = [];
        var topic = model.getTopic(editingRootKey);
        while (topic != null) {
            var title = controller.getValue(PropKey.TOPIC_TITLE, __assign(__assign({}, props), { topicKey: topic.key }));
            items.unshift({
                text: title,
                onClick: this.setEditorRootTopicKey(topic.key)
            });
            topic = model.getTopic(topic.parentKey);
        }
        var breadcrumbProps = {
            items: items,
            breadcrumbRenderer: this.breadcrumbRenderer
        };
        return (createElement(EditorRootBreadcrumbsRoot, { zIndex: zIndex },
            createElement(Breadcrumbs, __assign({}, breadcrumbProps))));
    };
    return EditorRootBreadcrumbs;
}(BaseWidget));

var templateObject_1$5, templateObject_2$3;
var NodeLayer = styled.div(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["\n  position: relative;\n  display: flex;\n  align-items: center;\n  padding: 5px;\n"], ["\n  position: relative;\n  display: flex;\n  align-items: center;\n  padding: 5px;\n"])));
var DIV = styled.div(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  background: ", ";\n"], ["\n  width: 100%;\n  height: 100%;\n  background: ", ";\n"])), function (props) { return props.theme.background; });
var MindDragScrollWidget = /** @class */ (function (_super) {
    __extends(MindDragScrollWidget, _super);
    function MindDragScrollWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.setZoomFactor = function (zoomFactor) {
            _this.dragScrollWidget.setZoomFactor(zoomFactor);
        };
        _this.onWheel = function (e) {
            if (e.altKey || e.ctrlKey) {
                var controller = _this.props.controller;
                var zoomFactor = controller.run('getZoomFactor', _this.props);
                zoomFactor = zoomFactor - (e.nativeEvent.deltaY > 0 ? 0.1 : -0.1);
                if (zoomFactor < 0.5)
                    zoomFactor = 0.5;
                if (zoomFactor > 4)
                    zoomFactor = 4;
                // console.log('zoomFactor=>', zoomFactor);
                controller.run('setZoomFactor', __assign(__assign({}, _this.props), { zoomFactor: zoomFactor }));
            }
        };
        return _this;
    }
    MindDragScrollWidget.prototype.renderHotkeys = function () {
        var props = this.props;
        var controller = props.controller, model = props.model;
        var hotKeys = controller.run('customizeHotKeys', props);
        if (hotKeys === null)
            return null;
        if (!(hotKeys.topicHotKeys instanceof Map &&
            hotKeys.globalHotKeys instanceof Map)) {
            throw new TypeError('topicHotKeys and globalHotKeys must be a Map');
        }
        var children = [];
        if (model.focusMode === FocusMode.NORMAL ||
            model.focusMode === FocusMode.SHOW_POPUP) {
            hotKeys.topicHotKeys.forEach(function (v, k) {
                children.push(createElement(Hotkey, __assign({ key: k }, v, { global: true })));
            });
        }
        hotKeys.globalHotKeys.forEach(function (v, k) {
            children.push(createElement(Hotkey, __assign({ key: k }, v, { global: true })));
        });
        return createElement(Hotkeys, null, children);
    };
    MindDragScrollWidget.prototype.componentDidMount = function () {
        var _a = this.props, getRef = _a.getRef, model = _a.model, controller = _a.controller;
        controller.run('addZoomFactorChangeEventListener', __assign(__assign({}, this.props), { listener: this.setZoomFactor }));
        var rootTopic = getRef(topicRefKey(model.editorRootTopicKey));
        //TODO
        var nodeLayer = getRef('node-layer');
        var rootTopicRect = rootTopic.getBoundingClientRect();
        var nodeLayerRect = nodeLayer.getBoundingClientRect();
        this.dragScrollWidget.setViewBoxScrollDelta(0, rootTopicRect.top -
            nodeLayerRect.top -
            this.dragScrollWidget.viewBox.getBoundingClientRect().height / 2 +
            rootTopicRect.height);
        this.layout();
    };
    MindDragScrollWidget.prototype.componentWillUnmount = function () {
        var controller = this.props.controller;
        controller.run('removeZoomFactorChangeEventListener', __assign(__assign({}, this.props), { listener: this.setZoomFactor }));
    };
    Object.defineProperty(MindDragScrollWidget.prototype, "dragScrollWidget", {
        get: function () {
            return this.props.getRef(RefKey.DRAG_SCROLL_WIDGET_KEY);
        },
        enumerable: true,
        configurable: true
    });
    MindDragScrollWidget.prototype.componentDidUpdate = function () {
        var controller = this.props.controller;
        controller.run('fireEvent', __assign(__assign({}, this.props), { key: EventKey.CENTER_ROOT_TOPIC }));
        this.layout();
    };
    MindDragScrollWidget.prototype.layout = function () {
        var controller = this.props.controller;
        controller.run('layout', this.props);
    };
    MindDragScrollWidget.prototype.render = function () {
        var _this = this;
        var _a = this.props, saveRef = _a.saveRef, model = _a.model, controller = _a.controller;
        var nodeKey = model.editorRootTopicKey;
        return (createElement(DIV, { onWheel: this.onWheel },
            createElement(DragScrollWidget, __assign({}, this.state, { enableMouseWheel: false, zoomFactor: model.zoomFactor, ref: saveRef(RefKey.DRAG_SCROLL_WIDGET_KEY) }), function (setViewBoxScroll, setViewBoxScrollDelta) {
                var rootWidgetProps = __assign(__assign({}, _this.props), {
                    topicKey: nodeKey, setViewBoxScroll: setViewBoxScroll,
                    setViewBoxScrollDelta: setViewBoxScrollDelta
                });
                return (createElement(NodeLayer, { ref: saveRef('node-layer') }, controller.run('renderRootWidget', rootWidgetProps)));
            })));
    };
    MindDragScrollWidget = __decorate([
        HotkeysTarget
    ], MindDragScrollWidget);
    return MindDragScrollWidget;
}(Component));

var Modals = /** @class */ (function (_super) {
    __extends(Modals, _super);
    function Modals() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClose = function () {
            var controller = _this.props.controller;
            var handleActiveModalClose = controller.run('handleActiveModalClose', _this.props);
            handleActiveModalClose && handleActiveModalClose();
        };
        return _this;
    }
    Modals.prototype.render = function () {
        var controller = this.props.controller;
        var activeModal = controller.run('renderModal', this.props);
        var activeModalProps = controller.run('getActiveModalProps', this.props);
        return (createElement(Dialog, { onClose: this.handleClose, isOpen: activeModal !== null, autoFocus: true, enforceFocus: true, usePortal: true, title: activeModalProps && activeModalProps.title, style: activeModalProps && activeModalProps.style },
            createElement("div", { className: Classes.DIALOG_BODY, style: { minHeight: 0 } }, activeModal)));
    };
    return Modals;
}(BaseWidget));

var templateObject_1$6;
var RootLinksSvg = styled.svg(templateObject_1$6 || (templateObject_1$6 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 1;\n  pointer-events: none;\n"], ["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 1;\n  pointer-events: none;\n"])));
var log$6 = debug('node:root-sub-links');
var RootSubLinks = /** @class */ (function (_super) {
    __extends(RootSubLinks, _super);
    function RootSubLinks() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            curves: []
        };
        return _this;
    }
    RootSubLinks.prototype.layout = function () {
        var props = this.props;
        var model = props.model, getRef = props.getRef, topicKey = props.topicKey, zoomFactor = props.zoomFactor, controller = props.controller;
        var topic = model.getTopic(topicKey);
        var content = getRef(contentRefKey(topicKey));
        var svg = getRef(linksSvgRefKey(topicKey));
        var bigView = getRef(RefKey.DRAG_SCROLL_WIDGET_KEY).bigView;
        var contentRect = getRelativeRect(content, bigView, zoomFactor);
        var svgRect = getRelativeRect(svg, bigView, zoomFactor);
        var p1, p2;
        p1 = {
            x: centerX(contentRect) - svgRect.left,
            y: centerY(contentRect) - svgRect.top
        };
        var curves = [];
        topic.subKeys.forEach(function (key) {
            var linkStyle = controller.run('getLinkStyle', __assign(__assign({}, props), { topicKey: key }));
            var lineType = linkStyle.lineType;
            var subTopicContent = getRef(contentRefKey(key));
            var rect = getRelativeRect(subTopicContent, bigView, zoomFactor);
            if (rect.left > contentRect.right) {
                p2 = {
                    x: rect.left,
                    y: centerY(rect)
                };
            }
            else {
                p2 = {
                    x: rect.right,
                    y: centerY(rect)
                };
            }
            p2 = { x: p2.x - svgRect.left, y: p2.y - svgRect.top };
            var curve;
            if (lineType === 'curve') {
                curve = "M " + p1.x + " " + p1.y + " C " + p1.x + " " + centerPointY(p1, p2) + " " + centerPointX(p1, p2) + " " + p2.y + " " + p2.x + " " + p2.y;
            }
            else if (lineType === 'line') {
                curve = "M " + p1.x + " " + p1.y + " L " + p2.x + " " + p2.y;
            }
            else if (lineType === 'round') {
                var vDir = p2.y > p1.y ? 1 : -1;
                var hDir = p2.x > p1.x ? 1 : -1;
                var radius = linkStyle.lineRadius;
                if (radius == null) {
                    throw new Error('link line type is round, but lineRadius is not provided!');
                }
                if (p2.y === p1.y) {
                    curve = "M " + p1.x + " " + p1.y + " H " + p2.x;
                }
                else {
                    // 0 表示逆时针 1 表示顺时针
                    curve = "M " + p1.x + " " + p1.y + "  V " + (p2.y -
                        vDir * radius) + " A " + radius + " " + radius + " 0 0 " + (vDir * hDir === 1 ? 0 : 1) + " " + (p1.x + radius * hDir) + " " + p2.y + " H " + p2.x;
                }
            }
            curves.push(createElement("path", { key: "link-" + key, d: curve, strokeWidth: linkStyle.lineWidth, stroke: linkStyle.lineColor, fill: "none" }));
        });
        this.setState({
            curves: curves
        });
    };
    RootSubLinks.prototype.render = function () {
        log$6('render');
        var _a = this.props, topicKey = _a.topicKey, saveRef = _a.saveRef;
        return (createElement(RootLinksSvg, { ref: saveRef(linksSvgRefKey(topicKey)) },
            createElement("g", null, this.state.curves)));
    };
    return RootSubLinks;
}(BaseWidget));

var templateObject_1$7, templateObject_2$4;
var log$7 = debug('RootNode');
var LayerPart = styled.div(templateObject_1$7 || (templateObject_1$7 = __makeTemplateObject(["\n  display: flex;\n  position: relative;\n\n  align-items: ", ";\n  flex-direction: column;\n\n  padding: ", ";\n"], ["\n  display: flex;\n  position: relative;\n\n  align-items: ",
    ";\n  flex-direction: column;\n\n  padding: ",
    ";\n"])), function (props) {
        //@ts-ignore
        return props.topicDirection === TopicDirection.LEFT ? 'flex-end' : 'flex-start';
    }, function (props) {
        //@ts-ignore
        return props.topicDirection === TopicDirection.LEFT
            ? '15px 60px 15px 0px'
            : '15px 0px 15px 60px';
    });
var Topic = styled.div(templateObject_2$4 || (templateObject_2$4 = __makeTemplateObject(["\n  display: flex;\n  position: relative;\n  align-items: center;\n  z-index: 3;\n"], ["\n  display: flex;\n  position: relative;\n  align-items: center;\n  z-index: 3;\n"])));
var RootWidget = /** @class */ (function (_super) {
    __extends(RootWidget, _super);
    function RootWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RootWidget.prototype.renderPartTopics = function (topics, dir) {
        var _a = this.props, controller = _a.controller, saveRef = _a.saveRef;
        var res = controller.run('createSubTopics', __assign(__assign({}, this.props), { dir: dir, isRoot: true, topics: topics }));
        if (!res)
            return null;
        var subTopics = res.subTopics;
        var cxName = "bm-layer-" + (dir === TopicDirection.LEFT ? 'left' : 'right');
        return (
            //@ts-ignore
            createElement(LayerPart, { topicDirection: dir, ref: saveRef(cxName) }, subTopics));
    };
    RootWidget.prototype.render = function () {
        log$7('render');
        var props = this.props;
        var model = props.model, topicKey = props.topicKey, saveRef = props.saveRef, controller = props.controller;
        var topicStyle = controller.run('getTopicContentStyle', props);
        var config = model.config;
        var topicContent = controller.run('renderTopicContent', __assign(__assign({}, props), { topicStyle: topicStyle, dir: TopicDirection.MAIN }));
        var partTopics = controller.run('getPartTopics', {
            layout: config.layoutDir,
            model: model,
            topicKey: topicKey
        });
        var rootTopic = (createElement(Topic, { ref: saveRef(topicRefKey(topicKey)) }, topicContent));
        var children = controller.run('renderRootWidgetOtherChildren', props);
        switch (config.layoutDir) {
            case DiagramLayoutType.LEFT_AND_RIGHT:
                return (createElement(Fragment, null,
                    this.renderPartTopics(partTopics.L, 'L'),
                    rootTopic,
                    this.renderPartTopics(partTopics.R, 'R'),
                    children));
            case DiagramLayoutType.LEFT_TO_RIGHT:
                return (createElement(Fragment, null,
                    rootTopic,
                    this.renderPartTopics(partTopics.R, 'R'),
                    children));
            case DiagramLayoutType.RIGHT_TO_LEFT:
                return (createElement(Fragment, null,
                    this.renderPartTopics(partTopics.L, 'L'),
                    rootTopic,
                    children));
            case DiagramLayoutType.TOP_TO_BOTTOM:
                return (createElement(Fragment, null,
                    rootTopic,
                    this.renderPartTopics(partTopics.B, 'B'),
                    children));
        }
        return null;
    };
    return RootWidget;
}(Component));

var templateObject_1$8, templateObject_2$5, templateObject_3$2;
var Icon$1 = styled.div(templateObject_3$2 || (templateObject_3$2 = __makeTemplateObject(["\n  position: absolute;\n  top: calc(50% - 10px);\n  ", ";\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n  text-align: center;\n  //@ts-ignore\n  background: ", ";\n  cursor: pointer;\n  padding: 0;\n  font-size: 14px;\n  line-height: 20px;\n  border: 0;\n  z-index: 2;\n"], ["\n  position: absolute;\n  top: calc(50% - 10px);\n  ",
    ";\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n  text-align: center;\n  //@ts-ignore\n  background: ", ";\n  cursor: pointer;\n  padding: 0;\n  font-size: 14px;\n  line-height: 20px;\n  border: 0;\n  z-index: 2;\n"])), function (_a) {
        var dir = _a.dir;
        if (dir === TopicDirection.RIGHT)
            return css(templateObject_1$8 || (templateObject_1$8 = __makeTemplateObject(["\n        right: -25px;\n      "], ["\n        right: -25px;\n      "])));
        if (dir === TopicDirection.LEFT)
            return css(templateObject_2$5 || (templateObject_2$5 = __makeTemplateObject(["\n        left: -25px;\n      "], ["\n        left: -25px;\n      "])));
    }, function (props) { return props.background; });
function TopicCollapseIcon(props) {
    var _a;
    var model = props.model, topicKey = props.topicKey, topicStyle = props.topicStyle, dir = props.dir, saveRef = props.saveRef, onClickCollapse = props.onClickCollapse;
    var topic = model.getTopic(topicKey);
    return topic.subKeys.size > 0 ? (createElement(Icon$1, {
        ref: saveRef(collapseRefKey(topicKey)), onClick: onClickCollapse, background: topicStyle.background, dir: dir, className: cx((_a = {
            icon: true,
            iconfont: true
        },
            _a["bm-" + (topic.collapse ? 'plus' : 'minus')] = true,
            _a))
    })) : null;
}

var templateObject_1$9, templateObject_2$6;
var log$8 = debug('node:topic-content2');
var EditingRoot = styled.div(templateObject_1$9 || (templateObject_1$9 = __makeTemplateObject(["\n  position: relative;\n"], ["\n  position: relative;\n"])));
var EditingWrapper = styled.div(templateObject_2$6 || (templateObject_2$6 = __makeTemplateObject(["\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: auto;\n  z-index: 10;\n  color: black;\n"], ["\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: auto;\n  z-index: 10;\n  color: black;\n"])));
var cancelEvent$1 = function (e) {
    log$8('cancelEvent');
    e.preventDefault();
    e.stopPropagation();
};
function TopicContent(props) {
    var controller = props.controller, model = props.model, topicKey = props.topicKey, getRef = props.getRef;
    var readOnly = model.editingContentKey !== topicKey;
    var topic = model.getTopic(topicKey);
    var editor = controller.run('renderTopicContentEditor', __assign(__assign({}, props), { readOnly: readOnly }));
    var child;
    if (readOnly) {
        child = editor;
    }
    else {
        var wrapper_1;
        var wrapperRef = function (ref) {
            if (ref) {
                wrapper_1 = ref;
                contentResizeObserver_1.observe(wrapper_1);
            }
        };
        var rect_1 = { width: 50, height: 40 };
        var editorDiv = getRef("content-editor-" + topicKey);
        if (editorDiv)
            rect_1 = editorDiv.getBoundingClientRect();
        var contentResizeCallback = function (entries, observer) {
            var r = entries[0].contentRect;
            wrapper_1.style.left = (rect_1.width - r.width) / 2 + 'px';
            wrapper_1.style.top = (rect_1.height - r.height) / 2 + 'px';
        };
        var contentResizeObserver_1 = new ResizeObserver(contentResizeCallback);
        log$8(rect_1);
        child = (
            createElement(Fragment, null,
                createElement("div", { style: { width: rect_1.width, height: rect_1.height } }),
                createElement(EditingWrapper, { ref: wrapperRef },
                    editor
                )
            )
        );
    }
    return (createElement(EditingRoot, { onDragEnter: cancelEvent$1, onDragOver: cancelEvent$1 },
        (topic.emoji && createElement('div', { style: { textAlign: 'center' } }, topic.emoji)),
        child
    ));
}

var templateObject_1$a, templateObject_2$7;
var log$9 = debug('node:topic-content-widget');
var TopicContent$1 = styled.div(templateObject_1$a || (templateObject_1$a = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  //overflow: hidden;\n  position: relative;\n"], ["\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  //overflow: hidden;\n  position: relative;\n"])));
var TopicContentWithDropArea = styled.div(templateObject_2$7 || (templateObject_2$7 = __makeTemplateObject(["\n  position: relative;\n"], ["\n  position: relative;\n"])));
var TopicContentWidget = /** @class */ (function (_super) {
    __extends(TopicContentWidget, _super);
    function TopicContentWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.onDragStart = function (ev) {
            _this.run('handleTopicDragStart', __assign(__assign({}, _this.props), { ev: ev }));
        };
        _this.onDragOver = function (ev) {
            // log('onDragOver');
            ev.preventDefault();
        };
        _this.onDragEnter = function (ev) {
            log$9('onDragEnter', _this.props.topicKey);
            _this.run('handleTopicDragEnter', __assign(__assign({}, _this.props), { ev: ev, dropDir: 'in' }));
        };
        _this.onDragLeave = function (ev) {
            _this.run('handleTopicDragLeave', __assign(__assign({}, _this.props), { ev: ev, dropDir: 'in' }));
        };
        _this.onDrop = function (ev) {
            log$9('onDrop');
            _this.run('handleTopicDrop', __assign(__assign({}, _this.props), { ev: ev, dropDir: 'in' }));
        };
        _this.onClick = function (ev) {
            var props = _this.props;
            var controller = props.controller;
            //TODO bug [Violation] 'setTimeout' handler took 69ms
            _this.handleTopicClickTimeout = setTimeout(function () {
                // log('handleTopicClick');
                //注意这里要传递this.props, 而不是props, 因为会先调用onClick, 再调用其他的topic-content-editor的onClickOutside
                //其他组件的onClickOutside是个同步的函数,会设置新的model, 如果这里用props传参,会导致model 还是老的model
                controller.run('handleTopicClick', __assign(__assign({}, _this.props), { ev: ev }));
            }, 200);
        };
        _this.onDoubleClick = function (ev) {
            clearTimeout(_this.handleTopicClickTimeout);
            var controller = _this.props.controller;
            controller.run('handleTopicDoubleClick', __assign(__assign({}, _this.props), { ev: ev }));
        };
        _this.needRelocation = false;
        _this.onClickCollapse = function (e) {
            e.stopPropagation();
            var _a = _this.props, topicKey = _a.topicKey, getRef = _a.getRef;
            _this.needRelocation = true;
            var collapseIcon = getRef(collapseRefKey(topicKey));
            var rect = collapseIcon.getBoundingClientRect();
            log$9('oldRect', rect);
            _this.oldCollapseIconVector = [
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            ];
            log$9('oldCollapseIconVector', _this.oldCollapseIconVector);
            // this.oldCollapseIconVector = controller.run('getRelativeVectorFromViewPort', {
            //   ...this.props,
            //   element: collapseIcon
            // });
            _this.operation(OpType.TOGGLE_COLLAPSE, _this.props);
        };
        _this.state = {
            dragEnter: false
        };
        return _this;
    }
    TopicContentWidget.prototype.renderContextMenu = function () {
        var controller = this.props.controller;
        if (!controller.getValue(PropKey.TOPIC_CONTEXT_MENU_ENABLED, __assign({}, this.props))) {
            return;
        }
        this.operation(OpType.FOCUS_TOPIC, __assign(__assign({}, this.props), { focusMode: FocusMode.SHOW_POPUP }));

        return controller.run('renderTopicContextMenu', this.props);
    };
    TopicContentWidget.prototype.onContextMenuClose = function () {
        // Optional method called once the context menu is closed.
    };
    TopicContentWidget.prototype.componentDidUpdate = function () {
        if (this.needRelocation) {
            var _a = this.props, getRef = _a.getRef, topicKey = _a.topicKey, setViewBoxScrollDelta = _a.setViewBoxScrollDelta;
            var newIcon = getRef(collapseRefKey(topicKey));
            var newRect = newIcon.getBoundingClientRect();
            // const newVector = controller.run('getRelativeVectorFromViewPort', {
            //   ...this.props,
            //   element: getRef(collapseRefKey(topicKey))
            // });
            var newVector = [
                newRect.left + newRect.width / 2,
                newRect.top + newRect.height / 2
            ];
            log$9('newVector:', newVector);
            log$9('oldVector:', this.oldCollapseIconVector);
            //TODO bug
            var vector = [
                newVector[0] - this.oldCollapseIconVector[0],
                newVector[1] - this.oldCollapseIconVector[1]
            ];
            log$9('vector', vector);
            setViewBoxScrollDelta(vector[0], vector[1]);
            this.needRelocation = false;
        }
    };
    TopicContentWidget.prototype.render = function () {
        var props = this.props;
        var saveRef = props.saveRef, topicKey = props.topicKey, model = props.model, controller = props.controller, topicStyle = props.topicStyle, dir = props.dir;
        log$9('render', topicKey, model.focusMode);
        var draggable = controller.run('isOperationEnabled', props) &&
            model.editingContentKey !== topicKey;
        var collapseIcon = controller.run('renderTopicCollapseIcon', __assign(__assign({}, props), { onClickCollapse: this.onClickCollapse.bind(this) }));
        var prevDropArea = controller.run('renderTopicDropArea', __assign(__assign({}, props), { dropDir: 'prev' }));
        var nextDropArea = controller.run('renderTopicDropArea', __assign(__assign({}, props), { dropDir: 'next' }));
        var dropEventHandlers = {
            onDragEnter: this.onDragEnter,
            onDragLeave: this.onDragLeave,
            onDragOver: this.onDragOver,
            onDrop: this.onDrop
        };
        // log(topicKey, 'style', topicStyle);
        return (createElement(TopicContentWithDropArea, null,
            prevDropArea,
            createElement(TopicContent$1, __assign({ style: topicStyle, draggable: draggable, ref: saveRef(contentRefKey(topicKey)), onDragStart: this.onDragStart, onClick: this.onClick, onDoubleClick: this.onDoubleClick }, dropEventHandlers),
                controller.run('renderTopicBlocks', props),
                controller.run('renderTopicContentOthers', props)),
            nextDropArea,
            dir !== TopicDirection.MAIN && collapseIcon));
    };
    TopicContentWidget = __decorate([
        ContextMenuTarget
    ], TopicContentWidget);
    return TopicContentWidget;
}(BaseWidget));

var templateObject_1$b, templateObject_1$bb;
var log$a = debug('node:topic-desc');
var TooltipContentWrapper = styled.div(templateObject_1$b || (templateObject_1$b = __makeTemplateObject(["\n  overflow: auto;\n"], ["\n  overflow: auto;\n"])));
function TopicDesc(props) {
    var controller = props.controller, model = props.model, topicKey = props.topicKey, getRef = props.getRef;
    var isEditing = model.editingDescKey === topicKey;

    log$a('isEditing', isEditing);
    var onClick = function (e) {
        e.stopPropagation();
        controller.run('operation', __assign(__assign({}, props), { opType: OpType.START_EDITING_DESC }));
    };
    var desc = model.getTopic(topicKey).getBlock(BlockType.DESC);
    if (!isEditing &&
        controller.run('isBlockEmpty', __assign(__assign({}, props), { block: desc.block })))
        return null;
    var descEditor = controller.run('renderTopicDescEditor', props);
    var diagramRoot = getRef(RefKey.DIAGRAM_ROOT_KEY);
    var style = {
        maxWidth: '800px',
        minWidth: '200px',
        maxHeight: '600px',
    };
    if (diagramRoot) {
        var dRect = diagramRoot.getBoundingClientRect();
        style.maxWidth = dRect.width * 0.6 + "px";
        style.maxHeight = dRect.height * 0.8 + "px";
    }
    var tooltipContent = (createElement(TooltipContentWrapper, { onClick: cancelEvent, classname: Classes.POPOVER_DISMISS, style: style },
        createElement('div', { style: { margin: '5px 10px', paddingBottom: 5, fontSize: 20, borderBottom: '1px solid #c7c7c7b0' } }, 'Topic Note'),
        createElement('div', { style: { padding: 15 } }, descEditor)
    ));
    var icon = (createElement(TopicBlockIcon, { onClick: onClick, style: { backgroundColor: '#c7c7c7b0', color: 'white', padding: '10px', marginRight: 0, fontSize: 15, borderRadius: '100%' }, className: iconClassName(IconName.NOTES), tabIndex: -1 }));

    var tooltipProps = {
        autoFocus: false,
        content: tooltipContent,
        target: icon,
        interactionKind: PopoverInteractionKind.HOVER,
        hoverOpenDelay: 500
    };

    var descIcon = desc.block && createElement(Popover, __assign({}, tooltipProps));
    return descIcon;
}

function TopicComment(props) {
    var controller = props.controller, model = props.model, topicKey = props.topicKey, getRef = props.getRef;
    var isEditing = model.editingDescKey === topicKey;

    log$a('isEditing', isEditing);
    var onClick = function (e) {
        e.stopPropagation();
        controller.run('operation', __assign(__assign({}, props), { opType: OpType.START_EDITING_COMMENT }));
    };
    var comment = model.getTopic(topicKey).getBlock(BlockType.COMMENT);
    if (!isEditing &&
        controller.run('isBlockEmpty', __assign(__assign({}, props), { block: comment.block })))
        return null;

    var commentEditor = controller.run('renderTopicCommentEditor', props);
    
    var diagramRoot = getRef(RefKey.DIAGRAM_ROOT_KEY);
    var style = {
        maxWidth: '800px',
        minWidth: '200px',
        maxHeight: '600px',
    };
    if (diagramRoot) {
        var dRect = diagramRoot.getBoundingClientRect();
        style.maxWidth = dRect.width * 0.6 + "px";
        style.maxHeight = dRect.height * 0.8 + "px";
    }

    var icon = (createElement(TopicBlockIcon, { onClick: onClick, style: { backgroundColor: '#c7c7c7b0', color: 'white', padding: '10px', marginRight: 0, fontSize: 15, borderRadius: '100%' }, className: iconClassName(IconName.NOTES), tabIndex: -1 }));

    var commentIcon = comment.block && createElement('div', {}, icon);
    return commentIcon;
}

var templateObject_1$c;
// var FocusHighlightSvg = styled.svg(templateObject_1$c || (templateObject_1$c = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 2;\n  pointer-events: none;\n"], ["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 2;\n  pointer-events: none;\n"])));
var FocusHighlightDiv = styled.div(templateObject_1$c || (templateObject_1$c = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 3;\n pointer-events: none;\n"], ["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 3;\n pointer-events: none;\n"])));
var TopicHighlight = /** @class */ (function (_super) {
    __extends(TopicHighlight, _super);
    function TopicHighlight() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            content: function () { },
            expand_emoji: false,
        };
        _this.handleEmojiClose = (event) => {
            var closest = event.target.closest("#emoji-context");
            _this.setState({
                ..._this.state, expand_emoji: !!closest
            })
        }
        return _this;
    }
    TopicHighlight.prototype.layout = function () {
        var _a = this.props, getRef = _a.getRef, model = _a.model, zoomFactor = _a.zoomFactor, controller = _a.controller, zIndex = _a.zIndex, topicKey = _a.topicKey;

        var focusKey = model.focusKey;
        var focusMode = model.focusMode;
        if (!focusKey || focusMode === FocusMode.EDITING_CONTENT) {
            this.setState({
                content: function () { },
            });
            return;
        }
        var content = getRef(contentRefKey(focusKey));
        var bigView = getRef(RefKey.DRAG_SCROLL_WIDGET_KEY).bigView;
        var svg = getRef(RefKey.SVG_HIGHLIGHT_KEY);
        var contentRect = getRelativeRect(content, bigView, zoomFactor);
        var svgRect = getRelativeRect(svg, bigView, zoomFactor);
        var padding = 6;
        var x = contentRect.left - svgRect.left - padding;
        var y = contentRect.top - svgRect.top - padding;
        var width = contentRect.width + 2 * padding;
        var height = contentRect.height + 2 * padding;
        function MouseOver(event) {
            if (event.target.id === 'settingIcon') {
                event.target.style.color = model.config.theme.highlightColor;
                event.target.style.background = model.config.theme.background;
                event.target.style.borderColor = model.config.theme.highlightColor;
            }
        }
        function MouseOut(event) {
            if (event.target.id === 'settingIcon') {
                event.target.style.background = model.config.theme.highlightColor;
                event.target.style.color = model.config.theme.background;
                event.target.style.borderColor = model.config.theme.background;
            }
        }

        var handleSettingClick = (e) => {

            _a = __assign(__assign({}, _a), { topicKey: model.focusKey });

            this.setState({
                expand_emoji: !this.state.expand_emoji,
            });
        }
        var handleAddEmoji = (emoji) => {

            controller.run('operation', __assign(__assign({}, _a), {
                opType: OpType.ADD_EMOJI, emoji: emoji.native, function() {
                    var diagramProps = __assign(__assign({}, _a), { controller: controller });
                    return controller.run('renderDiagram', diagramProps);
                }
            }));
            this.setState({
                expand_emoji: false,
            });
        };
        var renderContent = () => (
            createElement('div', { style: { width: width, height: height, border: `3px solid ${model.config.theme.highlightColor}`, borderRadius: '50px', borderBottomRightRadius: '0px', position: 'absolute', top: `${y}px`, left: `${x}px` } },
                createElement('div', { id: 'settingIcon', onClick: handleSettingClick, style: { zIndex: 9, pointerEvents: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20px', height: '20px', position: 'absolute', right: '0px', top: '4%', ...((height < 100) && { top: '-4%' }), border: `2px solid ${model.config.theme.background}`, backgroundColor: `${model.config.theme.highlightColor}`, color: 'white', borderRadius: '50%' }, onMouseOver: (MouseOver), onMouseOut: (MouseOut), },
                    createElement('div', { style: { pointerEvents: 'none', position: 'absolute', top: '-5px' } }, '...'),
                ),
                (this.state.expand_emoji && (
                    createElement('div', { id: 'emoji-context' },
                        createElement(Picker,
                            {
                                id: 'dddd',
                                onSelect: handleAddEmoji,
                                native: true,
                                style: { pointerEvents: 'auto', boxShadow: 'none', border: 'none', top: '0px', left: width, position: 'absolute' },
                            },
                        ))
                )),
                createElement('div', { style: { width: '10px', height: '10px', borderRadius: '100%', border: `2px solid ${model.config.theme.highlightColor}`, position: 'absolute', backgroundColor: `${model.config.theme.background}`, bottom: '-6px', right: '-6px' } })
            )
        );

        this.setState({
            content: renderContent
        });

    };
    TopicHighlight.prototype.componentDidMount = function () {
        window.addEventListener('mouseup', this.handleEmojiClose)
    }
    TopicHighlight.prototype.componentWillUnmount = function () {
        window.removeEventListener('mouseup', this.handleEmojiClose)
    }
    TopicHighlight.prototype.componentDidUpdate = function () {
        this.setState({
            content: this.state.content
        });
    }
    TopicHighlight.prototype.render = function () {
        var saveRef = this.props.saveRef;
        return (createElement(FocusHighlightDiv, { ref: saveRef(RefKey.SVG_HIGHLIGHT_KEY) }, this.state.content()));
    };
    return TopicHighlight;
}(BaseWidget));
var TopicLinksSvg = styled.svg(templateObject_1$d || (templateObject_1$d = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 1;\n  pointer-events: none;\n"], ["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 1;\n  pointer-events: none;\n"])));
var log$b = debug('node:topic-sub-links');

var templateObject_1$d;
var TopicSubLinks = /** @class */ (function (_super) {
    __extends(TopicSubLinks, _super);
    function TopicSubLinks() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            curves: []
        };
        return _this;
    }
    TopicSubLinks.prototype.layout = function () {
        var props = this.props;
        var model = props.model, getRef = props.getRef, topicKey = props.topicKey, dir = props.dir, controller = props.controller;
        var z = controller.run('getZoomFactor', props);
        var topic = model.getTopic(topicKey);
        var content = getRef(contentRefKey(topicKey));
        var svg = getRef(linksSvgRefKey(topicKey));
        var collapseIcon = getRef(collapseRefKey(topicKey));
        var bigView = getRef(RefKey.DRAG_SCROLL_WIDGET_KEY).bigView;
        var svgRect = getRelativeRect(svg, bigView, z);
        var collapseRect = getRelativeRect(collapseIcon, bigView, z);
        var contentRect = getRelativeRect(content, bigView, z);
        log$b(topicKey);
        log$b('svgRect', svgRect);
        log$b('collapseRect', collapseRect);
        log$b('contentRect', contentRect);
        var p1, p2, p3;
        if (dir === TopicDirection.RIGHT) {
            p1 = {
                x: 0,
                y: centerY(contentRect) - svgRect.top
            };
            p2 = {
                x: collapseRect.right - svgRect.left + 10,
                y: p1.y
            };
        }
        else if (dir === TopicDirection.LEFT) {
            p1 = {
                x: svgRect.right - svgRect.left,
                y: centerY(contentRect) - svgRect.top
            };
            p2 = {
                x: collapseRect.left - svgRect.left - 10,
                y: p1.y
            };
        }
        var curves = [];
        topic.subKeys.forEach(function (key) {
            var curve;
            var linkStyle = controller.run('getLinkStyle', __assign(__assign({}, props), { topicKey: key }));
            // log(key);
            var subContent = getRef(contentRefKey(key));
            if (!subContent)
                return;
            var rect = getRelativeRect(subContent, bigView, z);
            if (dir === TopicDirection.RIGHT) {
                p3 = {
                    x: rect.left - svgRect.left,
                    y: centerY(rect) - svgRect.top
                };
            }
            if (dir === TopicDirection.LEFT) {
                p3 = {
                    x: rect.right - svgRect.left,
                    y: centerY(rect) - svgRect.top
                };
            }
            var lineType = linkStyle.lineType;
            if (lineType === 'curve') {
                curve = "M " + p1.x + " " + p1.y + " L " + p2.x + " " + p2.y + " C " + p2.x + " " + centerPointY(p2, p3) + " " + centerPointX(p2, p3) + " " + p3.y + " " + p3.x + " " + p3.y;
            }
            else if (lineType === 'round') {
                var vDir = p3.y > p1.y ? 1 : -1;
                var hDir = p3.x > p1.x ? 1 : -1;
                var radius = linkStyle.lineRadius;
                // if (p3.y === p1.y) { //这样判断不可靠
                if (topic.subKeys.size === 1 || Math.abs(p3.y - p1.y) <= 1) {
                    curve = "M " + p1.x + " " + p1.y + " L " + p3.x + " " + p3.y;
                }
                else {
                    // 0 表示逆时针 1 表示顺时针
                    curve = "M " + p1.x + " " + p1.y + " H " + p2.x + " V " + (p3.y -
                        vDir * radius) + " A " + radius + " " + radius + " 0 0 " + (vDir * hDir === 1 ? 0 : 1) + " " + (p2.x + radius * hDir) + " " + p3.y + " H " + p3.x;
                }
            }
            else if (lineType === 'line') {
                curve = "M " + p1.x + " " + p1.y + " H " + p2.x + " L " + p3.x + " " + p3.y;
            }
            curves.push(createElement("path", { key: "link-" + key, d: curve, strokeWidth: linkStyle.lineWidth, stroke: linkStyle.lineColor, fill: "none" }));
        });
        this.setState({
            curves: curves
        });
    };
    TopicSubLinks.prototype.render = function () {
        var _a = this.props, topicKey = _a.topicKey, saveRef = _a.saveRef;
        return (createElement(TopicLinksSvg, { ref: saveRef(linksSvgRefKey(topicKey)) },
            createElement("g", null, this.state.curves)));
    };
    return TopicSubLinks;
}(BaseWidget));

var log$c = debug('node:topic-widget');
var Node = styled.div(templateObject_1$e || (templateObject_1$e = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  flex-direction: ", ";\n"], ["\n  display: flex;\n  align-items: center;\n  flex-direction: ",
    ";\n"])), function (props) {
        return props.topicDirection === TopicDirection.RIGHT ? 'row' : 'row-reverse';
    });
// TODO
var NodeChildren = styled.div(templateObject_2$8 || (templateObject_2$8 = __makeTemplateObject(["\n  position: relative;\n  padding: ", ";\n"], ["\n  position: relative;\n  padding: ",
    ";\n"])), function (props) {
        return props.dir === TopicDirection.RIGHT
            ? "0 0 0 " + props.marginH + "px"
            : "0 " + props.marginH + "px 0 0";
    });
var NodeTopic = styled.div(templateObject_3$3 || (templateObject_3$3 = __makeTemplateObject(["\n  display: flex;\n  position: relative;\n  align-items: center;\n\n  flex-direction: ", ";\n"], ["\n  display: flex;\n  position: relative;\n  align-items: center;\n\n  flex-direction: ",
    ";\n"])), function (props) {
        return props.topicDirection === TopicDirection.RIGHT ? 'row' : 'row-reverse';
    });

var templateObject_1$e, templateObject_2$8, templateObject_3$3;
var TopicWidget = /** @class */ (function (_super) {
    __extends(TopicWidget, _super);
    function TopicWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopicWidget.prototype.renderSubTopics = function () {
        var props = this.props;
        var controller = props.controller, model = props.model, topicKey = props.topicKey, dir = props.dir;
        var topics = model.getTopic(topicKey).subKeys.toArray();
        var res = controller.run('createSubTopics', __assign(__assign({}, props), { topics: topics }));
        if (!res)
            return null;
        var subTopics = res.subTopics;
        var subLinks = controller.run('renderSubLinks', props);
        return (createElement(NodeChildren, { dir: dir, marginH: model.config.theme.marginH },
            subTopics,
            " ",
            subLinks));
    };
    // componentDidUpdate(): void {
    //   this.layoutLinks();
    // }
    //
    // componentDidMount(): void {
    //   this.layoutLinks();
    // }
    TopicWidget.prototype.layoutLinks = function () {
        var _a = this.props, getRef = _a.getRef, topicKey = _a.topicKey, model = _a.model;
        var topic = model.getTopic(topicKey);
        if (topic.subKeys.size === 0 || topic.collapse)
            return;
        log$c('layoutLinks', topicKey);
        var links = getRef(linksRefKey(topicKey));
        links && links.layout();
    };
    TopicWidget.prototype.render = function () {
        var props = this.props;
        var controller = props.controller, topicKey = props.topicKey, dir = props.dir, saveRef = props.saveRef;
        log$c('render', topicKey);
        var topicStyle = controller.run('getTopicContentStyle', props);
        var propsMore = __assign(__assign({}, props), { topicStyle: topicStyle });
        var topicContent = controller.run('renderTopicContent', propsMore);
        return (createElement(Node, { topicDirection: dir },
            createElement(NodeTopic, { topicDirection: dir, ref: saveRef(topicRefKey(topicKey)) }, topicContent),
            this.renderSubTopics()));
    };
    return TopicWidget;
}(Component));

var templateObject_1$f, templateObject_2$9, templateObject_3$4;
var log$d = debug('node:view-port-viewer');
var ViewerRoot = styled(ZIndex)(templateObject_1$f || (templateObject_1$f = __makeTemplateObject(["\n  position: absolute;\n  background: white;\n  left: 30px;\n  bottom: 20px;\n  border-radius: 2px;\n  display: flex;\n  flex-direction: row;\n  user-select: none;\n border-radius: 50px;\n padding: 5px;\n box-shadow: rgb(185 185 185) 0px 0px 9px 0px;\n"], ["\n  position: absolute;\n  background: white;\n  right: 30px;\n  bottom: 20px;\n  border-radius: 2px;\n  display: flex;\n  flex-direction: row;\n  user-select: none;\n border-radius: 50px;\n padding: 5px;\n box-shadow: rgb(185 185 185) 0px 0px 9px 0px;\n"])));
var Item_ = styled(Btn)(templateObject_2$9 || (templateObject_2$9 = __makeTemplateObject(["\n  margin: 10px;\n"], ["\n  margin: 10px;\n"])));
var ZoomFactorSpan = styled.span(templateObject_3$4 || (templateObject_3$4 = __makeTemplateObject(["\n  display: inline-block;\n  width: 80px;\n  height: 18px;\n"], ["\n  display: inline-block;\n  width: 80px;\n  height: 18px;\n"])));
var Item = function (props) {
    return (createElement(Tooltip, { content: props.tooltip, position: Position.TOP, className: Classes.ICON },
        createElement(Item_, { onClick: props.onClick, tabIndex: -1 }, props.children)));
};
var ViewPortViewer = /** @class */ (function (_super) {
    __extends(ViewPortViewer, _super);
    function ViewPortViewer(props) {
        var _this = _super.call(this, props) || this;
        _this.zoomFactorChange = function (zoomFactor) {
            log$d('zoomFactorChange', zoomFactor);
            _this.setState({ zoomFactor: zoomFactor });
        };
        _this.onClickResetZoom = function (e) {
            var props = _this.props;
            var controller = props.controller;
            controller.run('setZoomFactor', __assign(__assign({}, props), { zoomFactor: 1 }));
        };
        _this.onClickAddZoom = function (e) {
            var props = _this.props;
            var controller = props.controller;
            var zoomFactor = controller.run('getZoomFactor', props);
            controller.run('setZoomFactor', __assign(__assign({}, props), { zoomFactor: zoomFactor + 0.1 }));
        };
        _this.onClickMinusZoom = function (e) {
            var props = _this.props;
            var controller = props.controller;
            var zoomFactor = controller.run('getZoomFactor', props);
            controller.run('setZoomFactor', __assign(__assign({}, props), { zoomFactor: zoomFactor - 0.1 }));
        };
        _this.onClickCollapseAll = function (e) {
            var props = _this.props;
            var controller = props.controller;
            controller.run('addEventListener', __assign(__assign({}, props), { key: EventKey.CENTER_ROOT_TOPIC, listener: _this.centerRootTopic, once: true }));
            controller.run('operation', __assign(__assign({}, props), { opType: OpType.COLLAPSE_ALL }));
        };
        _this.onClickExpandAll = function (e) {
            var props = _this.props;
            var controller = props.controller;
            controller.run('addEventListener', __assign(__assign({}, props), { key: EventKey.CENTER_ROOT_TOPIC, listener: _this.centerRootTopic, once: true }));
            controller.run('operation', __assign(__assign({}, props), { opType: OpType.EXPAND_ALL }));
        };
        _this.centerRootTopic = function () {
            var _a = _this.props, model = _a.model, controller = _a.controller;
            controller.run('moveTopicToCenter', __assign(__assign({}, _this.props), { topicKey: model.editorRootTopicKey }));
        };
        return _this;
    }
    ViewPortViewer.prototype.componentDidMount = function () {
        var props = this.props;
        var controller = props.controller;
        controller.run('addZoomFactorChangeEventListener', __assign(__assign({}, props), { listener: this.zoomFactorChange }));
    };
    ViewPortViewer.prototype.componentWillUnmount = function () {
        var props = this.props;
        var controller = props.controller;
        controller.run('removeZoomFactorChangeEventListener', __assign(__assign({}, props), { listener: this.zoomFactorChange }));
    };
    ViewPortViewer.prototype.render = function () {
        log$d('render');
        var props = this.props;
        var controller = props.controller, zIndex = props.zIndex;
        var zoomFactor = controller.run('getZoomFactor', props);
        return (createElement(ViewerRoot, { zIndex: zIndex },
            createElement(Item, { onClick: this.onClickCollapseAll, tooltip: "collapse all" }, Icon(IconName.COLLAPSE_ALL)),
            createElement(Item, { onClick: this.onClickExpandAll, tooltip: "expand all" }, Icon(IconName.EXPAND_ALL)),
            createElement(Item, { onClick: this.centerRootTopic, tooltip: "center root topic" }, Icon(IconName.CENTER)),
            createElement(Item, { onClick: this.onClickMinusZoom, tooltip: "zoom in" }, Icon(IconName.MINUS)),
            createElement(Item, { onClick: this.onClickResetZoom, tooltip: "reset zoom" },
                createElement(ZoomFactorSpan, null, "zoom:" + Math.floor(zoomFactor * 100) + "%")),
            createElement(Item, { onClick: this.onClickAddZoom, tooltip: "zoom out" }, Icon(IconName.PLUS))));
    };
    return ViewPortViewer;
}(BaseWidget));

var templateObject_1$g;
var DescEditorWrapper = styled.div(templateObject_1$g || (templateObject_1$g = __makeTemplateObject(["\n  overflow: auto;\n  padding: 0px 0px 0px 20px;\n  background: #88888850;\n"], ["\n  overflow: auto;\n  padding: 0px 0px 0px 20px;\n  background: #88888850;\n"])));
function renderDrawer(props) {
    var controller = props.controller, model = props.model, topicKey = props.topicKey;
    if (model.focusMode === FocusMode.EDITING_DESC) {
        var onDescEditorClose = function (e) {
            e.stopPropagation();
            var key = "topic-desc-data-" + topicKey;
            var descData = controller.run('deleteTempValue', { key: key });
            controller.run('operation', __assign(__assign({}, props), { opType: OpType.SET_TOPIC_BLOCK, topicKey: topicKey, blockType: BlockType.DESC, data: descData, focusMode: FocusMode.NORMAL }));
        };
        var descEditor = controller.run('renderTopicDescEditor', props);
        return (createElement(Drawer, { key: "drawer", title: "Edit Notes", icon: Icon('note'), isOpen: true, hasBackdrop: true, backdropProps: { onMouseDown: cancelEvent }, isCloseButtonShown: false, onClose: onDescEditorClose, size: "70%" },
            createElement(DescEditorWrapper, null, descEditor)));
    }
}
var templateObject_1$gg;
var CommentEditorWrapper = styled.div(templateObject_1$gg || (templateObject_1$gg = __makeTemplateObject(["\n  overflow: auto;\n  padding: 0px 0px 0px 20px;\n  background: #88888850;\n"], ["\n  overflow: auto;\n  padding: 0px 0px 0px 20px;\n  background: #88888850;\n"])));
function renderCommentDrawer(props) {
    var controller = props.controller, model = props.model, topicKey = props.topicKey;
    if (model.focusMode === FocusMode.EDITING_COMMENT) {
        var onCommentEditorClose = function (e) {
            e.stopPropagation();
            var key = "topic-comment-data-" + topicKey;
            var commentData = controller.run('deleteTempValue', { key: key });
            controller.run('operation', __assign(__assign({}, props), { opType: OpType.SET_TOPIC_BLOCK, topicKey: topicKey, blockType: BlockType.COMMENT, data: commentData, focusMode: FocusMode.NORMAL }));
            
            // controller.run('operation', __assign(__assign({}, props), { focusMode: FocusMode.NORMAL, opType: OpType.FOCUS_TOPIC }));
        };
        var commentEditor = controller.run('renderTopicCommentEditor', props);
        var modalOpen = true;
        // return (createElement(Drawer, { key: "commentdrawer", title: "Edit Comment", icon: Icon('note'), isOpen: true, hasBackdrop: true, backdropProps: { onMouseDown: cancelEvent }, isCloseButtonShown: false, onClose: onCommentEditorClose, size: "70%" },
        //     createElement(CommentEditorWrapper, null, commentEditor)));
        // var Modal = (
        //     createElement('div', )
        // )
        return (createElement(Dialog, { key: "commentdrawer", onClose: onCommentEditorClose, isOpen: modalOpen, autoFocus: true, enforceFocus: true, usePortal: true, style: {width: 200, height: 400}},
            createElement("div", { className: Classes.DIALOG_BODY, style: { minHeight: 0 } }, commentEditor)));

    }
}
//TODO 是否需要themeProvider
function Theme(_a) {
    var theme = _a.theme, children = _a.children;
    return (
        //@ts-ignore
        createElement(ThemeProvider, { theme: theme },
            createElement(Fragment, null, children)));
}

var templateObject_1$h;
var log$e = debug('plugin:rendering');
function RenderingPlugin() {
    var DiagramRoot = styled.div(templateObject_1$h || (templateObject_1$h = __makeTemplateObject(["\n    width: 100%;\n    height: 100%;\n    background: ", ";\n    position: relative;\n  "], ["\n    width: 100%;\n    height: 100%;\n    background: ", ";\n    position: relative;\n  "])), function (props) { return props.theme.background; });
    var diagramProps;
    return {
        getDiagramProps: function () {
            return diagramProps;
        },
        renderDiagram: function (props) {
            var model = props.model, controller = props.controller;
            return (createElement(SaveRef, null, function (saveRef, getRef, deleteRef) {
                diagramProps = __assign(__assign({}, props), {
                    saveRef: saveRef,
                    getRef: getRef,
                    deleteRef: deleteRef
                });
                log$e('renderDiagram', model);
                return (createElement(Theme, { theme: model.config.theme },
                    createElement(DiagramRoot, { ref: saveRef(RefKey.DIAGRAM_ROOT_KEY) },
                        createElement(MindDragScrollWidget, __assign({}, diagramProps)),
                        controller.run('renderDiagramCustomize', diagramProps))));
            }));
        },
        renderDrawer: renderDrawer,
        renderCommentDrawer: renderCommentDrawer,
        renderDiagramCustomize: function (props) {
            var controller = props.controller, model = props.model;
            var zIndex = controller.getValue(PropKey.DIAGRAM_CUSTOMIZE_BASE_Z_INDEX);
            var nProps = __assign(__assign({}, props), { zIndex: zIndex, topicKey: model.focusKey });
            var breadcrumbs = controller.run('renderEditorRootBreadcrumbs', nProps);
            // const styleEditor = controller.run('renderStyleEditor', nProps);
            var rightTopPanel = controller.run('renderRightTopPanel', nProps);
            var modals = controller.run('renderModals', __assign(__assign({}, nProps), { zIndex: zIndex + 1 }));
            var drawer = controller.run('renderDrawer', __assign(__assign({}, nProps), { zIndex: zIndex + 1 }));
            var commentdrawer = controller.run('renderCommentDrawer', __assign(__assign({}, nProps), { zIndex: zIndex + 1 }));
            var viewportViewer = controller.run('renderViewPortViewer', nProps);
            return [breadcrumbs, rightTopPanel, modals, drawer, commentdrawer, viewportViewer];
        },
        renderEditorRootBreadcrumbs: function (props) {
            return createElement(EditorRootBreadcrumbs, __assign({ key: "EditorRootBreadcrumbs" }, props));
        },
        renderModals: function (props) {
            return createElement(Modals, __assign({ key: "modals" }, props));
        },
        renderModal: function (props) {
            return null;
        },
        getActiveModalProps: function (props) {
            return null;
        },
        renderDoc: function (_a) {
            var children = _a.children;
            return children;
        },
        renderRootWidget: function (props) {
            return createElement(RootWidget, __assign({}, props));
        },
        renderTopicWidget: function (props) {
            return createElement(TopicWidget, __assign({}, props));
        },
        renderTopicContent: function (props) {
            return createElement(TopicContentWidget, __assign({}, props));
        },
        renderTopicCollapseIcon: function (props) {
            return createElement(TopicCollapseIcon, __assign({}, props));
        },
        renderTopicContentOthers: function (props) {
            return [];
        },
        renderTopicBlocks: function (props) {
            var model = props.model, topicKey = props.topicKey, controller = props.controller;
            var topic = model.getTopic(topicKey);
            var blocks = topic.blocks;
            var res = [];
            var i = 0;
            blocks.forEach(function (block) {
                var b = controller.run('renderTopicBlock', __assign(__assign({}, props), { block: block, blockKey: "block-" + i }));
                if (b) {
                    res.push(createElement(Fragment, { key: "block-" + i }, b));
                    i++;
                }
            });
            return res;
        },
        renderTopicBlock: function (props) {
            var controller = props.controller, block = props.block;
            switch (block.type) {
                case BlockType.CONTENT:
                    return controller.run('renderTopicBlockContent', props);
                case BlockType.DESC:
                    return controller.run('renderTopicBlockDesc', props);
                case BlockType.COMMENT:
                    return controller.run('renderTopicBlockComment', props);
            }
            return null;
        },
        renderTopicBlockContent: function (props) {
            return createElement(TopicContent, __assign({}, props));
        },
        renderTopicBlockDesc: function (props) {
            return createElement(TopicDesc, __assign({}, props));
        },
        renderTopicBlockComment: function (props) {
            return createElement(TopicComment, __assign({}, props));
        },
        renderSubLinks: function (props) {
            var saveRef = props.saveRef, topicKey = props.topicKey, model = props.model;
            var topic = model.getTopic(topicKey);
            if (topic.subKeys.size === 0 || topic.collapse)
                return null;
            return createElement(TopicSubLinks, __assign({ ref: saveRef(linksRefKey(topicKey)) }, props));
        },
        renderRootSubLinks: function (props) {
            // log('renderRootSubLinks');
            var saveRef = props.saveRef, topicKey = props.topicKey;
            // 这里逻辑有问题,会导致layout 错误
            // const topic = model.getTopic(topicKey);
            // if (topic.subKeys.size === 0) return null;
            return createElement(RootSubLinks, __assign({ ref: saveRef(linksRefKey(topicKey)) }, props));
        },
        renderFocusItemHighlight: function (props) {
            var saveRef = props.saveRef;
            return (createElement(TopicHighlight, __assign({ ref: saveRef(RefKey.FOCUS_HIGHLIGHT_KEY) }, props)));
        },
        renderRootWidgetOtherChildren: function (props) {
            var controller = props.controller;
            var zoomFactor = controller.run('getZoomFactor', props);
            props = __assign(__assign({}, props), { zoomFactor: zoomFactor });
            return (createElement(Fragment, null,
                controller.run('renderRootSubLinks', props),
                controller.run('renderFocusItemHighlight', props),
                controller.run('renderDragAndDropEffect', props)));
        },
        renderViewPortViewer: function (props) {
            return createElement(ViewPortViewer, __assign({ key: "view-port-viewer" }, props));
        }
    };
}

var templateObject_1$i, templateObject_2$a, templateObject_2$c, templateObject_2$d;
var PanelRoot = styled(ZIndex)(templateObject_1$i || (templateObject_1$i = __makeTemplateObject(["\n  position: absolute;\n  background: white;\n  right: 30px;\n  top: calc(100vh - 75%);\n padding: 5px;\n box-shadow: rgb(185 185 185) 0px 0px 9px 0px;\n border-radius: 50px;\n  user-select: none;\n"], ["\n  position: absolute;\n  background: white;\n  right: 30px;\n  top: calc(100vh - 65%);\n padding: 5px;\n box-shadow: rgb(185 185 185) 0px 0px 9px 0px;\n border-radius: 50px;\n  user-select: none;\n"])));
var Panel_Root = styled(ZIndex)(templateObject_2$c || (templateObject_2$c = __makeTemplateObject(["\n  position: absolute;\n  background: white;\n  right: 30px;\n  top: calc(100vh - 75%);\n padding: 5px;\n box-shadow: rgb(185 185 185) 0px 0px 9px 0px;\n user-select: none;\n"], ["\n  position: absolute;\n  background: white;\n  right: 30px;\n  top: calc(100vh - 65%);\n padding: 5px;\n box-shadow: rgb(185 185 185) 0px 0px 9px 0px;\n user-select: none;\n"])));
var StyledTabs = styled(Tabs)(templateObject_2$a || (templateObject_2$a = __makeTemplateObject(["\n  padding: 0px 10px;\n"], ["\n  padding: 0px 10px;\n"])));
function RightTopPanel(props) {
    var Format = props.format;
    var Emoji = props.emoji;
    var Devicehub = props.devicehub;
    var controller = props.controller, model = props.model, topicKey = props.topicKey, zIndex = props.zIndex, selectedTabId = props.selectedTabId, handleTabIdChange = props.handleTabIdChange;

    var _a = __read(useState(false), 2), expand_theme = _a[0], setThemeExpand = _a[1];
    var _b = __read(useState(false), 2), expand_emoji = _b[0], setEmojiExpand = _b[1];

    if (!expand_theme && !expand_emoji) {
        return (createElement(PanelRoot, { zIndex: zIndex },
            createElement('div', { onClick: function () { return setThemeExpand(true); } },
                Format),
            createElement('div', { onClick: function () { return setEmojiExpand(true); } },
                Emoji),
            createElement('div', { onClick: function () { return setEmojiExpand(true); } },
                Devicehub)
        ));
    }
    if (topicKey === undefined) {
        props = __assign(__assign({}, props), { topicKey: model.focusKey });
    }
    function handleAddEmoji(emoji) {
        controller.run('operation', __assign(__assign({}, props), {
            opType: OpType.ADD_EMOJI, emoji: emoji.native, function() {
                var diagramProps = __assign(__assign({}, props), { controller: controller });
                return controller.run('renderDiagram', diagramProps);
            }
        }));
    };
    return (
        createElement(Panel_Root, { zIndex: zIndex },
            createElement(Title, null,
                createElement(CloseIcon, { className: iconClassName(IconName.CLOSE), onClick: function () { setThemeExpand(false); setEmojiExpand(false); return } })
            ),
            createElement(StyledTabs, { id: selectedTabId, onChange: handleTabIdChange },
                (expand_theme && controller.run('renderRightTopPanelTabs', props)),

            ),
            (expand_emoji && createElement(Picker,
                {
                    onSelect: function (e) { return handleAddEmoji(e) },
                    native: true,
                    style: { boxShadow: 'none', border: 'none' }
                }
            ))
        )
    );
}

var SettingTitle = styled.div(templateObject_1$j || (templateObject_1$j = __makeTemplateObject(["\n  margin-top: 10px;\n  margin-bottom: 5px;\n  font-weight: bold;\n"], ["\n  margin-top: 10px;\n  margin-bottom: 5px;\n  font-weight: bold;\n"])));
var SettingItem = styled.span(templateObject_2$b || (templateObject_2$b = __makeTemplateObject(["\n  margin: 0px 10px 0px 0px;\n"], ["\n  margin: 0px 10px 0px 0px;\n"])));
var SettingBoxContainer = styled.div(templateObject_3$5 || (templateObject_3$5 = __makeTemplateObject(["\n  padding: 10px;\n  margin: 0 0 10px 0;\n  border: rgba(16, 22, 26, 0.15) solid 1px;\n  border-radius: 5px;\n"], ["\n  padding: 10px;\n  margin: 0 0 10px 0;\n  border: rgba(16, 22, 26, 0.15) solid 1px;\n  border-radius: 5px;\n"])));
var SettingLabel = styled(SettingItem)(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject([""], [""])));
var SettingRow = styled.div(templateObject_5$1 || (templateObject_5$1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  //justify-content: center;\n  margin: 5px 0;\n"], ["\n  display: flex;\n  align-items: center;\n  //justify-content: center;\n  margin: 5px 0;\n"])));
var ColorBar = styled.div(templateObject_6$1 || (templateObject_6$1 = __makeTemplateObject(["\n  height: 3px;\n  width: 80%;\n  margin-left: 10%;\n  margin-right: 10%;\n  margin-bottom: 2px;\n  background: ", ";\n"], ["\n  height: 3px;\n  width: 80%;\n  margin-left: 10%;\n  margin-right: 10%;\n  margin-bottom: 2px;\n  background: ", ";\n"])), function (props) { return props.color; });
var WithBorder = styled.div(templateObject_7$1 || (templateObject_7$1 = __makeTemplateObject(["\n  border: 1px solid grey;\n  cursor: pointer;\n  font-weight: bold;\n"], ["\n  border: 1px solid grey;\n  cursor: pointer;\n  font-weight: bold;\n"])));
var templateObject_1$j, templateObject_2$b, templateObject_3$5, templateObject_4$1, templateObject_5$1, templateObject_6$1, templateObject_7$1;

function SettingGroup(props) {
    return (createElement("div", null,
        props.children,
        createElement(Divider, { style: { margin: '10px 0' } })));
}
function SettingItemColorPicker(props) {
    var color = props.color, handleColorChange = props.handleColorChange;
    return (createElement(SettingItem, null,
        createElement(Popover, null,
            createElement(WithBorder, null,
                createElement("div", { className: iconClassName(IconName.COLOR_PICKER) }),
                createElement(ColorBar, { color: color })),
            createElement("div", null,
                createElement(SketchPicker, { color: color, onChangeComplete: function (color) { return handleColorChange(color.hex); } })))));
}
function SettingItemButton(props) {
    var title = props.title, handleClick = props.handleClick;
    return (createElement(SettingItem, null,
        createElement(Button, { onClick: handleClick }, title)));
}
function SettingItemNumericInput(props) {
    var _a = props.layout, layout = _a === void 0 ? 'h' : _a, title = props.title, restProps = __rest(props, ["layout", "title"]);
    var flexProps = {
        flexDirection: layout === 'h' ? 'row' : 'column',
        alignItems: 'center'
    };
    return (createElement(SettingItem, null,
        createElement(Flex, __assign({}, flexProps),
            createElement(Margin, { margin: "0 5px 0 0" }, title),
            createElement(NumericInput, __assign({}, restProps)))));
}
function SettingItemSelect(props) {
    var text = props.text, items = props.items, itemRenderer = props.itemRenderer, onItemSelect = props.onItemSelect;
    var PxSelect = Select.ofType();
    var pxProps = {
        items: items,
        itemRenderer: itemRenderer,
        onItemSelect: onItemSelect,
        filterable: false
    };
    return (createElement(SettingItem, null,
        createElement(PxSelect, __assign({}, pxProps),
            createElement(Button, { text: text }))));
}
var renderItem = function (unit) {
    return function (width, _a) {
        var handleClick = _a.handleClick;
        return (createElement(MenuItem, { text: "" + width + unit, key: width, onClick: handleClick }));
    };
};
var PxSelect = Select.ofType();
var borderWidthItems = __spread(Array(7).keys());

var borderWidthItems$1 = __spread(Array(7).keys());
var borderRadiusItems = [0, 5, 10, 15, 20, 25, 30, 35];
var borderStyleItems = ['none', 'solid', 'dotted', 'dashed', 'double'];
function BorderStyleEditor(props) {
    var contentStyle = props.contentStyle, setContentStyle = props.setContentStyle;
    var handleBorderWidthChange = function (value) {
        // log('handleBorderWithChange:', value);
        setContentStyle({ borderWidth: value + "px" });
    };
    var handleBorderStyleChange = function (value) {
        setContentStyle({ borderStyle: value });
    };
    var handleBorderRadiusChange = function (value) {
        // log('handleBorderRadiusChange:', value);
        setContentStyle({ borderRadius: value + "px" });
    };
    var handleBorderColorChange = function (color) {
        setContentStyle({ borderColor: color });
    };
    return (createElement(SettingGroup, null,
        createElement(SettingTitle, null, "Border"),
        createElement("div", null,
            createElement(SettingItemSelect, { text: "width: " + (contentStyle.borderWidth ? contentStyle.borderWidth : '0px'), items: borderWidthItems$1, itemRenderer: renderItem('px'), onItemSelect: handleBorderWidthChange }),
            createElement(SettingItemSelect, { text: "style: " + (contentStyle.borderStyle ? contentStyle.borderStyle : 'none'), items: borderStyleItems, itemRenderer: renderItem(''), onItemSelect: handleBorderStyleChange }),
            createElement(SettingItemSelect, { text: "radius: " + contentStyle.borderRadius, items: borderRadiusItems, itemRenderer: renderItem('px'), onItemSelect: handleBorderRadiusChange }),
            createElement(SettingItemColorPicker, { color: contentStyle.borderColor, handleColorChange: handleBorderColorChange }))));
}

function ClearAllCustomStyle(props) {
    var controller = props.controller;
    var handleClearAllCustomStyle = function (e) {
        controller.run('clearAllCustomStyle', props);
    };
    return (createElement(SettingGroup, null,
        createElement(SettingItem, null,
            createElement(Button, { onClick: handleClearAllCustomStyle }, "Clear All Custom Styles"))));
}

var lineTypes = ['curve', 'round', 'line'];
var renderLineTypeItem = function (lineType, _a) {
    var handleClick = _a.handleClick, modifiers = _a.modifiers, query = _a.query;
    return createElement(MenuItem, { text: "" + lineType, key: lineType, onClick: handleClick });
};
function LinkStyleEditor(props) {
    var _a = props.showLinkStyle, showLinkStyle = _a === void 0 ? true : _a, _b = props.showSubLinkStyle, showSubLinkStyle = _b === void 0 ? true : _b, _c = props.linkStyle, linkStyle = _c === void 0 ? {} : _c, _d = props.subLinkStyle, subLinkStyle = _d === void 0 ? {} : _d, setLinkStyle = props.setLinkStyle, setSubLinkStyle = props.setSubLinkStyle;
    var handleLinkWidthChange = function (value) {
        setLinkStyle({ lineWidth: value + "px" });
    };
    var handleLinkTypeChange = function (value) {
        setLinkStyle({ lineType: value });
    };
    var handleLinkColorChange = function (color) {
        setLinkStyle({ lineColor: color });
    };
    var handleSubLinkWidthChange = function (value) {
        setSubLinkStyle({ lineWidth: value + "px" });
    };
    var handleSubLinkTypeChange = function (value) {
        setSubLinkStyle({ lineType: value });
    };
    var handleSubLinkColorChange = function (color) {
        setSubLinkStyle({ lineColor: color });
    };
    return (createElement(SettingGroup, null,
        createElement(SettingTitle, null, "Link"),
        showLinkStyle && (createElement(SettingRow, { alignItems: "center" },
            createElement(Margin, { margin: "0 5px 0 0" }, "LinkToParent: "),
            createElement(SettingItemSelect, { text: "width: " + (linkStyle ? linkStyle.lineWidth : '0px'), items: borderWidthItems, itemRenderer: renderItem('px'), onItemSelect: handleLinkWidthChange }),
            createElement(SettingItemSelect, { text: "lineType: " + linkStyle.lineType, items: lineTypes, itemRenderer: renderLineTypeItem, onItemSelect: handleLinkTypeChange }),
            createElement(SettingItemColorPicker, { color: linkStyle.lineColor, handleColorChange: handleLinkColorChange }))),
        showSubLinkStyle && (createElement(SettingRow, { alignItems: "center" },
            createElement(Margin, { margin: "0 5px 0 0" }, "SubLinks: "),
            createElement(SettingItemSelect, { text: "width: " + (subLinkStyle ? subLinkStyle.lineWidth : '0px'), items: borderWidthItems, itemRenderer: renderItem('px'), onItemSelect: handleSubLinkWidthChange }),
            createElement(SettingItemSelect, { text: "lineType: " + subLinkStyle.lineType, items: lineTypes, itemRenderer: renderLineTypeItem, onItemSelect: handleSubLinkTypeChange }),
            createElement(SettingItemColorPicker, { color: subLinkStyle.lineColor, handleColorChange: handleSubLinkColorChange })))));
}

function TextStyleEditor(props) {
    var contentStyle = props.contentStyle, setContentStyle = props.setContentStyle;
    var handleFontSizeChange = function (value) {
        // log('handleFontSizeChange:', value);
        setContentStyle({ fontSize: value });
    };
    var handleLineHeightChange = function (e) {
        // log('handleLineHeightChange:', e.target.value);
        setContentStyle({ lineHeight: e.target.value });
    };
    var handleColorChange = function (color) {
        setContentStyle({ color: color });
    };
    var fontSizeNumInputProps = {
        title: 'FontSize:',
        min: 12,
        max: 100,
        value: parseInt(contentStyle.fontSize),
        style: {
            width: 50
        },
        onValueChange: handleFontSizeChange
    };
    var lineHeightInputProps = {
        style: {
            width: 50
        },
        value: contentStyle.lineHeight || '',
        onChange: handleLineHeightChange
    };
    return (createElement(SettingGroup, null,
        createElement(SettingTitle, null, "Text Editor"),
        createElement(Flex, null,
            createElement(SettingItemNumericInput, __assign({}, fontSizeNumInputProps)),
            createElement(SettingItem, null,
                createElement(Flex, { alignItems: "center" },
                    createElement(Margin, { margin: "0 5px 0 0" }, "LineHeight: "),
                    createElement(InputGroup, __assign({}, lineHeightInputProps)))),
            createElement(SettingItemColorPicker, { color: contentStyle.color, handleColorChange: handleColorChange }))));
}

var log$f = debug('node:style-editor');
var copiedStyle;
function StyleEditor(props) {
    var controller = props.controller, model = props.model, topicKey = props.topicKey;
    var topic = model.getTopic(topicKey);
    var setContentStyle = function (style) {
        controller.run('setTopicContentStyle', __assign(__assign({}, props), { style: style }));
    };
    var handleBackgroundColorChange = function (color) {
        setContentStyle({ background: color });
    };
    var handleClearStyle = function () {
        if (topic.style) {
            controller.run('operation', __assign(__assign({}, props), { opType: OpType.SET_STYLE, style: null }));
        }
    };
    var handleCopyStyle = function () {
        copiedStyle = controller.run('getTopicStyle', props);
        log$f(copiedStyle);
    };
    var handlePasteStyle = function () {
        if (copiedStyle) {
            controller.run('operation', __assign(__assign({}, props), { opType: OpType.SET_STYLE, style: JSON.stringify(copiedStyle) }));
        }
    };
    if (!model.focusKey)
        return null;
    var contentStyle = controller.run('getTopicContentStyle', props);
    var linkStyle = controller.run('getLinkStyle', props);
    var subLinkStyle = controller.run('getSubLinkStyle', props);
    var setLinkStyle = function (linkStyle) {
        controller.run('setLinkStyle', __assign(__assign({}, props), { linkStyle: linkStyle }));
    };
    var setSubLinkStyle = function (subLinkStyle) {
        controller.run('setSubLinkStyle', __assign(__assign({}, props), { subLinkStyle: subLinkStyle }));
    };
    var linkStyleEditorProps = {
        linkStyle: linkStyle,
        subLinkStyle: subLinkStyle,
        setLinkStyle: setLinkStyle,
        setSubLinkStyle: setSubLinkStyle
    };
    var contentStyleEditorPros = {
        contentStyle: contentStyle,
        setContentStyle: setContentStyle
    };
    return (createElement(PanelTabRoot, null,
        createElement(BorderStyleEditor, __assign({}, contentStyleEditorPros)),
        createElement(TextStyleEditor, __assign({}, contentStyleEditorPros)),
        createElement(SettingGroup, null,
            createElement(SettingTitle, null, "Background"),
            createElement(SettingItemColorPicker, { color: contentStyle.background, handleColorChange: handleBackgroundColorChange })),
        createElement(LinkStyleEditor, __assign({}, linkStyleEditorProps)),
        createElement(SettingGroup, null,
            createElement(SettingItemButton, { title: "Clear Topic Style", handleClick: handleClearStyle }),
            createElement(SettingItemButton, { title: "Copy Style", handleClick: handleCopyStyle }),
            createElement(SettingItemButton, { title: "Paste Style", handleClick: handlePasteStyle })),
        ClearAllCustomStyle(props)));
}

/** Event handler that exposes the target element's value as a boolean. */
function handleBooleanChange(handler) {
    return function (event) {
        return handler(event.target.checked);
    };
}

var expand = require('css-shorthand-expand');
function PaddingStyleEditor(props) {
    var contentStyle = props.contentStyle, setContentStyle = props.setContentStyle;
    var padding = expand('padding', contentStyle.padding || '0');
    var commonProps = {
        layout: 'v',
        min: 0,
        max: 99,
        style: {
            width: 38
        }
    };
    var top = parseInt(padding['padding-top']);
    var right = parseInt(padding['padding-right']);
    var bottom = parseInt(padding['padding-bottom']);
    var left = parseInt(padding['padding-left']);
    var p = {
        top: top,
        right: right,
        bottom: bottom,
        left: left
    };
    var setPadding = function (dir) {
        return function (v) {
            var _a;
            setContentStyle({ padding: paddingCss(__assign(__assign({}, p), (_a = {}, _a[dir] = v, _a))) });
        };
    };
    var topProps = __assign(__assign({}, commonProps), { title: 'top', value: top, onValueChange: setPadding('top') });
    var rightProps = __assign(__assign({}, commonProps), { title: 'right', value: right, onValueChange: setPadding('right') });
    var bottomProps = __assign(__assign({}, commonProps), { title: 'bottom', value: bottom, onValueChange: setPadding('bottom') });
    var leftProps = __assign(__assign({}, commonProps), { title: 'left', value: left, onValueChange: setPadding('left') });
    return (createElement(SettingGroup, null,
        createElement(SettingTitle, null, "Padding"),
        createElement(SettingRow, null,
            createElement(SettingItemNumericInput, __assign({}, topProps)),
            createElement(SettingItemNumericInput, __assign({}, rightProps)),
            createElement(SettingItemNumericInput, __assign({}, bottomProps)),
            createElement(SettingItemNumericInput, __assign({}, leftProps)))));
}

var templateObject_1$k;
var TopicThemeEditorRoot = styled.div(templateObject_1$k || (templateObject_1$k = __makeTemplateObject(["\n  height: 250px;\n  overflow: auto;\n"], ["\n  height: 250px;\n  overflow: auto;\n"])));
function TopicThemeEditor(props) {
    var topicStyle = props.topicStyle, setTopicStyle = props.setTopicStyle;
    var _a = topicStyle.contentStyle, contentStyle = _a === void 0 ? {} : _a, _b = topicStyle.linkStyle, linkStyle = _b === void 0 ? {} : _b, _c = topicStyle.subLinkStyle, subLinkStyle = _c === void 0 ? {} : _c;
    var setContentStyle = function (contentStyle) {
        setTopicStyle({ contentStyle: contentStyle });
    };
    var nProps = {
        contentStyle: contentStyle,
        setContentStyle: setContentStyle
    };
    var setLinkStyle = function (linkStyle) {
        setTopicStyle({ linkStyle: linkStyle });
    };
    var setSubLinkStyle = function (subLinkStyle) {
        setTopicStyle({ subLinkStyle: subLinkStyle });
    };
    var linkStyleEditorProps = {
        showLinkStyle: false,
        linkStyle: linkStyle,
        subLinkStyle: subLinkStyle,
        setLinkStyle: setLinkStyle,
        setSubLinkStyle: setSubLinkStyle
    };
    return (createElement(TopicThemeEditorRoot, null,
        createElement(BorderStyleEditor, __assign({}, nProps)),
        createElement(PaddingStyleEditor, __assign({}, nProps)),
        createElement(TextStyleEditor, __assign({}, nProps)),
        createElement(SettingGroup, null,
            createElement(SettingTitle, null, "Background"),
            createElement(SettingItemColorPicker, {
                color: contentStyle.background, handleColorChange: function (color) {
                    setContentStyle({ background: color });
                }
            })),
        createElement(LinkStyleEditor, __assign({}, linkStyleEditorProps))));
}

var tabId = 'normal';
function ThemeEditor(props) {
    var _a = __read(useState(false), 2), showExportDialog = _a[0], setShowExportDialog = _a[1];
    var _b = __read(useState(false), 2), alertThemeError = _b[0], setAlertThemeError = _b[1];
    var model = props.model, controller = props.controller;
    var theme = model.config.theme;
    var rootTopic = theme.rootTopic, primaryTopic = theme.primaryTopic, normalTopic = theme.normalTopic;
    var setTheme = function (theme) {
        controller.run('operation', __assign(__assign({}, props), { opType: OpType.SET_THEME, theme: clone(theme) }));
    };
    var handleBackgroundColorChange = function (background) {
        setTheme(merge(theme, { background: background }));
    };
    var handleHighlightColorChange = function (highlightColor) {
        setTheme(merge(theme, { highlightColor: highlightColor }));
    };
    var handleRandomColorChange = handleBooleanChange(function (randomColor) {
        setTheme(merge(theme, { randomColor: randomColor }));
    });
    var setRootTopicStyle = function (style) {
        setTheme(merge(theme, { rootTopic: style }));
    };
    var setPrimaryTopicStyle = function (style) {
        setTheme(merge(theme, { primaryTopic: style }));
    };
    var setNormalTopicStyle = function (style) {
        setTheme(merge(theme, { normalTopic: style }));
    };
    var rootTopicEditorProps = {
        topicStyle: rootTopic,
        setTopicStyle: setRootTopicStyle
    };
    var rootTopicEditor = createElement(TopicThemeEditor, __assign({}, rootTopicEditorProps));
    var primaryTopicEditorProps = {
        topicStyle: primaryTopic,
        setTopicStyle: setPrimaryTopicStyle
    };
    var primaryTopicEditor = createElement(TopicThemeEditor, __assign({}, primaryTopicEditorProps));
    var normalTopicEditorProps = {
        topicStyle: normalTopic,
        setTopicStyle: setNormalTopicStyle
    };
    var normalTopicEditor = createElement(TopicThemeEditor, __assign({}, normalTopicEditorProps));
    var tabsProps = {
        id: tabId,
        handleTabIdChange: function (id) {
            tabId = id;
        }
    };
    var topicThemes = (createElement(SettingBoxContainer, null,
        createElement(Tabs, __assign({}, tabsProps),
            createElement(Tab, { id: "normal", title: "NormalTopic", panel: normalTopicEditor }),
            createElement(Tab, { id: "primary", title: "PrimaryTopic", panel: primaryTopicEditor }),
            createElement(Tab, { id: "root", title: "RootTopic", panel: rootTopicEditor }))));
    var handleExportTheme = function (e) {
        // setShowExportDialog(true);
        var text = JSON.stringify(theme);
        browserDownloadText(text, 'blink-mind-theme.json');
    };
    var handleImportTheme = function (e) {
        browserOpenFile('.json,.txt').then(function (txt) {
            var t = JSON.parse(txt);
            if (!isThemeType(t)) {
                setAlertThemeError(true);
                return;
            }
            setTheme(t);
        });
    };
    var alertProps = {
        isOpen: alertThemeError,
        onClose: function (e) {
            setAlertThemeError(false);
        }
    };
    var alert = (createElement(Alert, __assign({}, alertProps),
        createElement("p", null, "File format error")));
    return (createElement(PanelTabRoot, null,
        createElement(SettingGroup, null,
            createElement(SettingTitle, null, "Global"),
            createElement(SettingRow, null,
                createElement(SettingLabel, null, "Background:"),
                createElement(SettingItemColorPicker, { color: theme.background, handleColorChange: handleBackgroundColorChange }),
                createElement(SettingLabel, null, "Highlight:"),
                createElement(SettingItemColorPicker, { color: theme.highlightColor, handleColorChange: handleHighlightColorChange }),
                createElement(SettingLabel, null, "Random Color:"),
                createElement(StyledCheckbox, { checked: theme.randomColor, onChange: handleRandomColorChange }))),
        topicThemes,
        createElement(SettingGroup, null,
            createElement(SettingItemButton, { title: "Export Theme", handleClick: handleExportTheme }),
            createElement(SettingItemButton, { title: "Import Theme", handleClick: handleImportTheme })),
        alert));
}

function RightTopPanelPlugin() {
    var selectedTabId = 'topic-style';
    var handleTabIdChange = function (tabId) {
        selectedTabId = tabId;
    };
    return {
        renderRightTopPanel: function (props) {
            var nProps = __assign(__assign({}, props), {
                key: 'right-top-panel', selectedTabId: selectedTabId,
                handleTabIdChange: handleTabIdChange
            });
            return createElement(RightTopPanel, __assign({}, nProps));
        },
        renderRightTopPanelTabs: function (props) {
            var controller = props.controller;
            var styleEditorTab = controller.run('renderTopicStyleEditor', props);
            var themeEditorTab = controller.run('renderThemeEditor', props);
            return [styleEditorTab, themeEditorTab];
        },
        renderTopicStyleEditor: function (props) {
            var tProps = {
                id: 'topic-style',
                key: 'topic-style',
                title: 'TopicStyle',
                panel: createElement(StyleEditor, __assign({}, props))
            };
            return createElement(Tab, __assign({}, tProps));
        },
        renderThemeEditor: function (props) {
            var tProps = {
                id: 'theme-editor',
                key: 'theme-editor',
                title: 'Theme',
                panel: createElement(ThemeEditor, __assign({}, props))
            };
            return createElement(Tab, __assign({}, tProps));
        }
    };
}

var log$g = debug('plugin:utils');
function UtilsPlugin() {
    var tempValueMap = new Map();
    var eventListenerMap = new Map();
    return {
        addTempValueChangeListener: function (props) {
            var key = props.key, listener = props.listener;
            if (!eventListenerMap.has(key)) {
                eventListenerMap.set(key, []);
            }
            eventListenerMap.get(key).push(listener);
        },
        removeTempValueChangeListener: function (props) {
            var key = props.key, listener = props.listener;
            if (eventListenerMap.has(key)) {
                eventListenerMap[key] = eventListenerMap
                    .get(key)
                    .filter(function (l) { return l !== listener; });
            }
        },
        getTempValue: function (props) {
            var key = props.key;
            log$g('getTempValue', key);
            return tempValueMap.get(key);
        },
        setTempValue: function (props) {
            var e_1, _a;
            var key = props.key, value = props.value;
            log$g('setTempValue', key);
            tempValueMap.set(key, value);
            if (eventListenerMap.has(key)) {
                var listeners = eventListenerMap.get(key);
                try {
                    for (var listeners_1 = __values(listeners), listeners_1_1 = listeners_1.next(); !listeners_1_1.done; listeners_1_1 = listeners_1.next()) {
                        var listener = listeners_1_1.value;
                        listener(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (listeners_1_1 && !listeners_1_1.done && (_a = listeners_1.return)) _a.call(listeners_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        },
        deleteTempValue: function (props) {
            var key = props.key;
            log$g('deleteTempValue', key);
            var value = tempValueMap.get(key);
            tempValueMap.delete(key);
            return value;
        }
    };
}

function ReactPlugin(options) {
    return [
        RenderingPlugin(),
        UtilsPlugin(),
        ContextMenuPlugin(),
        RightTopPanelPlugin(),
        DragAndDropPlugin()
    ];
}

var log$h = debug('plugin:StylePlugin');
function StylePlugin() {
    var colorMap = new Map();
    var colorIndex = 0;
    return {
        getTopicStyle: function (props) {
            var controller = props.controller;
            return {
                contentStyle: controller.run('getTopicContentStyle', props),
                linkStyle: controller.run('getLinkStyle', props),
                subLinkStyle: controller.run('getSubLinkStyle', props)
            };
        },
        getTopicContentStyle: function (props) {
            var topicKey = props.topicKey, model = props.model, controller = props.controller;
            log$h('getTopicContentStyle:', topicKey, model);
            var visualLevel = model.getTopicVisualLevel(topicKey);
            var theme = model.config.theme;
            var themeStyle;
            if (visualLevel === TopicVisualLevel.ROOT)
                themeStyle = theme.rootTopic;
            else if (visualLevel === TopicVisualLevel.PRIMARY)
                themeStyle = theme.primaryTopic;
            else
                themeStyle = theme.normalTopic;
            themeStyle = __assign(__assign({}, theme.contentStyle), themeStyle.contentStyle);
            if (theme.randomColor) {
                var randomColor = controller.run('getRandomColor', props);
                themeStyle = __assign(__assign({}, themeStyle), { background: randomColor, borderColor: randomColor, subLinkStyle: __assign(__assign({}, themeStyle.subLinkStyle), { lineColor: randomColor }) });
            }
            var topic = model.getTopic(topicKey);
            if (!topic.style) {
                return themeStyle;
            }
            var customStyle = JSON.parse(topic.style);
            return __assign(__assign({}, themeStyle), customStyle.contentStyle);
        },
        getLinkStyle: function (props) {
            var topicKey = props.topicKey, model = props.model, controller = props.controller;
            log$h('getLinkStyle', topicKey);
            var visualLevel = model.getTopicVisualLevel(topicKey);
            var theme = model.config.theme;
            var linkStyle = theme.linkStyle;
            var presetStyle;
            if (visualLevel === TopicVisualLevel.ROOT)
                presetStyle = theme.rootTopic.linkStyle;
            else if (visualLevel === TopicVisualLevel.PRIMARY)
                presetStyle = theme.primaryTopic.linkStyle;
            else
                presetStyle = theme.normalTopic.linkStyle;
            linkStyle = __assign(__assign({}, linkStyle), presetStyle);
            var topic = model.getTopic(topicKey);
            if (topic.parentKey != null) {
                var parentSubLinkStyle = controller.run('getSubLinkStyle', __assign(__assign({}, props), { topicKey: topic.parentKey }));
                linkStyle = __assign(__assign({}, linkStyle), parentSubLinkStyle);
            }
            if (!topic.style) {
                return linkStyle;
            }
            var customStyle = JSON.parse(topic.style);
            return __assign(__assign({}, linkStyle), customStyle.linkStyle);
        },
        getSubLinkStyle: function (props) {
            var topicKey = props.topicKey, model = props.model, controller = props.controller;
            log$h('getLinkStyle', topicKey);
            var visualLevel = model.getTopicVisualLevel(topicKey);
            var theme = model.config.theme;
            var subLinkStyle = theme.linkStyle;
            var presetStyle;
            if (visualLevel === TopicVisualLevel.ROOT)
                presetStyle = theme.rootTopic.subLinkStyle;
            else if (visualLevel === TopicVisualLevel.PRIMARY)
                presetStyle = theme.primaryTopic.subLinkStyle;
            else
                presetStyle = theme.normalTopic.subLinkStyle;
            subLinkStyle = __assign(__assign({}, subLinkStyle), presetStyle);
            var topic = model.getTopic(topicKey);
            // 获取父节点的color
            if (theme.randomColor) {
                var randomColor = controller.run('getRandomColor', props);
                log$h(randomColor);
                subLinkStyle = __assign(__assign({}, subLinkStyle), { lineColor: randomColor });
            }
            if (!topic.style) {
                return subLinkStyle;
            }
            var customStyle = JSON.parse(topic.style);
            var res = __assign(__assign({}, subLinkStyle), customStyle.subLinkStyle);
            // if (res.lineRadius == null) res.lineRadius = 5;
            return res;
        },
        setTopicContentStyle: function (props) {
            var topicKey = props.topicKey, controller = props.controller, style = props.style, model = props.model;
            var topic = model.getTopic(topicKey);
            var topicStyle = topic.style;
            var styleObj = topicStyle ? JSON.parse(topicStyle) : {};
            var newStyleObj = __assign(__assign({}, styleObj), { contentStyle: __assign(__assign({}, styleObj.contentStyle), style) });
            if (!isEqual(styleObj, newStyleObj)) {
                var newStyleStr = JSON.stringify(newStyleObj);
                controller.run('operation', __assign(__assign({}, props), { opType: OpType.SET_STYLE, style: newStyleStr }));
            }
        },
        setLinkStyle: function (props) {
            var topicKey = props.topicKey, controller = props.controller, linkStyle = props.linkStyle, model = props.model;
            var topic = model.getTopic(topicKey);
            var style = topic.style;
            var styleObj = style ? JSON.parse(style) : {};
            var newStyleObj = __assign(__assign({}, styleObj), { linkStyle: __assign(__assign({}, styleObj.linkStyle), linkStyle) });
            if (!isEqual(styleObj, newStyleObj)) {
                var newStyleStr = JSON.stringify(newStyleObj);
                controller.run('operation', __assign(__assign({}, props), { opType: OpType.SET_STYLE, style: newStyleStr }));
            }
        },
        setSubLinkStyle: function (props) {
            var topicKey = props.topicKey, controller = props.controller, subLinkStyle = props.subLinkStyle, model = props.model;
            var topic = model.getTopic(topicKey);
            var style = topic.style;
            var styleObj = style ? JSON.parse(style) : {};
            var newStyleObj = __assign(__assign({}, styleObj), { subLinkStyle: __assign(__assign({}, styleObj.subLinkStyle), subLinkStyle) });
            if (!isEqual(styleObj, newStyleObj)) {
                var newStyleStr = JSON.stringify(newStyleObj);
                controller.run('operation', __assign(__assign({}, props), { opType: OpType.SET_STYLE, style: newStyleStr }));
            }
        },
        getTopicThemeStyle: function (props) {
            var topicKey = props.topicKey, model = props.model;
            var visualLevel = model.getTopicVisualLevel(topicKey);
            var theme = model.config.theme;
            if (visualLevel === TopicVisualLevel.ROOT)
                return theme.rootTopic;
            if (visualLevel === TopicVisualLevel.PRIMARY)
                return theme.primaryTopic;
            return theme.normalTopic;
        },
        getRandomColor: function (props) {
            var topicKey = props.topicKey;
            if (colorMap.has(topicKey))
                return colorMap.get(topicKey);
            var colors = [
                '#00CC99',
                '#FFEE88',
                '#A167A5',
                '#E5F993',
                '#F5C396',
                '#DB995A',
                '#83BCFF',
                '#ED7B84',
                '#739E82',
                '#D3BCC0',
                '#FFA0FD',
                '#EFD3D7',
                '#C6878F'
            ];
            var color = colors[++colorIndex % colors.length];
            colorMap.set(topicKey, color);
            log$h('getRandomColor', topicKey, color);
            return color;
        },
        clearAllCustomStyle: function (props) {
            var model = props.model, controller = props.controller;
            var newModel = model.withMutations(function (model) {
                model.topics.keySeq().forEach(function (key) {
                    model.setIn(['topics', key, 'style'], null);
                });
            });
            controller.change(newModel);
        }
    };
}

function DefaultPlugin() {
    return [
        ReactPlugin(),
        LayoutPlugin(),
        OperationPlugin(),
        StylePlugin(),
        EventPlugin(),
        HotKeyPlugin(),
        GetValuePlugin(),
        SimpleTextEditorPlugin()
    ];
}

var log$i = debug('node:Diagram');
var Diagram = /** @class */ (function (_super) {
    __extends(Diagram, _super);
    function Diagram() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.resolveController = memoizeOne(function (plugins, TheDefaultPlugin) {
            if (plugins === void 0) { plugins = []; }
            var defaultPlugin = TheDefaultPlugin();
            _this.controller = new Controller({
                plugins: [plugins, defaultPlugin],
                construct: false,
                onChange: _this.props.onChange
            });
            // this.controller.run('onConstruct');
        });
        return _this;
    }
    Diagram.prototype.getDiagramProps = function () {
        return this.controller.run('getDiagramProps');
    };
    Diagram.prototype.openNewModel = function (newModel) {
        var _this = this;
        var props = this.getDiagramProps();
        var model = props.model, controller = props.controller;
        controller.run('deleteRefKey', __assign(__assign({}, props), { topicKey: model.rootTopicKey }));
        controller.run('operation', __assign(__assign({}, props), {
            opType: OpType.EXPAND_TO, topicKey: newModel.focusKey, model: newModel, callback: function () {
                var props = _this.getDiagramProps();
                var model = props.model;
                controller.run('moveTopicToCenter', __assign(__assign({}, props), { topicKey: model.focusKey }));
            }
        }));
    };
    Diagram.prototype.render = function () {
        var plugins = this.props.plugins;
        this.resolveController(plugins, DefaultPlugin);
        this.diagramProps = __assign(__assign({}, this.props), { controller: this.controller });
        return this.controller.run('renderDiagram', this.diagramProps);
    };
    return Diagram;
}(Component));

export { BaseWidget, Btn, CloseIcon, DefaultPlugin, Diagram, DragScrollWidget, EventKey, Flex, HotKeyName, HotKeyPlugin, Icon, IconBg, IconName, Margin, PanelTabRoot, PropKey, RefKey, SaveRef, ShowMenuIcon, StyledCheckbox, Title, TopicBlockIcon, ZIndex, browserDownloadFile, browserDownloadText, browserOpenFile, cancelEvent, center, centerPointX, centerPointY, centerX, centerY, collapseRefKey, contentEditorRefKey, contentRefKey, descEditorRefKey, commentEditorRefKey, dropAreaRefKey, getLinkKey, getRelativeRect, getRelativeVector, iconClassName, linksRefKey, linksSvgRefKey, paddingCss, topicRefKey, topicWidgetRefKey };
//# sourceMappingURL=main.es.js.map
