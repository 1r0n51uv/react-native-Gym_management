import React, { Component } from 'react';

import {SafeAreaView, View, Text, Dimensions, TouchableOpacity, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Divider} from 'react-native-paper';
const { height, width } = Dimensions.get("window");
import gymWallpaper from './../assets/gym-workout-wallpaper.jpg';
import firebase from "react-native-firebase";
import Reactotron from 'reactotron-react-native';
import UserManagerOffline from '../UserManagerOffline';
import {observer} from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';
import SplashScreen from 'react-native-splash-screen';


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

                    <View style={{alignSelf: 'center', paddingLeft: 50, paddingRight: 50}}>

                    </View>

                    <View style={{paddingLeft: 20, paddingRight: 20}}>
                        <Divider/>
                    </View>
                    <View>



                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.push('TrainOrCourse')

                            }}
                            style={{
                                marginTop: 100,
                                paddingTop: 20,
                                paddingBottom: 20,
                                backgroundColor:'#D8D8D8',
                                borderRadius: 30,
                                borderWidth: 1,
                                borderColor: '#979797',
                                width: width/2,
                                alignSelf: 'center'
                            }}>


                            {Reactotron.log(UserManagerOffline.userSubscription)}

                            <Text style={{
                                color:'#000000',
                                textAlign:'center',
                                fontSize: 20
                            }}>Allenati</Text>


                        </TouchableOpacity>
                    </View>
                </ImageBackground>



            </SafeAreaView>
        );
    }
}


