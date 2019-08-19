import React from 'react';
import { createStackNavigator, createAppContainer, DrawerNavigator } from 'react-navigation';


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
import rolesMain from '../screens/Recruiter/roles/rolesMain';
import chatbotHoldingPage from '../screens/chatbot/chatbotHoldingPage';
import CustomHeader from './CustomHeader';
import userSettings from '../screens/main/userSettings';



const Rootstack = createStackNavigator({

    Signup: { screen: Signup,
      navigationOptions: {
        header: null
      } 
        
    },
    LoginPage: { screen: LoginPage,
      navigationOptions: {
        header: <CustomHeader/>
      }
    },
    
    rHomepage: { screen: rHomepage,
      navigationOptions: {
        header: <CustomHeader/>
      }
     },

    createCampaign: { 
      screen: createCampaign,
              navigationOptions: {
        headerStyle: {backgroundColor:'#1d3458', shadowColor: 'transparent', elevation: 0,
        shadowOpacity: 0},
        headerTintColor: 'white'
      } 
    },

    campaignDetails: { screen: campaignDetails,
      navigationOptions: {
        headerStyle: {backgroundColor:'#1d3458', shadowColor: 'transparent', elevation: 0,
        shadowOpacity: 0},
        headerTintColor: 'white',
        
      } 
    },

    Campaign: { screen: Campaign },
    cHomepage: { screen: cHomepage,
      navigationOptions: {
        header: <CustomHeader/>
      }
    },
    
    taskDetails: { screen: taskDetails},

    cHoldingPage: { screen: cHoldingPage,
      navigationOptions: {
        headerStyle: {backgroundColor:'#1d3458', shadowColor: 'transparent', elevation: 0,
        shadowOpacity: 0},
        headerTintColor: 'white'
      }  
    },

    chatbotShell: {
        screen: chatbotShell,
        navigationOptions: {
        header: null
      } 
    },

    rolesMain: { screen: rolesMain },

    chatbotHoldingPage: { screen: chatbotHoldingPage,
      navigationOptions: {
        header: null
      } 
    },

    userSettings: { screen: userSettings },
    CustomHeader: { screen: CustomHeader }
    },{

    cardStyle: {
      backgroundColor: '#1d3458'
      }
    }    
  );

const AppNavigator = createAppContainer(Rootstack);

export default AppNavigator
