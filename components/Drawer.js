import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";

export default function Drawer({isExpanded, setIsExpanded, renderCollapsed, renderExpanded}) {
    return (
        <View>
            <TouchableOpacity style={{backgroundColor: 'gray'}} onPress={() => setIsExpanded(!isExpanded)}>
                <Text>
                    {isExpanded ? "CLOSE" : "OPEN"}
                </Text>
            </TouchableOpacity>
            {
                isExpanded ? renderExpanded() : renderCollapsed()
            }
        </View>
    )
}
