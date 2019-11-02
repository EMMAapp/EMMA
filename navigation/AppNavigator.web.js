import {createBrowserApp} from '@react-navigation/web';
import {createSwitchNavigator} from 'react-navigation';

import {routeConfigMap, switchConfig} from './Routing';

const switchNavigator = createSwitchNavigator(routeConfigMap, switchConfig);
switchNavigator.path = '';

export const AppNavigator = createBrowserApp(switchNavigator, {history: 'hash'});
