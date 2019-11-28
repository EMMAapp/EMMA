import React from 'react'
import {SafeAreaView, ScrollView} from 'react-native'
import styled from "styled-components"
import {marginStyle} from "../constants/Styles";

const StyledView = styled(SafeAreaView)`
flex: 1;
align-items: flex-start;
`;

export default ({marginHorizontal, children}) =>
    <StyledView style={[marginStyle(40, 'top'), marginStyle(35, 'bottom')]}>
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{marginHorizontal: marginHorizontal}}
            bounces={false}>
            {children}
        </ScrollView>
    </StyledView>
