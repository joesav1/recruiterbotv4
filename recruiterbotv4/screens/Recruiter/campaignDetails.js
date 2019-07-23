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

    //   testFunction = (i) => {
    //     var titleNameTest = this.state.titleMain2
    //     var emailChainTest = []
    //     var completedChainTest = []
    //     firebase.firestore().collection('users').where("email","==",this.state.candidatesMain2[i].toLocaleLowerCase())
    //       .get()
    //       .then(function(querySnapshot) {
    //         querySnapshot.forEach(function(doc) {
    //             console.log(doc.id, '=>', doc.data())
    //             emailChainTest.push(doc.data().email)
    //             firebase.firestore().collection('users').doc(doc.id).collection('tasks').where("title","==",titleNameTest).get()
    //             .then(function(querySnapshot){
    //                 querySnapshot.forEach(function(doc){
    //                     console.log(doc.id, '=>', doc.data())
    //                 })
    //             }) 
    //         }
    //         );
    //       }
    //       ).catch(function(error) {
    //         console.log("Error getting documents:", error);
    //       });
        

    //   }
      
      async testButtonTwo() {
          console.log("test butto ntwo pressed")
        var i = 0
        let tokens = []
        let tokens2 = []
        for(i=0;i<this.state.candidatesMain2.length; i++) {
            const docStuff = await firebase.firestore().collection('users').where("email","==",this.state.candidatesMain2[i].toLocaleLowerCase()).get();
            for (const member of docStuff.docs) {
                console.log("Checking if member gives me an id")
                console.log(member.id)
                console.log("end of member.id check")

                tokens.push(member.data());
                const docStuff2 = await firebase.firestore().collection('users').doc(member.id).collection('tasks').where("title","==",this.state.titleMain2).get();
                for (const member2 of docStuff2.docs) {
                    tokens2.push(member2.data());
                }
            }

        
        }
        console.log("Seeing if tokens gives me anything")
        console.log(tokens)
        console.log("End of checking tokens")
        console.log("Seeing if tokens2 gives me anything")
        console.log(tokens2)
        console.log("End of checking tokens2")

        let tokens3 = []

        tokens.forEach((itm,i) => {
            tokens3.push(Object.assign({}, itm, tokens2[i]));
        });
        console.log("Seeing if tokens3 gives me anything~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        console.log(tokens3)
        console.log("End of checking tokens3~~~~~~~~~~~")


        this.setState({ candidatesTasks: tokens})
        console.log("checking state")
        console.log(this.state.candidatesTasks)
       //return await sendPush(tokens);
      }




    
      componentDidMount() {
        console.log("Component mounted")

      }

      componentWillUnmount() {
        //this.unsubscribe();
      }
    
      render() {
        
        console.log(this.state.titleMain2)
        console.log("checking what candidateMain 2 gives")
        console.log(this.state.candidatesMain2)
        console.log("checking candidates tasks")
        console.log(this.state.candidatesTasks)
        console.log("end of canddatetasks check")
        return (
              <View>
                <Button 
                    title = "DOC TEST"
                    color = "#FFFF00"
                    onPress = {() => {this.testButtonTwo()}}
                    style ={{margin: 10}}
                />
                <Text style={{fontSize: 35, fontWeight: "bold"}}> {this.state.titleMain2}</Text>
                
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

