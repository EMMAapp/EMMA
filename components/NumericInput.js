import {TextInput} from "react-native";
import React from "react";

export default ({value, setValue, style}) => {
    return (
        <TextInput
            style={style}
            autoCapitalize="none"
            onChangeText={val => val ? setValue(Number(val)) : setValue(null)}
            value={value ? value.toString() : ''}
            keyboardType='numeric'
        />
    )
}