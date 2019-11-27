import React, { Component } from 'react';

import {SafeAreaView, View, Text, Dimensions, TouchableOpacity, ImageBackground, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Divider} from 'react-native-paper';
const { height, width } = Dimensions.get("window");
import gymWallpaper from './../assets/590.jpg';
import firebase from "react-native-firebase";
import Reactotron from 'reactotron-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {observer} from 'mobx-react';
import SplashScreen from 'react-native-splash-screen';
import TextCarousel from "react-native-text-carousel";
import {NavigationActions, StackActions} from "react-navigation";

const resetAction = StackActions.reset({
    index: 0,
    isAuth: false,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
    spinner: true
});

@observer
export default class Welcome extends Component {


    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }
        this.retrieveInfo2 = this.retrieveInfo2.bind(this);
        this.logout = this.logout.bind(this);
    }


    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.retrieveInfo2(user);
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

    logout() {
        firebase.auth().signOut().then(value => {
            this.props.navigation.dispatch(resetAction);
        }).catch(err => {
            console.log(err)
        })
    }


    retrieveInfo2(user) {
        firebase.firestore().collection('Users').doc(user.uid).get().then(value => {

        }).catch(err => {
            Reactotron.log(err)
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
                                        borderWidth: 5,
                                        borderColor: '#3F5469',
                                        backgroundColor: '#FFFFFF',
                                        alignItems: 'center',
                                    }}>


                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                                        <Text style={{
                                            color:'#3F5469',
                                            fontSize: width / 9,
                                            paddingRight: width / 17,
                                            paddingLeft: width / 17,
                                            paddingBottom: width / 35,
                                            fontFamily: 'Oswald'

                                        }}>

                                            {'CORSI' + ' '}
                                            <Ionicons name={Platform.OS === 'ios' ? 'ios-timer' : 'md-timer'} size={50} />
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
                                        borderColor: '#3F5469',
                                        backgroundColor: '#FFFFFF',
                                        alignItems: 'flex-start'
                                    }}>


                                    <Text style={{
                                        color:'#3F5469',
                                        textAlign:'left',
                                        fontSize: width / 9,
                                        paddingRight: width / 17,
                                        paddingLeft: width / 17,
                                        paddingBottom: width / 35,
                                        fontFamily: 'Oswald'
                                    }}>
                                        {'ALLENATI' + ' '}
                                        <Ionicons name={Platform.OS === 'ios' ? 'ios-walk' : 'md-walk'} size={50} />
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


