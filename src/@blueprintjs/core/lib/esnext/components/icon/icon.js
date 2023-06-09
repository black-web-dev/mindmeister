/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
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
import { __decorate } from "tslib";
import classNames from "classnames";
import * as React from "react";
import { polyfill } from "react-lifecycles-compat";
import { IconSvgPaths16, IconSvgPaths20 } from "@blueprintjs/icons";
import { AbstractPureComponent2, Classes, DISPLAYNAME_PREFIX } from "../../common";
export var IconSize;
(function (IconSize) {
    IconSize[IconSize["STANDARD"] = 16] = "STANDARD";
    IconSize[IconSize["LARGE"] = 20] = "LARGE";
})(IconSize || (IconSize = {}));
let Icon = class Icon extends AbstractPureComponent2 {
    render() {
        const { icon } = this.props;
        if (icon == null || typeof icon === "boolean") {
            return null;
        }
        else if (typeof icon !== "string") {
            return icon;
        }
        const { className, color, htmlTitle, 
        // eslint-disable-next-line deprecation/deprecation
        iconSize, intent, size = iconSize ?? IconSize.STANDARD, title, tagName = "span", ...htmlprops } = this.props;
        // choose which pixel grid is most appropriate for given icon size
        const pixelGridSize = size >= IconSize.LARGE ? IconSize.LARGE : IconSize.STANDARD;
        // render path elements, or nothing if icon name is unknown.
        const paths = this.renderSvgPaths(pixelGridSize, icon);
        // eslint-disable-next-line deprecation/deprecation
        const classes = classNames(Classes.ICON, Classes.iconClass(icon), Classes.intentClass(intent), className);
        const viewBox = `0 0 ${pixelGridSize} ${pixelGridSize}`;
        return React.createElement(tagName, {
            ...htmlprops,
            "aria-hidden": title ? undefined : true,
            className: classes,
            title: htmlTitle,
        }, React.createElement("svg", { fill: color, "data-icon": icon, width: size, height: size, viewBox: viewBox },
            title && React.createElement("desc", null, title),
            paths));
    }
    /** Render `<path>` elements for the given icon name. Returns `null` if name is unknown. */
    renderSvgPaths(pathsSize, iconName) {
        const svgPathsRecord = pathsSize === IconSize.STANDARD ? IconSvgPaths16 : IconSvgPaths20;
        const pathStrings = svgPathsRecord[iconName];
        if (pathStrings == null) {
            return null;
        }
        return pathStrings.map((d, i) => React.createElement("path", { key: i, d: d, fillRule: "evenodd" }));
    }
};
Icon.displayName = `${DISPLAYNAME_PREFIX}.Icon`;
/** @deprecated use IconSize.STANDARD */
Icon.SIZE_STANDARD = IconSize.STANDARD;
/** @deprecated use IconSize.LARGE */
Icon.SIZE_LARGE = IconSize.LARGE;
Icon = __decorate([
    polyfill
], Icon);
export { Icon };
//# sourceMappingURL=icon.js.map