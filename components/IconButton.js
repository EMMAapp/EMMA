import Icon from "./Icon";
import {View, TouchableOpacity} from "react-native";
import React from "react";
import {marginStyle, paddingStyle} from "../constants/Styles";

export default ({name, backgroundColor, iconColor, onPress}) =>
    <TouchableOpacity onPress={onPress}>
        <View style={[{borderRadius: '50%', backgroundColor}, marginStyle(1), paddingStyle(1)]}>
            <Icon name={name} color={iconColor}/>
        </View>
    </TouchableOpacity>;
