import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button} from 'react-native'
//import { Container, Item, Form, Input, Button, Label } from "native-base";
import * as firebase from 'firebase';
import ApiKeys from '../../constants/ApiKeys';
firebase.initializeApp(ApiKeys.FirebaseConfig)


export class TestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',

            };
        }
    
        Signup = (email,password) => {
            try {
                firebase 
                    .auth()
                    .createUserWithEmailAndPassword(email,password)
                    .then(user => {
                        console.log(user);
                    });
                } catch(error) {
                console.log(error.toString(error))
    
            };
        }
    
        Login = (email, password) => {
            try {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(res => {
                        console.log(res.user.email)
                    });
            } catch(error) {
                console.log("Couldnt login")
            } 
        }
    
    render() {
        console.log("Checking debugger -JS")
        return (
            <View>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText = {email => this.setState({ email }) }
                    
                />

            </View>
        )
    }
}

export default TestComponent

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      // alignItems: "center",
      justifyContent: "center"
    }
  });
