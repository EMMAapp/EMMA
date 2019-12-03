import React from 'react'
import {SafeAreaView, ScrollView, Platform} from 'react-native'
import styled from "styled-components"
import {marginStyle} from "../constants/Styles";

const StyledView = styled(SafeAreaView)`
flex: 1;
align-items: flex-start;
`;

export default ({children, style, widthPercentage}) =>
    <StyledView style={[{flex: 1, alignItems: 'center'}, style]}>
        <ScrollView
            keyboardShouldPersistTaps="handled"
            style={[
                marginStyle(Platform.OS === 'ios' ? 10 : 25, 'top'),
                {width: `${widthPercentage || 100}%`},
            ]}
            bounces={false}
        >
            {children}
        </ScrollView>
    </StyledView>
