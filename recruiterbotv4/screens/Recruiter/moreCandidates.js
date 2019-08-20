import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet} from 'react-native'
import { Input, Button } from 'react-native-elements';
import firebase from 'firebase';
import '@firebase/firestore';


const ScreenWidth = Dimensions.get('window').width

export class moreCandidates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            placeholderCandidate: null,
            candidates: null,
            docIDRecruiter2: props.navigation.state.params.docIDRecruiter

        }
    }


    promptMessage() {
        if(this.state.placeholderCandidate) {
          return(
            <Text style={{margin: 3, fontSize: 12, color: 'white'}}>{this.state.placeholderCandidate} added!</Text>
          )} else {
            return (
              null
            )
        }
  
      }

    addCandidate(candidate) {
        let currentUserID = firebase.auth().currentUser.uid
        firebase.firestore().collection('users').doc(currentUserID).collection('campaigns').doc(this.state.docIDRecruiter2).update({
            candidates: firebase.firestore.FieldValue.arrayUnion(candidate)
        })
        this.setState({placeholderCandidate: this.state.candidates})
        this.setState({candidates: null})

    }
  

    render() {
        console.log("======checking docIDrecruiter2============")
        console.log(this.state.docIDRecruiter2)
        return (
            <View style={styles.container}>
              <View style={styles.subContainer}>
                  <Input
                        style={styles.textInputStyle}
                        placeholder='Add Candidate Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope', size:20, color:'white', marginRight:10 }}
                        onChangeText = {candidates => this.setState({ candidates }) }
                        inputStyle ={{margin: 10, color: 'white'}} 
                        value={this.state.candidates}
                        //errorMessage = 'That email already exists in the system'
                  />
                  <View>{this.promptMessage()}</View>
                  <View style={{flex:0.4, width: ScreenWidth*0.6, marginTop: 20,}}>
                    <Button 
                        title = "Add candidate"
                        color = "#FFFF00"
                        onPress = {() => {this.addCandidate(this.state.candidates);}}
                        //style ={{margin: 5}}
                        buttonStyle ={{marginBottom:25, backgroundColor: '#2d74da'}}
                    />
                  </View>

              </View>  
            </View>
        )
    }
}

export default moreCandidates


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
  