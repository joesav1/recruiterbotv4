import React, { Component } from 'react'
import { Text, View, FlatList, Button, Icon } from 'react-native'


export class rolesMain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mainProps: props.navigation.state.params.propsMain,
            titleRoles: props.navigation.state.params.propsMain.title,
            emailRoles: props.navigation.state.params.propsMain.email,
            uidRoles: props.navigation.state.params.propsMain.uid,
        }
    }

    renderList() {
        return this.state.mainProps.traits.map(trait => {
            return (
                <Text key={trait.traitSubData}>{trait.traitSubData}</Text>
            )
        })
    }


    render() {
        return (
            <View>
                <Text> Email: {this.state.emailRoles} </Text>
                <Text> Overall Score: {this.state.mainProps.finalScore}  </Text>
                <Text> Main Traits </Text>
                {this.renderList()}
               
            </View>
        )
    }
}

export default rolesMain
