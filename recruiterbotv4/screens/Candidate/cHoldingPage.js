import React, { Component } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import firebase from 'firebase';
import '@firebase/firestore';

export class cHoldingPage extends Component {
    constructor(props) {
        super(props);


    }

    startChatbot() {
        this.props.navigation.navigate('chatbotShell')
    }

    render() {
        return (
            <View style={styles.container}>
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