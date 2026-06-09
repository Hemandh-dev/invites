import {
    jsx as _jsx
} from "react/jsx-runtime";
import {
    useEffect
} from "react";
export function withoutRightClick(Component) {
    return props => {
        useEffect(() => {
            const onContext = e => e.preventDefault();
            document.addEventListener("contextmenu", onContext);
            return () => document.removeEventListener("contextmenu", onContext);
        }, []);
        return /*#__PURE__*/ _jsx(Component, { ...props
        });
    };
}
export const __FramerMetadata__ = {
    "exports": {
        "withoutRightClick": {
            "type": "reactHoc",
            "name": "withoutRightClick",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./no_Right_click_save.map