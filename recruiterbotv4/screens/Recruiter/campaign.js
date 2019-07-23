import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import firebase from 'firebase';
import '@firebase/firestore';
import { withNavigation } from 'react-navigation';

export class Campaign extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={{ flex: 1, height: 48, flexDirection: 'row', alignItems: "center"}}>
                <View style={{ flex: 8}}>
                    <Text>{this.props.title}</Text>
                </View>
                <View style={{flex: 2}}>
                    <Button 
                    title = "Go"
                    color = '#FF5733'
                    onPress = {() => this.props.navigation.navigate('campaignDetails', {title: this.props.title, candidates: this.props.candidates})}
                    style ={{margin: 10}}
                    />
                </View>
            </View>

        )
    }
}

export default withNavigation(Campaign)
