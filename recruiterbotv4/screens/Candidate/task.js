import React, { Component } from 'react'
import { Text, View, TouchableHighlight, Dimensions, Modal, StyleSheet } from 'react-native'
import { Icon, Button } from 'react-native-elements';
import firebase from 'firebase';
import '@firebase/firestore';
import { withNavigation } from 'react-navigation';
import Swipeout from 'react-native-swipeout';


const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height

export class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            reportPrompt: false,
            
        }
    }

    deleteCandidateTask() {
        try {
            var currentDocID = this.props.docID
            var currentCandidate = firebase.auth().currentUser.uid
            firebase.firestore().collection('users').doc(currentCandidate).collection('tasks').doc(currentDocID).delete();
        } catch {
            console.log("Not deleting candidate task candidate perspective")
        }
    }

    completedCheck() {
        if(!this.props.completed) {
            this.props.navigation.navigate('cHoldingPage', {title: this.props.title, docID: this.props.docID})
        } else {
            return null
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

    problemAlert() {
        try {
            var currentDocID = this.props.docID
            console.log("Modal - checking currentdocID")
            console.log(currentDocID)
            var currentCandidate = firebase.auth().currentUser.uid
            console.log("Modal - checking currentCandidate")
            console.log(currentCandidate)
            firebase.firestore().collection('users').doc(currentCandidate).collection('tasks').doc(currentDocID).set({
                problem: true,
            }, { merge: true });
            this.setState({reportPrompt: true})
        } catch {
            console.log("Not setting problem to true")
        }

    }

    reportPromptMessage() {
        if(this.state.reportPrompt == true) {
            return(
              <Text style={{margin: 3, fontSize: 12, color: 'white'}}>Problem Reported</Text>
            )} else {
              return (
                null
              )
          }
    
        }

    render() {
        var swipeoutBtns = [
            {
              component: (
                  <View style={{flex: 1, backgroundColor: 'red', justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                    <Icon
                        reverse
                        raised
                        reverseColor = '#79a6f6'
                        name="trash"
                        type="font-awesome"
                        size={21}
                        color="white"
                    />
                  </View>
              ),
              backgroundColor: 'red',
              onPress: () => {
                    console.log("delete button pressed")
                    this.deleteCandidateTask();
                    


                }
            }
          ]
        
        return (
            <View>
                <View>
                                <Modal
                                animationType="slide"
                                transparent={false}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                }}>
                                    <View style={styles.modalContainer}>
                                        <View >
                                        <Text style={{margin: 20, textAlign: "center", fontSize: 20, color: 'white'}}>Report problem with this task?</Text>
                                        
                                        <Button
                                            buttonStyle ={{backgroundColor: '#79a6f6', width: ScreenWidth*0.6, margin: 20}}
                                            title = "Yes"
                                            onPress={() => {
                                            this.problemAlert();
                                            }}/>

                                        <Button
                                            buttonStyle ={{backgroundColor: '#79a6f6', width: ScreenWidth*0.6, margin:20}}
                                            title = "Close"
                                            onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                            }}/>
                                        <View>{this.reportPromptMessage()}</View>
                                            
                                        </View>
                                    </View>
                                </Modal>
                </View>  
                <Swipeout autoClose={true} right={swipeoutBtns}>
                    <TouchableHighlight style={{borderRadius: 10, width:ScreenWidth, height: 90, marginBottom: 2}}  onPress = {() => this.completedCheck()} onLongPress={() => this.setModalVisible()}>
                        <View style={{flexDirection: 'row', backgroundColor: '#f7e7e2'}}>
                                <View style={{padding:7, flexDirection:"column", justifyContent:"center", height: 90, width:ScreenWidth*0.50}}>
                                    <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:17, margin: 4}}>{this.props.title}</Text>
                                    <Text style={{ color: '#1d3458', fontWeight: '400', fontSize:13, marginLeft: 4}}>Company: {this.props.company}</Text>
                                    <Text style={{ color: '#1d3458', fontWeight: '400', fontSize:13, marginLeft: 4}}>Received: {this.props.created}</Text>
                                </View>

                                <View style={{padding:7, flexDirection:"column", justifyContent:"center", height: 90, width:ScreenWidth*0.30}}>
                                
                                    {(this.props.completed && !this.props.problem) && (
                                        <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:17, marginLeft: 20}}>Completed</Text>
                                    )}
                                    {this.props.problem && (
                                        <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:14, marginLeft: 20}}>Problem Reported</Text>
                                    )}


                                </View>
                        </View>
                    </TouchableHighlight>
                </Swipeout>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //flexDirection: "column",
      //backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    },
    subContainer: {
        width: ScreenWidth*0.8,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    modalContainer: {
        width: ScreenWidth,
        height: ScreenHeight,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#19273c"
    }
  });

export default withNavigation(Task)