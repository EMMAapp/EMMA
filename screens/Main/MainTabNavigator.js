import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../../components/TabBarIcon';
import CalendarTab from './CalendarTab';
import EditEventTab from './EditEventTab';
import ProfileTab from './ProfileTab';
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

const EditEventStack = createStackNavigator(
    {
        edit: EditEventTab,
    },
    config
);
EditEventStack.navigationOptions = {
    tabBarLabel: localization('tabs.adding'),
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={
            Platform.OS === 'ios'
                ? 'ios-link'
                : 'md-link'
        }/>
    ),
};

EditEventStack.path = '';

const ProfileStack = createStackNavigator(
    {
        profile: ProfileTab,
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
    EditEventStack,
    ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
