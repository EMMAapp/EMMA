import React from 'react';
import localization from "../utils/localization";
import terms from '../assets/terms'
import Modal from "./Modal";
import Button from "./Button";
import {marginStyle} from "../constants/Styles";
import Text from "./Text";

export default ({isVisible, dismiss}) => {
    return <Modal isVisible={isVisible} onBackdropPress={dismiss}>
            <Text>{terms}</Text>
            <Button onPress={dismiss} style={marginStyle(15, 'top')}>
                {localization('close')}
            </Button>
    </Modal>
}
