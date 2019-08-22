import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Dimensions, PixelRatio} from 'react-native'
import { YellowBox } from 'react-native';


import { CheckBox, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'


import firebase, { firestore } from 'firebase';
import '@firebase/firestore';


const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height


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
            firstname: '',
            surname: '',
            company:'',
            signupTrigger: false,
            emailTrigger: false,
            //isRecruiterMain: false,

            };
        }

        promptMessagePassword() {
            if((this.state.password.length<6) && (this.state.signupTrigger == true)) {
                return(
                  <Text style={{margin: 3, fontSize: 12, color: 'white'}}>Passwords must be 6 characters or longer</Text>
                )} else {
                  return (
                    null
                  )
              }
        
            }

        promptMessageOther() {
            if((this.state.signupTrigger == true) && ((this.state.firstname.length<1) || (this.state.surname.length<1) || ((this.state.company.length<1) && (this.state.isRecruiter==true)) ||(this.state.email.length<1))) {
                    return(
                      <Text style={{margin: 3, fontSize: 12, color: 'white'}}>Fields cannot be empty!</Text>
                    )} else {
                      return (
                        null
                      )
                  }
            
                }


        promptMessageEmail() {
            if(this.state.emailTrigger==true) {
                    return(
                        <Text style={{margin: 3, fontSize: 12, color: 'white'}}>Email or Password badly formatted</Text>
                    ) 
            } else {
                return null
            }
        }
        
    
        Signup = (email,password) => {
            this.setState({signupTrigger: true})
            if(this.state.password.length<6) {
                this.promptMessagePassword()
                return null
            }

            if((this.state.firstname.length<1) || (this.state.surname.length<1) || ((this.state.company.length<1) && (this.state.isRecruiter==true)) ||(this.state.email.length<1)) {
                this.promptMessageOther()
                return null
            }



            

            try {

                //this.isRecruiterMain = false
                firebase 
                    .auth()
                    .createUserWithEmailAndPassword(email,password).catch(error => {
                        this.setState({emailTrigger:true})
                        console.log(error);})
                    .then(user => {
                        console.log("user created -js")
                        this.ref.doc(user.user.uid).set({
                            email: user.user.email,
                            firstname: this.state.firstname,
                            surname: this.state.surname,
                            uid: user.user.uid,
                            isRecruiter: this.state.isRecruiter,
                            company: this.state.company
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
                            .then(this.props.navigation.navigate('onboarding'))

                            console.log("Checking is currentuser exists via sendUseremailauth on signup 222222222222222222222")
                            console.log(firebase.auth().currentUser)
                            console.log("end of check for user 2222222 ")

                            console.log("checking what recruiter check gives 2 -js")
                            console.log(this.isRecruiterMain)
                            console.log("End of recruiterCheck test 2 -js")




                           
                        
                    }).catch(error => {
                        // Handle Errors here.
                        console.log(error);});



                
                } catch {
                console.log("couldnt login")
    
            };
        }

        companyName() {
            if(this.state.checked) {
                return(
                    <Input
                    style={styles.textInputStyle}
                    placeholder='Company Name'
                    leftIcon={{ type: 'font-awesome', name: 'briefcase', size:20, color:'white', marginRight:10 }}
                    onChangeText = {company => this.setState({ company }) }
                    inputStyle ={{margin: 10, color: 'white'}} 
                    //errorMessage = 'That email already exists in the system'
                />
                )

            } else {
                return null
            }
        }
    

        async setRecruiter() {
            try {
                recruiterSwitch = !this.state.isRecruiter
                await this.setState({isRecruiter: recruiterSwitch})
            } catch(error) {
                console.log("Setrecruiter isnt initialised -js")
            }
        }

        // testDatabaseButton() {
        //     console.log("Hi from the tdb")
        //     this.props.navigation.navigate('rHomepage')
        // }

        sendUserEmailAuth() {
            console.log("Checking is currentuser exists via sendUseremailauth on signup")
            console.log(firebase.auth().currentUser)
            console.log("end of check for user ")
            

        }
    
    render() {


        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>

                    <View>{this.promptMessageOther()}</View>

                    <Input
                        style={styles.textInputStyle}
                        placeholder='Firstname'
                        leftIcon={{ type: 'font-awesome', name: 'user', size:20, color:'white', marginRight:15 }}
                        onChangeText = {firstname => this.setState({ firstname }) }
                        inputStyle ={{margin: 10, color: 'white'}} 
                    />
                    <Input
                        style={styles.textInputStyle}
                        placeholder='Surname'
                        leftIcon={{ type: 'font-awesome', name: 'user', size:20, color:'white', marginRight:15 }}
                        onChangeText = {surname => this.setState({ surname }) }
                        inputStyle ={{margin: 10, color: 'white'}} 
                    />
                    <Input
                        style={styles.textInputStyle}
                        placeholder='Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope', size:20, color:'white', marginRight:10 }}
                        onChangeText = {email => this.setState({ email }) }
                        inputStyle ={{margin: 10, color: 'white'}} 
                        //errorMessage = 'That email already exists in the system'
                    />
                    <Input
                        style={styles.textInputStyle}
                        placeholder='Password'
                        leftIcon={{ type: 'font-awesome', name: 'lock', size:20, color:'white', marginRight:15 }}
                        onChangeText = {password => this.setState({ password }) }
                        inputStyle ={{margin: 10, color: 'white'}}
                        secureTextEntry={true}
                        //errorMessage = 'Password must be at least 6 characters long'
                    />
                    <View>{this.promptMessageEmail()}</View>
                    <View>{this.promptMessagePassword()}</View>

                
                    <View style={{flex: 0.25, width: ScreenWidth*0.8, margin: 10, marginBottom:25}}>
                        < CheckBox
                            title= "Press if Recruiter"
                            checked = {this.state.checked}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            onPress = {() => {this.setRecruiter(); this.setState({checked: !this.state.checked})}}
                        />
                        <View>{this.companyName()}</View>

                    </View>
                    <View style={{flex:0.4, width: ScreenWidth*0.6}}>
                        <Button 
                            title = "Sign-up"
                            color = '#19273c'
                            onPress = {() => {this.Signup(this.state.email, this.state.password)}}
                            buttonStyle ={{backgroundColor: '#19273c'}}
                        />
                        <Text style={{margin: 20, textAlign: "center", fontSize: 20, color: 'white'}}>
                            OR
                        </Text>
                        <Button 
                            title = "Login"
                            color = '#19273c'
                            onPress = {() => this.props.navigation.navigate('LoginPage')}
                            buttonStyle ={{backgroundColor: '#19273c'}}
                        />
                    </View>

                </View>
            </View>
        )
    }
}

export default Signup

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //width: ScreenWidth*0.8,
      //flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      
    },

    subContainer: {
        flex: 0.9,
        width: ScreenWidth*0.8,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        
      },
  

    textInputStyle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        //margin: 20,
        
        


    }
  });
