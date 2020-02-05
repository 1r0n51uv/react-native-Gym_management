import React, {Component} from 'react';
import {
    Dimensions,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image
} from "react-native";
const { height, width } = Dimensions.get("window");
import { Card, Divider, Title, Paragraph } from 'react-native-paper';
import CardView from "react-native-cardview";
import logo from "../../assets/lastLogo.png";



export default class GymHours extends Component {
    render() {
        return (

            <CardView
                cardElevation={7}
                cardMaxElevation={2}
                cornerRadius={8}
                style={{
                    marginTop: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10,
                    opacity: 0.8,
                    backgroundColor: 'black'
                }}>
                <Card style={{backgroundColor: 'black'}}>


                    <Card.Content>

                        <Image source={logo} style={{alignSelf: 'center', resizeMode: 'contain', width: width / 3, height: width / 3}} />

                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            backgroundColor: 'black',
                            fontFamily: 'Oswald'
                        }}>

                            <Text
                                style={{
                                    color: 'white',
                                    alignSelf: 'center',
                                    fontSize: width / 20
                                }}>
                                ORARI PALESTRA
                            </Text>


                            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

                                <View style={{flexDirection: 'column'}}>
                                    <Text style={{color: '#9B1401', fontFamily: 'Oswald', fontSize: width / 25}}>GIORNO</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>Lunedì</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>Martedì</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>Mercoledì</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>Giovedì</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}> </Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>Venerdì</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>Sabato</Text>
                                </View>

                                <View style={{flexDirection: 'column'}}>
                                    <Text style={{color: '#9B1401', fontFamily: 'Oswald', fontSize: width / 25}}>APERTO</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>9:30</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>8:30</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>8:30</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>8:30</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>17:30</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>8:30</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>9:30</Text>
                                </View>

                                <View style={{flexDirection: 'column'}}>
                                    <Text style={{color: '#9B1401', fontFamily: 'Oswald', fontSize: width / 25}}>CHIUSO</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>22:30</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>22:30</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>22:30</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>15:30</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>22:30</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>22:30</Text>
                                    <Text style={{color: 'white', fontFamily: 'Oswald', fontSize: width / 25}}>16:00</Text>
                                </View>
                            </View>

                        </View>


                    </Card.Content>
                </Card>
            </CardView>


        );
    }
}

