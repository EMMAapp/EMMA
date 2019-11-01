import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {routeConfigMap, switchConfig} from './Routing';

export const AuthenticatedAppNavigator = createAppContainer(
    createSwitchNavigator(routeConfigMap, switchConfig(true))
);

export const UnauthenticatedAppNavigator = createAppContainer(
    createSwitchNavigator(routeConfigMap, switchConfig(false))
);
