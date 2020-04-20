import React from 'react';
import {TouchableOpacity, View, ScrollView} from "react-native";
import Icon from "./Icon";
import {borderRadiusStyle, marginStyle, paddingStyle, shadowStyle} from "../constants/Styles";
import GestureRecognizer from 'react-native-swipe-gestures';

export default function Drawer({isExpanded, setIsExpanded, renderCollapsed, renderExpanded}) {
    return (
        <View  style={[
            {height: '100%', width: '100%', shadowRadius: 8},
            shadowStyle(20),
            marginStyle(7, 'top'),
            paddingStyle(15),
            paddingStyle(2, 'top'),
            borderRadiusStyle(15, 'TopLeft'),
            borderRadiusStyle(10, 'TopRight')
        ]}>
            <ScrollView bounces={false}>
                <GestureRecognizer
                    onSwipe={(gestureName, gestureState) => {
                        const {dy} = gestureState;
                        if (dy > 20 && isExpanded) {
                            setIsExpanded(false);
                        }
                        else if (dy < -20 && !isExpanded) {
                            setIsExpanded(true);
                        }
                    }}
                >
                    <TouchableOpacity activeOpacity={1} onPress={() => setIsExpanded(!isExpanded)} style={{width: '100%', alignItems: 'center'}}>
                        <Icon name={isExpanded ? 'down' : 'up'}/>
                    </TouchableOpacity>
                </GestureRecognizer>
                {
                    isExpanded ? renderExpanded() : renderCollapsed()
                }
            </ScrollView>
        </View>
    )
}
