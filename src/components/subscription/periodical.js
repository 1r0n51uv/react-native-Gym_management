import React, { Component } from 'react';

import {Text, View} from 'react-native';

// import styles from './styles';

export default class Periodical extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <View style={{flexDirection: 'column'}}>


          <Text style={{color: '#007AFF'}}>Inizio abbonamento</Text>
          <Text style={{fontSize: 25}}>{this.props.start}</Text>

          <Text style={{color: '#007AFF'}}>Fine abbonamento</Text>
          <Text style={{fontSize: 25}}>{this.props.end}</Text>



        </View>
    );
  }
}
