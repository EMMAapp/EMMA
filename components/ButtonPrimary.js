import React from "react";
import Colors from "../constants/Colors";
import Button from "./Button";

export default ({style, children, onPress, disabled, height, width}) =>
    <Button
        style={style}
        onPress={onPress}
        disabled={disabled}
        noBorder
        color={Colors.purple}
        disabledColor={Colors.grayMedium}
        textColor='white'
        height={height}
        width={width}
    >
        {children}
    </Button>
