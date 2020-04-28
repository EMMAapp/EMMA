import React from 'react'
import {Platform, SafeAreaView} from 'react-native'
import {marginStyle} from "../constants/Styles";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

export default ({children, style, widthPercentage}) =>
    <SafeAreaView style={[{flex: 1, alignItems: 'center'}, style]}>
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={[
                marginStyle(Platform.OS === 'ios' ? 10 : 25, 'top'),
                {width: `${widthPercentage || 100}%`}
            ]}
            bounces={false}
            enableOnAndroid={true}
        >
            {children}
        </KeyboardAwareScrollView>
    </SafeAreaView>
