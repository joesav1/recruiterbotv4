import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from "react-native-elements";
import firebase from 'firebase';
import '@firebase/firestore';

export class userSettings extends Component {
    constructor(props) {
        super(props)
        this.userDetailsSettings = firebase.auth().currentUser
        this.state = {
            recruiterSettings: false,
        }
    }

    render() {
        console.log("Checking userDetailsSettings on the settings page")
        console.log(this.userDetailsSettings)
        console.log("end of userDetailsSettingsCheck")
        return (
            <View>
                <Text> Test2</Text>
            </View>
        )
    }
}

export default userSettings
