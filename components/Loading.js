import React from 'react';
import {ActivityIndicator, Text, View} from "react-native";
import localization from "../utils/localization";
import Colors from "../constants/Colors";

export default () => {
    return <View>
        <Text>{localization('loading')}</Text>
        <ActivityIndicator size="large" color={Colors.purple}/>
    </View>
}
