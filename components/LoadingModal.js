import React from 'react';
import Modal from "react-native-modal";
import {Text, View, ActivityIndicator, StyleSheet} from "react-native";
import localization from "../utils/localization";

export default ({isVisible}) => {
    return <Modal isVisible={isVisible}>
        <View style={styles.content}>
            <Text>{localization('loading')}</Text>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    }
});
