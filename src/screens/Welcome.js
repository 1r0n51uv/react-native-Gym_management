import React, { Component } from 'react';

import {SafeAreaView, View, Text, Dimensions, TouchableOpacity, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Divider} from 'react-native-paper';
const { height, width } = Dimensions.get("window");
import gymWallpaper from './../assets/wall1.jpeg';
import firebase from "react-native-firebase";
import Reactotron from 'reactotron-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import UserManagerOffline from '../UserManagerOffline';
import {observer} from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';
import SplashScreen from 'react-native-splash-screen';
import * as Animatable from 'react-native-animatable';
import avatar from '../assets/ProfileInfo.png'
import logo from '../assets/Fit&Fightlogo.png'

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

                    <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', flex: 1}}>

                        <Animatable.Image source={logo} animation="pulse" easing="ease-out" iterationCount="infinite" style={{width: 180, height: 180}}/>

                        <View style={{flexDirection: 'column'}}>

                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.push('Courses')

                                    }}
                                    style={{
                                        marginTop: 20,
                                        paddingTop: 20,
                                        paddingBottom: 20,
                                        backgroundColor:'#D8D8D8',
                                        borderRadius: 30,
                                        borderWidth: 1,
                                        borderColor: '#979797',
                                        width: width/2,
                                    }}>


                                    <Text style={{
                                        color:'#000000',
                                        textAlign:'center',
                                        fontSize: 30,
                                    }}>
                                        <FontAwesome name={'stopwatch'} size={25}/>
                                        {' ' + 'Corsi'}</Text>


                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.push('CardDay')

                                    }}
                                    style={{
                                        marginTop: 20,
                                        paddingTop: 20,
                                        paddingBottom: 20,
                                        backgroundColor:'#D8D8D8',
                                        borderRadius: 30,
                                        borderWidth: 1,
                                        borderColor: '#979797',
                                        width: width/2,
                                    }}>


                                    <Text style={{
                                        color:'#000000',
                                        textAlign:'center',
                                        fontSize: 30,
                                    }}>
                                        <FontAwesome name={'dumbbell'} size={25}/>
                                        {' ' + 'Allenati'}</Text>


                                </TouchableOpacity>
                            </View>


                        </View>




                    </View>
                </ImageBackground>



            </SafeAreaView>
        );
    }
}


