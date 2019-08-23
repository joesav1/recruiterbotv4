import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight, ScrollView, Dimensions, FlatList } from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Icon, Input, Button } from "react-native-elements";

import firebase from 'firebase';
import '@firebase/firestore';
import AdminUser from './adminUser';


const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height

export class adminHomepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: []
        }

        this.ref = firebase.firestore().collection('users').where('isRecruiter','==', true)
    }

    onCollectionUpdate = (querySnapshot) => {
        const userInfo = [];
        
        querySnapshot.forEach((doc) => {

            const {name, firstname, surname, email, company } = doc.data();
            const docID = doc.id

            userInfo.push({
                key: doc.uid,
                doc,
                name,
                firstname,
                surname,
                email,
                company,
                docID,
            
            });


        });

        this.setState({
            userInfo
        })
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <View style={{flexDirection:"column"}}>
                <View style={{flexDirection:"row", alignItems:"center", margin:10, marginBottom: 20, marginTop: 40}}>
                    <Text style={{fontSize: 35, fontWeight: "bold", color:"white"}}> Users</Text>
                </View>
                <FlatList
                data={this.state.userInfo}
                renderItem={({item}) => <AdminUser 
                {...item}
                />}
                />
            
            </View>
        )
    }
}

export default adminHomepage
