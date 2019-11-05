import React, {Component} from 'react';

import {Text, TouchableOpacity} from 'react-native';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Header from '@freakycoder/react-native-header-view';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default class TrainOrCourseNav extends Component {
    render() {
        return (
            <Header
                backgroundColor='black'
                leftComponent={
                    <TouchableOpacity
                        onPress={() => {this.props.navigation.pop()}}>
                        <Text style={{color: '#FFFFFF', fontSize: 20, marginLeft: 5}}>
                            <AntDesign name="left" type="AntDesign" size={20} color='#FFFFFF' />Indietro
                        </Text>
                    </TouchableOpacity>
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
