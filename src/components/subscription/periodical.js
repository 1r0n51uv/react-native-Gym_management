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


          <Text style={{color: 'black', fontFamily: 'Oswald'}}>Inizio abbonamento</Text>
          <Text style={{color: 'black', fontFamily: 'Oswald', fontSize: 25}}>{this.props.start}</Text>

          <Text style={{color: 'black', fontFamily: 'Oswald'}}>Fine abbonamento</Text>
          <Text style={{color: 'black', fontFamily: 'Oswald', fontSize: 25}}>{this.props.end}</Text>



        </View>
    );
  }
}
