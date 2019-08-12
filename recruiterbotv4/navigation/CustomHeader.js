import React, { Component } from 'react';
import { Text, View, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

import firebase from 'firebase';
import '@firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { Button , Icon } from 'react-native-elements';
export class CustomHeader extends Component {
    constructor(props) {
        super(props);

        this.userDetailsHeader = firebase.auth().currentUser
        this.state = {
            isLoggedin: false,
        }
    }

    _menu = null

    setMenuRef = ref => {
        this._menu = ref;
      };
     
      hideMenu = () => {
        this._menu.hide();
      };
     
      showMenu = () => {
        this._menu.show();
      };

      settingsPage = () => {
          this._menu.hide();
          console.log("The menu has been hidden");
          this.props.navigation.navigate('userSettings');
          
      }

      logout = () => {
          this.props.navigation.navigate('LoginPage')
      }

    

    render() {
        if(this.userDetailsHeader == null) {
            this.logout
        }
        // console.log("HEADER checking if userDetailsHeader exists")
        // console.log(this.userDetailsHeader)
        // console.log("End of HEADER check on userdetailsheader")
        if(this.userDetailsHeader == null) {
            return (
                <View style = {styles.container}>
                    <Text style = {{flex: 2}} > Header test 1 </Text>
                </View>
            )
        }
        return (
            <View style = {styles.container}>
                <Text style = {{flex: 2}} > Header test 1 </Text>
                <View style = {styles.icon}>
                    <Menu style={styles.menu}
                        ref={this.setMenuRef}
                        button={<Text onPress={this.showMenu}>
                            <Ionicons  name="md-menu" size={32} color="black" />
                        </Text>}
                    >
                        <MenuItem onPress={this.settingsPage}>Settings</MenuItem>
                        <MenuItem style={styles.logout} onPress={this.logout}>logout</MenuItem>
                        <MenuItem style={styles.closeButton} onPress={this.hideMenu} disabled>
                            Close
                        </MenuItem>
                        <MenuDivider />
                        
                    </Menu>
                </View>
            </View>
        )
    }
}


export default withNavigation(CustomHeader)

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
    },
    menu: {
        borderWidth: 2,
        borderColor: '#d6d7da',
    },
    logout: {
        backgroundColor: "#d11208",
    },
    closeButton: {
        backgroundColor: '#3474eb'

    }
})



