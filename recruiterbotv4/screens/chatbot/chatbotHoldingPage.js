import React, { Component } from 'react'
import { Text, View, Button, ActivityIndicator, StyleSheet } from 'react-native'
import { personalityRequest } from './personality';
import firebase from 'firebase';
import '@firebase/firestore';

export class chatbotHoldingPage extends Component {
    constructor(props) {
        super(props);

        //Dont get rid of this one
        let testingUser = firebase.auth().currentUser
        // console.log("chtbotHoldingPage! CHecking if testing user exists again")
        // console.log(testingUser)
        // console.log("chatbotHoldingPage ENd of test")

        this.ref = firebase.firestore().collection('users').doc(testingUser.uid).collection('tasks')

        this.state = {
            transcriptText: null,
            finalText1: null,
            messagesMain1: props.navigation.state.params.messagesPass,
            docIDTaskMain: props.navigation.state.params.docIDTask,
            loading: true,

            
        }
    }

    prepareMessages() {
        var rawMessages = this.state.messagesMain1;
        var filteredMessages = [];
        var textOnlyMessages = [];
        var finalTextOutput = null;
        for( const member of rawMessages ){
            if( member.user._id !== "2" ) {
                filteredMessages.push(member)
            }
        }
        for( const text of filteredMessages) {

            textOnlyMessages.push(text.text)
        }
        textOnlyMessages.pop()
        finalTextOutput = textOnlyMessages.join(' ');
 
        this.setState({finalText1: finalTextOutput});
    }

    prepareTranscript() {
        var rawMessages = this.state.messagesMain1
        var transcriptText = []
        var transcriptTempArray = []
        var transcriptTextMain = ''
        for(const message of rawMessages) {
            console.log("checking messages")
            console.log(message)
            console.log("end of message check")
            transcriptText.push(message.text)
        }
        // var i = 0
        // for(i=(transcriptText.length-1); i=0; i-- ) {
        //     transcriptTempArray.push(transcriptText[i])
        // }

        transcriptTempArray = transcriptText.reverse()
        console.log("Checking transcriptText")
        console.log(transcriptText)
        console.log("end of transcriptText check")
        console.log("Checking transcriptTempArray")
        console.log(transcriptTempArray)
        console.log("end of transcriptTempArray check")
        transcriptTextMain = transcriptTempArray.join('\n\n')
        console.log("Checking transcriptTextMain")
        console.log(transcriptTextMain)
        console.log("end of transcriptTextMain check")
        //this.setState({transcriptText: transcriptTextMain})
        try {this.ref.doc(this.state.docIDTaskMain).update({
            transcript: transcriptTextMain

            })
        } catch(error) {
            console.log(error.toString(error))}

    }

    async componentDidMount() {
        await this.prepareMessages()
        // console.log("checking this.state.finalText in componentdidMount")
        // console.log(this.state.finalText1)
        // console.log("end of finalText check in the componentdidMount")
        // console.log("checking this.state.docIDTaskMain in componentdidMount")
        // console.log(this.state.docIDTaskMain)
        // console.log("end of docIDTaskMain check in the componentdidMount")
        await this.prepareTranscript()
        await this.startPersonality()
        await this.setState({loading: false})
        
        
        
    }

    startPersonality = async() => {
        let response = await personalityRequest(this.state.finalText1)
        // console.log("chatbotholdingpage seeing if response does anything")
        // console.log(response)
        // console.log("end of chatbotholdingpage, startPersonality repsonse check")
        let mainData = response.mydata.personality
        let traitData = []

        for(const trait of mainData) {
            // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CHECKING TRAIT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            // console.log(trait)
            // console.log("END OF CHECKING TRAIT")
            let traitDatabig5 = trait.trait_id
            let traitDatapercentile = trait.percentile
            let subData = null
            let tempSubData = []
            for(const subTrait of trait.children) {
                // console.log("checking subtraits~~~~~~~~~~~~~~~~~~~~~")
                // console.log(subTrait)
                // console.log("end of checking subtraits")
                tempSubData.push(subTrait.percentile)
            }

            var largestValue = Math.max.apply(Math, tempSubData);
            // console.log("checking largest value")
            // console.log(largestValue)

            for(const subTrait2 of trait.children) {
                //console.log("this loop looops")

                if(subTrait2.percentile == largestValue) {
                     subData = subTrait2.name
                }

            }

            traitData.push({traitDatabig5:traitDatabig5, traitDatapercentile:traitDatapercentile, traitSubData: subData})
        }

        // console.log("Checking what traitData gives me")
        // console.log(traitData)
        // console.log("End of traitdata check")
        
        console.log("#############################start of update database##################################")
        try {this.ref.doc(this.state.docIDTaskMain).update({
            traits: traitData

            })
        } catch(error) {
            console.log(error.toString(error))}
    }




    render() {
        
        // console.log("checking this.state.finalText in the render!!!!!!!!!!!!!!!!!!!!!!!!!")
        // //console.log(this.state.messagesMain1)
        // console.log("end of finalText check in the render")
        if(this.state.loading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                 <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        if(!this.state.loading)
        return (
            <View style={[styles.container]}>
                <Button
                    title = "Continue"
                    color = "#841584"
                    onPress ={()=>this.props.navigation.navigate('cHomepage')}       
                    style={{margin: 10}}         
                />
            </View>
            
        )
    }
}

export default chatbotHoldingPage

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  })
