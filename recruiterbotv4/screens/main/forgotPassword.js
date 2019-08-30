import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet} from 'react-native'
import { Input, Button } from 'react-native-elements';
import firebase from 'firebase';
import '@firebase/firestore';

const ScreenWidth = Dimensions.get('window').width

export class forgotPassword extends Component {
    constructor(props) {
        super(props);
        


        this.state = {
            email:'',
            candidates: null,
            emailPlaceholder: null,
        };
    }

    resetPassword = (email) => {
        var auth = firebase.auth();

        auth.sendPasswordResetEmail(email).then(res => {
        console.log("Password Reset email sent")
        this.setState({emailPlaceholder: this.state.email});
        this.resetPrompt();
        }).then(this.props.navigation.navigate('LoginPage')).catch(function(error) {
        console.log("Failed to send password reset")
        });
    }

    resetPrompt() {
        {
            if(this.state.emailPlaceholder) {
              return(
                <Text style={{margin: 3, fontSize: 12, color: 'white'}}>Password reset for: {this.state.emailPlaceholder}</Text>
              )} else {
                return (
                  null
                )
            }
      
          }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
                <Input
                        style={styles.textInputStyle}
                        placeholder='Enter Account Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope', size:20, color:'white', marginRight:10 }}
                        onChangeText = {email => this.setState({ email }) }
                        inputStyle ={{margin: 10, color: 'white'}} 
                        value={this.state.candidates}
                        //errorMessage = 'That email already exists in the system'
                  />
                  <View>{this.resetPrompt()}</View>

                 <Button 
                        title = "Submit"
                        color = "#34bc6e"
                        onPress = {() => {this.resetPassword(this.state.email)}}
                        //style ={{margin: 5}}
                        buttonStyle ={{margin: 10, backgroundColor: '#34bc6e'}}                       
                  />

                </View>
            </View>
        )
    }
}

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
        //marginBottom: 10,
        
      },
  
  
    textInputStyle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        //margin: 20,
        
    }
});


export default forgotPassword
