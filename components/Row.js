import React from 'react'
import {View} from 'react-native'
import styled from "styled-components"

const StyledView = styled(View)`
flex-direction: row;
justify-content: ${props => props.center ? 'center' : 'flex-start'};
align-items: center;
`;

export default ({children, style, center}) =>
    <StyledView style={[style, {textAlignVertical: 'center'}]} center={center}>
        {children}
    </StyledView>
