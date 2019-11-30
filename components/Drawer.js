import React from 'react';
import {TouchableOpacity, View} from "react-native";
import Icon from "./Icon";
import {paddingStyle, borderRadiusStyle} from "../constants/Styles";
import GestureRecognizer from 'react-native-swipe-gestures';

export default function Drawer({isExpanded, setIsExpanded, renderCollapsed, renderExpanded}) {
    return (
        <View style={[
                {backgroundColor: 'white', height: '1000%', shadowOpacity: 0.2, shadowRadius: 8, shadowColor: 'black', margin: 10},
                paddingStyle(15),
                paddingStyle(2, 'top'),
                borderRadiusStyle(15, 'TopLeft'),
                borderRadiusStyle(10, 'TopRight')
            ]}>
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
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={{width: '100%', alignItems: 'center'}}>
                <Icon name={isExpanded ? 'down' : 'up'}/>
            </TouchableOpacity>
            </GestureRecognizer>
            {
                isExpanded ? renderExpanded() : renderCollapsed()
            }
        </View>
    )
}
