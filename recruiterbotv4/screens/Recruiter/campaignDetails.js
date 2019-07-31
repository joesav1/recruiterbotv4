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

        // console.log("CHECKING token3 to see if we get anything here!!!!!!!!!!!!!!!!")
        // console.log(tokens3)
        // console.log("END OF tokens 3 check!!!!!!!!!!!!!!!!!!!!!!!!!!")

        var tokens4 = await this.generateScore(tokens3)

        // console.log("~~~~~~~~~~checking tokens4~~~~~~~~~~")
        // console.log(tokens4)
        // console.log("end of tokens4 chjeck")





        await this.setState({ candidatesTasks: tokens4})

        // console.log("~~~~~~~~~~~~checking this.state.candidates task~~~~~~~~~~")
        // console.log(this.state.candidatesTasks)
        // console.log("~~~~~~~~~~~~end of this.state.candudatestask check~~~~~~~~~~~~~~~")


      }


      generateScore(tokensMain) {
        console.log("MADE it inside generateScore [START]")
        var tokensNew = []



        for(const subData of tokensMain) {
          if(subData.traits){
            console.log("####checking subdata.traits###")
            console.log(subData.traits)
            var tempArrayNumbers = []
            console.log("@@@checking temparraynumbers@@@")
            console.log(tempArrayNumbers)
            console.log("end of temparraynumbers check")
            for(const traitData of subData.traits) {
                  console.log("~~~~~~~checking traitData~~~~~~~")
                  console.log(traitData)
                  console.log("~~~end of traitdata~~~")
                  tempArrayNumbers.push(traitData.traitDatapercentile)
            
            }
            console.log("@@@checking temparraynumbers@@@")
            console.log(tempArrayNumbers)
            console.log("end of temparraynumbers check")
            var positiveNumbs = 0
            var i = 0
            
            for(i=0; i<(tempArrayNumbers.length-1); i++) {
              positiveNumbs = positiveNumbs + tempArrayNumbers[i]
              console.log("-------------positive numbs loop-------------------")
              console.log(positiveNumbs)

            }
            positiveNumbs = positiveNumbs - tempArrayNumbers[4]
            console.log(positiveNumbs)
            positiveNumbs = Math.round(((positiveNumbs/4)*100))
            console.log(positiveNumbs)
            subData.finalScore = positiveNumbs
            console.log(subData)
            
            



            //   //tempArrayNumbers.push(trait.traitDatapercentile)
            // }
            // // var positiveNumbs = 0
            // // var i = 0
            // // for(i=0; i=4; i++) {
            // //           positiveNumbs = positiveNumbs + tempArrayNumbers[i]
            // //           console.log("-------------positive numbs loop-------------------")
            // //           console.log(positiveNumbs)
            // //       }
            


          }
          tokensNew.push(subData)
        }
        console.log("MADE it inside generateScore [END]")
        console.log("CHECKING tokensNew")
        console.log(tokensNew)
        
        return tokensNew

      }




    
      async componentDidMount() {
        this.unsubscribe = await this.testButtonTwo()

        await this.setState({ loading: false})

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
        // console.log("########################checking candidates tasks 2 ##########################")
        // console.log(this.state.candidatesTasks)
        // console.log("##############end of canddatetasks check###################")
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

