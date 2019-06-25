import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button} from 'react-native'
//import { Container, Item, Form, Input, Button, Label } from "native-base";
import firebase from 'firebase';
import { CheckBox } from 'react-native-elements';



//needed?
import AppNavigator from './../../navigation/AppNavigator';



export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isRecruiter: false,

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
                    this.props.navigation.navigate('rHomepage')
            } catch(error) {
                console.log("Couldnt login")
            } 
        }

        setRecruiter() {
            try {
                console.log("checking if initialized setrecruiter -js")
                this.state.isRecruiter = true
                console.log(this.state.isRecruiter)
                console.log("Checking if true for setrecruiter")
            } catch(error) {
                console.log("Setrecruiter isnt initialised -js")
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
                < CheckBox
                    title= "Tick if Recruiter"
                    checked = {this.state.checked}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress = {() => {this.setRecruiter(); this.setState({checked: !this.state.checked})}}
                />

            </View>
        )
    }
}

export default LoginPage

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      // alignItems: "center",
      justifyContent: "center"
    }
  });
