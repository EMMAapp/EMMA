import React from 'react'
import {View} from 'react-native'
import styled from "styled-components"

const StyledView = styled(View)`
flex-direction: row;
justify-content: flex-start;
align-items: center;
`;

export default ({children, style}) =>
    <StyledView style={[style, {textAlignVertical: 'center'}]}>
        {children}
    </StyledView>
