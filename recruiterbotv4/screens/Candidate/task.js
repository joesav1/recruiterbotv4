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
            <View style={{ flex: 3, height: 48, flexDirection: 'row', alignItems: "center", borderWidth: 0.25, borderColor: "#0B152C",}}>
                <View style={{ flex: 1}}>
                    <Text>{this.props.title}</Text>
                </View>
                <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                    {!this.props.completed && (
                            <Button 
                            title = "Start"
                            color = '#FF5733'
                            onPress = {() => this.props.navigation.navigate('cHoldingPage', {title: this.props.title, docID: this.props.docID})}
                            style ={{flex: 1, margin: 10}}
                            />
                    )}
                    {this.props.completed && (
                        <Text style={{fontWeight: "bold"}}>Completed</Text>
                    )}


                </View>


            </View>
        )
    }
}

export default withNavigation(Task)