import React from "react";
import Colors from "../constants/Colors";
import Button from "./Button";

export default ({style, children, onPress, disabled, height, width, inverted, icon}) =>
    <Button
        style={style}
        onPress={onPress}
        disabled={disabled}
        disabledHasSameColor
        noBorder={!inverted}
        borderColor={inverted ? Colors.purple : null}
        color={inverted ? 'white' : Colors.purple}
        textColor={inverted ? Colors.purple : 'white'}
        height={height}
        width={width}
        opacity={disabled ? 0.5 : 1}
        icon={icon}
    >
        {children}
    </Button>
