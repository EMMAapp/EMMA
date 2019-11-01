import MainTabNavigator from "./MainTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {LOGIN, MAIN, REGISTER} from "./Routes";

export const routeConfigMap = {};

routeConfigMap[MAIN] = MainTabNavigator;
routeConfigMap[LOGIN] = LoginScreen;
routeConfigMap[REGISTER] = RegisterScreen;

export const switchConfig = (authenticated) => {
    return {
        initialRouteName: authenticated ? MAIN : REGISTER
    }
};
