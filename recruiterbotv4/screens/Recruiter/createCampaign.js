import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import firebase from 'firebase';
import '@firebase/firestore';


export class createCampaign extends Component {
    constructor(props) {
        super(props);
        


        this.state = {
            loading: true,
            authenticated: false,
            title: '',
            candidates: null,
            params: props.navigation.state.params.testUID,
            candidatesMain: [],
            candidatesTemp: [],
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log("Checking for a user ccampaings")
            console.log(user.user)
            console.log("End of user check ccampaigns-js")
            this.setState({ loading: false, authenticated: true });
          } else {
            this.setState({ loading: false, authenticated: false });
          }
        });
    }

    submitAndClear = (candidate) => {
      this.state.candidatesMain.push(candidate)
      console.log("checking the add candidate button actually adds a candidate")
      console.log(this.state.candidatesMain)
      console.log("end of candidatesMian check")
      this.setState({candidates: null})
      
    }

    campaignButton = (title, candidates) => {
        // console.log("Checking what the states currently hold, createCampaign.js")
        // console.log(this.state.title)
        // console.log(this.state.candidates)
        // console.log("End of campaignButton states check, createCampaign.js")
        firebase.firestore().collection('users').doc(this.state.params).collection('campaigns').add({
          title: this.state.title,
          candidates: this.state.candidatesMain,
        })
        
    }

    taskCreation = (title, candidates) => {
      // console.log("Checking what the states currently hold, taskCreation, createCampaign.js")
      // console.log(this.state.title)
      // console.log(this.state.candidates)
      // console.log("End of campaignButton states check, taskCreation, createCampaign.js")
      var i = 0
      for(i=0;i<this.state.candidatesMain.length; i++) {
          firebase.firestore().collection('users').where("email","==",this.state.candidatesMain[i].toLocaleLowerCase())
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                console.log(doc.id, '=>', doc.data())
                firebase.firestore().collection('users').doc(doc.id).collection('tasks').add({
                  completed: false,
                  title: title,
                  transcript: null,

                });


              }
              );
            }
            ).catch(function(error) {
              console.log("Error getting documents:", error);
            });

      }



 
      this.props.navigation.goBack()
    }





    render() {
        return (
            <View>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10}}
                  placeholder = {"Title"}
                  onChangeText = {title => this.setState({ title })}
                />
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10}}
                  placeholder = {"Enter candidate email"}
                  onChangeText = {candidates => this.setState({ candidates })}
                  value = {this.state.candidates}
                />
                <Button 
                    title = "Add candidate"
                    color = "#FFFF00"
                    onPress = {() => {this.submitAndClear(this.state.candidates);}}
                    style ={{margin: 10}}
                />
                <Button 
                    title = "Submit"
                    color = "#841584"
                    onPress = {() => {this.campaignButton(this.state.title, this.state.candidates); this.taskCreation(this.state.title, this.state.candidates)}}
                    style ={{margin: 10}}
                />

                
            </View>
        )
    }
}

export default createCampaign

