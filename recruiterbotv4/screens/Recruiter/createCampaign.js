import React, { Component } from 'react'
import { Text, View, TextInput } from 'react-native'
import firebase from 'firebase';
import '@firebase/firestore';

export class createCampaign extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            authenticated: false,
            title: '',
            candidates: null,
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





    render() {
        return (
            <View>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10}}
                  placeholder = {"Title"}
                />
            </View>
        )
    }
}

export default createCampaign

