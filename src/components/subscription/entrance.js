import React, { Component } from 'react';

import {Text, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

// import styles from './styles';

export default class Entrance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entrances: [],
            remain: [],
            total: []
        }
    }

    componentDidMount() {
        let entrance = [];
        let remain = [];
        let total = [];
        for (let i = 0; i < this.props.entrance; i++) {
            entrance.push(i)
        }
        for (let i = 0; i < this.props.remain; i++) {
            remain.push(i)
        }
        for (let i = 0; i < (this.props.entrance - this.props.remain); i++) {
            total.push(i)
        }

        this.setState({
            entrances: entrance,
            remain: remain,
            total: total
        })
    }



    render() {

        return (
            <View style={{flexDirection: 'column'}}>

                <Text style={{color: 'black', fontFamily: 'Oswald'}}>Entrate rimanenti</Text>

                <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                    <Text style={{fontSize: 20, color: 'black', fontFamily: 'Oswald'}}>{this.props.entrance}</Text>
                </View>



            </View>
        );
    }
}
