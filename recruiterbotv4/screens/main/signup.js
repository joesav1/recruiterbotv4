import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button} from 'react-native'
//import { Container, Item, Form, Input, Button, Label } from "native-base";
import firebase, { firestore } from 'firebase';
import { CheckBox } from 'react-native-elements';
import '@firebase/firestore';
import { YellowBox } from 'react-native';
//import ApiKeys from '../../constants/ApiKeys';
//firebase.initializeApp(ApiKeys.FirebaseConfig)
console.disableYellowBox = true
YellowBox.ignoreWarnings(['Require cycle']);



//needed?
import AppNavigator from './../../navigation/AppNavigator';



export class Signup extends Component {
    constructor(props) {
        super(props);


        //needed?
        //this.unsubscribe = null;

        this.ref = firebase.firestore().collection('users');

        this.state = {
            email: '',
            password: '',
            isRecruiter: false,
            //isRecruiterMain: false,

            };
        }
    
        Signup = (email,password) => {
            try {

                //this.isRecruiterMain = false
                firebase 
                    .auth()
                    .createUserWithEmailAndPassword(email,password)
                    .then(user => {
                        console.log("user created -js")
                        this.ref.doc(user.user.uid).set({
                            email: user.user.email,
                            //password: user.user.password,
                            uid: user.user.uid,
                            isRecruiter: this.state.isRecruiter
                        });
                            console.log("USER ADDED is working -js")
                            console.log(user.user.uid)

                            //remember here to use doc and not function(doc)
                            firebase.firestore().collection('users').doc(user.user.uid).get().then(doc => {
                                // console.log("checking what doc gives -js")
                                // console.log(doc.data())
                                // console.log("End of doc check -js")
                                const getFullDoc = doc.data()
                                const isRecruiterMainMain = getFullDoc.isRecruiter
                                // console.log("checking what recruiter check gives -js")
                                // console.log(this.isRecruiterMain)
                                // console.log("End of recruiterCheck test -js")
                                if(isRecruiterMainMain) {
                                    this.testDatabaseButton()
                                } else {
                                    console.log("Recruiter is not ticked")
                                }
                                
                            }).then(firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password))
                            .then(firebase.auth().currentUser.sendEmailVerification())
                            .then(this.props.navigation.navigate('LoginPage'))

                            console.log("Checking is currentuser exists via sendUseremailauth on signup 222222222222222222222")
                            console.log(firebase.auth().currentUser)
                            console.log("end of check for user 2222222 ")

                            console.log("checking what recruiter check gives 2 -js")
                            console.log(this.isRecruiterMain)
                            console.log("End of recruiterCheck test 2 -js")




                           
                        
                    })



                
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
            console.log("Hi from the tdb")
            this.props.navigation.navigate('rHomepage')
        }

        sendUserEmailAuth() {
            console.log("Checking is currentuser exists via sendUseremailauth on signup")
            console.log(firebase.auth().currentUser)
            console.log("end of check for user ")
            

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
                    onPress = {() => {this.Signup(this.state.email, this.state.password)}}
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

                <Button 
                    title = "Login"
                    color = '#FF8733'
                    onPress = {() => this.props.navigation.navigate('LoginPage')}
                    style ={{margin: 10}}
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
