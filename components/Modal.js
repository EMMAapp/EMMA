import React from 'react';
import Modal from "react-native-modal";
import {StyleSheet, View} from "react-native";

export default ({isVisible, children}) => {
    return <Modal isVisible={isVisible}>
        <View style={styles.content}>
            {children}
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
