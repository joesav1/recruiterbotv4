import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';


import LoginPage from '../screens/main/loginPage';
import rHomepage from '../screens/Recruiter/rHomepage';
import Signup from '../screens/main/signup';

const Rootstack = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    LoginPage: { screen: LoginPage},
    Signup: { screen: Signup },
    rHomepage: { screen: rHomepage }
  });

const AppNavigator = createAppContainer(Rootstack);

export default AppNavigator
