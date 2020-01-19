import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import CalendarTabWrapper from './Calendar/CalendarTabWrapper';
import EditEventTab from './EditEvent/EditEventTab';
import ProfileTab from './ProfileTab';
import Icon from "../../components/Icon";
import Colors from "../../constants/Colors";
import {paddingStyle} from "../../constants/Styles";
import JourneyTab from "./JourneyTab";

const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    },
});

const JourneyStack = createStackNavigator(
    {
        journey: JourneyTab,
    },
    config
);

JourneyStack.navigationOptions = {
    tabBarIcon: ({focused}) => (
        <Icon
            color={focused ? Colors.purple : Colors.grayDark}
            name='today'
        />
    ),
};

JourneyStack.path = '';

const CalendarStack = createStackNavigator(
    {
        calendar: CalendarTabWrapper,
    },
    config
);

CalendarStack.navigationOptions = {
    tabBarIcon: ({focused}) => (
        <Icon
            color={focused ? Colors.purple : Colors.grayDark}
            name='calendar'
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
    tabBarIcon: ({focused}) => (
        <Icon
            color={focused ? Colors.purple : Colors.grayDark}
            name='add'
        />
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
    tabBarIcon: ({focused}) => (
        <Icon
            color={focused ? Colors.purple : Colors.grayDark}
            name='profile'
        />
    ),
};

ProfileStack.path = '';

const PlaceholderStack = createStackNavigator(
    {
        profile: ProfileTab,
    },
    config
);

PlaceholderStack.navigationOptions = {
    tabBarIcon: ({focused}) => (
        <Icon
            color={focused ? Colors.purple : Colors.grayDark}
            name='profile'
        />
    ),
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
    JourneyStack,
    CalendarStack,
    EditEventStack,
    ProfileStack,
    PlaceholderStack,
}, {
    tabBarOptions: {
        style: paddingStyle(10, 'top'),
        showLabel: false
    }
});

tabNavigator.path = '';

export default tabNavigator;
