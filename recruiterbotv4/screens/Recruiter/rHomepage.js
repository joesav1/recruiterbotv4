import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

export class rHomepage extends Component {
    constructor() {
        super();
        this.state = {
          loading: true,
          authenticated: false,
        };
      }
    
      componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({ loading: false, authenticated: true });
          } else {
            this.setState({ loading: false, authenticated: false });
          }
        });
      }
    
      render() {
        if (this.state.loading) {
            console.log("nobody is logged in -js")
            return null;
            } // Render loading/splash screen etc
    
        if (!this.state.authenticated) {
          console.log("nobody is logeed in still! -js")
            return null;
            }
        console.log("Checking again to make sure the session is active -js")
        console.log(this.state.authenticated)
        return <Text> Yes it worked, welcome to the homepage!</Text>
      }
    }
export default rHomepage
