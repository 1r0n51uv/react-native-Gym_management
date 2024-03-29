import React, { Component } from 'react';

import {Text, TouchableOpacity, SafeAreaView, View, StyleSheet, Dimensions, ImageBackground, KeyboardAvoidingView} from 'react-native';
import CardView from 'react-native-cardview'
import { TextInput, Snackbar, Button } from 'react-native-paper';
import firebase from 'react-native-firebase';
const { width, height } = Dimensions.get("window");
import SplashScreen from 'react-native-splash-screen';
import Reactotron from 'reactotron-react-native'
import gymWallpaper from "./../assets/pelo.jpeg";
import logo from "../assets/lastLogo.png";
import * as Animatable from "react-native-animatable";
import Privacy from "./privacy";
import reactotron from "reactotron-react-native";


export default class Login extends Component {
    handleViewRef = ref => this.view = ref;
    bounce = () => this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

    constructor(props) {
        super(props);
        this.unsubscriber = null;
        this.state = {
            email: '',
            password: '',
            isAuth: false,
            em_err: false,
            pas_err: false,
            visible: false,
            login_err: '',
            loading: false,
            check: false,
            terms: false
        };

        this.login = this.login.bind(this);
        this.loginProcedure = this.loginProcedure.bind(this);
        this.parseError = this.parseError.bind(this);
        this.checkActiveAndRedirect = this.checkActiveAndRedirect.bind(this);
        this.checkLoggedUser = this.checkLoggedUser.bind(this);
        this.checkTerms = this.checkTerms.bind(this);

    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.checkLoggedUser(user)
            } else {
                SplashScreen.hide();
                this.setState({
                    isAuth: false
                })
            }
        })
    }

    checkLoggedUser(user) {
        firebase.firestore().collection('Users').doc(user.uid).get().then(value => {
            if (value.data().status) {
                this.setState({isAuth: true});
                this.props.navigation.replace('Welcome')
                SplashScreen.hide();
            } else {
                this.setState({isAuth: false});
                SplashScreen.hide();
            }
        }).catch(err => {
            Reactotron.log(err)
        })
    }


    checkActiveAndRedirect(user) {
        firebase.firestore().collection('Users').doc(user.uid).get().then(value => {
            if (value.data().status) {
                this.setState({isAuth: true});
                this.props.navigation.replace('Welcome')
            } else {
                this.bounce();
                this.setState({loading: false, visible: true, login_err: 'Utente disattivato'})
            }
        }).catch(err => {
            Reactotron.log(err)
        })
    }

    componentWillUnmount() {
        this.setState({
            email: '',
            password: ''
        });
    }

    loginProcedure() {
        this.setState({
            loading: true
        });
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
            this.checkActiveAndRedirect(user.user);
        }).catch(err => {
            Reactotron.log(err);
            this.bounce();
            this.setState({loading: false, visible: true, login_err: this.parseError(err.message)})
        })

    }

    parseError(err) {
        switch (err) {
            case 'auth/invalid-email':
                return 'Email o Password non valida';
            case 'auth/user-not-found':
                return 'Utente non trovato';
            case 'auth/wrong-password':
                return 'Email o Password non valida';
            case 'auth/network-request-failed':
                return 'Connessione non riuscita';
            case 'auth/user-disabled':
                return 'Utente disabilitato';
            case 'auth/unknown':
                return err;
            default:
                return err;
        }
    }

    login() {
        if (this.state.email === '') {
            this.setState({
                em_err: true
            })
        } else if(this.state.password === '') {
            this.setState({
                pas_err: true
            })
        } else {
            this.loginProcedure()
        }


    }

    checkTerms() {

        this.setState({terms: !this.state.terms})


    }


    render() {
        return (
            <SafeAreaView backgroundColor={'#D8D8D8'}>


                { this.state.terms === false && <Privacy
                    returnTerms={this.checkTerms}
                />}

                <KeyboardAvoidingView enabled={true} behavior="position">

                    <ImageBackground source={gymWallpaper} style={{width: '100%', height: '100%'}}>
                        <View style={{flexDirection: 'column', flex: 1,  justifyContent: 'space-around'}}>
                            <Animatable.Image source={logo} animation="pulse" easing="ease-out" iterationCount="infinite" style={{width: width / 2, height: 180, alignSelf: 'center'}}/>

                            <Animatable.View ref={this.handleViewRef}>
                                <CardView
                                    cardElevation={7}
                                    cardMaxElevation={2}
                                    cornerRadius={8}
                                    style={{
                                        marginLeft: 24,
                                        marginRight: 24,
                                        opacity: 0.7,
                                        backgroundColor: 'white'
                                    }}>
                                    <View style={{
                                        padding: 20,
                                    }}>
                                        <TextInput
                                            error={this.state.em_err}
                                            autoCompleteType='email'
                                            mode='outlined'
                                            label='Email'
                                            value={this.state.email}
                                            onChangeText={email => this.setState({ email, em_err: false })}
                                            theme={{
                                                colors: {
                                                    primary: 'black',
                                                }
                                            }}
                                        />
                                        <View style={{marginTop: 10}}/>
                                        <TextInput
                                            secureTextEntry={true}
                                            error={this.state.pas_err}
                                            mode='outlined'
                                            label='Password'
                                            value={this.state.password}
                                            onChangeText={password => this.setState({ password, em_pas: false })}
                                            theme={{
                                                colors: {
                                                    primary: 'black',
                                                }
                                            }}
                                        />

                                        <View style={{width: '50%', alignSelf: 'center', marginTop: 10}}>
                                            <Button
                                                icon='arrow-right-thick'
                                                mode='contained'
                                                dark={true}
                                                compact={true}
                                                loading={this.state.loading}
                                                color={'gray'}
                                                contentStyle={{
                                                    paddingTop: 5,
                                                    paddingBottom: 5,
                                                }}
                                                onPress={() => this.login()}>
                                                Accedi
                                            </Button>
                                        </View>
                                    </View>
                                </CardView>
                            </Animatable.View>

                            <Snackbar visible={this.state.visible}
                                      onDismiss={() => this.setState({ visible: false })}
                                      action={{
                                          label: 'Cancella',
                                          onPress: () => {
                                          },
                                      }}>
                                {this.state.login_err}
                            </Snackbar>
                        </View>

                    </ImageBackground>
                </KeyboardAvoidingView>

            </SafeAreaView>
        );
    }

}
const styles = StyleSheet.create({
    backgroundVideo: {
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    }
});

