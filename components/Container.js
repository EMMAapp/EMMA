import React from 'react'
import {SafeAreaView, ScrollView} from 'react-native'
import styled from "styled-components"

const StyledView = styled(SafeAreaView)`
flex: 1;
align-items: flex-start;
margin-top: 100px;
`;

export default ({marginHorizontal, children}) =>
    <StyledView>
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{marginHorizontal: marginHorizontal}}
            bounces={false}>
            {children}
        </ScrollView>
    </StyledView>
