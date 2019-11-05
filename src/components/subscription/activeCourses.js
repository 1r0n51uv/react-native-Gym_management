import React, { Component } from 'react';

import {View, Text, Platform, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';



export default class ActiveCourses extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <View style={{flexDirection: 'column'}}>




          <Text style={{color: '#007AFF'}}>Corsi:</Text>

          <TouchableOpacity
              onPress={() => {
                if (this.props.active) {
                  this.props.navigation.push('Courses')
                }
              }}
            style={{flexDirection: 'row'}}>
            <Text style={{
              color: this.props.active ? '#4CD964' : '#EB3333',
              fontSize: 25
            }}>{this.props.active ? 'Vedi Corsi ' : 'Nessuna iscrizione '}</Text>
            <Fontisto name={this.props.active ? 'angle-right' : 'close-a'} size={25} style={{marginTop: 5, color: this.props.active ? '#4CD964' : '#EB3333'}}/>
          </TouchableOpacity>

        </View>

    );
  }
}
