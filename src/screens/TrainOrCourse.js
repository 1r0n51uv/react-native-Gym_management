import React, { Component } from 'react';

import { View, SafeAreaView, ScrollView, Text, Dimensions } from 'react-native';
import GoTraining from '../components/workOrTrain/goTraining';
import GoCourses from '../components/workOrTrain/goCourses';
const { height, width } = Dimensions.get("window");

export default class TrainOrCourse extends Component {
    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>

                <ScrollView>

                    <View style={{flexDirection: 'column'}}>


                        <GoTraining navigation={this.props.navigation}/>

                        <GoCourses navigation={this.props.navigation}/>

                    </View>


                </ScrollView>


            </SafeAreaView>
        );
    }
}
