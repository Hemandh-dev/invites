import {
    jsx as _jsx,
    jsxs as _jsxs,
    Fragment as _Fragment
} from "react/jsx-runtime";
export function withoutFramerUI(Component) {
    return props => {
        return /*#__PURE__*/ _jsxs(_Fragment, {
            children: [ /*#__PURE__*/ _jsx("style", {
                children: `
            /* Hide the Made with Framer badge */
            #__framer-badge-container { display: none !important; }

            /* Hide the Framer edit bar */
            #__framer-editorbar-container { display: none !important; }
            #__framer-editorbar { display: none !important; }
          `
            }), /*#__PURE__*/ _jsx(Component, { ...props
            })]
        });
    };
}
export const __FramerMetadata__ = {
    "exports": {
        "withoutFramerUI": {
            "type": "reactHoc",
            "name": "withoutFramerUI",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./Combined.map