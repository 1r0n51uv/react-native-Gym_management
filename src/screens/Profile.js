import React, { Component } from 'react';

import {View, Text, ScrollView, SafeAreaView, TouchableOpacity, Platform, Image} from 'react-native';
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
            userInfo: null
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

                <LinearGradient colors={['#3f5469','#647184', '#888f9f', '#acafba', '#d0d0d7', '#d2cedd', '#d8cbe1', '#e0c7e2', '#d799bd', '#cf6a89', '#bb3b4a', '#980f00'].reverse()} style={{flex: 1}}>
                    {this.state.userInfo ?

                        (<ScrollView>
                            <View style={{alignSelf: 'center', marginTop: 20}}>
                                <UserAvatar size="100" name={this.state.userInfo['name'].toUpperCase() + ' ' + this.state.userInfo['surname'].toUpperCase()} color='#3F5469'/>
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

                                <View style={{borderWidth: 5, borderColor: '#3F5469'}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{marginLeft: 40, marginTop: 10}}>

                                            <TouchableOpacity onPress={() => {this.changeTab(0)}}>
                                                <Ionicons name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} type="FontAwesome" size={40} color={this.state.active === 0 ? '#3F5469' : 'grey'} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{marginTop: 10}}>
                                            <TouchableOpacity onPress={() => {this.changeTab(1)}}>
                                                <Ionicons name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-clipboard'} type="Ionicons" size={40} color={this.state.active === 1 ? '#3F5469' : 'grey'} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{marginRight: 40, marginTop: 10}}>
                                            <TouchableOpacity onPress={() => {this.changeTab(2)}}>
                                                <Ionicons name={Platform.OS === 'ios' ? 'ios-apps' : 'md-apps'} type="Ionicons" size={40} color={this.state.active === 2 ? '#3F5469' : 'grey'} />
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
                </LinearGradient>
            </SafeAreaView>
        );
    }
}











