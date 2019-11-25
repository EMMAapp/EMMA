import React from 'react';
import Modal from "react-native-modal";
import {View} from "react-native";
import styled from "styled-components"
import Colors from "../constants/Colors";

const StyledView = styled(View)`
background-color: white;
padding: 22px;
justify-content: center;
align-items: center;
border-radius: 4px;
border-color: ${Colors.grayDark};
`;

export default ({isVisible, children, onBackdropPress}) => {
    return <Modal
        animationIn='fadeIn'
        animationOut='fadeOut'
        isVisible={isVisible}
        onBackdropPress={onBackdropPress}
    >
        <StyledView>
            {children}
        </StyledView>
    </Modal>
}
