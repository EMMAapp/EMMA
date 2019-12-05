import React from 'react';
import Modal from "react-native-modal";
import {View} from "react-native";
import styled from "styled-components"
import Colors from "../constants/Colors";
import {marginStyle, borderRadiusStyle, paddingStyle} from "../constants/Styles";
import Container from "./Container";

const StyledView = styled(View)`
background-color: white;
justify-content: center;
align-items: center;
border-color: ${Colors.grayDark};
`;

export default ({isVisible, children, onBackdropPress}) => {
    return <Modal
        style={[
            marginStyle(20, 'left'),
            marginStyle(20, 'right'),
            marginStyle(10, 'top'),
            marginStyle(10, 'bottom')
        ]}
        animationIn='fadeIn'
        animationOut='fadeOut'
        isVisible={isVisible}
        onBackdropPress={onBackdropPress}
    >
        <Container>

        <StyledView style={[borderRadiusStyle(6), paddingStyle(10), marginStyle(2)]}>
                {children}
        </StyledView>
        </Container>

    </Modal>
}
