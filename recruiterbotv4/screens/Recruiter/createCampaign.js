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
            candidates: '',
            params: props.navigation.state.params.testUID
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

    campaignButton = (title, candidates) => {
        // console.log("Checking what the states currently hold, createCampaign.js")
        // console.log(this.state.title)
        // console.log(this.state.candidates)
        // console.log("End of campaignButton states check, createCampaign.js")
        firebase.firestore().collection('users').doc(this.state.params).collection('campaigns').add({
          title: this.state.title,
          candidates: this.state.candidates,
        })
        
    }

    taskCreation = (title, candidates) => {
      // console.log("Checking what the states currently hold, taskCreation, createCampaign.js")
      // console.log(this.state.title)
      // console.log(this.state.candidates)
      // console.log("End of campaignButton states check, taskCreation, createCampaign.js")

      firebase.firestore().collection('users').where("email","==",this.state.candidates)
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
                  placeholder = {"Candidates"}
                  onChangeText = {candidates => this.setState({ candidates })}
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

