import React, {Component} from 'react';

import {Text, TouchableOpacity} from 'react-native';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import {ModernHeader} from '@freakycoder/react-native-header-view';


export default class Navbar extends Component {
    render() {
        return (
            <ModernHeader
                leftIconComponent={
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.pop()}}>
                        <Text style={{color: '#007AFF', fontSize: 20, marginLeft: 5, fontFamily: 'Oswald'}}>
                            <AntDesign name="left" type="AntDesign" size={20} color='#007AFF' />Indietro</Text>
                    </TouchableOpacity>
                }
            />
        );
    }
}
