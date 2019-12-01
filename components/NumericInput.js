import React from "react";
import TextInput from "./TextInput";

export default (props) =>
    <TextInput
        {...props}
        keyboardType='numeric'
        onChangeText={val => val ? props.setValue(Number(val)) : props.setValue(null)}
        value={props.value ? props.value.toString() : ''}
    />
