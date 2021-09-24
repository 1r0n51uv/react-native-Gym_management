import React, { Component } from 'react';
import {
    View,
    Dimensions,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    Image,
    ImageBackground,
    Text
} from 'react-native';
import {Avatar, Button, Divider, TextInput} from 'react-native-paper';
import avatar from './../assets/ProfileInfo.png'
import CardView from 'react-native-cardview'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileTabOne from '../components/profile/ProfileTabOne';
import ProfileTabTwo from '../components/profile/ProfileTabTwo';
import ProfileTabThree from '../components/profile/ProfileTabThree';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import CounterStore from '../UserManagerOffline';
import Reactotron from 'reactotron-react-native'
import UserAvatar from "react-native-user-avatar";
import LinearGradient from "react-native-linear-gradient";
import gymWallpaper from "../assets/pelo.jpeg";
import {ModernHeader} from "@freakycoder/react-native-header-view";
import styles from './../assets/styles'


const resetAction = StackActions.reset({
    index: 0,
    isAuth: false,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
    spinner: true
});

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            user: null,
            spinner: true,
            anemic: null,
            subscription: null,
            userInfo: null,
            anemicID: null
        };

        this.retrieveInfo2 = this.retrieveInfo2.bind(this);
        this.retrieveAnemic = this.retrieveAnemic.bind(this);
        this.retrieveSubscription = this.retrieveSubscription.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.retrieveInfo2(user);
            } else {
                this.setState({
                    isAuth: true
                })
            }
        })
    }

    retrieveInfo2(user) {
        firebase.firestore().collection('Users').doc(user.uid).get().then(value => {
            this.setState({
                id: value.id,
                userInfo: value.data(),
                spinner: false
            })

        }).then(() => {
            this.retrieveAnemic();
        }).then(() => {
            this.retrieveSubscription();
        })
    }



    retrieveAnemic() {
        firebase.firestore().collection('MedicalHistory').where('idUserDatabase', '==', this.state.id).get().then(value => {


            this.setState({
                anemic: value.docs[0].data(),
                anemicID: value.docs[0].id,
                spinner: false,

            }).catch(err => {
                console.log(err)
            });



        }).catch(e => {
            console.log(e);
        })
    }

    retrieveSubscription() {
        firebase.firestore().collection('Subscriptions').where('idUserDatabase', '==', this.state.id).get().then(value => {
            this.setState({
                subscription: value.docs[0].data(),
                spinner: false
            })
        }).catch(e => {
            Reactotron.log(e);
        })
    }



    componentWillUnmount() {
        this.setState({
            spinner: false
        })
    }

    changeTab(val) {
        this.setState({
            active: val
        })
    }


    logout() {
        firebase.auth().signOut().then(value => {
            this.props.navigation.dispatch(resetAction);
        }).catch(err => {
            console.log(err)
        })
    }

    changePassword() {
        this.props.navigation.navigate('ChangePassword');
    }



    render() {


        return (
            <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>

                <ImageBackground source={gymWallpaper} style={{width: '100%', height: '100%'}}>

                    <ModernHeader
                        rightDisable={true}
                        text="PROFIL0"
                        textStyle={{fontSize: 35, color: '#ffffff', fontFamily: 'Oswald'}}
                        leftIconName="arrow-left"
                        leftIconType="EvilIcons"
                        leftIconSize={45}
                        leftIconOnPress={() => this.props.navigation.pop()}
                        leftIconColor='#ffffff'
                        backgroundColor="#000000"
                    />

                {this.state.userInfo ?

                        (<ScrollView>
                            <View style={{alignSelf: 'center', marginTop: 20}}>
                                <UserAvatar size="100" name={this.state.userInfo['name'].toUpperCase() + ' ' + this.state.userInfo['surname'].toUpperCase()} color='black'/>
                            </View>
                            <CardView
                                cardElevation={7}
                                cardMaxElevation={2}
                                cornerRadius={8}
                                style={{
                                    marginTop: 20,
                                    marginLeft: 24,
                                    marginRight: 24,
                                    backgroundColor: 'white',
                                    opacity: 0.8
                                }}>

                                <View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{marginLeft: 40, marginTop: 10}}>

                                            <TouchableOpacity onPress={() => {this.changeTab(0)}}>
                                                <Ionicons name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} type="FontAwesome" size={40} color={this.state.active === 0 ? styles.textColor : 'grey'} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{marginTop: 10}}>
                                            <TouchableOpacity onPress={() => {this.changeTab(1)}}>
                                                <Ionicons name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-clipboard'} type="Ionicons" size={40} color={this.state.active === 1 ? styles.textColor : 'grey'} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{marginRight: 40, marginTop: 10}}>
                                            <TouchableOpacity onPress={() => {this.changeTab(2)}}>
                                                <Ionicons name={Platform.OS === 'ios' ? 'ios-apps' : 'md-apps'} type="Ionicons" size={40} color={this.state.active === 2 ? styles.textColor : 'grey'} />
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                    <View style={{paddingLeft: 15, paddingRight: 15, marginTop: 10}}><Divider/></View>

                                    { this.state.active === 0 && <ProfileTabOne changePassword={() => this.changePassword()} userInfo={this.state.userInfo}/>
                                    }

                                    { this.state.active === 1 && <ProfileTabTwo userAnemic={this.state.anemic} anemicID={this.state.anemicID}/> }

                                    { this.state.active === 2 && <ProfileTabThree navigation={this.props.navigation} userSubscription={this.state.subscription}/> }

                                </View>

                            </CardView>

                            <View
                                style={{
                                    marginTop: 20,
                                    alignItems: 'center',
                                    marginRight: 24,
                                    alignSelf: 'flex-end',
                                    marginBottom: 10
                                }}>
                                <Button
                                    mode='contained'
                                    dark={true}
                                    compact={true}
                                    loading={this.state.loading}
                                    style={{borderRadius: 10, opacity: 0.9}}
                                    color={'#980f00'}
                                    contentStyle={{
                                        padding: 10
                                    }}
                                    onPress={() => this.logout()}>
                                    Logout <Ionicons name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'} style={{color: 'white'}} size={15} />
                                </Button>
                            </View>
                        </ScrollView>) :

                        (
                            <Spinner visible={this.state.spinner}/>
                        )

                    }
                </ImageBackground>
            </SafeAreaView>
        );
    }
}











