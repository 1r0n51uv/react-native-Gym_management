import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Modal, Image, Button, StyleSheet, ImageBackground } from 'react-native';
import CardView from 'react-native-cardview';
import plank from './../../assets/plank.png';
import {Divider, Card} from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';


export default class EditModal extends Component {
    constructor(props) {
        super(props);

    }

    componentWillUnmount(): void {
        this.props.setEditModalVisible(false);
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

                                    <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                        <Text style={{fontSize: 25, color: '#007AFF'}}>Peso:</Text>
                                        <Fontisto style={{marginTop:5, color: '#EB3333'}} size={25} name={'minus-a'}/>
                                        <Text style={{fontSize: 25}}>60Kg</Text>
                                        <Fontisto style={{marginTop:5, color: '#4CD964'}} size={25} name={'plus-a'}/>
                                    </View>

                                    <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                        <Text style={{fontSize: 25, color: '#007AFF'}}>Ripetizioni:</Text>
                                        <Text style={{fontSize: 25}}>3</Text>
                                    </View>

                                    <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                        <Text style={{fontSize: 25, color: '#007AFF'}}>Riposo:</Text>
                                        <Text style={{fontSize: 25}}>00:30</Text>
                                    </View>


                                </Card.Content>
                            </Card>

                            <TouchableOpacity style={{backgroundColor: '#007AFF'}} onPress={() => {this.props.setEditModalVisible(false)}}>
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
