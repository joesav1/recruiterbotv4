import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet} from 'react-native'
import { Input, Button } from 'react-native-elements';
import firebase from 'firebase';
import '@firebase/firestore';

const ScreenWidth = Dimensions.get('window').width
export class createCampaign extends Component {
    constructor(props) {
        super(props);
        


        this.state = {
            loading: true,
            authenticated: false,
            title: '',
            candidates: null,
            params: props.navigation.state.params.testUID,
            companyName: '', 
            candidatesMain: [],
            candidatesTemp: [],
            placeholderCandidate: null,
        };
    }

    async componentDidMount() {

      try {
        let docCompany = await firebase.firestore().collection('users').doc(this.state.params).get();
        let docCompanyMain = docCompany.data();
        let docCompanyMain2 = docCompanyMain.company

        await this.setState({ companyName: docCompanyMain2}) 
        await console.log(this.state.companyName)
        } catch {
          console.log('No company attributed to this user')
        }
    }

    submitAndClear = (candidate) => {
      this.state.candidatesMain.push(candidate)
      console.log("checking the add candidate button actually adds a candidate")
      console.log(this.state.candidatesMain)
      console.log("end of candidatesMian check")
      this.setState({placeholderCandidate: this.state.candidates})
      this.setState({candidates: null})
      
    }

    promptMessage() {
      if(this.state.placeholderCandidate) {
        return(
          <Text style={{margin: 3, fontSize: 12, color: 'white'}}>{this.state.placeholderCandidate} added!</Text>
        )} else {
          return (
            null
          )
      }

    }

    campaignButton = (title, candidates) => {
        firebase.firestore().collection('users').doc(this.state.params).collection('campaigns').add({
          title: this.state.title,
          candidates: this.state.candidatesMain,
          created: new Date().toDateString()
        })
        
    }

    taskCreation = (title, companyName, candidates) => {
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
                  company: companyName,
                  created: new Date().toDateString()
                  
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
            <View style={styles.container}>
              <View style={styles.subContainer}>
                  <Input
                        style={styles.textInputStyle}
                        placeholder='Title'
                        leftIcon={{ type: 'font-awesome', name: 'pencil', size:20, color:'white', marginRight:15 }}
                        onChangeText = {title => this.setState({ title }) }
                        inputStyle ={{margin: 10, color: 'white'}} 
                  />
                  <Input
                        style={styles.textInputStyle}
                        placeholder='Add Candidate Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope', size:20, color:'white', marginRight:10 }}
                        onChangeText = {candidates => this.setState({ candidates }) }
                        inputStyle ={{margin: 10, color: 'white'}} 
                        value={this.state.candidates}
                        //errorMessage = 'That email already exists in the system'
                  />
                  <View>{this.promptMessage()}</View>
                  <View style={{flex:0.4, width: ScreenWidth*0.6, marginTop: 20,}}>
                    <Button 
                        title = "Add candidate"
                        color = "#FFFF00"
                        onPress = {() => {this.submitAndClear(this.state.candidates);}}
                        //style ={{margin: 5}}
                        buttonStyle ={{marginBottom:25, backgroundColor: '#2d74da'}}
                    />
                    <Button 
                        title = "Submit"
                        color = "#34bc6e"
                        onPress = {() => {this.campaignButton(this.state.title, this.state.candidates); this.taskCreation(this.state.title, this.state.companyName, this.state.candidates)}}
                        //style ={{margin: 5}}
                        buttonStyle ={{margin: 5, backgroundColor: '#34bc6e'}}

                        
                    />
                  </View>

              </View>  
            </View>
        )
    }
}

export default createCampaign


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: ScreenWidth*0.8,
    //flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    
  },

  subContainer: {
      flex: 0.9,
      width: ScreenWidth*0.8,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      //marginBottom: 10,
      
    },


  textInputStyle: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      //margin: 20,
      
  }
});

