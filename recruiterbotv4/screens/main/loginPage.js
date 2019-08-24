import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, TouchableHighlight, Dimensions, Modal, Image} from 'react-native'
//import { Container, Item, Form, Input, Button, Label } from "native-base";
import firebase from 'firebase';
import '@firebase/firestore';
import { Input, CheckBox } from 'react-native-elements';



//needed?
import AppNavigator from './../../navigation/AppNavigator';


const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height

export class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.userDetails = firebase.auth().currentUser
        this.state = {
            email: '',
            password: '',
            modalVisible: false,
            loginTrigger: false,
            //isRecruiter: false,

            };
        }

        promptMessagePassword() {
            if(this.state.loginTrigger == true) {
                return(
                  <Text style={{margin: 3, fontSize: 12, color: 'white'}}>Email or Password is incorrect</Text>
                )} else {
                  return (
                    null
                  )
              }
        
            }
        



        setModalVisible(visible) {
            this.setState({modalVisible: visible});
          }
    

        Login = (email, password) => {
            try {

                firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password).catch(error => {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        this.setState({loginTrigger: true})
                        console.log(error);})
                    .then(res => {
                        
                        //NOTE! REMEMBER TO CHANGE THIS TO FALSE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(res.user.emailVerified == false) {
                            this.setModalVisible(true)
                        } else {

                        firebase.firestore().collection('users').doc(res.user.uid).get().then(doc => {
                            const getFullDoc = doc.data()
                            const isRecruiterMainMain = getFullDoc.isRecruiter
                            const isAdmin = getFullDoc.isAdmin
                            if(isRecruiterMainMain) {
                                if(res.additionalUserInfo.isNewUser==true){
                                    this.props.navigation.navigate('onboarding')
                                } else {
                                this.props.navigation.navigate('rHomepage', {testUID: res.user.uid})
                                }
                            }else if(isAdmin){
                                this.props.navigation.navigate('adminHomepage');
                            } else {
                                this.props.navigation.navigate('cHomepage', {testUID: res.user.uid})
                            }
                        })
                    
                    }

    
                }).catch(error => {
                    console.log(error);});



                    var testingUser = firebase.auth().currentUser

            } catch(error) {
                console.log("Couldnt login")
            } 
        }




    
    render() {
        return (
            <View style={styles.container}>
                <View style={{marginTop: 22}}>
                                    <Modal
                                    animationType="slide"
                                    transparent={false}
                                    visible={this.state.modalVisible}
                                    onRequestClose={() => {
                                        Alert.alert('Modal has been closed.');
                                    }}>
                                        <View style={styles.modalContainer}>
                                            <View >
                                            <Text style={{margin: 20, textAlign: "center", fontSize: 20, color: 'white'}}>Please verify your email</Text>

                                            <Button
                                                buttonStyle ={{backgroundColor: '#f7e7e2', width: ScreenWidth*0.6}}
                                                title = "Close"
                                                onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                                }}/>
                                                
                                            </View>
                                        </View>
                                    </Modal>
                </View>
                <View style={styles.subContainer}>
                    <Image source={require('../images/IBMRecruitLogo.png')} style={{marginBottom:10, marginTop:25}} />
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
                </View>
                <View>{this.promptMessagePassword()}</View>
                <View style={{flex:0.4, width: ScreenWidth*0.6, margin: 30}}>
                        <Button 
                            title = "Login"
                            color = "#19273c"
                            onPress = {() => this.Login(this.state.email, this.state.password)}
                            buttonStyle ={{margin: 10, backgroundColor:'#19273c'}}
                        />
                        <Text style={{margin: 20, textAlign: "center", fontSize: 20, color: 'white'}}>
                            OR
                        </Text>
                        <Button 
                            title = "Sign-up"
                            color = '#19273c'
                            onPress = {() => this.props.navigation.navigate('Signup')}
                            buttonStyle ={{backgroundColor: '#19273c'}}
                        />
                        
                </View>
            </View>
        )
    }
}

export default LoginPage

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //flexDirection: "column",
      //backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    },
    subContainer: {
        width: ScreenWidth*0.8,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    modalContainer: {
        width: ScreenWidth,
        height: ScreenHeight,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#19273c"
    }
  });
