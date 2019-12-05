import React from 'react';
import {ScrollView, Text} from "react-native";
import localization from "../utils/localization";
import terms from '../assets/terms'
import Modal from "./Modal";
import Button from "./Button";
import {marginStyle} from "../constants/Styles";

export default ({isVisible, dismiss}) => {
    return <Modal isVisible={isVisible} onBackdropPress={dismiss}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <Text>{terms}</Text>
            <Button onPress={dismiss} style={marginStyle(15, 'top')}>
                <Text>{localization('close')}</Text>
            </Button>
        </ScrollView>
    </Modal>
}
