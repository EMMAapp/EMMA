import React from 'react';
import {ScrollView, TouchableOpacity, View} from "react-native";
import Icon from "./Icon";
import {borderRadiusStyle, marginStyle, paddingStyle, shadowStyle} from "../constants/Styles";
import GestureRecognizer from 'react-native-swipe-gestures';
import Colors from "../constants/Colors";

export default function Drawer({isExpanded, setIsExpanded, renderCollapsed, renderExpanded}) {
    return (
        <View style={[
            {height: '100%', width: '100%', shadowRadius: 8},
            shadowStyle(20),
            marginStyle(7, 'top'),
            paddingStyle(7, 'top'),
            borderRadiusStyle(15, 'TopLeft'),
            borderRadiusStyle(10, 'TopRight')
        ]}>
            <ScrollView
                bounces={false}
            >
                <TouchableOpacity activeOpacity={1} onPress={() => setIsExpanded(!isExpanded)} style={{width: '100%', alignItems: 'center'}}>
                    <Icon name='drawer-handle' color={Colors.gray}/>
                </TouchableOpacity>
                {
                    isExpanded ? renderExpanded() :
                        <GestureRecognizer
                            onSwipe={(gestureName, gestureState) => {
                                const {dy} = gestureState;
                                if (dy > 20 && isExpanded) {
                                    setIsExpanded(false);
                                }
                                else if (dy < -20 && !isExpanded) {
                                    setIsExpanded(true);
                                }
                            }}>
                            {
                                renderCollapsed()
                            }
                        </GestureRecognizer>
                }
            </ScrollView>
        </View>
    )
}
