import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button, FlatList} from 'react-native';
import firebase from 'firebase';
import '@firebase/firestore';
import Campaign from './campaign';
export class rHomepage extends Component {
    constructor(props) {
        super(props);
        
        //Dont delete this one
        var testingUser = firebase.auth().currentUser
        // console.log("rhomepage! CHecking if testing user exists 1")
        // console.log(testingUser)
        // console.log("rhonmepage! ENd of test")
        this.ref = firebase.firestore().collection('users').doc(testingUser.uid).collection('campaigns')

        this.state = {
          loading: true,
          authenticated: false,
          title: '',
          candidates: null,
          params: props.navigation.state.params.testUID,
          campaigns: [],
        };
      }


      onCollectionUpdate = (querySnapshot) => {
        const campaigns = [];
        querySnapshot.forEach((doc) => {
          const {title, candidates} = doc.data();
          const docID = doc.id

          campaigns.push({
            key: doc.uid,
            doc,
            title,
            candidates,
            docID
          });
        });

        this.setState({
          campaigns,
        })
      }
    
      componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // console.log("Checking for a user - rhomepage")
            // console.log(user.user)
            // console.log("End of user check rhomepage-js")
            this.setState({ loading: false, authenticated: true });
          } else {
            this.setState({ loading: false, authenticated: false });
          }
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }
    
      render() {
        // console.log("third check that params gives something, rhomepage-js")
        // console.log(this.state.params)
        // console.log("end of third param check")
        if (this.state.loading) {
            console.log("nobody is logged in rhomepage-js")
            return null;
            } // Render loading/splash screen etc
    
        if (!this.state.authenticated) {
          // console.log("Checking for a user - rhomepage")
          // console.log(user.user)
          // console.log("End of user check rhomepage-js")
          // console.log("nobody is logeed in still! rohomepage-js")
            return null;
            }
        // console.log("Checking again to make sure the session is active! rhomepage-js")
        // console.log(this.state.authenticated)
        // console.log("second check that params gives something, rhomepage-js")
        // console.log(this.params)
        // console.log("end of second param check")

        return (
              <View>
                <Text style={{fontSize: 35, fontWeight: "bold"}}> Campaigns</Text>
                <Text> {this.params} </Text>
                <Button 
                title = "Create Campaign"
                color = '#FF5733'
                onPress = {() => this.props.navigation.navigate('createCampaign', {testUID: this.state.params})}
                style ={{margin: 10}}
                />
                <FlatList
                  data={this.state.campaigns}
                  renderItem={({item}) => <Campaign 
                  {...item}
                  />}
                />


              </View>
        )}
    }
export default rHomepage
