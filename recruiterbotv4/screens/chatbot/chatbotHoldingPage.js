import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';
import { personalityRequest } from './personality';
import firebase from 'firebase';
import '@firebase/firestore';

export class chatbotHoldingPage extends Component {
    constructor(props) {
        super(props);

        //Dont get rid of this one
        let testingUser = firebase.auth().currentUser


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
            transcriptText.push(message.text)
        }
        // var i = 0
        // for(i=(transcriptText.length-1); i=0; i-- ) {
        //     transcriptTempArray.push(transcriptText[i])
        // }

        transcriptTempArray = transcriptText.reverse()

        transcriptTextMain = transcriptTempArray.join('\n\n')

        //this.setState({transcriptText: transcriptTextMain})
        try {this.ref.doc(this.state.docIDTaskMain).update({
            transcript: transcriptTextMain

            })
        } catch(error) {
            console.log(error.toString(error))}

    }

    async componentDidMount() {
        await this.prepareMessages()
        await this.prepareTranscript()
        await this.startPersonality()
        await this.setState({loading: false})
        
        
        
    }

    startPersonality = async() => {
        let response = await personalityRequest(this.state.finalText1)
        let mainData = response.mydata.personality
        let traitData = []

        for(const trait of mainData) {
            let traitDatabig5 = trait.trait_id
            let traitDatapercentile = trait.percentile
            let subData = null
            let tempSubData = []
            for(const subTrait of trait.children) {
                tempSubData.push(subTrait.percentile)
            }

            var largestValue = Math.max.apply(Math, tempSubData);

            for(const subTrait2 of trait.children) {

                if(subTrait2.percentile == largestValue) {
                     subData = subTrait2.name
                }

            }

            traitData.push({traitDatabig5:traitDatabig5, traitDatapercentile:traitDatapercentile, traitSubData: subData})
        }

        
        try {this.ref.doc(this.state.docIDTaskMain).update({
            traits: traitData

            })
        } catch(error) {
            console.log(error.toString(error))}
    }




    render() {
        
        if(this.state.loading) {
            return (
                <View style={styles.container}>
                 <ActivityIndicator size="large" color="white" />
                 <Text style={{margin: 5, textAlign: "center", fontSize: 20, color: 'white'}}> Please wait, we are uploading your interview to the system</Text>
                </View>
            )
        }
        if(!this.state.loading)
        return (
            <View style={styles.container}>
                <Button
                    title = "Continue"
                    onPress ={()=>this.props.navigation.navigate('cHomepage')}       
                    buttonStyle ={{margin: 10, backgroundColor:'#f7e7e2'}}
                    titleStyle = {{color:"#19273c", fontSize:20}}              
                />
            </View>
            
        )
    }
}

export default chatbotHoldingPage

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
      padding: 20,
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  })
