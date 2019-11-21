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
                    backgroundColor: this.props.bgColor
                }}>

                <View style={{flexDirection: 'row', justifyContent: 'space-around', borderWidth: 5, borderColor: '#000000', borderRadius: 10}}>


                    {/* WORKOUT IMAGE */}
                    <View style={{ width: width/4, paddingRight: 10}}>
                        <Image source={{uri: this.props.workout.gif}} style={{width: '100%', height: 80, marginTop: 20, marginBottom: 20, borderRadius: 10, alignSelf: 'center'}}/>
                    </View>

                    {/* NAME, WEIGHT, REPS, SERIES */}

                    {
                        this.props.workout.atTime  &&
                        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                            <Text style={{fontSize: 25, fontFamily: 'Oswald'}}>{this.props.workout.name}</Text>
                            <Text style={{fontSize: 20, marginTop: 5, color: 'grey', fontFamily: 'Oswald'}}>{this.props.workout.work.min + ':' + this.props.workout.work.sec}</Text>
                        </View>

                    }

                    {
                        this.props.workout.atTime === false &&

                        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                            <Text style={{fontSize: 25, fontFamily: 'Oswald'}}>{this.props.workout.name}</Text>
                            <Text style={{fontSize: 20, marginTop: 5, color: 'grey', fontFamily: 'Oswald'}}>{this.props.workout.weight + 'kg ' + 'x' +this.props.workout.numberOfSeries}</Text>
                        </View>
                    }

                </View>

            </CardView>
        );


    }
}
