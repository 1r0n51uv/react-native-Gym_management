import React, { Component } from 'react';

import {StyleSheet, Text, View} from 'react-native';
import firebase from "react-native-firebase";
// import styles from './styles';

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

                <Text style={styles.mainTitle}>Età</Text>
                <Text style={styles.subtitle}>{this.props.userInfo ? this.props.userInfo['dateOfBirth'] : ' '}</Text>

                <Text style={styles.mainTitle}>Email</Text>
                <Text style={styles.subtitle}>{this.props.userInfo ? this.props.userInfo['email'] : ' '}</Text>

                <Text style={styles.mainTitle}>Telefono</Text>
                <Text style={styles.subtitle}>{this.props.userInfo ? this.props.userInfo['telephoneNumber'] : ' '}</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainTitle: {
        color: '#3F5469',
        fontFamily: 'Oswald'
    },
    subtitle: {
        color: '#3F5469',
        fontSize: 25,
        fontFamily: 'Oswald'
    }

});
