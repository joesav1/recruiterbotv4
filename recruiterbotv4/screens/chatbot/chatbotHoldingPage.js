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

    componentDidMount() {
        this.prepareMessages()
        console.log("checking this.state.finalText in componentdidMount")
        console.log(this.state.finalText1)
        console.log("end of finalText check in the componentdidMount")
        
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
                console.log("checking subtraits~~~~~~~~~~~~~~~~~~~~~")
                console.log(subTrait)
                console.log("end of checking subtraits")
                tempSubData.push(subTrait.percentile)
            }

            var largestValue = Math.max.apply(Math, tempSubData);
            console.log("checking largest value")
            console.log(largestValue)

            for(const subTrait2 of trait.children) {
                console.log("this loop looops")

                if(subTrait2.percentile == largestValue) {
                     subData = subTrait2.name
                }

            }

            traitData.push({traitDatabig5:traitDatabig5, traitDatapercentile:traitDatapercentile, traitSubData: subData})
        }

        console.log("Checking what traitData gives me")
        console.log(traitData)
        console.log("End of traitdata check")
        

    }


    render() {
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
