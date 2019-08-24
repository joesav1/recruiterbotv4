import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Icon, Input, Button } from "react-native-elements";

import firebase from 'firebase';
import '@firebase/firestore';
import { Content } from 'native-base';


const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height

export class userSettings extends Component {
    constructor(props) {
        super(props)
        this.userDetailsSettings = firebase.auth().currentUser
        this.state = {
            recruiterSettings: false,
            companyTitle : '',
            firstname:'',
            surname:'',
            password: '',
            firstnameSwitch: false,
            surnameSwitch:false,
            companyTitleSwitch:false,
            passwordSwitch:false,
            
        }
        this.ref = firebase.firestore().collection('users')
        this.currentUserDetails = firebase.auth().currentUser

    }

    componentDidMount() {
        this.ref.doc(this.userDetailsSettings.uid).get().then(doc => {
            const getFullDoc = doc.data()
            if(getFullDoc.isRecruiter == true) {
                this.setState({recruiterSettings: true})
            }
        })
    }

    changeCompanyTitle() {
        try {
            this.ref.doc(this.currentUserDetails.uid).update({
                company: this.state.companyTitle
            })
        } catch {
            console.log("cant update")
        }
    }

    changeFirstname() {
            try {
            this.ref.doc(this.currentUserDetails.uid).update({
                firstname: this.state.firstname
            })
        } catch {
            console.log("cant update")
        }
    }

    changeSurname() {
        try {
        this.ref.doc(this.currentUserDetails.uid).update({
            surname: this.state.surname
        })
        } catch {
            console.log("cant update")
        }
    }

    changePassword() {
        try {
            this.userDetailsSettings.updatePassword(this.state.password).then(function() {
                console.log("Password updated")
            }).catch(function(error) {
                // An error happened.
              });
        } catch {
            console.log("cant update")
        }
    }

    promptMessageTitle() {
        if(this.state.companyTitleSwitch==true) {
          return(
            <Text style={{margin: 3, fontSize: 12, color: 'black'}}>Company Title Changed!</Text>
          )} else {
            return (
              null
            )
        }
  
      }

      promptMessageFirstname() {
        if(this.state.firstnameSwitch==true) {
          return(
            <Text style={{margin: 3, fontSize: 12, color: 'black'}}>Firstname Changed!</Text>
          )} else {
            return (
              null
            )
        }
  
      }

      promptMessageSurname() {
        if(this.state.surnameSwitch==true) {
          return(
            <Text style={{margin: 3, fontSize: 12, color: 'black'}}>Surname Changed!</Text>
          )} else {
            return (
              null
            )
        }
  
      }

      promptMessagePassword() {
        if(this.state.passwordSwitch==true) {
          return(
            <Text style={{margin: 3, fontSize: 12, color: 'black'}}>Password Changed!</Text>
          )} else {
            return (
              null
            )
        }
  
      }




    



    render() {

            return(
                    <ScrollView>
                        <View style={styles.container}>
                            {this.state.recruiterSettings && (
                                <Collapse style={{ borderColor:"#1d3458", borderWidth:1}}>
                                    <CollapseHeader>
                                        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", width: ScreenWidth, height: ScreenHeight*0.2, backgroundColor:'#f7e7e2'}}>
                                            <Text style={{fontSize: 20, fontWeight: "bold", color:"#1d3458"}}>Change Company Title</Text>
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody style={{flexDirection:"column", alignItems:"center", justifyContent:"center", width: ScreenWidth, backgroundColor:'#f7e7e2'}}>
                                        <Input
                                            style={styles.textInputStyle}
                                            placeholder='New Company Name'
                                            //leftIcon={{ type: 'font-awesome', name: 'envelope', size:20, color:'white', marginRight:10 }}
                                            onChangeText = {companyTitle => this.setState({ companyTitle }) }
                                            inputStyle ={{margin: 10, color: '#1d3458'}} 
                                            //value={this.state.companyTitle}
                                            //errorMessage = 'That email already exists in the system'
                                        />
                                        <View>{this.promptMessageTitle()}</View>
                                        <Button 
                                            title = "Submit"
                                            color = "#34bc6e"
                                            onPress = {() => {this.setState({companyTitleSwitch: true}); this.changeCompanyTitle(); this.promptMessageTitle()}}
                                            //style ={{margin: 5}}
                                            buttonStyle ={{margin: 10, backgroundColor: '#34bc6e', width: ScreenWidth*0.4, marginBottom:20}}

                                            
                                        />
                                        

                                    </CollapseBody>
                                </Collapse>

                            )}
                                <Collapse style={{ borderColor:"#1d3458", borderWidth:1}}>
                                    <CollapseHeader>
                                        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", width: ScreenWidth, height: ScreenHeight*0.2, backgroundColor:'#f7e7e2'}}>
                                            <Text style={{fontSize: 20, fontWeight: "bold", color:"#1d3458"}}>Change Personal Details</Text>
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody style={{flexDirection:"column", alignItems:"center", justifyContent:"center", width: ScreenWidth, backgroundColor:'#f7e7e2'}}>
                                        <Input
                                            style={styles.textInputStyle}
                                            placeholder='New Firstname'
                                            //leftIcon={{ type: 'font-awesome', name: 'envelope', size:20, color:'white', marginRight:10 }}
                                            onChangeText = {firstname => this.setState({ firstname }) }
                                            inputStyle ={{margin: 10, color: '#1d3458'}} 
                                            //value={this.state.firstname}
                                            //errorMessage = 'That email already exists in the system'
                                        />
                                        <View>{this.promptMessageFirstname()}</View>
                                        <Button 
                                            title = "Submit"
                                            color = "#34bc6e"
                                            onPress = {() => {this.setState({firstnameSwitch: true}); this.changeFirstname(); this.promptMessageFirstname()}}
                                            //style ={{margin: 5}}
                                            buttonStyle ={{margin: 10, backgroundColor: '#34bc6e', width: ScreenWidth*0.4, marginBottom:20}} 
                                        />
                                        <Input
                                            style={styles.textInputStyle}
                                            placeholder='New Surname'
                                            //leftIcon={{ type: 'font-awesome', name: 'envelope', size:20, color:'white', marginRight:10 }}
                                            onChangeText = {surname => this.setState({ surname }) }
                                            inputStyle ={{margin: 10, color: '#1d3458'}} 
                                            //value={this.state.can}
                                            //errorMessage = 'That email already exists in the system'
                                        />
                                        <View>{this.promptMessageSurname()}</View>
                                        <Button 
                                            title = "Submit"
                                            color = "#34bc6e"
                                            onPress = {() => {this.setState({surnameSwitch: true}); this.changeSurname(); this.promptMessageSurname()}}
                                            //style ={{margin: 5}}
                                            buttonStyle ={{margin: 10, backgroundColor: '#34bc6e', width: ScreenWidth*0.4, marginBottom:20}} 
                                        />
                                    </CollapseBody>
                                </Collapse>



                                <Collapse style={{ borderColor:"#1d3458", borderWidth:1}}>
                                    <CollapseHeader>
                                        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", width: ScreenWidth, height: ScreenHeight*0.2, backgroundColor:'#f7e7e2'}}>
                                            <Text style={{fontSize: 20, fontWeight: "bold", color:"#1d3458"}}>Change Password</Text>
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody style={{flexDirection:"column", alignItems:"center", justifyContent:"center", width: ScreenWidth, backgroundColor:'#f7e7e2'}}>
                                        <Input
                                            style={styles.textInputStyle}
                                            placeholder='New Password'
                                            //leftIcon={{ type: 'font-awesome', name: 'envelope', size:20, color:'white', marginRight:10 }}
                                            onChangeText = {password => this.setState({ password }) }
                                            inputStyle ={{margin: 10, color: '#1d3458'}} 
                                            //value={this.state.companyTitle}
                                            secureTextEntry={true}
                                            //errorMessage = 'That email already exists in the system'
                                        />
                                        <View>{this.promptMessagePassword()}</View>
                                        <Button 
                                            title = "Submit"
                                            color = "#34bc6e"
                                            onPress = {() => {this.setState({passwordSwitch: true}); this.changePassword(); this.promptMessagePassword()}}
                                            //style ={{margin: 5}}
                                            buttonStyle ={{margin: 10, backgroundColor: '#34bc6e', width: ScreenWidth*0.4, marginBottom:20}}
                                        />

                                    </CollapseBody>
                                </Collapse>




                                <Collapse style={{ borderColor:"#1d3458", borderWidth:1}}>
                                    <CollapseHeader>
                                        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", width: ScreenWidth, height: ScreenHeight*0.2, backgroundColor:'#f7e7e2'}}>
                                            <Text style={{fontSize: 20, fontWeight: "bold", color:"#1d3458"}}>About</Text>
                                        </View>
                                    </CollapseHeader>
                                    <CollapseBody style={{flexDirection:"column", alignItems:"center", justifyContent:"center", width: ScreenWidth, backgroundColor:'#f7e7e2'}}>
                                        <Text style={{fontSize: 17, fontWeight: "500", color:"#1d3458"}}>{'Not sure what to include here \n hi :)'}</Text>
                                    </CollapseBody>
                                </Collapse>

                        </View>
                    </ScrollView>
            )

    }
}

export default userSettings

styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    option: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#c9c6c5"
    },
    textInputStyle: {
        //height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 10,
        width: ScreenWidth*0.8
        
    }

})