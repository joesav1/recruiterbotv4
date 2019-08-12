import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from "react-native-elements";
import firebase from 'firebase';
import '@firebase/firestore';
import { Content } from 'native-base';


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
                <View style={styles.container}>
                    <TouchableHighlight
                        style = {styles.option}
                        onPress = {() => console.log("Pressed")}
                        >
                        <Text>Change Company Title</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style = {styles.option}
                        onPress = {() => console.log("Pressed2")}
                        >
                        <Text>Change Personal Details</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style = {styles.option}
                        onPress = {() => console.log("Pressed3")}
                        >
                        <Text>Reset Password</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style = {styles.option}
                        onPress = {() => console.log("Pressed4")}
                        >
                        <Text>About</Text>
                    </TouchableHighlight>
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

styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    option: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#c9c6c5"
    }
})