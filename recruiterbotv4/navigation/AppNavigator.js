import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';


import TestComponent from '../components/AppComponents/TestComponent';
import rHomepage from '../screens/Recruiter/rHomepage';

const Rootstack = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    TestComponent: { screen: TestComponent},
    rHomepage: { screen: rHomepage }
  });

const AppNavigator = createAppContainer(Rootstack);

export default AppNavigator
