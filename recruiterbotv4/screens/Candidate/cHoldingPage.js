import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import '@firebase/firestore';


const ScreenWidth = Dimensions.get('window').width

export class cHoldingPage extends Component {
    constructor(props) {
        super(props);

        //this.userDetails = firebase.auth().currentUser
        this.state = {
             titleMain: props.navigation.state.params.title,
             docIDMain: props.navigation.state.params.docID
        }
        

    }

    startChatbot() {
        this.props.navigation.navigate('chatbotShell', {docIDMain: this.state.docIDMain})
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 35, fontWeight: "bold", color:"white", marginBottom: 10}}>
                    Role: {this.state.titleMain}
                </Text>
                <Text
                    style={{fontSize: 20, fontWeight: "400", color:"white", textAlign:"center"}}>
                    {`You will have 30 minutes to answer 5 questions. Please do not exit the app or attempt to refresh the page.\n\nYour interview will begin once your press the 'Start' button`}
                    
                </Text>
                <View style={{flex:0.4, width: ScreenWidth*0.6, margin: 30}}>
                    <Button 
                        title = "Start"
                        onPress ={()=>this.startChatbot()}       
                        buttonStyle ={{margin: 10, backgroundColor:'#f7e7e2'}}
                        titleStyle = {{color:"#19273c", fontSize:20}}       
                    />
                </View>
                
            </View>
        )
    }
}

export default cHoldingPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',  
        padding: ScreenWidth*0.05      
    }
})