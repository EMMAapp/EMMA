import React from 'react';
import {ScrollView, TouchableOpacity, View} from "react-native";
import Icon from "./Icon";
import {borderRadiusStyle, marginStyle, paddingStyle, shadowStyle} from "../constants/Styles";
import Colors from "../constants/Colors";
import Swipe from "./Swipe";

export default function Drawer({isExpanded, setIsExpanded, renderCollapsed, renderExpanded}) {
    return (
        <View style={[
            {height: '100%', width: '100%', shadowRadius: 8},
            shadowStyle(20),
            marginStyle(7, 'top'),
            paddingStyle(7, 'top'),
            borderRadiusStyle(15, 'TopLeft'),
            borderRadiusStyle(15, 'TopRight')
        ]}>
            <ScrollView
                bounces={false}
            >
                <TouchableOpacity activeOpacity={1} onPress={() => setIsExpanded(!isExpanded)} style={{width: '100%', alignItems: 'center'}}>
                    <Icon name='drawer-handle' color={Colors.gray}/>
                </TouchableOpacity>
                {
                    isExpanded ? renderExpanded() :
                        <Swipe
                            onUp={() => setIsExpanded(true)}
                            onDown={() => setIsExpanded(false)}
                        >
                            {
                                renderCollapsed()
                            }
                        </Swipe>
                }
            </ScrollView>
        </View>
    )
}
