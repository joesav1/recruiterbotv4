import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button} from 'react-native'
//import { Container, Item, Form, Input, Button, Label } from "native-base";
import firebase from 'firebase';
import '@firebase/firestore';
import { CheckBox } from 'react-native-elements';



//needed?
import AppNavigator from './../../navigation/AppNavigator';


export class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.userDetails = firebase.auth().currentUser
        console.log("Checking userDetails")
        console.log(this.userDetails)
        console.log("end of userDetails check -js")
        this.state = {
            email: '',
            password: '',
            //isRecruiter: false,

            };
        }
        



        
    

        Login = (email, password) => {
            try {

                firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(res => {
                        // console.log(res.user.email)
                        // console.log("checking what res.user gives")
                        // console.log(res.user)
                        // console.log("Checking res.user.uid")
                        // console.log(res.user.uid)
                        // console.log("End of res.user check - js")
                        firebase.firestore().collection('users').doc(res.user.uid).get().then(doc => {
                            // console.log("checking what doc gives -js")
                            // console.log(doc.data())
                            // console.log("End of doc check -js")
                            const getFullDoc = doc.data()
                            const isRecruiterMainMain = getFullDoc.isRecruiter
                            // console.log("checking what recruiter check gives -js")
                            // console.log(this.isRecruiterMain)
                            // console.log("End of recruiterCheck test -js")
                            if(isRecruiterMainMain) {
                                this.props.navigation.navigate('rHomepage')
                            } else {
                                console.log("Recruiter is not ticked")
                            }
                        })
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
