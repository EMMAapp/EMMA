import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LOGIN, MAIN, ONBOARDING} from "./Routes";
import MainTabNavigator from "../screens/Main/MainTabNavigator";
import LoginScreen from "../screens/Auth/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";

const Stack = createStackNavigator();

export default ({}) => (
    <NavigationContainer>
        <Stack.Navigator headerMode="none">
            <Stack.Screen name={MAIN} component={MainTabNavigator}/>
            <Stack.Screen name={LOGIN} component={LoginScreen}/>
            <Stack.Screen name={ONBOARDING} component={OnboardingScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
);
