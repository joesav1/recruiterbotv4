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
        this.ref = firebase.firestore().collection('users')

    }

    componentDidMount() {
        this.ref.doc(this.userDetailsSettings.uid).get().then(doc => {
            const getFullDoc = doc.data()
            if(getFullDoc.isRecruiter == true) {
                this.setState({recruiterSettings: true})
            }
        })
    }



    render() {
        if(this.state.recruiterSettings) {
            return(
                <View>
                    
                </View>
            )
        }
        return (
            <View>
                <Text> Test2</Text>
            </View>
        )
    }
}

export default userSettings
