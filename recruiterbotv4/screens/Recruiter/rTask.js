import React, { Component } from 'react'
import { Text, View, Button, TouchableHighlight, Dimensions } from 'react-native'
import { CheckBox, Icon } from 'react-native-elements';
import firebase from 'firebase';
import '@firebase/firestore';
import { withNavigation } from 'react-navigation';
import Swipeout from 'react-native-swipeout';




const ScreenWidth = Dimensions.get('window').width

export class RTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favourited: false,
        }
    }

    completedCheck() {
        if(this.props.completed) {
            this.props.navigation.navigate('rolesMain', {propsMain: this.props})
        } else {
            return null
        }
    }

    // favouriteUser() {

    // }

    
    deleteRecruiterData() {
        try {
            console.log("Do i get an email")
            console.log(this.props.email)
            var propEmail = this.props.email
            var currentUserID = firebase.auth().currentUser.uid
            var deleteArrayValue = firebase.firestore().collection('users').doc(currentUserID).collection('campaigns').where("title","==", this.props.title);
            deleteArrayValue.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log("Checking what doc.data gves")
                    console.log(doc.data())
                    console.log("Checking propEmail")
                    console.log(propEmail)
                    firebase.firestore().collection('users').doc(currentUserID).collection('campaigns').doc(doc.id).update({
                        candidates: firebase.firestore.FieldValue.arrayRemove(propEmail)
                    })



                    

                  });
                }
            );


            // var deleteItem = firebase.firestore().collection('users').doc(this.props.uid).collection('tasks').where("title","==",this.props.title);
            // deleteItem.get().then(function(querySnapshot) {
            //     querySnapshot.forEach(function(doc) {
            //       doc.ref.delete();
            //     });
            //   });
        } catch {
            console.log("Not deleting (recruiter data)")
        }
    }

    deleteCandidateData() {
        try {
            var deleteItem = firebase.firestore().collection('users').doc(this.props.uid).collection('tasks').where("title","==",this.props.title);
            deleteItem.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  doc.ref.delete();
                });
              });
        } catch {
            console.log("Not deleting (candidate data)")
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
                    this.deleteRecruiterData();
                    this.deleteCandidateData();


                }
            }
          ]
        // console.log("checking if we get anyhting rTasks")
        // console.log(this.props)
        // console.log(this.props.docID)
        // console.log(this.props.completed)

        return (
                
            <View>  
                <Swipeout right={swipeoutBtns}>
                        <TouchableHighlight style={{borderRadius: 10, width:ScreenWidth, height: 90, marginBottom: 2}}  onPress = {() => this.completedCheck()}>
                            <View style={{flexDirection: 'row', backgroundColor: '#f7e7e2'}}>
                                    <View style={{padding:7, flexDirection:"column", justifyContent:"center", height: 90, width:ScreenWidth*0.50}}>
                                        <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:17, margin: 4}}>{this.props.firstname} {this.props.surname}</Text>
                                        <Text style={{ color: '#1d3458', fontWeight: '400', fontSize:13, marginLeft: 4}}>{this.props.email}</Text>
                                    </View>

                                    <View style={{padding:7, flexDirection:"column", justifyContent:"center", height: 90, width:ScreenWidth*0.30}}>
                                        {this.props.completed && (
                                                <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:17, marginLeft: 20}}>Score: {this.props.finalScore}</Text>
                                        )}
                                        {!this.props.completed && (
                                            <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:13, marginLeft: 20}}>In Progress</Text>
                                        )}


                                    </View>
                                    <View style={{padding:7, flexDirection:"column", justifyContent:"center", height: 90, width:ScreenWidth*0.20}}>
                                        < CheckBox
                                            //title= "Press if Recruiter"
                                            checked = {this.state.checked}
                                            checkedIcon='star'
                                            uncheckedIcon='star-o'
                                            checkedColor='#1d3458'
                                            uncheckedColor = '#1d3458'
                                            iconStyle = {{size:20, marginRight: 5}}
                                            onIconPress = {() => {console.log("favourite pressed!"); this.setState({checked: !this.state.checked})}}
                                        />
                                    </View>


                            </View>
                        </TouchableHighlight>
                </Swipeout>        
            </View>
        )
    }
}

export default withNavigation(RTask)
