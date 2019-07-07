import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import firebase from 'firebase';
import '@firebase/firestore';

export class createCampaign extends Component {
    constructor(props) {
        super(props);
        


        this.state = {
            loading: true,
            authenticated: false,
            title: '',
            candidates: [],
            params: props.navigation.state.params.testUID
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log("Checking for a user ccampaings")
            console.log(user.user)
            console.log("End of user check ccampaigns-js")
            this.setState({ loading: false, authenticated: true });
          } else {
            this.setState({ loading: false, authenticated: false });
          }
        });
    }

    campaignButton = (title, candidates) => {
        console.log("Checking what the states currently hold, createCampaign.js")
        console.log(this.state.title)
        console.log(this.state.candidates)
        console.log("End of campaignButton states check, createCampaign.js")
        firebase.firestore().collection('users').doc(this.state.params).collection('campaigns').add({
          title: this.state.title,
          candidates: this.state.candidates,
        })
        this.props.navigation.goBack()
    }





    render() {
        console.log("firstcheck that params gives something, createCampaign-js")
        console.log(this.state.params)
        console.log("end of first param check")
        return (
            <View>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10}}
                  placeholder = {"Title"}
                  onChangeText = {title => this.setState({ title })}
                />
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10}}
                  placeholder = {"Candidates"}
                  onChangeText = {candidates => this.setState({ candidates })}
                />
                <Button 
                    title = "Submit"
                    color = "#841584"
                    onPress = {() => this.campaignButton(this.state.title, this.state.candidates)}
                    style ={{margin: 10}}
                />
                
            </View>
        )
    }
}

export default createCampaign

