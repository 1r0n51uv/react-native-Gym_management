import React, { Component } from 'react';

import {Button, SafeAreaView, Image, Text, TouchableOpacity, View, Dimensions, Easing, ScrollView, Platform, ImageBackground, Linking} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Divider, TextInput} from "react-native-paper";
import firebase from 'react-native-firebase';
import Sound from 'react-native-sound';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {ModernHeader} from '@freakycoder/react-native-header-view';
import CardView from 'react-native-cardview';
const { height, width } = Dimensions.get("window");
import Reactotron from 'reactotron-react-native'
import DescriptionAndLink from "../components/workouts/descriptionAndLink";
import gymWallpaper from "../assets/pelo.jpeg";
import * as Animatable from 'react-native-animatable';
import Spinner from "react-native-loading-spinner-overlay";
import reactotron from "reactotron-react-native";

const timer = require('react-native-timer');




export default class WorkoutWeight extends Component {


    constructor(props) {
        console.ignoredYellowBox = ['Setting a timer'];
        super(props);
        this.state = {
            ...this.props.navigation.getParam('workout'), //Props derivati da navigation
            snapshot: {
                ...this.props.navigation.getParam('workout'), //Props derivati da navigation (startingpoint)
            },
            work: {
                min: 0,
                sec: 0
            },
            animationFill: 0, //STARTING ANIMATION POINT
            workOrRest: true, //WORK OR REST
            progressColor: '#00e0ff', //PROGRESS COLOR
            timeOrAction: false, //SHOW ACTION OR TIMEOUT
            paused: false, //PAUSE CHRONO
            isWorking: false, //CHRONO IS ACTIVE
            doneWorkout: false, //WORKOUT IS DONE
            circularProgressAction: 'Inizia', //ACTION
            restSeries: 0,
            size: 180,
            tmpCard: [],
            textShow: false,
            spinner: false,
            toRedid: false,

        };

        this.setWorkoutDone = this.setWorkoutDone.bind(this);
        this.startRestTimer = this.startRestTimer.bind(this);
        this.stopRestTimer = this.stopRestTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.navigateBack = this.navigateBack.bind(this);
        this.startWorkout = this.startWorkout.bind(this);
        this.stopWorkouTimer = this.stopWorkouTimer.bind(this);

    }



    updateWeight = () => {
        this.setState({
            spinner: true
        }, () => {
            firebase.firestore().collection('TrainingCards').doc(this.props.navigation.getParam('idCard')).get().then(card => {
                let tmpCard = card.data();
                tmpCard.exercises.map(val => {
                    if ((val.name === this.state.name) && this.state.weight > 1) {
                        val.weight = this.state.weight;
                    }
                });
                firebase.firestore().collection('TrainingCards').doc(this.props.navigation.getParam('idCard')).set(tmpCard).then(() => {
                    this.setState({
                        spinner: false,
                        toRedir: true
                    }, () => {
                        reactotron.log('updated')
                    })
                }).catch(err => {
                    Reactotron.log(err);
                })
            }).catch(err => {
                Reactotron.log(err);
            })
        });


    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevState.rest.sec === 1) {
            if (prevState.rest.min === 0 || prevState.rest.min === '0' || prevState.rest.min === '00') {
                this.stopRestTimer();
            }
            this.setState({
                rest: {
                    min: this.state.rest.min - 1,
                    sec: 60
                }
            })
        }

    }


    startWorkout = () => {

        this.setState({
            timeOrAction: true,
            circularProgressAction: 'Allenati',
            progressColor: '#4CD964'
        })
        this.circularProgress.animate(100, 1000, Easing.linear);
    }

    startRestTimer() {
        if (this.state.rest.sec === 0 || this.state.rest.sec === '0' || this.state.rest.sec === '00') {
            Reactotron.log(this.state.rest);

            this.setState({
                rest: {
                    min: this.state.rest.min - 1,
                    sec: 60
                }
            })
        }
        timer.clearTimeout(this);
        this.setState({timeOrAction: true, progressColor: '#FCD533'});


        timer.setInterval(this, 'restCounter', () => {
            this.setState({
                rest: {
                    min: this.state.rest.min,
                    sec: this.state.rest.sec - 1
                }
            })
        }, 1000);


        this.circularProgress.animate(100, (this.state.rest.min * 60 * 1000) +
            (this.state.rest.sec * 1000), Easing.linear);

    }

    stopRestTimer() {

        const sound = new Sound('https://fitandfight.it/ding.mp3',
            undefined,
            error => {
                if (error) {
                    reactotron.log(error)
                } else {
                    reactotron.log("Playing sound");
                    sound.play(() => {
                        // Release when it's done so we're not using up resources
                        sound.release();
                    });
                }
            });

        this.setState({
            timeOrAction: false,
            progressColor: '#4CD964',
            circularProgressAction: this.state.numberOfSeries === 0 ? 'Fine' : 'Allenati',
            restSeries: this.state.restSeries - 1
        });
        timer.clearInterval(this);
        timer.setTimeout(this, 'restCounter', () => {
            this.setState({
                workOrRest: true,
            });
            if (this.state.restSeries === 0 && this.state.numberOfSeries === 0) {
                this.setWorkoutDone();
            } else {
                Reactotron.log(this.state.restSeries + ' ' + this.state.numberOfSeries);
            }}, 2000);

        this.circularProgress.animate(0, 2000, Easing.linear);


    }



    stopWorkouTimer() {


        const sound = new Sound('ding.mp3',
            undefined,
            error => {
                if (error) {
                    reactotron.log(error)
                    reactotron.log("hey")
                } else {
                    reactotron.log("Playing sound");
                    sound.play(() => {
                        // Release when it's done so we're not using up resources
                        sound.release();

                    });
                }
            });

        this.setState({
            timeOrAction: false,
            progressColor: '#4CD964',
            circularProgressAction: 'Riposo',
        }, () => {

        }) ;
        timer.clearInterval(this);
        timer.setTimeout(this, 'workCounter', () => {
            this.setState({
                workOrRest: false,
                rest: {
                    min: this.state.snapshot.rest.min,
                    sec: this.state.snapshot.rest.sec
                }
            });
            this.startRestTimer();
        }, 2000);
        this.setState({numberOfSeries: this.state.numberOfSeries - 1});

        this.circularProgress.animate(0, 2000, Easing.linear);

    }


//SET ENVIROMENT TO END WORKOUT
    setWorkoutDone() {

        this.setState({
            doneWorkout: true,
            progressColor: '#4CD964',
            circularProgressAction: 'Avanti'
        });
        Reactotron.log('end');
        this.circularProgress.animate(100, 0, Easing.linear)

    }



    resetTimer() {
        this.pauseTimer();
        this.circularProgress.animate(0,0,Easing.linear);
        this.setState({
            rest: this.state.snapshot.rest,
            timeOrAction: false
        })
    }


    navigateBack() {
        this.props.navigation.state.params.returnData(this.props.navigation.getParam('workID'), true);
        this.props.navigation.pop();
    }

    componentWillUnmount() {

        clearInterval(this);
        clearTimeout(this);
        this.circularProgress.animate().stop();
    }

    componentDidMount() {

        if(this.state.weight != 0) {
            this.setState({
                textShow: true
            })
        }



        this.setState({
            restSeries: this.state.numberOfSeries,
        })
    }



    playSound = () => {

    }



    render() {
        return (

            <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>

                <ImageBackground source={gymWallpaper} style={{width: '100%', height: '100%'}}>


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
                        leftIconOnPress={() => {
                            this.state.doneWorkout ? (this.navigateBack())
                                :
                                this.state.toRedir ? (this.props.navigation.navigate('StartWorkout', {dayer: this.props.navigation.getParam('day2')}))
                                    :
                                    (this.props.navigation.pop())
                        }}
                        leftIconColor='#ffffff'
                    />


                    <ScrollView>

                        {this.state.spinner ? (<Spinner visible={this.state.spinner}/>) :

                            <View>
                                <Animatable.View animation="fadeIn" >
                                    <CardView
                                        cardElevation={7}
                                        cardMaxElevation={2}
                                        cornerRadius={8}

                                        style={{
                                            marginLeft: 24,
                                            marginRight: 24,
                                            marginTop: 10,
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            backgroundColor: 'white',
                                            opacity: 0.7
                                        }}>

                                        <View>

                                            <View>
                                                <Text style={{
                                                    color: 'black',
                                                    fontFamily: 'Oswald',
                                                    fontSize: width / 12,
                                                    alignSelf: 'center',
                                                    paddingRight: 10,
                                                    paddingLeft: 10,
                                                    paddingBottom: 10
                                                }}>{this.state.name}</Text>

                                                <View>
                                                    <Divider style={{height: 3, backgroundColor: 'black'}}/>
                                                </View>
                                            </View>

                                            <View style={{backgroundColor: '#EFF0F0'}}>
                                                <ImageBackground resizeMode={'contain'} source={{uri: this.state.gif}} style={{width: '100%', height: height/3.8}}/>
                                            </View>

                                            <View style={{ flexDirection: 'column' }}>


                                                {
                                                    this.state.textShow ?
                                                        (<View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                                            <Text style={{fontFamily: 'Oswald', fontSize: 25, color: 'black'}}>Peso:</Text>


                                                            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>





                                                                <TextInput
                                                                    onBlur={() => this.updateWeight()}
                                                                    onSubmitEditing={() => this.updateWeight()}
                                                                    keyboardType={'number-pad'}
                                                                    mode='outlined'
                                                                    width={width / 6}
                                                                    onFocus={() => this.setState({weight: null})}
                                                                    value={this.state.weight}
                                                                    placeholder={this.state.weight}
                                                                    onChangeText={weight => this.setState({ weight })}
                                                                    theme={{
                                                                        colors: {
                                                                            primary: 'black',
                                                                        }
                                                                    }}
                                                                />

                                                            </View>


                                                        </View>) : (<View/>)}


                                                <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                                    <Text style={{fontFamily: 'Oswald', fontSize: 25, color: 'black'}}>Serie:</Text>
                                                    <Text style={{fontFamily: 'Oswald', fontSize: 25}}>{this.state.numberOfSeries}</Text>
                                                </View>

                                                <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                                    <Text style={{fontFamily: 'Oswald', fontSize: 25, color: 'black'}}>Ripetizioni:</Text>
                                                    <Text style={{fontFamily: 'Oswald', fontSize: 25}}>{this.state.numberOfRepetitions}</Text>
                                                </View>

                                                <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                                    <Text style={{fontFamily: 'Oswald', fontSize: 25, color: 'black'}}>Riposo:</Text>
                                                    <Text style={{fontFamily: 'Oswald', fontSize: 25}}>{this.state.snapshot.rest.min + 'm' +

                                                    ((this.state.snapshot.rest.sec !== 0 ||
                                                        this.state.snapshot.rest.sec !== '0' ||
                                                        this.state.snapshot.rest.sec !== '00') ? (' ' + this.state.snapshot.rest.sec + 's') : (''))}</Text>

                                                </View>
                                            </View>

                                            <View style={{flexDirection: 'column', justifyContent:'center', padding: 10}}>


                                                <AnimatedCircularProgress
                                                    ref={(ref) => this.circularProgress = ref}
                                                    size={this.state.size}
                                                    width={30}
                                                    rotation={0}
                                                    fill={this.state.doneWorkout ? 100 : this.state.animationFill}
                                                    backgroundColor={'#FFFFFF'}
                                                    tintColor={this.state.doneWorkout ? '#4CD964' : this.state.progressColor }
                                                    style={{alignSelf:'center'}}>
                                                    {
                                                        (fill) => (

                                                            //CHECK IF WORKOUT IS DONE

                                                            this.state.doneWorkout ?


                                                                (
                                                                    //IF TRUE RENDER COMPLETED CIRCULAR PROGRESS GO AHEAD

                                                                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                                                        <TouchableOpacity onPress={() => {
                                                                            this.navigateBack();
                                                                        }}>
                                                                            <Text style={{fontSize: 35, color: '#4CD964', fontFamily: 'Oswald' }} >{this.state.circularProgressAction}</Text>
                                                                            <Fontisto style={{alignSelf: 'center', justifyContent: 'center', marginTop: 10, color: '#4CD964'}} size={30} name={'angle-dobule-right'}/>

                                                                        </TouchableOpacity>
                                                                    </View>

                                                                ) :

                                                                (
                                                                    //IF FALSE, CHECK IF RENDER WORK OR REST CIRCULAR PROGRESS

                                                                    this.state.workOrRest ?

                                                                        (
                                                                            //IF TRUE, RENDER WORKOUT CIRCULAR PROGRESS
                                                                            <View style={{alignItems: 'center', justifyContent: 'center'}}>


                                                                                {/* CHECK IF RENDER TIMER OR ACTION*/}
                                                                                {this.state.timeOrAction ?

                                                                                    //IF TRUE RENDER TIMER
                                                                                    (
                                                                                        <TouchableOpacity onPress={() => {
                                                                                            this.stopWorkouTimer()
                                                                                        }}>
                                                                                            <Text style={{fontSize: 35, color: 'black', fontFamily: 'Oswald' }}>
                                                                                                {this.state.circularProgressAction}
                                                                                            </Text>
                                                                                        </TouchableOpacity>
                                                                                    )

                                                                                    :

                                                                                    //IF FALSE RENDER ACTION
                                                                                    (
                                                                                        <TouchableOpacity onPress={() => {
                                                                                            this.startWorkout()
                                                                                        }}>

                                                                                            <Text style={{fontSize: 35, color: 'black', fontFamily: 'Oswald' }}>
                                                                                                {this.state.circularProgressAction}
                                                                                            </Text>

                                                                                            {
                                                                                                this.state.circularProgressAction === 'Allenati' ?
                                                                                                    (<Fontisto style={{alignSelf: 'center', justifyContent: 'center', marginTop: 10}} size={30} name={'play'}/>)
                                                                                                    :
                                                                                                    (<View/>)
                                                                                            }

                                                                                        </TouchableOpacity>
                                                                                    )

                                                                                }


                                                                            </View>
                                                                        )

                                                                        :

                                                                        (
                                                                            //IF FALSE, RENDER REST CIRCULAR PROGRESS
                                                                            <View style={{alignItems: 'center', justifyContent: 'center'}}>


                                                                                {/* CHECK IF RENDER TIMER OR ACTION*/}
                                                                                {this.state.timeOrAction ?

                                                                                    //IF TRUE RENDER TIMER
                                                                                    (

                                                                                        <Text style={{fontSize: 35}}>
                                                                                            {this.state.rest.min + ':' + this.state.rest.sec}
                                                                                        </Text>

                                                                                    )

                                                                                    :

                                                                                    //IF FALSE RENDER ACTION
                                                                                    (

                                                                                        <Text style={{fontSize: 35}}>
                                                                                            {this.state.circularProgressAction}
                                                                                        </Text>
                                                                                    )
                                                                                }


                                                                            </View>

                                                                        )

                                                                )

                                                        )
                                                    }

                                                </AnimatedCircularProgress>



                                            </View>
                                        </View>

                                    </CardView>
                                </Animatable.View>


                                <DescriptionAndLink
                                    description={this.state.description}
                                    link={this.state.link}
                                />
                            </View>
                        }

                    </ScrollView>

                </ImageBackground>
            </SafeAreaView>
        );
    }
}
