import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from "react-native-elements";
import firebase from 'firebase';
import '@firebase/firestore';

export class CustomHeader extends Component {
    constructor(props) {
        super(props);

        this.userDetailsHeader = firebase.auth().currentUser
    }

    render() {
        console.log("HEADER checking if userDetailsHeader exists")
        console.log(this.userDetailsHeader)
        console.log("End of HEADER check on userdetailsheader")
        return (
            <View style = {styles.container}>
                <Text style = {{flex: 2}} > textInComponent </Text>
                <Icon
                    name="md-menu"
                    type="ionicon"
                    containerStyle={styles.icon}
                    onPress={() => {console.log("ICON WORKS!"); }}
                />
            </View>
        )
    }
}


export default CustomHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        paddingTop: 45,
        paddingLeft: 10,
        paddingBottom: 15,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        shadowColor: '#000000',

        



    },
    icon: {
        flex: 1,
        alignItems: "flex-end",
        paddingLeft: 10,
        paddingRight: 20,
    }
})



