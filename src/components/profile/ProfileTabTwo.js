import React, { Component } from 'react';

import {Text, View} from 'react-native';

// import styles from './styles';

export default class ProfileTabTwo extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flexDirection: 'column', marginLeft: 20, marginTop: 10, paddingBottom: 10}}>

                <Text style={{color: '#007AFF'}}>Altezza</Text>
                <Text style={{fontSize: 25}}>{this.props.userAnemic ? this.props.userAnemic['height'] + ' cm' : ' '}</Text>

                <Text style={{color: '#007AFF'}}>Peso</Text>
                <Text style={{fontSize: 25}}>{this.props.userAnemic ? this.props.userAnemic['weight'] + ' kg' : ' '}</Text>

                <Text style={{color: '#007AFF'}}>BCM</Text>
                <Text style={{fontSize: 25}}>Appezzi</Text>



            </View>
        );
    }
}
