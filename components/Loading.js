import React from 'react';
import {ActivityIndicator, View} from "react-native";
import localization from "../utils/localization";
import Colors from "../constants/Colors";
import {marginStyle} from "../constants/Styles";
import Text from "./Text";

export default ({style}) => {
    return <View style={style}>
        <Text alignCenter>{localization('loading')}</Text>
        <ActivityIndicator size="large" color={Colors.purple} style={marginStyle(3, 'top')}/>
    </View>
}
