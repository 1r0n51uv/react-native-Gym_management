import React, {Component} from 'react';

import {Text, TouchableOpacity} from 'react-native';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Header from '@freakycoder/react-native-header-view';


export default class WelcomeNav extends Component {
    render() {
        return (
            <Header
                backgroundColor='black'
                leftComponent={
                    <TouchableOpacity/>
                }
                centerComponent={
                    <Text style={{alignSelf: 'center', color: '#FFFFFF', fontSize: 20}}>Fit&Fight</Text>
                }
                rightComponent={
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('Profile')
                        }}>
                        <EvilIcons name="user" type="EvilIcons" size={40} color='#FFFFFF'/>
                    </TouchableOpacity>
                }
            />
        );
    }
}
