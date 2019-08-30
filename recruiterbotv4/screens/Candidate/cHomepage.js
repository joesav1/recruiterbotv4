import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, FlatList, Dimensions} from 'react-native';
import firebase from 'firebase';
import '@firebase/firestore';
import Task from './task';


const ScreenWidth = Dimensions.get('window').width

export class cHomepage extends Component {
    constructor(props) {
        super(props);

        //Dont get rid of this one
        let testingUser = firebase.auth().currentUser
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
            const {title, completed, company, created, problem} = doc.data();
            const docID = doc.id
            
            

            tasks.push({
                //double check if this is doc.uid
                key: doc.uid,
                doc,
                title,
                completed,
                company,
                created,
                docID,
                problem
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

            return null;
        }

        if(!this.state.authenticated) {
            return null;
        }



        return (
            <View style={{flexDirection:"column"}}>
                <View style={{flexDirection:"row", alignItems:"center", margin:10, marginBottom: 20}}>
                    <Text style={{fontSize: 35, fontWeight: "bold", color:"white"}}> Tasks</Text>
                </View>
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
