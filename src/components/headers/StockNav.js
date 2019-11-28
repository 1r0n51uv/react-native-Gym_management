import React, {Component} from 'react';

import {Text, TouchableOpacity} from 'react-native';
import {ModernHeader} from '@freakycoder/react-native-header-view';


export default class StockNav extends Component {
    render() {
        return (


            <ModernHeader
                rightIconName="user"
                rightIconType="EvilIcons"
                rightIconSize={45}
                rightIconOnPress={() => this.props.navigation.navigate('Profile')}
                rightIconColor='#ffffff'
                text="FIT&FIGHT"
                textStyle={{fontSize: 35, color: '#ffffff', fontFamily: 'Oswald'}}
                leftIconName="arrow-left"
                leftIconType="EvilIcons"
                leftIconSize={45}
                leftIconOnPress={() => this.props.navigation.pop()}
                leftIconColor='#ffffff'
            />
        );
    }
}
