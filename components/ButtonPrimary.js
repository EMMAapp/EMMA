import React from "react";
import Colors from "../constants/Colors";
import Button from "./Button";

export default ({style, children, onPress, disabled}) =>
    <Button
        style={style}
        onPress={onPress}
        disabled={disabled}
        noBorder
        color={Colors.purple}
        disabledColor={Colors.gray}
        textColor='white'
    >
        {children}
    </Button>
