import React, {Component} from 'react';


import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Fontawesome from 'react-native-vector-icons/FontAwesome5'
import {ModernHeader} from '@freakycoder/react-native-header-view';


export default class WelcomeNav extends Component {
    render() {
        return (

                <ModernHeader
                    leftDisable={true}
                    rightIconName="user"
                    rightIconType="EvilIcons"
                    rightIconSize={45}
                    rightIconOnPress={() => this.props.navigation.navigate('Profile')}
                    rightIconColor='#ffffff'
                    text="FIT&FIGHT"
                    textStyle={{fontSize: 35, color: '#ffffff', fontFamily: 'Oswald'}}
                    backgroundColor="#000000"
                />

        );
    }
}

