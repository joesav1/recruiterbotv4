import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { personalityRequest } from './personality';

export class chatbotHoldingPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            finalText1: null,
            messagesMain1: props.navigation.state.params.messagesPass,

            
        }
    }

    prepareMessages() {
        var rawMessages = this.state.messagesMain1;
        var filteredMessages = [];
        var textOnlyMessages = [];
        var finalTextOutput = null;
        for( const member of rawMessages ){
            // console.log("Chekcing i")
            // console.log(member)
            // console.log("end of i check")
            // console.log("checking i.user")
            // console.log(member.user)
            // console.log("Checking i.user._id")
            // console.log(member.user._id)
            // console.log("End of checks")
            if( member.user._id !== "2" ) {
                filteredMessages.push(member)
            }
        }
        // console.log("checking filteredMessages")
        // console.log(filteredMessages)
        // console.log("end of filteredMessages check")
        for( const text of filteredMessages) {

            textOnlyMessages.push(text.text)
        }
        // console.log("checking textOnlyMessages")
        // console.log(textOnlyMessages)
        // console.log("end of textOnlyMessages check")
        textOnlyMessages.pop()
        finalTextOutput = textOnlyMessages.join(' ');
        // console.log("checking finalTextOutput")
        // console.log(finalTextOutput)
        // console.log("end of finalTextOutput check")
 
        this.setState({finalText1: finalTextOutput});
        // console.log("checking this.state.finalText")
        // console.log(this.state.finalText1)
        // console.log("end of finalText check")


    }

    componentDidMount() {
        this.prepareMessages()
        console.log("checking this.state.finalText in componentdidMount")
        console.log(this.state.finalText1)
        console.log("end of finalText check in the componentdidMount")
        
    }

    startPersonality = async() => {
        let response = await personalityRequest(this.state.finalText1)
        console.log("chatbotholdingpage seeing if response does anything")
        console.log(response)
        console.log("end of chatbotholdingpage, startPersonality repsonse check")

    }


    render() {
        // console.log("chatbotHP checking messagesMain1")
        // console.log(this.state.messagesMain1)
        // console.log("end of messages main one test")
        console.log("checking this.state.finalText in the render")
        console.log(this.state.finalText1)
        console.log("end of finalText check in the render")

        return (
            <View>
                <Text> textInComponent </Text>
                <Button
                    title = "Test personality"
                    color = "#841584"
                    onPress ={()=>this.startPersonality()}       
                    style={{margin: 10}}         
                />
            </View>
            
        )
    }
}

export default chatbotHoldingPage
