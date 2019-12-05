import {TouchableOpacity} from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import Icon from "./Icon";

export default ({value, setValue, disabled, style, color}) => {
    return (
        <TouchableOpacity activeOpacity={1} style={style} onPress={() => setValue(!value)} disabled={disabled}>
            {
                value ? <Icon name={'checkbox-on'} color={color || Colors.purple}/> : <Icon name={'checkbox-off'} color={Colors.gray}/>
            }
        </TouchableOpacity>
    )
}
