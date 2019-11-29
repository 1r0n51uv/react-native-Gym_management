import React, { Component } from 'react';

import {Text, View, StyleSheet} from 'react-native';
// import styles from './styles';

export default class ProfileTabTwo extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flexDirection: 'column', marginLeft: 20, marginTop: 10, paddingBottom: 10}}>

                <Text style={styles.mainTitle}>Altezza</Text>
                <Text style={styles.subtitle}>{this.props.userAnemic ? this.props.userAnemic['height'] + ' cm' : ' '}</Text>

                <Text style={styles.mainTitle}>Peso</Text>
                <Text style={styles.subtitle}>{this.props.userAnemic ? this.props.userAnemic['weight'] + ' kg' : ' '}</Text>

                <Text style={styles.mainTitle}>IMC</Text>
                <Text style={styles.subtitle}>{this.props.userAnemic['imc']}</Text>

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
    }

});

