import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';


import LoginPage from '../screens/main/loginPage';
import rHomepage from '../screens/Recruiter/rHomepage';
import Signup from '../screens/main/signup';
import createCampaign from '../screens/Recruiter/createCampaign';
import Campaign from '../screens/Recruiter/campaign'
import campaignDetails from '../screens/Recruiter/campaignDetails';
import cHomepage from '../screens/Candidate/cHomepage';
import taskDetails from '../screens/Candidate/taskDetails';
import chatbotShell from '../screens/chatbot/chatbotShell';
import cHoldingPage from '../screens/Candidate/cHoldingPage';


const Rootstack = createStackNavigator({


    LoginPage: { screen: LoginPage},
    Signup: { screen: Signup },
    rHomepage: { screen: rHomepage },
    createCampaign: { screen: createCampaign},
    campaignDetails: { screen: campaignDetails},
    Campaign: { screen: Campaign },
    cHomepage: { screen: cHomepage },
    taskDetails: { screen: taskDetails },
    cHoldingPage: { screen: cHoldingPage, },
    chatbotShell: {
        screen: chatbotShell,
        navigationOptions: {
        header: null
      } 
    },
    
  });

const AppNavigator = createAppContainer(Rootstack);

export default AppNavigator
