import Icon from "./Icon";
import {TouchableOpacity, View} from "react-native";
import React from "react";
import {borderRadiusStyle, marginStyle, paddingStyle} from "../constants/Styles";

export default ({name, backgroundColor, iconColor, onPress}) =>
    <TouchableOpacity onPress={onPress}>
        <View style={[{backgroundColor}, borderRadiusStyle(16), marginStyle(1), paddingStyle(1)]}>
            <Icon name={name} color={iconColor} height={32} width={32}/>
        </View>
    </TouchableOpacity>;
