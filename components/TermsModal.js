import React from 'react';
import Modal from "react-native-modal";
import {Text, StyleSheet, TouchableOpacity, ScrollView, View} from "react-native";
import localization from "../utils/localization";
import terms from '../assets/terms'

export default ({isVisible, toClose}) => {
    return <Modal isVisible={isVisible}>
        <View style={styles.content}>
            <ScrollView>
                <Text>{terms}</Text>
                <TouchableOpacity style={{backgroundColor: '#0000ff'}} onPress={toClose}>
                    <Text>{localization('close')}</Text>
                </TouchableOpacity>
            </ScrollView>
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
