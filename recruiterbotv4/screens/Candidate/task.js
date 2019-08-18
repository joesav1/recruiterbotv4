import React, { Component } from 'react'
import { Text, View, Button, TouchableHighlight, Dimensions } from 'react-native'
import firebase from 'firebase';
import '@firebase/firestore';
import { withNavigation } from 'react-navigation';


const ScreenWidth = Dimensions.get('window').width

export class Task extends Component {
    constructor(props) {
        super(props);
    }

    completedCheck() {
        if(!this.props.completed) {
            this.props.navigation.navigate('cHoldingPage', {title: this.props.title, docID: this.props.docID})
        } else {
            return null
        }
    }

    render() {
        return (
            <TouchableHighlight style={{borderRadius: 10, width:ScreenWidth, height: 90, marginBottom: 2}}  onPress = {() => this.completedCheck()}>
                <View style={{flexDirection: 'row', backgroundColor: '#f7e7e2'}}>
                        <View style={{padding:7, flexDirection:"column", justifyContent:"center", height: 90, width:ScreenWidth*0.50}}>
                            <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:17, margin: 4}}>{this.props.title}</Text>
                            <Text style={{ color: '#1d3458', fontWeight: '400', fontSize:13, marginLeft: 4}}>Company: {this.props.company}</Text>
                        </View>

                        <View style={{padding:7, flexDirection:"column", justifyContent:"center", height: 90, width:ScreenWidth*0.30}}>
                        
                            {this.props.completed && (
                                <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:17, marginLeft: 20}}>Completed</Text>
                            )}


                        </View>
                </View>


            </TouchableHighlight>
        )
    }
}

export default withNavigation(Task)