import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button, FlatList} from 'react-native';
import firebase from 'firebase';
import '@firebase/firestore';
import RTask from './rTask';
export class campaignDetails extends Component {
    constructor(props) {
        super(props);
        
        var testingUser = firebase.auth().currentUser
        

        this.state = {
          loading: true,
          authenticated: false,
          title: '',
          candidatesTasks: [],
          

          titleMain2: props.navigation.state.params.title,
          docIDMain2: props.navigation.state.params.docID,
          candidatesMain2: props.navigation.state.params.candidates,
        };

        this.testEmail = this.state.candidatesMain2[0]
        this.ref = firebase.firestore().collection('users')
      }


      onCollectionUpdate = (querySnapshot) => {
        const candidatesTasks = [];
        querySnapshot.forEach((doc) => {
          const {completed, title, transcript} = doc.data();


          candidatesTasks.push({
            key: doc.uid,
            doc,
            completed,
          });
        });

        

        this.setState({
          candidatesTasks,
        })
      }


            
      async testButtonTwo() {
          console.log("test butto ntwo pressed")
        var i = 0
        let tokens = []
        let tokens2 = []
        for(i=0;i<this.state.candidatesMain2.length; i++) {
            const docStuff = await firebase.firestore().collection('users').where("email","==",this.state.candidatesMain2[i].toLocaleLowerCase()).get();
            for (const member of docStuff.docs) {
 
                

                tokens.push(member.data());
                const docStuff2 = await firebase.firestore().collection('users').doc(member.id).collection('tasks').where("title","==",this.state.titleMain2).get();
                for (const member2 of docStuff2.docs) {
                    tokens2.push(member2.data());
                }
            }

        
        }


        let tokens3 = []

        tokens.forEach((itm,i) => {
            tokens3.push(Object.assign({}, itm, tokens2[i]));
        });


        this.setState({ candidatesTasks: tokens3})


      }




    
      componentDidMount() {
        this.unsubscribe = this.testButtonTwo()

        this.setState({ loading: false})

      }


    
      render() {

        if(this.state.loading) {
            return (
                <View>
                    <Text>LOADING...</Text>
                </View>
            )
        }
        
        // console.log(this.state.titleMain2)
        // console.log("checking what candidateMain 2 gives")
        // console.log(this.state.candidatesMain2)
        // console.log("checking candidates tasks")
        // console.log(this.state.candidatesTasks)
        // console.log("end of canddatetasks check")
        return (
              <View>
                <Text style={{fontSize: 20, fontWeight: "bold"}}> Role: {this.state.titleMain2}</Text>
                
                <FlatList  
                    data = {this.state.candidatesTasks}
                    renderItem = {({item}) => <RTask 
                    {...item}
                    />}
                />
              </View>
        )}
    }
export default campaignDetails

