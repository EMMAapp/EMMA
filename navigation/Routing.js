import MainTabNavigator from "../screens/Main/MainTabNavigator";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import {LOGIN, MAIN, ONBOARDING, REGISTER} from "./Routes";

export const routeConfigMap = {};

routeConfigMap[MAIN] = MainTabNavigator;
routeConfigMap[LOGIN] = LoginScreen;
routeConfigMap[REGISTER] = RegisterScreen;
routeConfigMap[ONBOARDING] = OnboardingScreen;

export const switchConfig = {
    initialRouteName: MAIN
};
