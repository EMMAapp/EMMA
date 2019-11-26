import React from 'react';
import {Text, ScrollView} from "react-native";
import localization from "../utils/localization";
import terms from '../assets/terms'
import Modal from "./Modal";
import Button from "./Button";

export default ({isVisible, dismiss}) => {
    return <Modal isVisible={isVisible} onBackdropPress={dismiss}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <Text>{terms}</Text>
            <Button onPress={dismiss}>
                <Text>{localization('close')}</Text>
            </Button>
        </ScrollView>
    </Modal>
}
