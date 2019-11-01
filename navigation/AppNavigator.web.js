import {createBrowserApp} from '@react-navigation/web';
import {createSwitchNavigator} from 'react-navigation';

import {routeConfigMap, switchConfig} from './Routing';

const authenticatedSwitchNavigator = createSwitchNavigator(routeConfigMap, switchConfig(true));
authenticatedSwitchNavigator.path = '';

const unauthenticatedSwitchNavigator = createSwitchNavigator(routeConfigMap, switchConfig(false));
unauthenticatedSwitchNavigator.path = '';

export const AuthenticatedAppNavigator = createBrowserApp(authenticatedSwitchNavigator, {history: 'hash'});

export const UnauthenticatedAppNavigator = createBrowserApp(unauthenticatedSwitchNavigator, {history: 'hash'});
