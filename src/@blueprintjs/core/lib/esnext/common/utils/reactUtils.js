/*
 * Copyright 2020 Palantir Technologies, Inc. All rights reserved.
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
import * as React from "react";
/**
 * Returns true if `node` is null/undefined, false, empty string, or an array
 * composed of those. If `node` is an array, only one level of the array is
 * checked, for performance reasons.
 */
export function isReactNodeEmpty(node, skipArray = false) {
    return (node == null ||
        node === "" ||
        node === false ||
        (!skipArray &&
            Array.isArray(node) &&
            // only recurse one level through arrays, for performance
            (node.length === 0 || node.every(n => isReactNodeEmpty(n, true)))));
}
/**
 * Returns true if children are a mappable children array
 *
 * @internal
 */
export function isReactChildrenElementOrElements(children) {
    return !isReactNodeEmpty(children, true) && children !== true;
}
/**
 * Converts a React node to an element: non-empty string or number or
 * `React.Fragment` (React 16.3+) is wrapped in given tag name; empty strings
 * and booleans are discarded.
 */
export function ensureElement(child, tagName = "span") {
    if (child == null || typeof child === "boolean") {
        return undefined;
    }
    else if (typeof child === "string") {
        // cull whitespace strings
        return child.trim().length > 0 ? React.createElement(tagName, {}, child) : undefined;
    }
    else if (typeof child === "number" || typeof child.type === "symbol" || Array.isArray(child)) {
        // React.Fragment has a symbol type, ReactNodeArray extends from Array
        return React.createElement(tagName, {}, child);
    }
    else if (isReactElement(child)) {
        return child;
    }
    else {
        // child is inferred as {}
        return undefined;
    }
}
function isReactElement(child) {
    return (typeof child === "object" &&
        typeof child.type !== "undefined" &&
        typeof child.props !== "undefined");
}
/**
 * @deprecated will be removed in 4.0
 */
export function getDisplayName(ComponentClass) {
    return ComponentClass.displayName || ComponentClass.name || "Unknown";
}
/**
 * Returns true if the given JSX element matches the given component type.
 *
 * NOTE: This function only checks equality of `displayName` for performance and
 * to tolerate multiple minor versions of a component being included in one
 * application bundle.
 *
 * @param element JSX element in question
 * @param ComponentType desired component type of element
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isElementOfType(element, ComponentType) {
    return (element != null &&
        element.type != null &&
        element.type.displayName != null &&
        element.type.displayName === ComponentType.displayName);
}
/**
 * Returns React.createRef if it's available, or a ref-like object if not.
 *
 * @deprecated use React.createRef or React.useRef
 */
export function createReactRef() {
    return typeof React.createRef !== "undefined" ? React.createRef() : { current: null };
}
//# sourceMappingURL=reactUtils.js.map