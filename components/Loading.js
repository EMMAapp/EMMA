import React from 'react';
import {Text, View, ActivityIndicator} from "react-native";
import localization from "../utils/localization";

export default () => {
    return <View>
        <Text>{localization('loading')}</Text>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
}
