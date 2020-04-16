import React from 'react';
import Modal from "react-native-modal";
import {TouchableOpacity, View} from "react-native";
import styled from "styled-components"
import Colors from "../constants/Colors";
import {borderRadiusStyle, marginStyle, paddingStyle} from "../constants/Styles";
import Container from "./Container";
import Layout from "../constants/Layout";

const StyledView = styled(View)`
background-color: white;
justify-content: center;
align-items: center;
border-color: ${Colors.grayDark};
`;

export default ({isVisible, children, onBackdropPress, noContainer}) => {
    const {height, width} = Layout;
    const content =
        <StyledView style={[borderRadiusStyle(6), paddingStyle(10), marginStyle(2), {display: 'flex'}]}>
            {children}
        </StyledView>;

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
        propagateSwipe
        onBackdropPress={onBackdropPress}
        deviceWidth={width}
        deviceHeight={height}
    >
        {
            noContainer ? content : <Container>
                {content}
            </Container>
        }
    </Modal>
}
