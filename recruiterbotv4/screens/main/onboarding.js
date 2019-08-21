import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { Button, Icon } from 'react-native-elements';
import Onboarding from 'react-native-onboarding-swiper';
import { withNavigation } from 'react-navigation';



export class onboarding extends Component {
    constructor(props) {
        super(props)

        this.state= {
            finished: true,
        }

    }

    Done() {
        return (
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
            onPress = {()=> this.checkFinished()}
            />
        )
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
            onDone={() => this.checkFinished()}
            //DotComponent={Square}
            //NextButtonComponent={Next}
            //SkipButtonComponent={Skip
            titleStyles={{ color: '#ffffff' }} // set default color for the title
            
            pages={[
              {
                backgroundColor: '#1D3458',
                image: <Image source={require('../images/RecruiterPageOne.png')} />,
                title: 'Welcome to IBM Recruit',
                subtitle: ' ',
                //titleStyles: { color: '1D3458' }, // overwrite default color
              },
              {
                backgroundColor: '#1D3458',
                image: <Image source={require('../images/createCampaign.png')} />,
                title: 'Create Campaigns',
                subtitle: ' ',
              },
              {
                backgroundColor: '#1D3458',
                image: <Image source={require('../images/campaignDetails.png')} />,
                title: 'View users interview scores',
                subtitle: " ",
              },
              {
                  backgroundColor: '#1D3458',
                  image: <Image source={require('../images/DeepDive.png')} />,
                  title: 'See more about an individual user',
                  subtitle: " ",
                },
              {
                  backgroundColor: '#1D3458',
                  image: <Image source={require('../images/swipedelete.png')} />,
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

