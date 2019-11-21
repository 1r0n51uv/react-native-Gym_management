import React, { Component } from 'react';

import {View, Text, ScrollView, SafeAreaView, TouchableOpacity, Platform, Image} from 'react-native';
import {Avatar, Divider, TextInput} from 'react-native-paper';
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
        };

        this.retrieveInfo2 = this.retrieveInfo2.bind(this);
        this.retrieveAnemic = this.retrieveAnemic.bind(this);
        this.retrieveSubscription = this.retrieveSubscription.bind(this);
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
    render() {


        return (
            <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>

                {this.state.userInfo ?

                    (<ScrollView>
                        <View style={{alignSelf: 'center', marginTop: 20}}>
                            <Avatar.Image size={148} source={avatar} />
                        </View>
                        <CardView
                            cardElevation={7}
                            cardMaxElevation={2}
                            style={{
                                marginTop: 20,
                                marginLeft: 24,
                                marginRight: 24,
                                backgroundColor: 'white'
                            }}>

                            <View style={{borderWidth: 5, borderColor: '#000000'}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{marginLeft: 40, marginTop: 10}}>

                                        <TouchableOpacity onPress={() => {this.changeTab(0)}}>
                                            <Ionicons name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} type="FontAwesome" size={40} color={this.state.active === 0 ? '#007AFF' : 'grey'} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{marginTop: 10}}>
                                        <TouchableOpacity onPress={() => {this.changeTab(1)}}>
                                            <Ionicons name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-clipboard'} type="Ionicons" size={40} color={this.state.active === 1 ? '#007AFF' : 'grey'} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{marginRight: 40, marginTop: 10}}>
                                        <TouchableOpacity onPress={() => {this.changeTab(2)}}>
                                            <Ionicons name={Platform.OS === 'ios' ? 'ios-apps' : 'md-apps'} type="Ionicons" size={40} color={this.state.active === 2 ? '#007AFF' : 'grey'} />
                                        </TouchableOpacity>
                                    </View>

                                </View>

                                <View style={{paddingLeft: 15, paddingRight: 15, marginTop: 10}}><Divider/></View>

                                { this.state.active === 0 && <ProfileTabOne userInfo={this.state.userInfo}/>
                                }

                                { this.state.active === 1 && <ProfileTabTwo userAnemic={this.state.anemic}/> }

                                { this.state.active === 2 && <ProfileTabThree navigation={this.props.navigation} userSubscription={this.state.subscription}/> }

                            </View>

                        </CardView>
                        <TouchableOpacity
                            onPress={() => this.logout()}
                            style={{
                                marginTop: 20,
                                borderWidth: 5,
                                borderColor: '#000000',
                                alignItems: 'center',
                                marginRight: 24,
                                alignSelf: 'flex-end',
                            }}>
                            <Text style={{
                                color:'#000000',
                                textAlign:'center',
                                fontSize: 45,
                                paddingRight: 10,
                                paddingLeft: 10,
                                fontFamily: 'Oswald'
                            }}>LOGOUT <Ionicons name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'} size={40} /></Text>
                        </TouchableOpacity>
                    </ScrollView>) :

                    (
                        <Spinner visible={this.state.spinner}/>
                    )

                }
            </SafeAreaView>
        );
    }
}











