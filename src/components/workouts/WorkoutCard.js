import React, { Component } from 'react';

import {View, Text, Platform, Image, Dimensions, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview';
const {  width } = Dimensions.get("window");
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Tooltip from 'rn-tooltip';
import Reactotron from 'reactotron-react-native'

export default class WorkoutCard extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <CardView
                cardElevation={7}
                cardMaxElevation={2}
                cornerRadius={8}
                style={{
                    marginTop: 20,
                    marginLeft: 24,
                    marginRight: 24,
                    backgroundColor: this.props.bgColor,
                    opacity: 0.7
                }}>

                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>


                    {/* WORKOUT IMAGE */}
                    <View style={{ width: width/4, paddingRight: 10}}>
                        <Image source={{uri: this.props.workout.gif}} style={{width: '100%', height: 80, marginTop: 20, marginBottom: 20, borderRadius: 10, alignSelf: 'center'}}/>
                    </View>

                    {/* NAME, WEIGHT, REPS, SERIES */}

                    <View style={{flexDirection: 'column', justifyContent: 'center', width: width / 2.5}}>
                        <Text style={{fontSize: width / 15, fontFamily: 'Oswald', color: this.props.bgColor === 'white' ? 'black' : 'white'}}>{this.props.workout.name}</Text>
                    </View>


                </View>

            </CardView>
        );


    }
}
