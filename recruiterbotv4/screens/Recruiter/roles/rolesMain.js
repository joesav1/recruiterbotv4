import React, { Component } from 'react'
import { Text, View, FlatList, Button, ScrollView, StyleSheet, Dimensions} from 'react-native'
import { Icon } from 'react-native-elements';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';

const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height

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
                <Text style={{fontSize: 18, fontWeight: "500", color:"#1d3458", marginBottom:2, marginLeft: 20}} key={trait.traitSubData}>{'\u2022'} {trait.traitSubData}</Text>
            )
        })
    }

    // Alternate score layout
    // <View style={{flexDirection:"row", alignItems:"center", justifyContent: "center"}}>
    // <Text style={{fontSize: 25, fontWeight: "bold", color:"#f7e7e2"}}> Score: {this.state.mainProps.finalScore}  </Text>
    // </View>

    render() {
        return (
            <ScrollView>
                <View style={{flexDirection:"column", paddingTop:15}}>
                    <View style={{flexDirection:"row", alignItems:"center", marginBottom: 20, marginLeft: 20, width: ScreenWidth}}>
                        <View style={{flexDirection:"column", justifyContent:"center", marginRight:15}}>
                            <Text style={{fontSize: 25, fontWeight: "bold", color:"white", marginBottom:1}}>{this.state.mainProps.firstname} {this.state.mainProps.surname}</Text>
                            <Text style={{fontSize: 18, fontWeight: "400", color:"white"}}>{this.state.emailRoles}</Text>
                        </View>

                    </View>
                    <View style={{flexDirection:"row", backgroundColor:"#f7e7e2", width:ScreenWidth, marginBottom:10, paddingTop:30, paddingBottom:35}}>
                            <View style={{width: ScreenWidth * 0.5}}>
                                <Text style={{fontSize: 25, fontWeight: "bold", color:"#1d3458", marginBottom:5, marginLeft: 20}}> Main Traits: </Text>
                                {this.renderList()}
                            </View>
                            <View style={{width: ScreenWidth * 0.5, alignItems:"center", justifyContent:"center"}}>
                                <Text style={{fontSize: 25, fontWeight: "bold", color:"#1d3458"}}>Overall Score</Text>
                                <Text style={{fontSize: 40, fontWeight: "bold", color:"#1d3458"}}>{this.state.mainProps.finalScore}</Text>
                            </View>    

                    </View>
                    <Collapse>
                            <CollapseHeader>
                                <View style={{flexDirection:"row", alignItems:"center", marginLeft: 20}}>
                                    <Text style={{fontSize: 20, fontWeight: "bold", color:"white", marginTop:10, marginBottom:2, marginRight:4}}>Transcript</Text>
                                    <Icon
                                        name="toggle-down"
                                        type="font-awesome"
                                        size={16}
                                        color="white"
                                        iconStyle={{marginTop: 12}}
                                    />

                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <Text style={{fontSize: 20, fontWeight: "500", color:"#f7e7e2", marginTop:10, marginBottom:2, marginLeft: 20}}>{this.state.mainProps.transcript}</Text>
                            </CollapseBody>
                    </Collapse>
                    

                </View>
            </ScrollView>
        )
    }
}

export default rolesMain
