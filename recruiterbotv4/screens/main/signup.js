import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button} from 'react-native'
//import { Container, Item, Form, Input, Button, Label } from "native-base";
import firebase from 'firebase';
import { CheckBox } from 'react-native-elements';
//import ApiKeys from '../../constants/ApiKeys';
//firebase.initializeApp(ApiKeys.FirebaseConfig)



//needed?
import AppNavigator from './../../navigation/AppNavigator';



export class Signup extends Component {
    constructor(props) {
        super(props);

        //needed?
        this.unsubscribe = null;

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
                        console.log("user created -js")
                        console.log(user)
                        console.log("testing user.email output - js")
                        console.log(user.user.email)
                        console.log(user.user.password)
                        console.log(user.user.uid)
                        console.log(this.state.isRecruiter)
                        console.log("END OF USER DETIALZZ - js")
                        //NEED TO INSTALL EXPO_FIREBASE_DATABASE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        firebase.database().ref('users').set({
                            email: user.user.email,
                            //password: user.user.password,
                            uid: user.user.uid,
                            isRecruiter: this.state.isRecruiter
                        });
                    });

                
                } catch(error) {
                console.log(error.toString(error))
    
            };
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

        testDatabaseButton() {
            console.log("Testing if user exists here - js")
            //console.log(user.user.email)
            console.log(this.state.isRecruiter)
            console.log("End of test -js")
            firebase.database().ref('users').set({
                email: "Testbutton2@testsav.net",
                //password: user.user.password,
                uid: "123456789a",
                isRecruiter: this.state.isRecruiter
            });
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
                    title = "Sign-up"
                    color = '#FF5733'
                    onPress = {() => this.Signup(this.state.email, this.state.password)}
                    style ={{margin: 10}}
                />


                <Button 
                    title = "Test Button"
                    color = '#FF8733'
                    onPress = {() => this.testDatabaseButton()}
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

export default Signup

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      // alignItems: "center",
      justifyContent: "center"
    }
  });
