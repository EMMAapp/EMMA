import React from 'react';
import {ActivityIndicator, Text, View} from "react-native";
import localization from "../utils/localization";
import Colors from "../constants/Colors";
import {marginStyle} from "../constants/Styles";

export default () => {
    return <View>
        <Text>{localization('loading')}</Text>
        <ActivityIndicator size="large" color={Colors.purple} style={marginStyle(3, 'top')}/>
    </View>
}
