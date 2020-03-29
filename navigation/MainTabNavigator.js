import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CalendarTabWrapper from '../screens/Main/Calendar/CalendarTabWrapper';
import EditEventTab from '../screens/Main/EditEvent/EditEventTab';
import ProfileTab from '../screens/Main/ProfileTab';
import Icon from "../components/Icon";
import Colors from "../constants/Colors";
import {paddingStyle} from "../constants/Styles";
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
export default ({}) => (
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
                headerVisible: false,
            }
        }}
        tabBarOptions={{
            style: {...paddingStyle(10, 'top'), ...paddingStyle(10, 'bottom')},
            showLabel: false
        }}>
        <Tab.Screen name={JOURNEY} component={JourneyTab}/>
        <Tab.Screen name={CALENDAR} component={CalendarTabWrapper}/>
        <Tab.Screen name={EDIT_EVENT} component={EditEventTab}/>
        <Tab.Screen name={CHARTS} component={ChartsTab}/>
        <Tab.Screen name={PROFILE} component={ProfileTab}/>
    </Tab.Navigator>
)
