import React from 'react'
import {View} from 'react-native'
import styled from "styled-components"

const StyledView = styled(View)`
flex-direction: row;
justify-content: flex-start;
align-items: center;
text-align: justify;
`;

export default ({children, style}) =>
    <StyledView style={style}>
        {children}
    </StyledView>
