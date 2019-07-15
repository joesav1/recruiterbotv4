import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, FlatList} from 'react-native';
import firebase from 'firebase';
import '@firebase/firestore';
import Task from './task';

export class cHomepage extends Component {
    constructor(props) {
        super(props);

        let testingUser = firebase.auth().currentUser
        // console.log("chomepage! CHecking if testing user exists 1")
        // console.log(testingUser)
        // console.log("chonmepage! ENd of test")

        this.ref = firebase.firestore().collection('users').doc(testingUser.uid).collection('tasks')

        this.state ={
            params: props.navigation.state.params.testUID,
            tasks: [],
            authenticated: false,
            loading: true,

        }
    }

    onCollectionUpdate = (querySnapshot) => {
        const tasks = [];
        querySnapshot.forEach((doc) => {
            const {title, completed} = doc.data();
            const docID = doc.id
            
            

            tasks.push({
                //double check if this is doc.uid
                key: doc.uid,
                doc,
                title,
                completed,
                docID
            });
        });

        this.setState({
            tasks
        })
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log("Checking for a user - chomepage")
              console.log(user.user)
              console.log("End of user check chomepage-js")
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

        if(this.state.loading) {
            console.log("nobody is logged in cHomepage -js")
            return null;
        }

        if(!this.state.authenticated) {
            return null;
        }


        // console.log("first check that params gives something, cHomepage-js")
        // console.log(this.state.params)
        // console.log("end of first param check")
        return (
            <View>

                <Text style={{fontSize: 35, fontWeight: "bold"}}> Tasks</Text>
 
                <FlatList
                  data={this.state.tasks}
                  renderItem={({item}) => <Task 
                  {...item}
                  />}
                />

            </View>
        )
    }
}

export default cHomepage
