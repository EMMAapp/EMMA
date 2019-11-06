import {TextInput} from "react-native";
import React from "react";

export default ({value, setValue, style}) => {
    return (
        <TextInput
            style={style}
            autoCapitalize="none"
            onChangeText={val => setValue(Number(val))}
            value={value.toString()}
            keyboardType='numeric'
        />
    )
}