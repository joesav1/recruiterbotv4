import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import firebase from 'firebase';
import '@firebase/firestore';
import { withNavigation } from 'react-navigation';

export class Task extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, height: 48, flexDirection: 'row', alignItems: "center"}}>
                <View style={{ flex: 8}}>
                    <Text>{this.props.title}</Text>
                </View>
                

                <View style={{flex: 10}}>
                    <Button 
                    title = "Start"
                    color = '#FF5733'
                    onPress = {() => this.props.navigation.navigate('cHoldingPage', {title: this.props.title, docID: this.props.docID})}
                    style ={{margin: 10}}
                    />
                </View>
            </View>
        )
    }
}

export default withNavigation(Task)