import {
    jsx as _jsx,
    jsxs as _jsxs,
    Fragment as _Fragment
} from "react/jsx-runtime";
import {
    addPropertyControls,
    ControlType,
    RenderTarget
} from "framer";
import {
    startTransition,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";
const fontStack = `"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;
const calculateTimeLeft = (difference, digitCount) => {
    if (difference > 0) {
        return {
            days: minTwoDigits(Math.floor(difference / (1e3 * 60 * 60 * 24)), digitCount),
            hours: minTwoDigits(Math.floor(difference / (1e3 * 60 * 60) % 24), digitCount),
            minutes: minTwoDigits(Math.floor(difference / 1e3 / 60 % 60), digitCount),
            seconds: minTwoDigits(Math.floor(difference / 1e3 % 60), digitCount)
        };
    }
    return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };
};

function useForceRender() {
    const [_, set] = useState(0);
    return useCallback(() => startTransition(() => set(v => v + 1)), []);
}

function minTwoDigits(number, digitCount) {
    if (digitCount) return number;
    else return (number < 10 ? "0" : "") + number;
}

function wrapInSpan(colorValue, string) {
    return /*#__PURE__*/ _jsx("span", {
        style: {
            color: colorValue
        },
        children: string
    });
}

function createCountdownString(timeLeft, {
    showHours,
    showMinutes,
    showSeconds
}, {
    dayLabel,
    hourLabel,
    minuteLabel,
    secondLabel
}, {
    space,
    spaceForLabel,
    labelType
}, labelColor) { // Dots as default labels
    let days = /*#__PURE__*/ _jsxs(_Fragment, {
        children: [timeLeft.days, space, showHours ? wrapInSpan(labelColor, `:`) : ``]
    });
    let hours = showHours ? /*#__PURE__*/ _jsxs(_Fragment, {
        children: [timeLeft.hours, space, showMinutes ? wrapInSpan(labelColor, `:`) : ``]
    }) : ``;
    let minutes = showHours && showMinutes ? /*#__PURE__*/ _jsxs(_Fragment, {
        children: [timeLeft.minutes, space, showSeconds ? wrapInSpan(labelColor, `:`) : ``]
    }) : ``;
    let seconds = showHours && showMinutes && showSeconds ? timeLeft.seconds : ``; // Custom labels have different logic
    // Dots you want to hide depending on the next item, but labels you do not
    // For example, 20D 4H is a common notation, but you do not want 20:4:, you want 20:4
    if (!labelType) {
        days = /*#__PURE__*/ _jsxs(_Fragment, {
            children: [timeLeft.days, spaceForLabel, wrapInSpan(labelColor, dayLabel)]
        });
        hours = showHours ? /*#__PURE__*/ _jsxs(_Fragment, {
            children: [timeLeft.hours, spaceForLabel, wrapInSpan(labelColor, hourLabel)]
        }) : ``;
        minutes = showMinutes ? /*#__PURE__*/ _jsxs(_Fragment, {
            children: [timeLeft.minutes, spaceForLabel, wrapInSpan(labelColor, minuteLabel)]
        }) : ``;
        seconds = showSeconds ? /*#__PURE__*/ _jsxs(_Fragment, {
            children: [timeLeft.seconds, spaceForLabel, wrapInSpan(labelColor, secondLabel)]
        }) : ``;
    }
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [days, space, hours, space, minutes, space, seconds]
    });
}
/**
 * COUNTDOWN
 * By Benjamin den Boer
 * @benjaminnathan
 *
 * @framerIntrinsicWidth 200
 * @framerIntrinsicHeight 200
 * @framerDisableUnlink
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function CountdownTimer(props) {
    const {
        date,
        pickTime,
        font,
        color,
        labelColor,
        displayProps,
        onComplete
    } = props;
    const {
        digitCount,
        labelType,
        numberSpace,
        labelSpace,
        dayLabel,
        hourLabel,
        minuteLabel,
        secondLabel,
        showHours,
        showMinutes,
        showSeconds,
        tabularFont
    } = displayProps;
    const [visible, setIsVisible] = useState(false);
    const difference = +new Date(date).setUTCHours(pickTime) - +new Date;
    const timeoutRef = useRef(0);
    if (difference <= 0) {
        onComplete === null || onComplete === void 0 ? void 0 : onComplete();
        clearTimeout(timeoutRef.current);
    }
    const isCanvas = RenderTarget.current() === RenderTarget.canvas;
    const render = useForceRender();
    useEffect(() => {
        startTransition(() => setIsVisible(true)); // Don’t want real time on Canvas
        if (isCanvas) return;

        function tick() {
            const date = new Date;
            const next = new Date().setSeconds(date.getSeconds() + 1, 0) - +date;
            timeoutRef.current = setTimeout(tick, next);
            render();
        }
        tick();
        return () => clearTimeout(timeoutRef.current);
    }, [isCanvas, render]);
    const timeLeft = calculateTimeLeft(difference, digitCount);
    const space = numberSpace ? "" : " ";
    const spaceForLabel = labelSpace ? "" : " ";
    const emptyString = `00:00:00:00`;
    const timeString = createCountdownString(timeLeft, {
        showHours,
        showMinutes,
        showSeconds
    }, {
        dayLabel,
        hourLabel,
        minuteLabel,
        secondLabel
    }, {
        space,
        spaceForLabel,
        labelType
    }, labelColor);
    return /*#__PURE__*/ _jsx("p", {
        suppressHydrationWarning: true,
        style: {
            color,
            fontFamily: fontStack,
            fontWeight: 500,
            fontSize: 16,
            lineHeight: 1,
            ...font,
            margin: 0,
            padding: 0,
            visibility: visible ? "visible" : "hidden",
            fontVariantNumeric: tabularFont ? "tabular-nums" : "normal",
            whiteSpace: "nowrap"
        },
        children: difference > 0 ? timeString : emptyString
    });
}
CountdownTimer.displayName = "Countdown";
const defaultDate = new Date;
defaultDate.setDate(defaultDate.getDate() + 2); /* Property Controls */
addPropertyControls(CountdownTimer, {
    date: {
        type: ControlType.Date,
        title: "Date",
        defaultValue: defaultDate.toISOString()
    },
    pickTime: {
        type: ControlType.Number,
        min: 0,
        max: 24,
        defaultValue: 0,
        step: 1,
        displayStepper: true,
        title: "UTC",
        unit: ":00"
    },
    displayProps: {
        type: ControlType.Object,
        title: "Style",
        buttonTitle: "Dots, Labels",
        icon: "boolean",
        controls: {
            digitCount: {
                title: "Digits",
                type: ControlType.Boolean,
                enabledTitle: "One",
                disabledTitle: "Two",
                defaultValue: false
            },
            labelType: {
                title: "Type",
                type: ControlType.Boolean,
                enabledTitle: "Dots",
                disabledTitle: "Custom",
                defaultValue: true
            },
            numberSpace: {
                type: ControlType.Boolean,
                title: "Number",
                enabledTitle: "Auto",
                disabledTitle: "Space",
                defaultValue: false
            },
            labelSpace: {
                type: ControlType.Boolean,
                title: "Label",
                enabledTitle: "Auto",
                disabledTitle: "Space",
                defaultValue: true,
                hidden: props => props.labelType
            },
            dayLabel: {
                type: ControlType.String,
                title: "Days",
                defaultValue: "D",
                placeholder: "D",
                hidden: props => props.labelType
            },
            showHours: {
                title: "Hours",
                type: ControlType.Boolean,
                enabledTitle: "Show",
                disabledTitle: "Hide",
                defaultValue: true
            },
            hourLabel: {
                type: ControlType.String,
                title: " ",
                defaultValue: "H",
                placeholder: "H",
                hidden: props => props.labelType || !props.showHours
            },
            showMinutes: {
                title: "Minutes",
                type: ControlType.Boolean,
                enabledTitle: "Show",
                disabledTitle: "Hide",
                defaultValue: true,
                hidden: props => !props.showHours
            },
            minuteLabel: {
                type: ControlType.String,
                title: " ",
                defaultValue: "M",
                placeholder: "M",
                hidden: props => props.labelType || !props.showHours || !props.showMinutes
            },
            showSeconds: {
                title: "Seconds",
                type: ControlType.Boolean,
                enabledTitle: "Show",
                disabledTitle: "Hide",
                defaultValue: true,
                hidden: props => !props.showHours || !props.showMinutes
            },
            secondLabel: {
                type: ControlType.String,
                title: " ",
                defaultValue: "S",
                placeholder: "S",
                hidden: props => props.labelType || !props.showHours || !props.showMinutes || !props.showSeconds
            },
            tabularFont: {
                title: "Tabular",
                type: ControlType.Boolean,
                defaultValue: true
            }
        }
    },
    font: {
        type: ControlType.Font,
        controls: "extended"
    },
    color: {
        type: ControlType.Color,
        defaultValue: "#999"
    },
    labelColor: {
        title: "Label",
        type: ControlType.Color,
        defaultValue: "rgba(153,153,153,0.5)"
    },
    onComplete: {
        type: ControlType.EventHandler
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "CountdownTimer",
            "slots": [],
            "annotations": {
                "framerSupportedLayoutWidth": "any",
                "framerDisableUnlink": "*",
                "framerSupportedLayoutHeight": "any",
                "framerIntrinsicWidth": "200",
                "framerContractVersion": "1",
                "framerIntrinsicHeight": "200"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./Countdown.map