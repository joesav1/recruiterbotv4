import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button} from 'react-native';
import firebase from 'firebase';
import '@firebase/firestore';
export class rHomepage extends Component {
    constructor(props) {
        super(props);
        var params = props.navigation.state.params.testUID

        console.log("rHomepage checking if params exists!")
        console.log(params)
        console.log("rHomepage end of checking params")

        this.state = {
          loading: true,
          authenticated: false,
          title: '',
          candidates: null,
        };
      }
    
      componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log("Checking for a user - rhomepage")
            console.log(user.user)
            console.log("End of user check rhomepage-js")
            this.setState({ loading: false, authenticated: true });
          } else {
            this.setState({ loading: false, authenticated: false });
          }
        });
      }
    
      render() {
        if (this.state.loading) {
            console.log("nobody is logged in rhomepage-js")
            return null;
            } // Render loading/splash screen etc
    
        if (!this.state.authenticated) {
          console.log("nobody is logeed in still! rohomepage-js")
            return null;
            }
        console.log("Checking again to make sure the session is active! rhomepage-js")
        console.log(this.state.authenticated)

        return (
              <View>
                <Text style={{fontSize: 35, fontWeight: "bold"}}> Campaigns</Text>
                <Text> {this.params}</Text>
                <Button 
                title = "Create Campaign"
                color = '#FF5733'
                onPress = {() => this.props.navigation.navigate('createCampaign')}
                style ={{margin: 10}}
                />
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10}}
                  placeholder = {"Title"}
                />
              </View>
        )}
    }
export default rHomepage
