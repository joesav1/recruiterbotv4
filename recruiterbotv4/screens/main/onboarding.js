import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { Button, Icon } from 'react-native-elements';
import Onboarding from 'react-native-onboarding-swiper';
import { withNavigation } from 'react-navigation';



export class onboarding extends Component {
    constructor(props) {
        super(props)

        this.state= {
            finished: false,
        }

    }

    Done() {
        <Button
          title={'Done'}
          type="clear"
        //   buttonStyle={{
        //     backgroundColor: backgroundColor(isLight),
        //   }}
          containerViewStyle={{
            marginVertical: 10,
            width: 70,
            //backgroundColor: backgroundColor(isLight),
          }}
          textStyle={{ color: '#1D3458' }}
          //{...props}
          onPress = {()=> this.setState({finished:true})}
        />
        }

    checkFinished() {
        if(this.state.finished=true) {
            this.props.navigation.navigate('LoginPage')
        } else {
            return null
        }
    }
    
    render() {
        return (
            //<OnboardingMain/>
            <Onboarding
            //DoneButtonComponent={this.Done}
            //onDone={this.checkFinished()}
            //DotComponent={Square}
            //NextButtonComponent={Next}
            //SkipButtonComponent={Skip
            titleStyles={{ color: '1D3458' }} // set default color for the title
            
            pages={[
              {
                backgroundColor: '#ffffff',
                image: <Image source={require('../images/RecruiterPageOne.jpg')} />,
                title: 'Welcome to IBM Recruit',
                subtitle: ' ',
                //titleStyles: { color: '1D3458' }, // overwrite default color
              },
              {
                backgroundColor: '#ffffff',
                image: <Image source={require('../images/createCampaign.jpg')} />,
                title: 'Create Campaigns',
                subtitle: ' ',
              },
              {
                backgroundColor: '#ffffff',
                image: <Image source={require('../images/campaignDetails.jpg')} />,
                title: 'View users interview scores',
                subtitle: " ",
              },
              {
                  backgroundColor: '#ffffff',
                  image: <Image source={require('../images/DeepDive.jpg')} />,
                  title: 'See more about an individual user',
                  subtitle: " ",
                },
              {
                  backgroundColor: '#ffffff',
                  image: <Image source={require('../images/swipedelete.jpg')} />,
                  title: 'Delete with a simple swipe',
                  subtitle: " ",
                  //onDone: this.props.navigation.navigate('LoginPage')
              },
            ]}
          />

        )
    }
}

export default withNavigation(onboarding)

