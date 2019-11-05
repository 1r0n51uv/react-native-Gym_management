import React, { Component } from 'react';

import {Text, View, Dimensions, TouchableOpacity, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { height, width } = Dimensions.get("window");
import Emoji from 'react-native-emoji';
import CardView from 'react-native-cardview';

export default class GoCourses extends Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.push('Courses')}>

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
                        <Emoji name="newspaper" style={{fontSize: 50}} />
                        <Text style={{fontSize: 40}}>Visualizza Corsi</Text>
                    </View>
                </CardView>

            </TouchableOpacity>
        );
    }
}
