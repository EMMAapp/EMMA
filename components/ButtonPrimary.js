import React from "react";
import Colors from "../constants/Colors";
import Button from "./Button";

export default ({style, children, onPress, disabled, height, width, inverted}) =>
    <Button
        style={style}
        onPress={onPress}
        disabled={disabled}
        noBorder={!inverted}
        borderColor={inverted ? Colors.purple : null}
        color={inverted ? 'white' : Colors.purple}
        disabledColor={Colors.grayMedium}
        textColor={inverted ? Colors.purple : 'white'}
        height={height}
        width={width}
    >
        {children}
    </Button>
