import React from 'react'
import {SafeAreaView, ScrollView, KeyboardAvoidingView, Platform} from 'react-native'
import styled from "styled-components"
import {marginStyle} from "../constants/Styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const StyledView = styled(SafeAreaView)`
flex: 1;
align-items: flex-start;
`;

export default ({children, style, widthPercentage}) =>
    <StyledView style={[{flex: 1, alignItems: 'center'}, style]}>
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={[
                marginStyle(Platform.OS === 'ios' ? 10 : 25, 'top'),
                {width: `${widthPercentage || 100}%`},
            ]}
            bounces={false}
        >
            {children}
        </KeyboardAwareScrollView>
    </StyledView>
