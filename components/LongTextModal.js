import React from 'react';
import localization, {isRTL} from "../utils/localization";
import Modal from "./Modal";
import Button from "./Button";
import {marginStyle} from "../constants/Styles";
import Text from "./Text";

export default ({text, isVisible, dismiss}) => {
    return <Modal isVisible={isVisible} onBackdropPress={dismiss}>
            <Text alignRight={isRTL}>{text}</Text>
            <Button onPress={dismiss} style={marginStyle(15, 'top')}>
                {localization('close')}
            </Button>
    </Modal>
}
