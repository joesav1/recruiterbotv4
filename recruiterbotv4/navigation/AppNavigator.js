import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import TestScreen from '../screens/TestScreen';
import rHomepage from '../screens/Recruiter/rHomepage';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    TestScreen: { screen: TestScreen},
    rHomepage: { screen: rHomepage }
  })
);
