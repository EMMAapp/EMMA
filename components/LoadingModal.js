import React from 'react';
import Modal from "react-native-modal";
import {Text, View, ActivityIndicator} from "react-native";
import localization from "../utils/localization";

export default ({isVisible}) => {
    return <Modal isVisible={isVisible}>
        <View style={{ flex: 1 }}>
            <Text>{localization('loading')}</Text>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    </Modal>
}
