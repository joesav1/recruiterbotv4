import React, { Component } from 'react'
import { Text, View } from 'react-native'
import firebase from 'firebase';
import '@firebase/firestore';
import { withNavigation } from 'react-navigation';

export class RTask extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log("checking if we get anyhting rTasks")
        // console.log(this.props)
        // console.log(this.props.docID)
        // console.log(this.props.completed)

        return (
            <View style={{ flex: 3, height: 48, flexDirection: 'row', alignItems: "center", borderWidth: 0.25, borderColor: "#0B152C",}}>
                <View style={{ flex: 1}}>
                    <Text>{this.props.email}</Text>
                </View>


            </View>
        )
    }
}

export default withNavigation(RTask)
