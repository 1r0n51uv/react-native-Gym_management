import React, {Component} from 'react';

import {Text, TouchableOpacity} from 'react-native';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {ModernHeader} from '@freakycoder/react-native-header-view';


export default class WelcomeNav extends Component {
    render() {
        return (

                <ModernHeader
                    backgroundColor='black'
                    leftDisable={true}
                    text="Fit&Fight"
                />

        );
    }
}
