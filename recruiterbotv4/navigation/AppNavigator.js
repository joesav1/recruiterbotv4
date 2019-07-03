import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';


import LoginPage from '../screens/main/loginPage';
import rHomepage from '../screens/Recruiter/rHomepage';
import Signup from '../screens/main/signup';
import createCampaign from '../screens/Recruiter/createCampaign';

const Rootstack = createStackNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    LoginPage: { screen: LoginPage},
    rHomepage: { screen: rHomepage },
    Signup: { screen: Signup },
    createCampaign: { screen: createCampaign}
    
  });

const AppNavigator = createAppContainer(Rootstack);

export default AppNavigator
