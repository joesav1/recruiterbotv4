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
            checked: false,
            email: this.props.email,
            initialFav: []
        }
    }
    
    componentDidMount() {
        try {
            console.log("step 1")
            var doctemp = null
            var currentUserID = firebase.auth().currentUser.uid
            var favItem = firebase.firestore().collection('users').doc(currentUserID).collection('campaigns').where("title","==", this.props.title);
            favItem.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doctemp = doc.data().favCandidates
                    console.log("Checking doc temp 1111111111")
                    console.log(doctemp)
                    console.log("Checking doc temp 22222222222")
                    console.log(doctemp)
                    this.setState({initialFav: doctemp})
                    console.log("checking state of initial fav")
                    console.log(this.state.initialFav)
                    console.log("step 2")
                    var includesVar = this.state.initialFav.includes(this.state.email)
                    console.log("Checking includesVar")
                    console.log(includesVar)
                    if(includesVar == true) {
                        this.setState({checked: true})
                    } else {
                        return null
                    }



                }) 
            });
        } catch {
            console.log("Cant favourite on mount")
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

    favCandidate() {
        console.log("favCandidate pressed")
        try {
            var currentUserID = firebase.auth().currentUser.uid
            console.log("Checking current userID ")
            console.log(currentUserID)
            console.log(this.props.title)
            var propEmail = this.state.email
            var favItem = firebase.firestore().collection('users').doc(currentUserID).collection('campaigns').where("title","==", this.props.title);
            favItem.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log("*****Checking fav candidate details**********")
                    console.log(propEmail)
                    console.log(doc.id)
                    console.log(currentUserID)
                    console.log("*****end of fav**********")
                    firebase.firestore().collection('users').doc(currentUserID).collection('campaigns').doc(doc.id).update({
                        favCandidates: firebase.firestore.FieldValue.arrayUnion(propEmail)
                    })

                })  
            });
            this.setState({checked: true})
        } catch {
            console.log("Cant favourite")
        }

    }

    unFavCandidate() {
        console.log("unFav candidate pressed")
        try {
            var currentUserID = firebase.auth().currentUser.uid
            var propEmail = this.state.email
            var unfavItem = firebase.firestore().collection('users').doc(currentUserID).collection('campaigns').where("title","==", this.props.title);
            unfavItem.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log("*****Checking unfav candidate details**********")
                    console.log(propEmail)
                    console.log(doc.id)
                    console.log(currentUserID)
                    console.log("*****end of unfav**********")
                    firebase.firestore().collection('users').doc(currentUserID).collection('campaigns').doc(doc.id).update({
                        favCandidates: firebase.firestore.FieldValue.arrayRemove(propEmail)
                    })

                })  
            });
            this.setState({checked: false})
        } catch {
            console.log("Cant favourite")
        }

    }

    favSwitch() {
        if(this.state.checked==true) {
            this.unFavCandidate();
        } else if(this.state.checked==false) {
            this.favCandidate();
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
                <Swipeout autoClose={true} right={swipeoutBtns}>
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
                                            onIconPress = {() => {console.log("favourite pressed!"); this.favSwitch()}}
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
