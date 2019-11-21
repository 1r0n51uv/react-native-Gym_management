import React, {Component} from 'react';


import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Fontawesome from 'react-native-vector-icons/FontAwesome5'
import {ModernHeader} from '@freakycoder/react-native-header-view';


export default class WelcomeNav extends Component {
    render() {
        return (

                <ModernHeader
                    leftDisable={true}
                    text="Fit&Fight"
                    textStyle={{fontSize: 20, color: 'white', fontFamily: 'Oswald'}}
                    rightIconName="user"
                    rightIconType="EvilIcons"
                    rightIconSize={35}
                    rightIconOnPress={() => this.props.navigation.navigate('Profile')}
                    rightIconColor='white'

                />

        );
    }
}

