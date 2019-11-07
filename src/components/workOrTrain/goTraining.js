import React, { Component } from 'react';

import {Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
const { height, width } = Dimensions.get("window");
import Emoji from 'react-native-emoji';
import CardView from 'react-native-cardview';

// import styles from './styles';

export default class GoTraining extends Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.push('CardDay')}>

                <CardView
                    cardElevation={7}
                    cardMaxElevation={2}
                    cornerRadius={8}
                    style={{
                        marginTop: 24,
                        marginLeft: 24,
                        marginRight: 24,
                        marginBottom: 24,
                        backgroundColor: 'white'

                    }}>

                    <View style={{height: height/3, alignItems: 'center', justifyContent: 'center'}}>
                        <Emoji name="muscle" style={{fontSize: 50}} />
                        <Text style={{fontSize: 40}}>Inizia Allenamento</Text>
                    </View>
                </CardView>

            </TouchableOpacity>
        );
    }
}
