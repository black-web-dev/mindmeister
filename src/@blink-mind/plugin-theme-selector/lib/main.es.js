import { ModelModifier, defaultTheme } from '@blink-mind/core';

var themeRandomColorSquare = {
    name: 'default',
    randomColor: false,
    background: '#f8f8f8',
    highlightColor: 'rgb(0, 170, 255)',
    marginH: 45,
    marginV: 10,
    contentStyle: {
        lineHeight: '1.5'
    },
    linkStyle: {
        lineRadius: 5
    },
    rootTopic: {
        contentStyle: {
            background: '#50C18A',
            color: '#fff',
            fontSize: '34px',
            borderRadius: '45px',
            padding: '16px 18px 16px 18px'
        },
        subLinkStyle: {
            lineType: 'curve',
            lineWidth: '3px',
            lineColor: '#43a9ff'
        }
    },
    primaryTopic: {
        contentStyle: {
            background: '#ffffff',
            // borderWidth: '1px',
            // borderStyle: 'solid',
            // borderColor: 'rgb(221, 170, 68)',
            borderRadius: '45px',
            color: 'rgb(103,103,103)',
            fontSize: '14px',
            padding: '6px 10px 5px 10px'
        },
        subLinkStyle: {
            lineType: 'round',
            lineRadius: 5,
            lineWidth: '3px',
            lineColor: '#43a9ff'
        }
    },
    normalTopic: {
        contentStyle: {
            background: '#fff',
            borderRadius: '45px',
            color: 'rgb(103,103,103)',
            fontSize: '13px',
            padding: '3px 9px 4px',
            // boxShadow: '1px 1px 1px #ccc'
        },
        subLinkStyle: {
            lineType: 'round',
            lineRadius: 5,
            lineWidth: '2px',
            lineColor: '#43a9ff'
        }
    }
};

var theme1 = {
    name: 'theme1',
    randomColor: false,
    background: 'rgb(250,245,205)',
    highlightColor: '#50C9CE',
    marginH: 50,
    marginV: 30,
    contentStyle: {
        lineHeight: '1.5'
    },
    linkStyle: {
        lineRadius: 5
    },
    rootTopic: {
        contentStyle: {
            background: 'rgb(221, 170, 68)',
            color: '#fff',
            fontSize: '34px',
            borderRadius: '45px',
            padding: '16px 18px 16px 18px'
        },
        subLinkStyle: {
            lineType: 'curve',
            lineWidth: '2px',
            lineColor: 'rgb(221, 170, 68)'
        }
    },
    primaryTopic: {
        contentStyle: {
            background: '#e8eaec',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'rgb(221, 170, 68)',
            borderRadius: '45px',
            fontSize: '17px',
            padding: '10px 15px 10px 15px'
        },
        subLinkStyle: {
            lineType: 'curve',
            lineWidth: '2px',
            lineColor: 'rgb(221, 170, 68)'
        }
    },
    normalTopic: {
        contentStyle: {
            background: '#fff',
            border: '1px solid #e8eaec',
            borderRadius: '45px',
            color: 'rgb(187, 136, 34)',
            fontSize: '13px',
            padding: '4px 10px'
        },
        subLinkStyle: {
            lineType: 'round',
            lineRadius: 5,
            lineWidth: '1px',
            lineColor: 'rgb(187, 136, 34)'
        }
    }
};

var theme2 = {
    name: 'theme2',
    randomColor: true,
    background: 'rgb(57,60,65)',
    highlightColor: '#50C9CE',
    marginH: 60,
    marginV: 20,
    contentStyle: {
        lineHeight: '1.5',
        fontSize: '16px'
    },
    linkStyle: {
        lineRadius: 5,
        lineType: 'curve',
        lineWidth: '3px'
    },
    rootTopic: {
        contentStyle: {
            fontSize: '36px',
            borderRadius: '45px'
        },
        subLinkStyle: {
            lineType: 'curve',
            lineWidth: '3px'
        }
    },
    primaryTopic: {
        contentStyle: {
            fontSize: '24px',
            borderRadius: '45px'
        },
        subLinkStyle: {
            lineType: 'curve',
            lineWidth: '3px'
        }
    },
    normalTopic: {
        subLinkStyle: {
            lineType: 'curve',
            lineWidth: '3px'
        }
    }
};

var theme3 = {
    name: 'theme3',
    randomColor: false,
    background: '#A9DEF9',
    highlightColor: '#50C9CE',
    marginH: 50,
    marginV: 20,
    contentStyle: {
        lineHeight: '1.5'
    },
    linkStyle: {
        lineRadius: 5
    },
    rootTopic: {
        contentStyle: {
            background: '#FF99C8',
            color: '#fff',
            fontSize: '34px',
            borderRadius: '45px',
            padding: '16px 18px 16px 18px'
        },
        subLinkStyle: {
            lineType: 'curve',
            lineWidth: '2px',
            lineColor: '#43a9ff'
        }
    },
    primaryTopic: {
        contentStyle: {
            background: '#FCF6BD',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#E4C1F9',
            borderRadius: '45px',
            color: 'rgb(103,103,103)',
            fontSize: '14px',
            padding: '6px 10px 5px 10px'
        },
        subLinkStyle: {
            lineType: 'curve',
            lineWidth: '2px',
            lineColor: '#43a9ff'
        }
    },
    normalTopic: {
        contentStyle: {
            background: '#E4FDE1',
            borderRadius: '5px',
            color: 'rgb(103,103,103)',
            fontSize: '13px',
            padding: '3px 9px 4px',
            boxShadow: '1px 1px 1px #ccc',
            borderRadius: '45px'
        },
        subLinkStyle: {
            lineType: 'round',
            lineRadius: 5,
            lineWidth: '1px',
            lineColor: '#43a9ff'
        }
    }
};

var theme4 = {
    name: 'theme3',
    randomColor: false,
    background: '#CCFBFE',
    highlightColor: '#50C9CE',
    marginH: 50,
    marginV: 20,
    contentStyle: {
        lineHeight: '1.5'
    },
    linkStyle: {
        lineRadius: 5
    },
    rootTopic: {
        contentStyle: {
            background: '#CD8987',
            color: '#fff',
            fontSize: '34px',
            borderRadius: '45px',
            padding: '16px 18px 16px 18px'
        },
        subLinkStyle: {
            lineType: 'curve',
            lineWidth: '2px',
            lineColor: '#43a9ff'
        }
    },
    primaryTopic: {
        contentStyle: {
            background: '#CDACA1',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#E4C1F9',
            borderRadius: '45px',
            color: 'rgb(103,103,103)',
            fontSize: '14px',
            padding: '6px 10px 5px 10px'
        },
        subLinkStyle: {
            lineType: 'line',
            lineWidth: '2px',
            lineColor: '#43a9ff'
        }
    },
    normalTopic: {
        contentStyle: {
            background: '#CDCACC',
            borderRadius: '45px',
            color: 'rgb(103,103,103)',
            fontSize: '13px',
            padding: '3px 9px 4px',
            boxShadow: '1px 1px 1px #ccc'
        },
        subLinkStyle: {
            lineType: 'line',
            lineRadius: 5,
            lineWidth: '1px',
            lineColor: '#43a9ff'
        }
    }
};

function ThemeSelectorPlugin() {
    var themeMap = new Map([
        ['default', defaultTheme],
        ['random-color-square', themeRandomColorSquare],
        ['theme1', theme1],
        ['theme2', theme2],
        ['theme3', theme3],
        ['theme4', theme4]
    ]);
    return {
        getAllThemes: function (props) {
            return themeMap;
        },
        setTheme: function (props) {
            var model = props.model, controller = props.controller, themeKey = props.themeKey;
            var allTheme = controller.run('getAllThemes', props);
            if (!allTheme.has(themeKey)) {
                throw new Error('setTheme: the theme key is not correct!');
            }
            var theme = allTheme.get(themeKey);
            var newModel = ModelModifier.setTheme({ model: model, theme: theme });
            controller.change(newModel);
        }
    };
}

export { ThemeSelectorPlugin, theme1, theme2, theme3, theme4, themeRandomColorSquare };
//# sourceMappingURL=main.es.js.map
