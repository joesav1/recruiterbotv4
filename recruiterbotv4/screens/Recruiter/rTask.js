import React, { Component } from 'react'
import { Text, View, Button, TouchableHighlight, Dimensions } from 'react-native'
import firebase from 'firebase';
import '@firebase/firestore';
import { withNavigation } from 'react-navigation';



const ScreenWidth = Dimensions.get('window').width

export class RTask extends Component {
    constructor(props) {
        super(props);
    }

    completedCheck() {
        if(this.props.completed) {
            this.props.navigation.navigate('rolesMain', {propsMain: this.props})
        } else {
            return null
        }
    }


    render() {
        // console.log("checking if we get anyhting rTasks")
        // console.log(this.props)
        // console.log(this.props.docID)
        // console.log(this.props.completed)

        return (
            <TouchableHighlight style={{borderRadius: 10, width:ScreenWidth, height: 90, marginBottom: 2}}  onPress = {() => this.completedCheck()}>
                <View style={{flexDirection: 'row', backgroundColor: '#f7e7e2'}}>
                        <View style={{padding:7, flexDirection:"column", justifyContent:"center", height: 90, width:ScreenWidth*0.5}}>
                            <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:17, margin: 4}}>{this.props.firstname} {this.props.surname}</Text>
                            <Text style={{ color: '#1d3458', fontWeight: '400', fontSize:13, marginLeft: 4}}>{this.props.email}</Text>
                        </View>

                        <View style={{padding:7, flexDirection:"column", justifyContent:"center", height: 90, width:ScreenWidth*0.4}}>
                            {this.props.completed && (
                                    <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:17, marginLeft: 20}}>Score: {this.props.finalScore}</Text>
                            )}
                            {!this.props.completed && (
                                <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:13, marginLeft: 40}}>In Progress</Text>
                            )}


                        </View>


                </View>
            </TouchableHighlight>
        )
    }
}

export default withNavigation(RTask)
