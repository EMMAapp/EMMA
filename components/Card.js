import React from 'react';
import {View} from "react-native";
import {borderRadiusStyle, marginStyle, paddingStyle, shadowStyle} from "../constants/Styles";

export default ({children, margin, padding, style, color, borderColor, noShadow}) =>
    <View style={[
        borderRadiusStyle(5),
        marginStyle(margin),
        paddingStyle(padding),
        noShadow ? {} : shadowStyle(5, 0.1),
        {backgroundColor: color || 'white', borderWidth: borderColor ? 1.5 : 0, borderColor: borderColor},
        {...style},
    ]}>
        {children}
    </View>;
