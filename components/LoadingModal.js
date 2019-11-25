import React from 'react';
import {StyleSheet} from "react-native";
import Loading from "./Loading";
import Modal from "./Modal";

export default ({isVisible}) => {
    return <Modal isVisible={isVisible}>
        <Loading/>
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
