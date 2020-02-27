import React from 'react';
import {View} from "react-native";
import {borderRadiusStyle, marginStyle, paddingStyle, shadowStyle} from "../constants/Styles";

export default ({children, margin, padding, style, color}) =>
    <View style={[
        {backgroundColor: color || 'white'},
        borderRadiusStyle(5),
        marginStyle(margin),
        paddingStyle(padding),
        shadowStyle(10, 0.1),
        {...style}
    ]}>
        {children}
    </View>;
