"use strict";
/*
 * Copyright 2021 Palantir Technologies, Inc. All rights reserved.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colors = void 0;
const grayScale = {
    BLACK: "#111418",
    DARK_GRAY1: "#1C2127",
    DARK_GRAY2: "#252A31",
    DARK_GRAY3: "#2F343C",
    DARK_GRAY4: "#383E47",
    DARK_GRAY5: "#404854",
    GRAY1: "#626E7F",
    GRAY2: "#738091",
    GRAY3: "#8F99A8",
    GRAY4: "#ABB3BF",
    GRAY5: "#C5CBD3",
    LIGHT_GRAY1: "#D3D8DE",
    LIGHT_GRAY2: "#DCE0E5",
    LIGHT_GRAY3: "#E5E8EB",
    LIGHT_GRAY4: "#EDEFF2",
    LIGHT_GRAY5: "#F6F7F9",
    WHITE: "#FFFFFF",
};
const coreColors = {
    BLUE1: "#184A90",
    BLUE2: "#1A5BB7",
    BLUE3: "#1A69D5",
    BLUE4: "#498FF3",
    BLUE5: "#8ABBFF",
    GREEN1: "#165A32",
    GREEN2: "#176D3A",
    GREEN3: "#168845",
    GREEN4: "#30A660",
    GREEN5: "#72CA96",
    ORANGE1: "#77450D",
    ORANGE2: "#935610",
    ORANGE3: "#C4761C",
    ORANGE4: "#EA9A3E",
    ORANGE5: "#F7B264",
    RED1: "#942427",
    RED2: "#B3292D",
    RED3: "#D33136",
    RED4: "#E96367",
    RED5: "#F99498",
};
const extendedColors = {
    CERULEAN1: "#0C5174",
    CERULEAN2: "#0F6894",
    CERULEAN3: "#147EB3",
    CERULEAN4: "#3FA6DA",
    CERULEAN5: "#68C1EE",
    FOREST1: "#1D7324",
    FOREST2: "#238C2C",
    FOREST3: "#29A634",
    FOREST4: "#43BF4D",
    FOREST5: "#62D96B",
    GOLD1: "#5C4405",
    GOLD2: "#866103",
    GOLD3: "#D1980B",
    GOLD4: "#F0B726",
    GOLD5: "#FBD065",
    INDIGO1: "#5642A6",
    INDIGO2: "#634DBF",
    INDIGO3: "#7961DB",
    INDIGO4: "#9881F3",
    INDIGO5: "#BDADFF",
    LIME1: "#43501B",
    LIME2: "#5A701A",
    LIME3: "#8EB125",
    LIME4: "#B6D94C",
    LIME5: "#D4F17E",
    ROSE1: "#A82255",
    ROSE2: "#C22762",
    ROSE3: "#DB2C6F",
    ROSE4: "#F5498B",
    ROSE5: "#FF66A1",
    SEPIA1: "#5E4123",
    SEPIA2: "#7A542E",
    SEPIA3: "#946638",
    SEPIA4: "#AF855A",
    SEPIA5: "#D0B090",
    TURQUOISE1: "#004D46",
    TURQUOISE2: "#007067",
    TURQUOISE3: "#00A396",
    TURQUOISE4: "#13C9BA",
    TURQUOISE5: "#7AE1D8",
    VERMILION1: "#96290D",
    VERMILION2: "#B83211",
    VERMILION3: "#D33D17",
    VERMILION4: "#EB6847",
    VERMILION5: "#FF9980",
    VIOLET1: "#5C255C",
    VIOLET2: "#7C327C",
    VIOLET3: "#9D3F9D",
    VIOLET4: "#BD6BBD",
    VIOLET5: "#D69FD6",
};
/**
 * Blueprint 5.x "modernized" colors
 */
exports.Colors = Object.assign(Object.assign(Object.assign({}, grayScale), coreColors), extendedColors);
//# sourceMappingURL=colors.js.map