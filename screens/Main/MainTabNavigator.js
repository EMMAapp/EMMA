import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CalendarTabWrapper from './Calendar/CalendarTabWrapper';
import EditEventTab from './EditEvent/EditEventTab';
import ProfileTab from './ProfileTab';
import Icon from "../../components/Icon";
import Colors from "../../constants/Colors";
import {paddingStyle} from "../../constants/Styles";
import JourneyTab from "./JourneyTab";
import ChartsTab from "./ChartsTab";

const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    },
});

const Tab = createBottomTabNavigator();
export default ({}) => (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    switch (route) {
                        case "Journey":
                            iconName = 'today';
                            break;
                        case "Calendar":
                            iconName = 'calendar';
                            break;
                        case "EditEvent":
                            iconName = 'add';
                            break;
                        case "Charts":
                            iconName = 'folder';
                            break;
                        case "Profile":
                            iconName = 'profile';
                            break;
                    }
                    return <Icon
                        color={focused ? Colors.purple : Colors.grayDark}
                        name='folder'
                    />;
                },
            })}
            options={{
                headerMode: 'none',
                navigationOptions: {
                    headerVisible: false,
                }
            }}
            tabBarOptions={{
                style: paddingStyle(10, 'top'),
                showLabel: false
            }}>
            <Tab.Screen name="Journey" component={JourneyTab}/>
            <Tab.Screen name="Calendar" component={CalendarTabWrapper}/>
            <Tab.Screen name="EditEvent" component={EditEventTab}/>
            <Tab.Screen name="Charts" component={ChartsTab}/>
            <Tab.Screen name="Profile" component={ProfileTab}/>
        </Tab.Navigator>
)
