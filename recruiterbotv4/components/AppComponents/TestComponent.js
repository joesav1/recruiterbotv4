import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button} from 'react-native'
//import { Container, Item, Form, Input, Button, Label } from "native-base";
import * as firebase from 'firebase';
import ApiKeys from '../../constants/ApiKeys';
firebase.initializeApp(ApiKeys.FirebaseConfig)


import AppNavigator from './../../navigation/AppNavigator';


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
                        console.log("User created");
                    });
                //this.props.navigation.navigate('rHomepage')
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
        //console.log("Checking debugger -JS")
        return (
            <View>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10}}
                    onChangeText = {email => this.setState({ email }) }
                />
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10}}
                    onChangeText = {password => this.setState({ password }) }
                />
                <Button 
                    title = "Login"
                    color = "#841584"
                    onPress = {() => this.Login(this.state.email, this.state.password)}
                    style ={{margin: 10}}
                />
                <Button 
                    title = "Sign-up"
                    color = '#FF5733'
                    onPress = {() => this.Signup(this.state.email, this.state.password)}
                    style ={{margin: 10}}
                />
                <Button 
                    title = "test-screens"
                    color = '#FF5733'
                    onPress = {() => this.props.navigation.navigate('rHomepage')}
                    style ={{margin: 10}}
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
