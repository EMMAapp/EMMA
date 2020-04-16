import React from 'react';
import localization from "../utils/localization";
import Modal from "./Modal";
import Text from './Text';
import ButtonPrimary from "./ButtonPrimary";
import Button from "./Button";
import Image from './Image';
import {marginStyle} from "../constants/Styles";

export default ({title, positive, isVisible, setResult}) => {
    return <Modal isVisible={isVisible} onBackdropPress={() => setResult(false)} noContainer>
        <Image name='confused' height={100} width={100}/>
        <Text size={12} style={marginStyle(10, 'top')}>{title}</Text>
        <ButtonPrimary
            style={marginStyle(20, 'top')}
            onPress={() => setResult(true)}
        >
            {positive}
        </ButtonPrimary>
        <Button
            style={marginStyle(10, 'top')}
            onPress={() => setResult(false)}
        >
            {localization('cancel')}
        </Button>
    </Modal>
}
