import React, {Component} from 'react';

import {Text, TouchableOpacity} from 'react-native';
import {ModernHeader} from '@freakycoder/react-native-header-view';


export default class StockNav extends Component {
    render() {
        return (


            <ModernHeader
                leftIconType="EvilIcons"
                leftIconName="chevron-left"
                leftIconSize={35}
                text="Fit&Fight"
                textStyle={{fontSize: 20, color: 'white', fontFamily: 'Oswald'}}
                rightDisable={true}
                leftIconOnPress={() => this.props.navigation.pop()}
                leftIconColor='white'
            />
        );
    }
}
