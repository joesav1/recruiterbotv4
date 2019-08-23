import React, { Component } from 'react'
import { Text, View, Button, TouchableHighlight, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements';
import firebase from 'firebase';
import '@firebase/firestore';
import { withNavigation } from 'react-navigation';
import Swipeout from 'react-native-swipeout';

const ScreenWidth = Dimensions.get('window').width

export class AdminUser extends Component {
    constructor(props) {
        super(props);
    }



    deleteUserMain() {
        try {
            var currentDocID = this.props.docID
            firebase.firestore().collection('users').doc(currentDocID).delete().catch(error => {
                console.log(error)
            });
        } catch {
            console.log("Not deleting candidate task candidate perspective")
        }
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
                    console.log("delete button pressed")
                    this.deleteUserMain();
                    


                }
            }
          ]


        return (
            <View>  
                <Swipeout autoClose={true} right={swipeoutBtns}>
                    <TouchableHighlight style={{borderRadius: 10, width:ScreenWidth, height: 90, marginBottom: 2}}>
                        <View style={{flexDirection: 'row', backgroundColor: '#f7e7e2'}}>
                                <View style={{padding:7, flexDirection:"column", justifyContent:"center", height: 90, width:ScreenWidth*0.60}}>
                                    <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:17, margin: 4}}>{this.props.firstname} {this.props.surname}</Text>
                                    <Text style={{ color: '#1d3458', fontWeight: '400', fontSize:13, marginLeft: 4}}>Email: {this.props.email}</Text>
                                </View>

                                <View style={{padding:7, flexDirection:"column", justifyContent:"center", height: 90, width:ScreenWidth*0.40}}>
                                        <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:17, marginLeft: 5}}>Company: {this.props.company}</Text>



                                </View>
                        </View>
                    </TouchableHighlight>
                </Swipeout>
            </View>
        )
    }
}

export default withNavigation(AdminUser)
