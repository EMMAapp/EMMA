import React from 'react'
import {SafeAreaView, ScrollView, View} from 'react-native'
import styled from "styled-components"
import {marginStyle, paddingStyle} from "../constants/Styles";

const StyledView = styled(SafeAreaView)`
flex: 1;
align-items: flex-start;
`;

export default ({children, style}) =>
        <StyledView style={[{flex: 1, alignItems: 'center'}, style]}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                style={[
                    marginStyle(40, 'top'),
                    {width: '90%'},
                ]}
                bounces={false}>
                {children}
            </ScrollView>
        </StyledView>
