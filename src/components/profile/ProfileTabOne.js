import React, { Component } from 'react';

import {Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import firebase from "react-native-firebase";
import {Divider} from "react-native-paper";
const { height, width } = Dimensions.get("window");

import Ionicons from "react-native-vector-icons/Ionicons";

export default class ProfileTabOne extends Component {
    constructor(props) {
        super(props);

    }



    render() {
        return (
            <View style={{flexDirection: 'column', marginLeft: 20, marginTop: 10, paddingBottom: 10}}>

                <Text style={styles.mainTitle}>Nome</Text>
                <Text style={styles.subtitle}>{this.props.userInfo ? this.props.userInfo['name'] : ' '}</Text>

                <Text style={styles.mainTitle}>Cognome</Text>
                <Text style={styles.subtitle}>{this.props.userInfo ? this.props.userInfo['surname'] : ' '}</Text>

                <Text style={styles.mainTitle}>Data di nascita</Text>
                <Text style={styles.subtitle}>{this.props.userInfo ? this.props.userInfo['dateOfBirth'] : ' '}</Text>

                <Text style={styles.mainTitle}>Email</Text>
                <Text style={styles.subtitle}>{this.props.userInfo ? this.props.userInfo['email'] : ' '}</Text>

                <Text style={styles.mainTitle}>Telefono</Text>
                <Text style={styles.subtitle}>{this.props.userInfo ? this.props.userInfo['telephoneNumber'] : ' '}</Text>

                <Divider/>

                <TouchableOpacity
                    style={{
                        paddingTop: 5,
                        paddingRight: 10,
                        paddingLeft: 10,
                        paddingBottom: 10,
                        backgroundColor: 'gray',
                        borderRadius: 10,
                        width: width / 2,
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop: 10
                    }}
                    onPress={() => {this.props.changePassword()}}>
                    <Text style={styles.passTitle}>Cambia Password <Ionicons name={Platform.OS === 'ios' ? 'ios-lock' : 'md-lock'} style={{color: 'white'}} size={20} /></Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainTitle: {
        color: 'black',
        fontFamily: 'Oswald'
    },
    subtitle: {
        color: 'black',
        fontSize: 25,
        fontFamily: 'Oswald'
    },
    passTitle: {
        color: 'white',
        fontFamily: 'Oswald',
        fontSize: 20,
    }

});
