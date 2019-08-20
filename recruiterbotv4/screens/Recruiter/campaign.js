import React, { Component } from 'react'
import { Text, View, Button, TouchableHighlight, Dimensions} from 'react-native'
import { Icon } from 'react-native-elements';
import firebase from 'firebase';
import '@firebase/firestore';
import { withNavigation } from 'react-navigation';
import Swipeout from 'react-native-swipeout';


const ScreenWidth = Dimensions.get('window').width

export class Campaign extends Component {
    constructor(props) {
        super(props);

        

    }


    render() {
        var swipeoutBtns = [
            {
              component: (
                  <View style={{flex: 1, backgroundColor: 'red', justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                    <Icon
                        reverse
                        raised
                        reverseColor = '#79a6f6'
                        name="trash"
                        type="font-awesome"
                        size={21}
                        color="white"
                    />
                  </View>
              ),
              backgroundColor: 'red',
              onPress: () => {
                  console.log("delete pressed ")
                  console.log(this.props.recruiterIDMain)
                  firebase.firestore().collection('users').doc(this.props.recruiterIDMain).collection('campaigns').doc(this.props.docID).delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
              }
            }
          ]

        return (
            <View>
                <Swipeout autoClose={true} right={swipeoutBtns}>
                        <TouchableHighlight style={{borderRadius: 10, width:ScreenWidth, height: 110, marginBottom: 2}}  onPress = {() => this.props.navigation.navigate('campaignDetails', {title: this.props.title, candidates: this.props.candidates})}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{padding:7, justifyContent:"center", alignItems:"center", height: 110, width:ScreenWidth*0.25, backgroundColor:'#1f57a4'}}>
                                    <Text style={{textAlign:"center", color: 'white', fontWeight: '600', fontSize:17}}>{this.props.title}</Text>
                                </View>
                                <View style={{padding:7, flexDirection:"column", justifyContent:"center", height: 110, width:ScreenWidth*0.75, backgroundColor: '#e1ebf7'}}>
                                    <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:17, margin: 4}}>Candidates: {this.props.candidateCount}</Text>
                                    <Text style={{ color: '#1d3458', fontWeight: '400', fontSize:13, margin: 4}}>Date Created: {this.props.created}</Text>

                                </View>
                            </View>
                        </TouchableHighlight>
                </Swipeout>
            </View>

                
        

        )
    }
}

export default withNavigation(Campaign)
