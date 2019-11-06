import React, {Component} from 'react';

import {Text, TouchableOpacity} from 'react-native';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import {ModernHeader} from '@freakycoder/react-native-header-view';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default class TrainOrCourseNav extends Component {
    render() {
        return (

                <ModernHeader
                    backgroundColor='black'
                    leftIconName='ios-arrow-back'
                    leftIconOnPress={() => this.props.navigation.pop()}
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
