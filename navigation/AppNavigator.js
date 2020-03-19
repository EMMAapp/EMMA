import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {LOGIN, MAIN, ONBOARDING} from "./Routes";
import MainTabNavigator from "../screens/Main/MainTabNavigator";
import LoginScreen from "../screens/Auth/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import appContext from "../utils/context";

const Stack = createStackNavigator();
const {Consumer} = appContext;

export default ({}) => (
    <Consumer>
        {
            context => {
                console.error(context)
                return (
                    (
                        <NavigationContainer>
                            <Stack.Navigator headerMode="none">
                                <Stack.Screen name={MAIN} component={() => <MainTabNavigator {...context}/>} />
                                <Stack.Screen name={LOGIN} component={() => <LoginScreen {...context}/>} />
                                <Stack.Screen name={ONBOARDING} component={() => <OnboardingScreen {...context}/>} />
                            </Stack.Navigator>
                        </NavigationContainer>
                    )
                )
            }
        }
    </Consumer>
);
