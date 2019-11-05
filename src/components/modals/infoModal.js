import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Modal, Image, Button, StyleSheet, ImageBackground } from 'react-native';
import CardView from 'react-native-cardview';
import plank from './../../assets/plank.png';
import {Divider, Card} from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';


export default class InfoModal extends Component {
    constructor(props) {
        super(props);

    }

    componentWillUnmount(): void {
        this.props.setInfoModalVisible(false);
    }


    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.visible}>
                <View style={{flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
                    <View style={{marginTop: 100, alignContent: 'center', justifyContent: 'center'}}>
                        <CardView
                            cardElevation={7}
                            cardMaxElevation={2}
                            cornerRadius={8}
                            style={{
                                marginTop: 20,
                                marginLeft: 24,
                                marginRight: 24,
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>

                            <Card>
                                <Card.Cover source={plank}/>
                                <Card.Content>
                                    <Divider style={{marginTop: 20, marginLeft: 20, marginRight: 20}}/>

                                    <Text style={{marginTop: 10, marginLeft: 20, marginRight: 20, fontSize: 30}}>Leg Press</Text>



                                </Card.Content>
                            </Card>

                            <TouchableOpacity style={{backgroundColor: '#007AFF'}} onPress={() => this.props.setInfoModalVisible(false)}>
                                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
                                    <Fontisto style={{marginTop:5, color: '#FFFFFF'}} size={25} name={'check'}/>
                                    <Text style={{fontSize: 25, color: '#FFFFFF'}}>{' '}Salva</Text>
                                </View>
                            </TouchableOpacity>
                        </CardView>
                    </View>
                </View>
            </Modal>
        );
    }
}

var styles = StyleSheet.create({
    fitImage: {
        borderRadius: 20
    },
    fitImageWithSize: {
        height: 100,
        width: 30
    }
})
