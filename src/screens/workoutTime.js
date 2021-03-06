import React, { Component } from 'react';

import {Button, SafeAreaView, Image, Text, TouchableOpacity, View, Dimensions, Easing, ScrollView, Platform, ImageBackground} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {ModernHeader} from '@freakycoder/react-native-header-view';
import {Card, Divider} from 'react-native-paper';
import CardView from 'react-native-cardview';
const { height, width } = Dimensions.get("window");
import Reactotron from 'reactotron-react-native'
import DescriptionAndLink from "../components/workouts/descriptionAndLink";
import gymWallpaper from "../assets/pelo.jpeg";
import * as Animatable from "react-native-animatable";
import reactotron from "reactotron-react-native";

const timer = require('react-native-timer');

const Sound = require('react-native-sound');



export default class WorkoutTime extends Component {

    constructor(props) {
        console.ignoredYellowBox = ['Setting a timer'];
        super(props);
        this.state = {
            ...this.props.navigation.getParam('workout'), //Props derivati da navigation
            snapshot: {
                ...this.props.navigation.getParam('workout'), //Props derivati da navigation (startingpoint)
            },
            animationFill: 0, //STARTING ANIMATION POINT
            workOrRest: true, //WORK OR REST
            progressColor: 'gray', //PROGRESS COLOR
            timeOrAction: false, //SHOW ACTION OR TIMEOUT
            paused: false, //PAUSE CHRONO
            isWorking: false, //CHRONO IS ACTIVE
            doneWorkout: false, //WORKOUT IS DONE
            circularProgressAction: 'Inizia', //ACTION
            restSeries: 0,
            size: 180
        };

        this.setWorkoutDone = this.setWorkoutDone.bind(this);
        this.startWorkouTimer = this.startWorkouTimer.bind(this);
        this.stopWorkouTimer = this.stopWorkouTimer.bind(this);
        this.startRestTimer = this.startRestTimer.bind(this);
        this.stopRestTimer = this.stopRestTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.navigateBack = this.navigateBack.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.work.sec === 0) {

            if (prevState.work.min === 0 || prevState.work.min === '0' || prevState.work.min === '00') {
                this.stopWorkouTimer();
            }

            this.setState({
                work: {
                    min: this.state.work.min - 1,
                    sec: 60
                }
            })
        }

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


    startWorkouTimer() {
        if (this.state.work.sec === 0 || this.state.work.sec === '0' || this.state.work.sec === '00') {

            this.setState({
                work: {
                    min: this.state.work.min - 1,
                    sec: 60
                }
            })

        }

        timer.clearTimeout(this);
        this.setState({
            timeOrAction: true,
            progressColor: 'gray',
            paused: false
        });
        timer.setInterval(this, 'workCounter', () => {
            this.setState({
                work: {
                    min: this.state.work.min,
                    sec: this.state.work.sec - 1
                }
            })
        }, 1000);

        this.circularProgress.animate(100, (this.state.work.min * 60 * 1000) +
            (this.state.work.sec * 1000), Easing.linear);


    }

    pauseTimer() {
        this.setState({
            paused: true
        });

        timer.clearInterval(this);

        this.circularProgress.animate().stop();
    }


    stopWorkouTimer() {

        const sound = new Sound('clock.mp3',
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
        });
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
        }, 3000);
        this.setState({numberOfSeries: this.state.numberOfSeries - 1})
        this.circularProgress.animate(0, 3000, Easing.linear);

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

        const sound = new Sound('clock.mp3',
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
                work: {
                    min: this.state.snapshot.work.min,
                    sec: this.state.snapshot.work.sec
                }
            });
            if (this.state.restSeries === 0 && this.state.numberOfSeries === 0) {
                this.setWorkoutDone();
            } else {
                Reactotron.log(this.state.restSeries + ' ' + this.state.numberOfSeries);
            }}, 3000);

        this.circularProgress.animate(0, 3000, Easing.linear);


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
            work: this.state.snapshot.work,
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
        if (this.state.work.sec === 0 || this.state.work.sec === '0' || this.state.work.sec === '00') {

            this.setState({
                work: {
                    min: this.state.work.min - 1,
                    sec: 60
                }
            })

        }

        if (this.state.rest.sec === 0 || this.state.rest.sec === '0' || this.state.rest.sec === '00') {
            Reactotron.log(this.state.rest);

            this.setState({
                rest: {
                    min: this.state.rest.min - 1,
                    sec: 60
                }
            })
        }

        Reactotron.log(this.state.rest);
        this.setState({
            restSeries: this.state.numberOfSeries
        })

    }


    render() {
        return (

            <SafeAreaView style={{flex: 1}}>

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
                                this.props.navigation.pop();
                        }}
                        leftIconColor='#ffffff'
                    />





                    <ScrollView>


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
                                    <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                        <Text style={{fontFamily: 'Oswald', fontSize: 25, color: 'black'}}>Ripetizioni:</Text>
                                        <Text style={{fontFamily: 'Oswald', fontSize: 25}}>{this.state.numberOfSeries}</Text>
                                    </View>

                                    <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                        <Text style={{fontFamily: 'Oswald', fontSize: 25, color: 'black'}}>Riposo:</Text>
                                        <Text style={{fontFamily: 'Oswald', fontSize: 25}}>{this.state.snapshot.work.min + 'm' +

                                        ((this.state.snapshot.work.sec !== 0 ||
                                            this.state.snapshot.work.sec !== '0' ||
                                            this.state.snapshot.work.sec !== '00') ? ('') : (this.state.snapshot.work.sec + 's'))}</Text>

                                    </View>

                                    <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                        <Text style={{fontFamily: 'Oswald', fontSize: 25, color: 'black'}}>Lavoro:</Text>
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
                                                                <Text style={{fontSize: 35, color: '#4CD964', fontFamily: 'Oswald'}} >{this.state.circularProgressAction}</Text>
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

                                                                            <View>

                                                                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                                                                    <Text style={{fontSize: 35}}>
                                                                                        {this.state.work.min + ':' + this.state.work.sec}
                                                                                    </Text>
                                                                                </View>

                                                                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'space-between', marginTop: 10}}>

                                                                                    {/* Pause/Resume Icon*/}
                                                                                    <TouchableOpacity onPress={() => {
                                                                                        this.state.paused ? this.startWorkouTimer() : this.pauseTimer()
                                                                                    }}>
                                                                                        <Fontisto style={{alignSelf: 'center', justifyContent: 'center'}} size={30} name={this.state.paused ? 'play' : 'pause'}/>
                                                                                    </TouchableOpacity>

                                                                                    {/* Pause/Resume Icon*/}
                                                                                    <TouchableOpacity onPress={() => this.resetTimer()}>
                                                                                        <Fontisto style={{alignSelf: 'center', justifyContent: 'center', marginLeft: 20}} size={30} name={'redo'}/>
                                                                                    </TouchableOpacity>

                                                                                </View>

                                                                            </View>

                                                                        )

                                                                        :

                                                                        //IF FALSE RENDER ACTION
                                                                        (
                                                                            <TouchableOpacity onPress={() => {
                                                                                this.startWorkouTimer()
                                                                            }}>
                                                                                <Text style={{fontSize: 35, fontFamily: 'Oswald'}}>
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

                                                                            <Text style={{fontSize: 35, fontFamily: 'Oswald'}}>
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
                    </ScrollView>

                </ImageBackground>

            </SafeAreaView>
        );
    }
}
