import React, { Component } from 'react';

import {SafeAreaView, View, Text, Dimensions, TouchableOpacity, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Divider} from 'react-native-paper';
const { height, width } = Dimensions.get("window");
import gymWallpaper from './../assets/590.jpg';
import firebase from "react-native-firebase";
import Reactotron from 'reactotron-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import {observer} from 'mobx-react';
import SplashScreen from 'react-native-splash-screen';
import TextCarousel from "react-native-text-carousel";


@observer
export default class Welcome extends Component {


    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }
    }


    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                SplashScreen.hide();
                //UserManagerOffline.retrieveUser(user);

                this.setState({
                    isAuth: true,
                })
            } else {
                SplashScreen.hide();

            }
        })
    }


    render() {
        return (

            <SafeAreaView>


                <ImageBackground source={gymWallpaper} style={{width: '100%', height: '100%'}}>

                    <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around', flex: 1}}>

                        <View style={{flexDirection: 'column', marginLeft: 20, marginTop: height/3}}>

                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.push('Courses')

                                    }}
                                    style={{
                                        marginTop: 20,
                                        borderWidth: 3,
                                        borderColor: '#000000',
                                        alignItems: 'center'
                                    }}>


                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                                        <Text style={{
                                            color:'#000000',
                                            textAlign:'center',
                                            fontSize: 50,
                                            paddingRight: 5,
                                            fontFamily: 'Oswald'
                                        }}>

                                            {'Corsi' + ' '}
                                            <FontAwesome name={'stopwatch'} size={35}/>
                                        </Text>


                                    </View>



                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.push('CardDay')

                                    }}
                                    style={{
                                        marginTop: 20,
                                        borderWidth: 5,
                                        borderColor: '#000000',
                                        alignItems: 'center'
                                    }}>


                                    <Text style={{
                                        color:'#000000',
                                        textAlign:'center',
                                        fontSize: 50,
                                        paddingRight: 5,
                                        paddingLeft: 5,
                                        fontFamily: 'Oswald'
                                    }}>
                                        {'ALLENATI' + ' '}
                                        <FontAwesome name={'dumbbell'} size={45}/>
                                    </Text>


                                </TouchableOpacity>
                            </View>


                        </View>




                    </View>
                </ImageBackground>



            </SafeAreaView>
        );
    }
}


