import React, {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/core';
import CalendarTabWrapper from '../screens/Main/Calendar/CalendarTabWrapper';
import EditEventTab from '../screens/Main/EditEvent/EditEventTab';
import ProfileTab from '../screens/Main/ProfileTab';
import Icon from "../components/Icon";
import Colors from "../constants/Colors";
import {paddingStyle} from "../constants/Styles";
import JourneyTab from "../screens/Main/JourneyTab";
import ChartsTab from "../screens/Main/ChartsTab";
import {CALENDAR, CHARTS, EDIT_EVENT, TIPS, PROFILE} from "./Routes";
import localization from "../utils/localization";

const icons = {
    [TIPS]: 'today',
    [CALENDAR]: 'calendar',
    [EDIT_EVENT]: 'add',
    [CHARTS]: 'folder',
    [PROFILE]: 'profile',
};

const Tab = createBottomTabNavigator();
export default ({}) => {
    const navigation = useNavigation();
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

    const label = (name) => {
        switch (name) {
            case CALENDAR:
                return localization('navbar.journey');
            case CHARTS:
                return localization('navbar.results');
            case EDIT_EVENT:
                return localization('navbar.edit');
            case TIPS:
                return localization('navbar.tips');
            case PROFILE:
                return localization('navbar.profile');
        }
    };

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) =>
                    <Icon
                        color={focused ? Colors.purple : Colors.grayDark}
                        name={icons[route.name]}
                    />,
                tabBarLabel: label(route.name)
            })}
            options={{
                headerMode: 'none',
                navigationOptions: {
                    headerVisible: false
                }
            }}

            tabBarOptions={{
                style: keyboardVisible ? {} : {...paddingStyle(10, 'top')},
                showLabel: true,
                keyboardHidesTabBar: true,
                activeTintColor: Colors.purple,
                inactiveTintColor: Colors.grayDark
            }}>
            <Tab.Screen name={CALENDAR} component={CalendarTabWrapper}/>
            <Tab.Screen name={CHARTS} component={ChartsTab}/>
            <Tab.Screen name={EDIT_EVENT} component={EditEventTab}/>
            <Tab.Screen name={TIPS} component={JourneyTab}/>
            <Tab.Screen name={PROFILE} component={ProfileTab}/>
        </Tab.Navigator>
    )
}
