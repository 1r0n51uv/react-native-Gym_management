import React, { Component } from 'react';

import {View, Text, Platform, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';



export default class ActiveCourses extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (

        (this.props.startDate !== undefined) &&
        <View style={{flexDirection: 'column'}}>

            <Text style={{color: 'black', fontFamily: 'Oswald'}}>Data inizio:</Text>

            <Text style={{
                color: 'black',
                fontSize: 25, fontFamily: 'Oswald'
            }}>{this.props.startDate}</Text>

            <Text style={{color: 'black', fontFamily: 'Oswald'}}>Data fine:</Text>

            <Text style={{
                color: 'black',
                fontSize: 25, fontFamily: 'Oswald'
            }}>{this.props.endDate}</Text>


        </View>

    );
  }
}
