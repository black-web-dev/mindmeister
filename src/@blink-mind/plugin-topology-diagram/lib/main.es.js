import { OpType, FocusMode, ModelModifier } from '@blink-mind/core';
import { iconClassName, TopicBlockIcon, BaseWidget, Btn, Icon, IconName, cancelEvent } from '@blink-mind/renderer-react';
import { Alert, Tooltip, Position, Classes, Drawer, MenuDivider, MenuItem } from '@blueprintjs/core';
import { createElement, Component, Fragment } from 'react';
import { Topology } from 'topology-core';
import { registerNode } from 'topology-core/middles';
import { flowData, flowDataAnchors, flowDataIconRect, flowDataTextRect, flowSubprocess, flowSubprocessIconRect, flowSubprocessTextRect, flowDb, flowDbIconRect, flowDbTextRect, flowDocument, flowDocumentAnchors, flowDocumentIconRect, flowDocumentTextRect, flowInternalStorage, flowInternalStorageIconRect, flowInternalStorageTextRect, flowExternStorage, flowExternStorageAnchors, flowExternStorageIconRect, flowExternStorageTextRect, flowQueue, flowQueueIconRect, flowQueueTextRect, flowManually, flowManuallyAnchors, flowManuallyIconRect, flowManuallyTextRect, flowDisplay, flowDisplayAnchors, flowDisplayIconRect, flowDisplayTextRect, flowParallel, flowParallelAnchors, flowComment, flowCommentAnchors } from 'topology-flow-diagram';
import '@blink-mind/icons/iconfont/topology';
import styled from 'styled-components';
import { activityFinal, activityFinalIconRect, activityFinalTextRect, swimlaneV, swimlaneVIconRect, swimlaneVTextRect, swimlaneH, swimlaneHIconRect, swimlaneHTextRect, fork, forkHAnchors, forkIconRect, forkTextRect, forkVAnchors } from 'topology-activity-diagram';
import { simpleClass, simpleClassIconRect, simpleClassTextRect, interfaceClass, interfaceClassIconRect, interfaceClassTextRect } from 'topology-class-diagram';
import { lifeline, lifelineAnchors, lifelineIconRect, lifelineTextRect, sequenceFocus, sequenceFocusAnchors, sequenceFocusIconRect, sequenceFocusTextRect } from 'topology-sequence-diagram';

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

var extendStatics = function(d, b) {
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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var FOCUS_MODE_EDITING_TOPOLOGY = 'FOCUS_MODE_EDITING_TOPOLOGY';
var OP_TYPE_START_EDITING_TOPOLOGY = 'OP_TYPE_START_EDITING_TOPOLOGY';
var BLOCK_TYPE_TOPOLOGY = 'TOPOLOGY';
var REF_KEY_TOPOLOGY_DIAGRAM = 'TOPOLOGY_DIAGRAM';
var REF_KEY_TOPOLOGY_DIAGRAM_UTIL = 'TOPOLOGY_DIAGRAM_UTIL';

function TopicBlockTopology(props) {
    var controller = props.controller, model = props.model, topicKey = props.topicKey;
    var onClick = function (e) {
        e.stopPropagation();
        controller.run('operation', __assign(__assign({}, props), { opType: OP_TYPE_START_EDITING_TOPOLOGY }));
    };
    var isEditing = model.focusKey === topicKey &&
        model.focusMode === FOCUS_MODE_EDITING_TOPOLOGY;
    var block = model.getTopic(topicKey).getBlock(BLOCK_TYPE_TOPOLOGY).block;
    if (!isEditing && !block)
        return null;
    var iconProps = {
        className: iconClassName('topology'),
        onClick: onClick,
        tabIndex: -1
    };
    return createElement(TopicBlockIcon, __assign({}, iconProps));
}

var ToolsConfig = [
    {
        group: 'Basic',
        children: [
            {
                name: 'rectangle',
                icon: 'icon-rect',
                data: {
                    text: 'Topology',
                    rect: {
                        width: 100,
                        height: 100
                    },
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 10,
                    paddingBottom: 10,
                    name: 'rectangle',
                    icon: '\ue64d',
                    iconFamily: 'topology',
                    iconColor: '#2f54eb'
                }
            },
            {
                name: 'rectangle',
                icon: 'icon-rectangle',
                data: {
                    text: 'rectangle',
                    rect: {
                        width: 200,
                        height: 50
                    },
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: 0.1,
                    name: 'rectangle'
                }
            },
            {
                name: 'circle',
                icon: 'icon-circle',
                data: {
                    text: 'circle',
                    rect: {
                        width: 100,
                        height: 100
                    },
                    name: 'circle',
                    textMaxLine: 1
                }
            },
            {
                name: 'triangle',
                icon: 'icon-triangle',
                data: {
                    text: 'triangle',
                    rect: {
                        width: 100,
                        height: 100
                    },
                    name: 'triangle'
                }
            },
            {
                name: 'diamond',
                icon: 'icon-diamond',
                data: {
                    text: 'diamond',
                    rect: {
                        width: 100,
                        height: 100
                    },
                    name: 'diamond'
                }
            },
            {
                name: 'pentagon',
                icon: 'icon-pentagon',
                data: {
                    text: 'pentagon',
                    rect: {
                        width: 100,
                        height: 100
                    },
                    name: 'pentagon'
                }
            },
            {
                name: 'hexagon',
                icon: 'icon-hexagon',
                data: {
                    text: 'hexagon',
                    rect: {
                        width: 100,
                        height: 100
                    },
                    paddingTop: 10,
                    paddingBottom: 10,
                    name: 'hexagon'
                }
            },
            {
                name: 'pentagram',
                icon: 'icon-pentagram',
                data: {
                    text: 'pentagram',
                    rect: {
                        width: 100,
                        height: 100
                    },
                    name: 'pentagram'
                }
            },
            {
                name: 'left arrow',
                icon: 'icon-arrow-left',
                data: {
                    text: '',
                    rect: {
                        width: 200,
                        height: 100
                    },
                    name: 'leftArrow'
                }
            },
            {
                name: 'right arrow',
                icon: 'icon-arrow-right',
                data: {
                    text: '',
                    rect: {
                        width: 200,
                        height: 100
                    },
                    name: 'rightArrow'
                }
            },
            {
                name: 'bidirectional arrow',
                icon: 'icon-twoway-arrow',
                data: {
                    text: '',
                    rect: {
                        width: 200,
                        height: 100
                    },
                    name: 'twowayArrow'
                }
            },
            {
                name: 'line',
                icon: 'icon-line',
                data: {
                    text: 'line',
                    rect: {
                        width: 100,
                        height: 100
                    },
                    name: 'line'
                }
            },
            {
                name: 'cloud',
                icon: 'icon-cloud',
                data: {
                    text: 'cloud',
                    rect: {
                        width: 100,
                        height: 100
                    },
                    name: 'cloud'
                }
            },
            {
                name: 'message',
                icon: 'icon-msg',
                data: {
                    text: 'message',
                    rect: {
                        width: 100,
                        height: 100
                    },
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 10,
                    paddingBottom: 10,
                    name: 'message'
                }
            },
            {
                name: 'file',
                icon: 'icon-file',
                data: {
                    text: 'file',
                    rect: {
                        width: 80,
                        height: 100
                    },
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 10,
                    paddingBottom: 10,
                    name: 'file'
                }
            },
            {
                name: 'text',
                icon: 'icon-text',
                data: {
                    text: 'text',
                    rect: {
                        width: 160,
                        height: 30
                    },
                    name: 'text'
                }
            },
            {
                name: 'image',
                icon: 'icon-image',
                data: {
                    text: '',
                    rect: {
                        width: 100,
                        height: 100
                    },
                    name: 'image',
                    image: '/assets/img/logo.png'
                }
            },
            {
                name: 'cube',
                icon: 'icon-cube',
                data: {
                    rect: {
                        width: 50,
                        height: 70
                    },
                    is3D: true,
                    z: 10,
                    zRotate: 15,
                    fillStyle: '#ddd',
                    name: 'cube',
                    icon: '\ue63c',
                    iconFamily: 'topology',
                    iconColor: '#777',
                    iconSize: 30
                }
            },
            {
                name: 'people',
                icon: 'icon-people',
                data: {
                    rect: {
                        width: 70,
                        height: 100
                    },
                    name: 'people'
                }
            },
            {
                name: 'multi media',
                icon: 'icon-pc',
                data: {
                    text: 'multi media',
                    rect: {
                        width: 200,
                        height: 200
                    },
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 10,
                    paddingBottom: 10,
                    // strokeStyle: 'transparent',
                    name: 'div'
                }
            }
        ]
    },
    {
        group: 'Flow Graph',
        children: [
            {
                name: 'start/end',
                icon: 'icon-flow-start',
                data: {
                    text: 'start',
                    rect: {
                        width: 120,
                        height: 40
                    },
                    borderRadius: 0.5,
                    name: 'rectangle'
                }
            },
            {
                name: 'flow',
                icon: 'icon-rectangle',
                data: {
                    text: 'flow',
                    rect: {
                        width: 120,
                        height: 40
                    },
                    name: 'rectangle'
                }
            },
            {
                name: 'judgement',
                icon: 'icon-diamond',
                data: {
                    text: 'judgement',
                    rect: {
                        width: 120,
                        height: 60
                    },
                    name: 'diamond'
                }
            },
            {
                name: 'data',
                icon: 'icon-flow-data',
                data: {
                    text: 'data',
                    rect: {
                        width: 120,
                        height: 50
                    },
                    name: 'flowData'
                }
            },
            {
                name: 'prepare',
                icon: 'icon-flow-ready',
                data: {
                    text: 'prepare',
                    rect: {
                        width: 120,
                        height: 50
                    },
                    name: 'hexagon'
                }
            },
            {
                name: 'sub flow',
                icon: 'icon-flow-subprocess',
                data: {
                    text: 'sub flow',
                    rect: {
                        width: 120,
                        height: 50
                    },
                    name: 'flowSubprocess'
                }
            },
            {
                name: 'database',
                icon: 'icon-db',
                data: {
                    text: 'database',
                    rect: {
                        width: 80,
                        height: 120
                    },
                    name: 'flowDb'
                }
            },
            {
                name: 'document',
                icon: 'icon-flow-document',
                data: {
                    text: 'document',
                    rect: {
                        width: 120,
                        height: 100
                    },
                    name: 'flowDocument'
                }
            },
            {
                name: 'internal storage',
                icon: 'icon-internal-storage',
                data: {
                    text: 'internal storage',
                    rect: {
                        width: 120,
                        height: 80
                    },
                    name: 'flowInternalStorage'
                }
            },
            {
                name: 'external storage',
                icon: 'icon-extern-storage',
                data: {
                    text: 'external storage',
                    rect: {
                        width: 120,
                        height: 80
                    },
                    name: 'flowExternStorage'
                }
            },
            {
                name: 'queue',
                icon: 'icon-flow-queue',
                data: {
                    text: 'queue',
                    rect: {
                        width: 100,
                        height: 100
                    },
                    name: 'flowQueue'
                }
            },
            {
                name: 'input manually',
                icon: 'icon-flow-manually',
                data: {
                    text: 'input manually',
                    rect: {
                        width: 120,
                        height: 80
                    },
                    name: 'flowManually'
                }
            },
            {
                name: 'display',
                icon: 'icon-flow-display',
                data: {
                    text: 'display',
                    rect: {
                        width: 120,
                        height: 80
                    },
                    name: 'flowDisplay'
                }
            },
            {
                name: 'parallel',
                icon: 'icon-flow-parallel',
                data: {
                    text: 'parallel',
                    rect: {
                        width: 120,
                        height: 50
                    },
                    name: 'flowParallel'
                }
            },
            {
                name: 'comment',
                icon: 'icon-flow-comment',
                data: {
                    text: 'comment',
                    rect: {
                        width: 100,
                        height: 100
                    },
                    name: 'flowComment'
                }
            }
        ]
    },
    {
        group: 'Activity Diagram',
        children: [
            {
                name: 'start',
                icon: 'icon-inital',
                data: {
                    text: '',
                    rect: {
                        width: 30,
                        height: 30
                    },
                    name: 'circle',
                    fillStyle: '#555',
                    strokeStyle: 'transparent'
                }
            },
            {
                name: 'end',
                icon: 'icon-final',
                data: {
                    text: '',
                    rect: {
                        width: 30,
                        height: 30
                    },
                    name: 'activityFinal'
                }
            },
            {
                name: 'action',
                icon: 'icon-action',
                data: {
                    text: 'action',
                    rect: {
                        width: 120,
                        height: 50
                    },
                    borderRadius: 0.25,
                    name: 'rectangle'
                }
            },
            {
                name: 'decision/merge',
                icon: 'icon-diamond',
                data: {
                    text: '决策',
                    rect: {
                        width: 120,
                        height: 50
                    },
                    name: 'diamond'
                }
            },
            {
                name: 'vertical swimming lane',
                icon: 'icon-swimlane-v',
                data: {
                    text: 'vertical swimming lane',
                    rect: {
                        width: 200,
                        height: 500
                    },
                    name: 'swimlaneV'
                }
            },
            {
                name: 'horizontal swimming lane',
                icon: 'icon-swimlane-h',
                data: {
                    text: 'horizontal swimming lane',
                    rect: {
                        width: 500,
                        height: 200
                    },
                    name: 'swimlaneH'
                }
            },
            {
                name: 'vertical fork/merge',
                icon: 'icon-fork-v',
                data: {
                    text: '',
                    rect: {
                        width: 10,
                        height: 150
                    },
                    name: 'forkV',
                    fillStyle: '#555',
                    strokeStyle: 'transparent'
                }
            },
            {
                name: 'horizontal fork/merge',
                icon: 'icon-fork',
                data: {
                    text: '',
                    rect: {
                        width: 150,
                        height: 10
                    },
                    name: 'forkH',
                    fillStyle: '#555',
                    strokeStyle: 'transparent'
                }
            }
        ]
    },
    {
        group: 'Sequence Diagram && Class Diagram',
        children: [
            {
                name: 'lifeline',
                icon: 'icon-lifeline',
                data: {
                    text: 'lifeline',
                    rect: {
                        width: 150,
                        height: 400
                    },
                    name: 'lifeline'
                }
            },
            {
                name: 'activation',
                icon: 'icon-focus',
                data: {
                    text: '',
                    rect: {
                        width: 12,
                        height: 200
                    },
                    name: 'sequenceFocus'
                }
            },
            {
                name: 'simple class',
                icon: 'icon-simple-class',
                data: {
                    text: 'Topolgoy',
                    rect: {
                        width: 270,
                        height: 200
                    },
                    paddingTop: 40,
                    font: {
                        fontFamily: 'Arial',
                        color: '#222',
                        fontWeight: 'bold'
                    },
                    fillStyle: '#ffffba',
                    strokeStyle: '#7e1212',
                    name: 'simpleClass',
                    children: [
                        {
                            text: '- name: string\n+ setName(name: string): void',
                            name: 'text',
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                            rectInParent: {
                                x: 0,
                                y: 0,
                                width: '100%',
                                height: '100%',
                                rotate: 0
                            },
                            font: {
                                fontFamily: 'Arial',
                                color: '#222',
                                textAlign: 'left',
                                textBaseline: 'top'
                            }
                        }
                    ]
                }
            },
            {
                name: 'class',
                icon: 'icon-class',
                data: {
                    text: 'Topolgoy',
                    rect: {
                        width: 270,
                        height: 200
                    },
                    paddingTop: 40,
                    font: {
                        fontFamily: 'Arial',
                        color: '#222',
                        fontWeight: 'bold'
                    },
                    fillStyle: '#ffffba',
                    strokeStyle: '#7e1212',
                    name: 'interfaceClass',
                    children: [
                        {
                            text: '- name: string',
                            name: 'text',
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                            rectInParent: {
                                x: 0,
                                y: 0,
                                width: '100%',
                                height: '50%',
                                rotate: 0
                            },
                            font: {
                                fontFamily: 'Arial',
                                color: '#222',
                                textAlign: 'left',
                                textBaseline: 'top'
                            }
                        },
                        {
                            text: '+ setName(name: string): void',
                            name: 'text',
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                            rectInParent: {
                                x: 0,
                                y: '50%',
                                width: '100%',
                                height: '50%',
                                rotate: 0
                            },
                            font: {
                                fontFamily: 'Arial',
                                color: '#222',
                                textAlign: 'left',
                                textBaseline: 'top'
                            }
                        }
                    ]
                }
            }
        ]
    }
];

var Root = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  display: flex;\n  width: 100%;\n  height: 100%;\n"], ["\n  position: relative;\n  display: flex;\n  width: 100%;\n  height: 100%;\n"])));
var Canvas = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  flex: 1;\n  width: initial;\n  position: relative;\n  overflow: auto;\n  background: #fff;\n"], ["\n  flex: 1;\n  width: initial;\n  position: relative;\n  overflow: auto;\n  background: #fff;\n"])));
var Tools = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex-shrink: 0;\n  width: 15rem;\n  background-color: #f8f8f8;\n  border-right: 1px solid #d9d9d9;\n  overflow-y: auto;\n"], ["\n  flex-shrink: 0;\n  width: 15rem;\n  background-color: #f8f8f8;\n  border-right: 1px solid #d9d9d9;\n  overflow-y: auto;\n"])));
var ToolTitle = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  color: #0d1a26;\n  font-weight: 600;\n  font-size: 1em;\n  padding: 0.5rem 1rem;\n  margin-top: 0.08rem;\n  border-bottom: 1px solid #ddd;\n\n  &:first-child {\n    border-top: none;\n  }\n"], ["\n  color: #0d1a26;\n  font-weight: 600;\n  font-size: 1em;\n  padding: 0.5rem 1rem;\n  margin-top: 0.08rem;\n  border-bottom: 1px solid #ddd;\n\n  &:first-child {\n    border-top: none;\n  }\n"])));
var ToolbarButtons = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  padding: 0.5rem 0;\n  a {\n    display: inline-block;\n    color: @text-color;\n    line-height: 1;\n    width: 2rem;\n    height: 2rem;\n    text-align: center;\n    text-decoration: none !important;\n\n    .iconfont {\n      font-size: 5rem;\n    }\n  }\n"], ["\n  padding: 0.5rem 0;\n  a {\n    display: inline-block;\n    color: @text-color;\n    line-height: 1;\n    width: 2rem;\n    height: 2rem;\n    text-align: center;\n    text-decoration: none !important;\n\n    .iconfont {\n      font-size: 5rem;\n    }\n  }\n"])));
var TopologyDiagram = /** @class */ (function (_super) {
    __extends(TopologyDiagram, _super);
    function TopologyDiagram() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            id: '',
            data: null,
            toolsConfig: ToolsConfig,
            iconfont: { fontSize: '1.24rem' }
        };
        _this.canvasOptions = {};
        _this.handleContextMenu = function (e) {
            e.preventDefault();
            e.stopPropagation();
        };
        _this.onMessage = function (event, data) {
            var getRef = _this.props.getRef;
            var diagramUtil = getRef(REF_KEY_TOPOLOGY_DIAGRAM_UTIL);
            switch (event) {
                case 'resize':
                case 'scale':
                case 'locked':
                    if (_this.topology && diagramUtil) {
                        diagramUtil.setCanvasData(_this.topology.data);
                    }
                    break;
            }
        };
        return _this;
    }
    TopologyDiagram.prototype.canvasRegister = function () {
        registerNode('flowData', flowData, flowDataAnchors, flowDataIconRect, flowDataTextRect);
        registerNode('flowSubprocess', flowSubprocess, null, flowSubprocessIconRect, flowSubprocessTextRect);
        registerNode('flowDb', flowDb, null, flowDbIconRect, flowDbTextRect);
        registerNode('flowDocument', flowDocument, flowDocumentAnchors, flowDocumentIconRect, flowDocumentTextRect);
        registerNode('flowInternalStorage', flowInternalStorage, null, flowInternalStorageIconRect, flowInternalStorageTextRect);
        registerNode('flowExternStorage', flowExternStorage, flowExternStorageAnchors, flowExternStorageIconRect, flowExternStorageTextRect);
        registerNode('flowQueue', flowQueue, null, flowQueueIconRect, flowQueueTextRect);
        registerNode('flowManually', flowManually, flowManuallyAnchors, flowManuallyIconRect, flowManuallyTextRect);
        registerNode('flowDisplay', flowDisplay, flowDisplayAnchors, flowDisplayIconRect, flowDisplayTextRect);
        registerNode('flowParallel', flowParallel, flowParallelAnchors, null, null);
        registerNode('flowComment', flowComment, flowCommentAnchors, null, null);
        // activity
        registerNode('activityFinal', activityFinal, null, activityFinalIconRect, activityFinalTextRect);
        registerNode('swimlaneV', swimlaneV, null, swimlaneVIconRect, swimlaneVTextRect);
        registerNode('swimlaneH', swimlaneH, null, swimlaneHIconRect, swimlaneHTextRect);
        registerNode('forkH', fork, forkHAnchors, forkIconRect, forkTextRect);
        registerNode('forkV', fork, forkVAnchors, forkIconRect, forkTextRect);
        // class
        registerNode('simpleClass', simpleClass, null, simpleClassIconRect, simpleClassTextRect);
        registerNode('interfaceClass', interfaceClass, null, interfaceClassIconRect, interfaceClassTextRect);
        // sequence
        registerNode('lifeline', lifeline, lifelineAnchors, lifelineIconRect, lifelineTextRect);
        registerNode('sequenceFocus', sequenceFocus, sequenceFocusAnchors, sequenceFocusIconRect, sequenceFocusTextRect);
    };
    TopologyDiagram.prototype.componentDidMount = function () {
        this.canvasRegister();
        this.canvasOptions.on = this.onMessage;
        this.topology = new Topology('topology-canvas', this.canvasOptions);
        this.openData();
    };
    TopologyDiagram.prototype.componentDidUpdate = function () {
        this.openData();
    };
    TopologyDiagram.prototype.openData = function () {
        var _a = this.props, model = _a.model, topicKey = _a.topicKey;
        var topic = model.getTopic(topicKey);
        var block = topic.getBlock(BLOCK_TYPE_TOPOLOGY).block;
        if (block && block.data && block.data !== '') {
            this.setState({
                data: block.data
            });
            this.topology.open(block.data);
        }
    };
    TopologyDiagram.prototype.onDrag = function (event, node) {
        event.dataTransfer.setData('Text', JSON.stringify(node.data));
    };
    TopologyDiagram.prototype.renderTools = function () {
        var _this = this;
        return (createElement(Tools, null, this.state.toolsConfig.map(function (item, index) {
            return (createElement("div", { key: index },
                createElement(ToolTitle, null, item.group),
                createElement(ToolbarButtons, null, //TODO
                //@ts-ignore
                item.children.map(function (btn, i) {
                    return (createElement("a", { key: i, title: btn.name, draggable: true, onDragStart: function (ev) {
                            _this.onDrag(ev, btn);
                        } },
                        createElement("i", { className: 'iconfont ' + btn.icon, style: _this.state.iconfont })));
                }))));
        })));
    };
    TopologyDiagram.prototype.render = function () {
        return (createElement(Root, null,
            this.renderTools(),
            createElement(Canvas, { id: "topology-canvas", onContextMenu: this.handleContextMenu })));
    };
    return TopologyDiagram;
}(BaseWidget));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

var Root$1 = styled.div(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  position: absolute;\n  background: white;\n  right: 30px;\n  bottom: 20px;\n  border-radius: 2px;\n  z-index: 3;\n  display: flex;\n  flex-direction: row;\n  user-select: none;\n"], ["\n  position: absolute;\n  background: white;\n  right: 30px;\n  bottom: 20px;\n  border-radius: 2px;\n  z-index: 3;\n  display: flex;\n  flex-direction: row;\n  user-select: none;\n"])));
var Item_ = styled(Btn)(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n  margin: 10px;\n"], ["\n  margin: 10px;\n"])));
var Item = function (props) {
    return (createElement(Tooltip, { content: props.tooltip, position: Position.TOP, className: Classes.ICON },
        createElement(Item_, { onClick: props.onClick }, props.children)));
};
var ZoomFactorSpan = styled.span(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n  display: inline-block;\n  width: 80px;\n  height: 18px;\n"], ["\n  display: inline-block;\n  width: 80px;\n  height: 18px;\n"])));
var TopologyDiagramUtils = /** @class */ (function (_super) {
    __extends(TopologyDiagramUtils, _super);
    function TopologyDiagramUtils(props) {
        var _this = _super.call(this, props) || this;
        _this.setCanvasData = function (canvasData) {
            _this.setState({ canvasData: canvasData });
        };
        _this.onClickResetZoom = function (e) {
            var topology = _this.getTopology();
            topology.scaleTo(1);
        };
        _this.state = {
            deleteConfirm: false,
            canvasData: null
        };
        return _this;
    }
    TopologyDiagramUtils.prototype.getTopology = function () {
        var getRef = this.props.getRef;
        return getRef(REF_KEY_TOPOLOGY_DIAGRAM).topology;
    };
    TopologyDiagramUtils.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var controller = props.controller;
        var onClickDelete = function (e) {
            _this.setState({ deleteConfirm: true });
        };
        var deleteAlertProps = {
            isOpen: this.state.deleteConfirm,
            cancelButtonText: 'cancel',
            onConfirm: function (e) {
                controller.run('operation', __assign(__assign({}, props), { opType: OpType.DELETE_TOPIC_BLOCK, blockType: BLOCK_TYPE_TOPOLOGY }));
            },
            onCancel: function (e) {
                _this.setState({ deleteConfirm: false });
            },
            onClose: function (e) {
                _this.setState({ deleteConfirm: false });
            }
        };
        var canvasData = this.state.canvasData;
        var scale = canvasData ? canvasData.scale : 1;
        return (createElement(Root$1, null,
            createElement(Item, { onClick: this.onClickResetZoom, tooltip: "reset zoom" },
                createElement(ZoomFactorSpan, null, "zoom:" + Math.floor(scale * 100) + "%")),
            createElement(Item, { onClick: onClickDelete, tooltip: "delete this diagram" }, Icon(IconName.TRASH)),
            createElement(Alert, __assign({}, deleteAlertProps),
                createElement("p", null, "Are you confirm to delete this topology diagram?"))));
    };
    return TopologyDiagramUtils;
}(Component));
var templateObject_1$1, templateObject_2$1, templateObject_3$1;

var DiagramWrapper = styled.div(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  position: relative;\n  overflow: auto;\n  padding: 0px 0px 0px 5px;\n  background: #88888850;\n  height: 100%;\n"], ["\n  position: relative;\n  overflow: auto;\n  padding: 0px 0px 0px 5px;\n  background: #88888850;\n  height: 100%;\n"])));
var Title = styled.span(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n  padding: 0px 20px;\n"], ["\n  padding: 0px 20px;\n"])));
function TopologyDrawer(props) {
    var controller = props.controller, topicKey = props.topicKey, getRef = props.getRef, saveRef = props.saveRef;
    var onDiagramClose = function (e) {
        e.stopPropagation();
        // const key = `topic-topology-data-${topicKey}`;
        // const topologyData = controller.run('deleteTempValue', { key });
        var diagram = getRef(REF_KEY_TOPOLOGY_DIAGRAM);
        var topologyData = diagram.topology.data;
        controller.run('operation', __assign(__assign({}, props), { opType: OpType.SET_TOPIC_BLOCK, topicKey: topicKey, blockType: BLOCK_TYPE_TOPOLOGY, data: topologyData, focusMode: FocusMode.NORMAL }));
    };
    var diagramProps = __assign(__assign({}, props), { ref: saveRef(REF_KEY_TOPOLOGY_DIAGRAM) });
    var utilProps = __assign(__assign({}, props), { ref: saveRef(REF_KEY_TOPOLOGY_DIAGRAM_UTIL) });
    return (createElement(Drawer, { title: createElement(Title, null, "Topology Diagram Editor"), icon: Icon('topology'), isOpen: true, hasBackdrop: true, backdropClassName: "backdrop", backdropProps: { onMouseDown: cancelEvent }, canOutsideClickClose: false, isCloseButtonShown: true, onClose: onDiagramClose, size: "100%" },
        createElement(DiagramWrapper, { onClick: cancelEvent, onDoubleClick: cancelEvent },
            createElement(TopologyDiagram, __assign({}, diagramProps)),
            createElement(TopologyDiagramUtils, __assign({}, utilProps)))));
}
var templateObject_1$2, templateObject_2$2;

function startEditingTopology(_a) {
    var model = _a.model, topicKey = _a.topicKey;
    var topic = model.getTopic(topicKey);
    var block = topic.getBlock(BLOCK_TYPE_TOPOLOGY).block;
    if (block == null || block.data == null) {
        model = ModelModifier.setBlockData({
            model: model,
            topicKey: topicKey,
            blockType: BLOCK_TYPE_TOPOLOGY,
            data: ''
        });
    }
    model = ModelModifier.focusTopic({
        model: model,
        topicKey: topicKey,
        focusMode: FOCUS_MODE_EDITING_TOPOLOGY
    });
    return model;
}
function TopologyDiagramPlugin() {
    return {
        renderTopicBlock: function (props, next) {
            var controller = props.controller, block = props.block;
            if (block.type === BLOCK_TYPE_TOPOLOGY) {
                return controller.run('renderTopicBlockTopology', props);
            }
            return next();
        },
        renderTopicBlockTopology: function (props) {
            return createElement(TopicBlockTopology, __assign({}, props));
        },
        renderDrawer: function (props, next) {
            var model = props.model;
            if (model.focusMode === FOCUS_MODE_EDITING_TOPOLOGY) {
                var topoProps = __assign(__assign({}, props), { topicKey: model.focusKey, key: 'topology-drawer' });
                return createElement(TopologyDrawer, __assign({}, topoProps));
            }
            return next();
        },
        customizeTopicContextMenu: function (props, next) {
            var controller = props.controller;
            function editTopology(e) {
                controller.run('operation', __assign(__assign({}, props), { opType: OP_TYPE_START_EDITING_TOPOLOGY }));
            }
            return (createElement(Fragment, null,
                next(),
                createElement(MenuDivider, null),
                createElement(MenuItem, { icon: Icon('topology'), text: "Edit Topology Diagram", onClick: editTopology })));
        },
        getOpMap: function (props, next) {
            var opMap = next();
            opMap.set(OP_TYPE_START_EDITING_TOPOLOGY, startEditingTopology);
            return opMap;
        }
    };
}

export default TopologyDiagramPlugin;
//# sourceMappingURL=main.es.js.map
