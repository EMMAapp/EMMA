import React from 'react';
import Modal from "react-native-modal";
import {Text, View, TouchableOpacity, StyleSheet} from "react-native";
import localization from "../utils/localization";

export default ({isVisible, setResult}) => {
    return <Modal isVisible={isVisible}>
        <View style={styles.content}>
            <Text>{localization('areYouSureDelete')}</Text>
            <TouchableOpacity
                style={{color: 'red'}}
                onPress={() => setResult(true)}
            >
                <Text>{localization('deleteEvent')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{color: 'blue'}}
                onPress={() => setResult(false)}
            >
                <Text>{localization('cancel')}</Text>
            </TouchableOpacity>
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
