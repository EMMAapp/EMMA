import MainTabNavigator from "../screens/Main/MainTabNavigator";
import LoginScreen from "../screens/Auth/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import {LOGIN, MAIN, ONBOARDING} from "./Routes";

export const routeConfigMap = {};

routeConfigMap[MAIN] = MainTabNavigator;
routeConfigMap[LOGIN] = LoginScreen;
routeConfigMap[ONBOARDING] = OnboardingScreen;

export const switchConfig = {
    initialRouteName: MAIN
};
