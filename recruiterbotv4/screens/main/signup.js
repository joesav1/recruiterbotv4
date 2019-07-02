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
            isRecruiterMain: false,

            };
        }
    
        Signup = (email,password) => {
            try {
                this.isRecruiterMain = false
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

                            firebase.firestore().collection('users').doc(user.user.uid).get().then(doc => {
                                console.log("checking what doc gives -js")
                                console.log(doc.data())
                                console.log("End of doc check -js")
                                const getFullDoc = doc.data()
                                this.isRecruiterMain = getFullDoc.isRecruiter
                                console.log("checking what recruiter check gives -js")
                                console.log(this.isRecruiterMain)
                                console.log("End of recruiterCheck test -js")
                                this.testDatabaseButton()
                            })

                            console.log("checking what recruiter check gives 2 -js")
                            console.log(this.isRecruiterMain)
                            console.log("End of recruiterCheck test 2 -js")




                            // const recruiterCheck = userUID.data().isRecruiter
                            // console.log("Checking recruiterCheck variable")
                            // console.log(recruiterCheck)
                            // console.log("End of recruiterCheck -js")
                            

                            // firebase.firestore().runTransaction(async transaction => {
                            // const userUID = await transaction.get(ref.doc(user.user.uid));
                            // console.log("CHecking userUID")
                            // console.log(userUID)
                            // console.log("End of userUID check")

                            // const recruiterCheck = userUID.data().isRecruiter
                            // console.log("Checking recruiterCheck variable")
                            // console.log(recruiterCheck)
                            // console.log("End of recruiterCheck -js")
                            // if (recruiterCheck == 'true') {
                            //     console.log("Can return recruiter check as true! -js")
                            // } else {
                            //     console.log("checked recruiter returned false -js")
                            // }
                            
                            // })
                        
                        // const userUID = this.ref.doc(user.user.uid).get()
                        // console.log("checking if userUID returns anything")
                        // console.log(userUID)
                        // console.log("End of userUID test- js")
                        
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
