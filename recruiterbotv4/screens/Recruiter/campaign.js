import React, { Component } from 'react'
import { Text, View, Button, TouchableHighlight, Dimensions} from 'react-native'
import firebase from 'firebase';
import '@firebase/firestore';
import { withNavigation } from 'react-navigation';

const ScreenWidth = Dimensions.get('window').width

export class Campaign extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
           
                <TouchableHighlight style={{borderRadius: 10, width:ScreenWidth, height: 110, marginBottom: 2}}  onPress = {() => this.props.navigation.navigate('campaignDetails', {title: this.props.title, candidates: this.props.candidates})}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{padding:7, justifyContent:"center", alignItems:"center", height: 110, width:ScreenWidth*0.25, backgroundColor:'#1f57a4'}}>
                            <Text style={{textAlign:"center", color: 'white', fontWeight: '600', fontSize:17}}>{this.props.title}</Text>
                        </View>
                        <View style={{padding:7, flexDirection:"column", justifyContent:"center", height: 110, width:ScreenWidth*0.75, backgroundColor: '#e1ebf7'}}>
                            <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:17}}>Candidates: {this.props.candidateCount}</Text>
                            <Text style={{ color: '#1d3458', fontWeight: '450', fontSize:13}}>Date Created:</Text>

                        </View>
                    </View>
                </TouchableHighlight>

                
        

        )
    }
}

export default withNavigation(Campaign)
