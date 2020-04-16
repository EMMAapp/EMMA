import React, {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CalendarTabWrapper from '../screens/Main/Calendar/CalendarTabWrapper';
import EditEventTab from '../screens/Main/EditEvent/EditEventTab';
import ProfileTab from '../screens/Main/ProfileTab';
import Icon from "../components/Icon";
import Colors from "../constants/Colors";
import {marginStyle} from "../constants/Styles";
import JourneyTab from "../screens/Main/JourneyTab";
import ChartsTab from "../screens/Main/ChartsTab";
import {CALENDAR, CHARTS, EDIT_EVENT, JOURNEY, PROFILE} from "./Routes";

const icons = {
    [JOURNEY]: 'today',
    [CALENDAR]: 'calendar',
    [EDIT_EVENT]: 'add',
    [CHARTS]: 'folder',
    [PROFILE]: 'profile',
};

const Tab = createBottomTabNavigator();
export default ({}) => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        if (Platform.OS !== "android") {
            return;
        }
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", setKeyboardVisible(false));
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", setKeyboardVisible(true));
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    }, []);

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) =>
                    <Icon
                        color={focused ? Colors.purple : Colors.grayDark}
                        name={icons[route.name]}
                    />
            })}
            options={{
                headerMode: 'none',
                navigationOptions: {
                    headerVisible: false
                }
            }}
            tabBarOptions={{
                style: keyboardVisible ? {} : {...marginStyle(10, 'top')},
                showLabel: false,
                keyboardHidesTabBar: true
            }}>
            <Tab.Screen name={JOURNEY} component={JourneyTab}/>
            <Tab.Screen name={CALENDAR} component={CalendarTabWrapper}/>
            <Tab.Screen name={EDIT_EVENT} component={EditEventTab}/>
            <Tab.Screen name={CHARTS} component={ChartsTab}/>
            <Tab.Screen name={PROFILE} component={ProfileTab}/>
        </Tab.Navigator>
    )
}
