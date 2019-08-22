import React, { Component } from 'react';
import { Text, View, StyleSheet, Modal, TouchableHighlight, Image, Dimensions } from 'react-native';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

import firebase from 'firebase';
import '@firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { Button , Icon } from 'react-native-elements';

const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height

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
          this.props.navigation.navigate('userSettings');
          
      }

      logout = () => {
          this._menu.hide();
        //   firebase.auth().signOut().catch(function(error) {
        //       console.log("An error occured")
        //   })
        //     console.log("Signout succesful")
        //     this.props.navigation.navigate('LoginPage')
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          }).then(
              console.log("~~~~~~~~~~~~~~signout successful~~~~~~~~~~~"),
              this.props.navigation.navigate('LoginPage')
          )
      }

    

    render() {
        if(this.userDetailsHeader == null) {
            this.logout
            return (
                <View style = {styles.container}>
                    <Image source={require('../screens/images/IBMRecruitLogo.png')} />
                </View>
            )
        } else {

        return (
            <View style = {styles.container}>
                <Image source={require('../screens/images/IBMRecruitLogo.png')} />
                <View style = {styles.icon}>
                    <Menu style={styles.menu}
                        ref={this.setMenuRef}
                        button={<Text onPress={this.showMenu}>
                            <Ionicons  name="md-menu" size={32} color="white" />
                        </Text>}
                    >
                        <MenuItem onPress={this.settingsPage}>Settings</MenuItem>
                        <MenuItem style={styles.logout} onPress={this.logout}>logout</MenuItem>
                        <MenuItem style={styles.closeButton} onPress={this.hideMenu}>
                            Close
                        </MenuItem>
                        <MenuDivider />
                        
                    </Menu>
                </View>
            </View>
            )
        }
    }   
}


export default withNavigation(CustomHeader)

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        paddingTop: 35,
        paddingLeft: 15,
        paddingBottom: 15,
        borderWidth: 0.5,
        backgroundColor: '#19273c',
        // borderColor: '#d6d7da',
        // shadowColor: '#000000',
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        //height: ScreenHeight*0.1,
        width: ScreenWidth
    },

    container3: {
        flexDirection: "row",
        alignItems: 'center',
        paddingTop: 45,
        paddingLeft: 10,
        paddingBottom: 15,
        borderWidth: 0.5,
        backgroundColor: '#19273c',
        // borderColor: '#d6d7da',
        // shadowColor: '#000000',
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
        //backgroundColor: "#d11208",
    },
    closeButton: {
        //backgroundColor: '#3474eb'

    }
})



