import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class rolesMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            titleRoles: props.navigation.state.params.title,
            emailRoles: props.navigation.state.params.email,
            uidRoles: props.navigation.state.params.uid,
        }
    }

    render() {
        return (
            <View>
                <Text> Hi! {this.state.emailRoles} </Text>
                <Text> Some of your details: {this.state.uidRoles}  </Text>
            </View>
        )
    }
}

export default rolesMain
