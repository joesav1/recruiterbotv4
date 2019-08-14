import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, TouchableHighlight, Modal} from 'react-native'
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
        // console.log("Checking userDetails")
        // console.log(this.userDetails)
        // console.log("end of userDetails check -js")
        this.state = {
            email: '',
            password: '',
            modalVisible: false,
            //isRecruiter: false,

            };
        }
        



        setModalVisible(visible) {
            this.setState({modalVisible: visible});
          }
    

        Login = (email, password) => {
            try {

                firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(res => {
                        // console.log(res.user.email)
                        console.log("checking what res gives")
                        console.log(res)
                        // console.log("Checking res.user.uid")
                        // console.log(res.user.uid)
                        console.log("End of res.user check - js")
                        
                        //NOTE! REMEMBER TO CHANGE THIS TO FALSE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        if(res.user.emailVerified == true) {
                            console.log("Made it inside the res.user.emailVerified loop")
                            this.setModalVisible(true)
                        } else {

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
                                // console.log("About to navigate to rHomepage checking is res.user.uid exisits still")
                                // console.log(res.user.uid)
                                // console.log("End of res.user.uid check -js")
                                this.props.navigation.navigate('rHomepage', {testUID: res.user.uid})
                            } else {
                                // console.log("Recruiter is not ticked, so navogating to cHomepage!")
                                this.props.navigation.navigate('cHomepage', {testUID: res.user.uid})
                            }
                        })
                    
                    }

    
                });



                    var testingUser = firebase.auth().currentUser
                    // console.log("CHecking if testing user exists 1")
                    // console.log(testingUser)
                    // console.log("ENd of test")

            } catch(error) {
                console.log("Couldnt login")
            } 
        }




    
    render() {
        //console.log("Checking debugger -JS")
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
                                    <View style={styles.container2}>
                                        <View >
                                        <Text>Please verify your email</Text>

                                        <Button
                                            title = "Close"
                                            onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                            }}/>
                                            
                                        </View>
                                    </View>
                                    </Modal>
                </View>
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
      flexDirection: "column",
      //backgroundColor: "#fff",
      // alignItems: "center",
      //justifyContent: "center"
    },
    container2: {
        flex: 0.25,
        flexDirection: "column",
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {

    }
  });
