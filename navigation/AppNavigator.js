import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MAIN, ONBOARDING, TUTORIAL} from "./Routes";
import MainTabNavigator from "./BottomTabNavigator";
import OnboardingScreen from "../screens/OnboardingScreen";
import TutorialScreen from "../screens/TutorialScreen";

const Stack = createStackNavigator();

export default ({}) => (
    <NavigationContainer theme={{
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'white',
        }
    }}>
        <Stack.Navigator headerMode="none">
            <Stack.Screen name={MAIN} component={MainTabNavigator}/>
            <Stack.Screen name={ONBOARDING} component={OnboardingScreen}/>
            <Stack.Screen name={TUTORIAL} component={TutorialScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
);
