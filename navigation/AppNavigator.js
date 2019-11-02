import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {routeConfigMap, switchConfig} from './Routing';

export const AppNavigator = createAppContainer(
    createSwitchNavigator(routeConfigMap, switchConfig)
);
