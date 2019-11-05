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

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                    {/* WORKOUT IMAGE */}
                    <View style={{ width: width/4}}>
                        <Image source={{uri: this.props.workout.gif}} style={{width: '100%', height: 80, marginTop: 20, marginLeft: 20, marginBottom: 20, borderRadius: 10}}/>
                    </View>

                    {/* NAME, WEIGHT, REPS, SERIES */}

                    {
                        this.props.workout.atTime  &&
                        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                            <Text style={{fontSize: 25}}>{this.props.workout.name}</Text>
                            <Text style={{fontSize: 20, marginTop: 5, color: 'grey'}}>{this.props.workout.work.min + ':' + this.props.workout.work.sec}</Text>
                        </View>

                    }

                    {
                        this.props.workout.atTime === false &&

                        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                            <Text style={{fontSize: 25}}>{this.props.workout.name}</Text>
                            <Text style={{fontSize: 20, marginTop: 5, color: 'grey'}}>{this.props.workout.weight + 'kg ' + 'x' +this.props.workout.numberOfSeries}</Text>
                        </View>
                    }


                    <View style={{flexDirection: 'row', marginRight: 20, marginTop: 45}}>


                        {this.props.doneWorkout ?
                            (<FontAwesome style={{marginLeft: 15}} name={'check'} color='#007AFF' size={30}/>)
                            :


                            (
                                <TouchableOpacity onPress={() => {null}}>
                                    <Tooltip
                                        withPointer={false}
                                        withOverlay={true}
                                        backgroundColor={'white'}
                                        height={100}
                                        popover={
                                            <View>
                                                <TouchableOpacity onPress={() => this.props.setEditModalVisible(true)}>
                                                    <Text style={{fontSize: 20}}>
                                                        <Ionicons name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'} color='#007AFF' size={25}/>
                                                        {' '}Modifica
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => this.props.setInfoModalVisible(true)}>
                                                    <Text style={{fontSize: 20, marginTop: 15}}>
                                                        <Ionicons name={Platform.OS === 'ios' ? 'ios-information-circle-outline' : 'md-information-circle-outline'} color='#007AFF' size={25}/>
                                                        {' '}Info
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        }>

                                        <FontAwesome style={{marginLeft: 15}} name={'bars'} color='#007AFF' size={30}/>

                                    </Tooltip>
                                </TouchableOpacity>
                            )
                        }





                    </View>
                </View>
            </CardView>
        );


    }
}
