import React, { Component } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import firebase from 'firebase';
import '@firebase/firestore';

export class cHoldingPage extends Component {
    constructor(props) {
        super(props);

        this.userDetails = firebase.auth().currentUser
        this.state = {
             titleMain: props.navigation.state.params.title,
             docIDMain: props.navigation.state.params.docID
        }
        

    }

    startChatbot() {
        this.props.navigation.navigate('chatbotShell', {docIDMain: this.state.docIDMain})
    }

    render() {
        console.log("Checking if params gives me anything related - choldingpage")
        console.log(this.state.titleMain)
        console.log("end of this.state.title check")
        
        console.log(this.state.docIDMain)
        console.log("end of check on this.state.params, cHoldingPage")
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 20}}>
                    Role: {this.state.titleMain}
                </Text>
                <Text
                    style={{flex: 1, alignItems: 'center', fontSize: 20,borderWidth: 0.5, borderColor: '#d6d8da',}}>
                    {`You will have 20 minutes to answer all the questions.\nPlease do not exit the app or attempt to refresh the page.\nYour interview will begin once your press START`}
                    
                </Text>
                <Button
                    title = "START"
                    color = "#841584"
                    onPress ={()=>this.startChatbot()}       
                    style={{margin: 10}}         
                />
                
            </View>
        )
    }
}

export default cHoldingPage

const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        
    }
})