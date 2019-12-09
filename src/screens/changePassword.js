import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
    Dimensions,
    Platform,
    ImageBackground, KeyboardAvoidingView, Keyboard
} from 'react-native';
import gymWallpaper from "../assets/pelo.jpeg";
import {ModernHeader} from "@freakycoder/react-native-header-view";
import CardView from "react-native-cardview";
import * as Animatable from "react-native-animatable";
import logo from "../assets/lastLogo.png";
import {Button, Snackbar, TextInput} from "react-native-paper";
import firebase from "react-native-firebase";
import SplashScreen from "react-native-splash-screen";
import {ReactotronImpl} from "reactotron-core-client";
const { width, height } = Dimensions.get("window");
import Reactotron from 'reactotron-react-native'


export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pass: '',
            passcheck: '',
            visible: false,
            err: '',
            user: {}
        }

        this.updatePass = this.updatePass.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({user})
            }
        })
    }

    updatePass(user) {
        Keyboard.dismiss();
        if (this.state.pass === this.state.passCheck) {
            user.updatePassword(this.state.pass).then(value => {
                Reactotron.log(value.messageData);
            }).catch(err => {
                if (err.code === undefined) {
                    this.props.navigation.pop();
                }
                this.setState({visible: true, err: this.parseError(err.code)})
            })
        } else {
            this.setState({visible: true, err: 'Le password non coincidono'})

        }
    }

    parseError(err) {
        switch (err) {
            case 'auth/weak-password':
                return 'La password deve essere lunga almeno 8 caratteri';
            default: return err;

        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>


                <ImageBackground source={gymWallpaper} style={{width: '100%', height: '100%'}}>
                    <KeyboardAvoidingView enabled={true} behavior="position">
                        <ModernHeader
                            rightIconName="user"
                            rightIconType="EvilIcons"
                            rightIconSize={45}
                            rightIconOnPress={() => this.props.navigation.navigate('Profile')}
                            rightIconColor='#ffffff'
                            text="FIT&FIGHT"
                            textStyle={{fontSize: 35, color: '#ffffff', fontFamily: 'Oswald'}}
                            leftIconName="arrow-left"
                            leftIconType="EvilIcons"
                            leftIconSize={45}
                            leftIconOnPress={() => {this.props.navigation.pop()}}
                            leftIconColor='#ffffff'
                        />

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

                            <View style={{margin: 10}}>
                                <TextInput
                                    secureTextEntry={true}
                                    mode='outlined'
                                    label='Password'
                                    autoCompleteType='password'
                                    value={this.state.pass}
                                    onChangeText={pass => this.setState({pass})}
                                    theme={{
                                        colors: {
                                            primary: 'black',
                                        }
                                    }}
                                />
                            </View>
                            <View style={{margin: 10}}>
                                <TextInput
                                    secureTextEntry={true}
                                    mode='outlined'
                                    autoCompleteType='password'
                                    label='Ripeti Password'
                                    value={this.state.passCheck}
                                    onChangeText={passCheck => this.setState({passCheck})}
                                    theme={{
                                        colors: {
                                            primary: 'black',
                                        }
                                    }}
                                />
                            </View>

                            <View style={{ width: width / 3, alignSelf: 'flex-end', margin: 10}}>

                                <Button
                                    icon='lock'
                                    mode='contained'
                                    dark={true}
                                    compact={true}
                                    color={'green'}
                                    contentStyle={{
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                    }}
                                    onPress={() => this.updatePass(this.state.user)}>
                                    Salva
                                </Button>

                            </View>

                        </CardView>



                    </KeyboardAvoidingView>


                    <Snackbar visible={this.state.visible}
                              onDismiss={() => this.setState({ visible: false })}
                              action={{
                                  label: 'Cancella',
                                  onPress: () => {
                                  },
                              }}>
                        {this.state.err}
                    </Snackbar>

                </ImageBackground>





            </SafeAreaView>
        );
    }
}

