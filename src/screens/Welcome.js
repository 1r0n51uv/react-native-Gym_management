import React, { Component } from 'react';

import {SafeAreaView, View, Text, Dimensions, TouchableOpacity, ImageBackground, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Divider} from 'react-native-paper';
const { height, width } = Dimensions.get("window");
import gymWallpaper from './../assets/pelo.jpeg';
import firebase from "react-native-firebase";
import Reactotron from 'reactotron-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {observer} from 'mobx-react';
import SplashScreen from 'react-native-splash-screen';
import TextCarousel from "react-native-text-carousel";
import {NavigationActions, StackActions} from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import WelcomeMotivational from "../components/welcome/welcomeMotivational";
import * as Animatable from 'react-native-animatable';
import styles from './../assets/styles'
import {ModernHeader} from "@freakycoder/react-native-header-view";




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

            <SafeAreaView style={{flex: 1}}>

                <ImageBackground source={gymWallpaper} style={{width: '100%', height: '100%'}}>

                    <ModernHeader
                        leftDisable={true}
                        rightIconName="user"
                        rightIconType="EvilIcons"
                        rightIconSize={45}
                        rightIconOnPress={() => this.props.navigation.navigate('Profile')}
                        rightIconColor='#ffffff'
                        text="FIT&FIGHT"
                        textStyle={{fontSize: 35, color: '#ffffff', fontFamily: 'Oswald'}}
                    />

                    <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', flex: 1}}>


                        <WelcomeMotivational
                            phrases={['Il nostro compito nella vita non è superare gli altri ma superare noi stessi',
                                'Non aspettare il momento giusto per fare le cose, l’unico momento giusto è adesso',
                                'Il vero fallimento è rinunciare']}
                        />

                        <View style={{flexDirection: 'column', marginLeft: 20, opacity: 0.7}}>


                            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" >

                                <Animatable.View animation="fadeInLeftBig" >


                                    <View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.push('CardDay')

                                            }}
                                            style={{
                                                marginTop: 20,
                                                borderRadius: 10,
                                                backgroundColor: 'white',
                                                alignItems: 'center',
                                            }}>


                                            <Text style={{
                                                color: styles.textColor,
                                                textAlign:'left',
                                                fontSize: width / 8,
                                                paddingRight: width / 17,
                                                paddingLeft: width / 17,
                                                paddingBottom: width / 35,
                                                fontFamily: 'Oswald'
                                            }}>
                                                {'ALLENATI' + ' '}
                                                <Ionicons name={Platform.OS === 'ios' ? 'ios-walk' : 'md-walk'} size={width / 8} />
                                            </Text>


                                        </TouchableOpacity>
                                    </View>
                                </Animatable.View>
                            </Animatable.View>

                            <Animatable.View animation="pulse" easing="ease-in" iterationCount="infinite" >
                                <Animatable.View animation="fadeInRightBig">
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.push('Courses')
                                            }}
                                            style={{
                                                marginTop: 20,
                                                borderRadius: 10,
                                                backgroundColor: 'black',
                                                alignItems: 'center',
                                            }}>


                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>


                                                <Text style={{
                                                    color: styles.subtitle,
                                                    fontSize: width / 8,
                                                    paddingRight: width / 17,
                                                    paddingLeft: width / 17,
                                                    paddingBottom: width / 35,
                                                    fontFamily: 'Oswald'

                                                }}>

                                                    {'CORSI' + ' '}
                                                    <Ionicons name={Platform.OS === 'ios' ? 'ios-timer' : 'md-timer'} size={width / 8} />
                                                </Text>

                                            </View>

                                        </TouchableOpacity>
                                    </View>
                                </Animatable.View>
                            </Animatable.View>



                        </View>
                    </View>


                </ImageBackground>

            </SafeAreaView>
        );
    }
}


