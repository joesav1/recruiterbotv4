import React, { Component } from 'react'
import { Text, View, Button, TouchableHighlight, Dimensions } from 'react-native'
import { CheckBox } from 'react-native-elements';
import firebase from 'firebase';
import '@firebase/firestore';
import { withNavigation } from 'react-navigation';




const ScreenWidth = Dimensions.get('window').width

export class RTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favourited: false,
        }
    }

    completedCheck() {
        if(this.props.completed) {
            this.props.navigation.navigate('rolesMain', {propsMain: this.props})
        } else {
            return null
        }
    }

    // favouriteUser() {

    // }


    render() {
        // console.log("checking if we get anyhting rTasks")
        // console.log(this.props)
        // console.log(this.props.docID)
        // console.log(this.props.completed)

        return (
            <TouchableHighlight style={{borderRadius: 10, width:ScreenWidth, height: 90, marginBottom: 2}}  onPress = {() => this.completedCheck()}>
                <View style={{flexDirection: 'row', backgroundColor: '#f7e7e2'}}>
                        <View style={{padding:7, flexDirection:"column", justifyContent:"center", height: 90, width:ScreenWidth*0.50}}>
                            <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:17, margin: 4}}>{this.props.firstname} {this.props.surname}</Text>
                            <Text style={{ color: '#1d3458', fontWeight: '400', fontSize:13, marginLeft: 4}}>{this.props.email}</Text>
                        </View>

                        <View style={{padding:7, flexDirection:"column", justifyContent:"center", height: 90, width:ScreenWidth*0.30}}>
                            {this.props.completed && (
                                    <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:17, marginLeft: 20}}>Score: {this.props.finalScore}</Text>
                            )}
                            {!this.props.completed && (
                                <Text style={{ color: '#1d3458', fontWeight: '600', fontSize:13, marginLeft: 20}}>In Progress</Text>
                            )}


                        </View>
                        <View style={{padding:7, flexDirection:"column", justifyContent:"center", height: 90, width:ScreenWidth*0.20}}>
                            < CheckBox
                                //title= "Press if Recruiter"
                                checked = {this.state.checked}
                                checkedIcon='star'
                                uncheckedIcon='star-o'
                                checkedColor='#1d3458'
                                uncheckedColor = '#1d3458'
                                iconStyle = {{size:20, marginRight: 5}}
                                onIconPress = {() => {console.log("favourite pressed!"); this.setState({checked: !this.state.checked})}}
                            />
                        </View>


                </View>
            </TouchableHighlight>
        )
    }
}

export default withNavigation(RTask)
