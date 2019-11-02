import MainTabNavigator from "../screens/Main/MainTabNavigator";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import {LOGIN, MAIN, REGISTER} from "./Routes";

export const routeConfigMap = {};

routeConfigMap[MAIN] = MainTabNavigator;
routeConfigMap[LOGIN] = LoginScreen;
routeConfigMap[REGISTER] = RegisterScreen;

export const switchConfig = {
    initialRouteName: MAIN
};
