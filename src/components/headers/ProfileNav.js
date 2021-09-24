import React, {Component} from 'react';

import {Text, TouchableOpacity} from 'react-native';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {ModernHeader} from '@freakycoder/react-native-header-view';


export default class ProfileNav extends Component {
    render() {
        return (
            <ModernHeader
                rightDisable={true}
                text="PROFIL0"
                textStyle={{fontSize: 35, color: '#ffffff', fontFamily: 'Oswald'}}
                leftIconName="arrow-left"
                leftIconType="EvilIcons"
                leftIconSize={45}
                leftIconOnPress={() => this.props.navigation.pop()}
                leftIconColor='#ffffff'
                backgroundColor="#000000"

            />
        );
    }
}
