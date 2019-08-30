import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Dimensions, PixelRatio, Image} from 'react-native'
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
            checked: false
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
            if((this.state.signupTrigger == true) && ((this.state.firstname.length<1) || (this.state.surname.length<1) || ((this.state.company.length<1) && (this.state.checked==true)) ||(this.state.email.length<1))) {
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
            } else if((this.state.firstname.length<1) || (this.state.surname.length<1) || ((this.state.company.length<1) && (this.state.checked==true)) ||(this.state.email.length<1)) {
                this.promptMessageOther()
                return null
            } else {



            

            try {

                //this.isRecruiterMain = false
                firebase 
                    .auth()
                    .createUserWithEmailAndPassword(email,password).catch(error => {
                        this.setState({emailTrigger:true})
                        console.log(error);})
                    .then(user => {
                        this.ref.doc(user.user.uid).set({
                            email: user.user.email,
                            firstname: this.state.firstname,
                            surname: this.state.surname,
                            uid: user.user.uid,
                            isRecruiter: this.state.isRecruiter,
                            company: this.state.company
                        });
                            firebase.auth().currentUser.sendEmailVerification()

                            this.ref.doc(user.user.uid).collection('tasks').add({
                                completed: false,
                                title: 'Example Task',
                                transcript: null,
                                company: 'Example Company',
                                created: new Date().toDateString(),
                                problem: false,
                            })                        
                        
                    }).catch(error => {
                        console.log(error);})
                    .then(res => {
                            if(this.state.isRecruiter==true) {
                                // firebase.auth().signOut().catch(error => {
                                //     console.log(error);
                                // })

                                this.props.navigation.navigate('onboarding')}
                            else if(this.state.isRecruiter==false) {
                                // firebase.auth().signOut().catch(error => {
                                //     console.log(error);
                                // })
                                this.props.navigation.navigate('LoginPage') }
                    });



                
                } catch {
                console.log("couldnt login")
    
             };
          }
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
                await this.setState({checked: !this.state.checked})
                if(this.state.checked == true) {
                    await this.setState({isRecruiter: true})
                } else if(this.state.checked == false) {
                    await this.setState({isRecruiter: false})   
                }
                
                
            } catch(error) {
                console.log("Setrecruiter isnt initialised -js")
            }
        }


        sendUserEmailAuth() {
            console.log("Checking is currentuser exists via sendUseremailauth on signup")
            console.log(firebase.auth().currentUser)
            console.log("end of check for user ")
            

        }
    
    render() {


        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>

                    <Image source={require('../images/IBMRecruitLogo.png')} style={{marginBottom:10, marginTop:25}} />

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

                
                    <View style={{flex: 0.2, width: ScreenWidth*0.8, margin: 10, marginBottom:25}}>
                        < CheckBox
                            title= "Press if Recruiter"
                            checked = {this.state.checked}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            onPress = {() => {this.setRecruiter()}}
                        />
                        <View style={{marginBottom: 10}}>{this.companyName()}</View>

                    </View>
                </View>
                <View style={styles.subContainer2}>
                        <Button 
                            title = "Sign-up"
                            color = '#19273c'
                            onPress = {() => {this.Signup(this.state.email, this.state.password)}}
                            buttonStyle ={{backgroundColor: '#19273c', width: ScreenWidth*0.6}}
                        />
                        <Text style={{margin: 10, textAlign: "center", fontSize: 20, color: 'white'}}>
                            OR
                        </Text>
                        <Button 
                            title = "Login"
                            color = '#19273c'
                            onPress = {() => this.props.navigation.navigate('LoginPage')}
                            buttonStyle ={{backgroundColor: '#19273c', width: ScreenWidth*0.6}}
                        />
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
        flex: 0.7,
        width: ScreenWidth*0.8,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        
      },

    subContainer2: {
        flex: 0.25,
        width: ScreenWidth*0.6,
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
