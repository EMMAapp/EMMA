import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../../components/TabBarIcon';
import CalendarTab from './CalendarTab';
import AddingScreen from './Adding/AddingScreen';
import ProfileScreen from './ProfileScreen';
import localization from "../../utils/localization";

const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});

const CalendarStack = createStackNavigator(
    {
        calendar: CalendarTab,
    },
    config
);

CalendarStack.navigationOptions = {
    tabBarLabel: localization('tabs.calendar'),
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};

CalendarStack.path = '';

const AddingStack = createStackNavigator(
    {
        adding: AddingScreen,
    },
    config
);

AddingStack.navigationOptions = {
    tabBarLabel: localization('tabs.adding'),
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={
            Platform.OS === 'ios'
                ? 'ios-link'
                : 'md-link'
        }/>
    ),
};

AddingStack.path = '';

const ProfileStack = createStackNavigator(
    {
        profile: ProfileScreen,
    },
    config
);

ProfileStack.navigationOptions = {
    tabBarLabel: localization('tabs.profile'),
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={
            Platform.OS === 'ios'
                ? 'ios-options'
                : 'md-options'
        }/>
    ),
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
    CalendarStack,
    AddingStack,
    ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
