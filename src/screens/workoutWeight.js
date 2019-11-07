import React, { Component } from 'react';

import {Button, SafeAreaView, Image, Text, TouchableOpacity, View, Dimensions, Easing, ScrollView, Platform, ImageBackground} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ModernHeader} from '@freakycoder/react-native-header-view';
import CardView from 'react-native-cardview';
const { height, width } = Dimensions.get("window");
import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-community/async-storage';

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
            size: 150
        };

        this.setWorkoutDone = this.setWorkoutDone.bind(this);
        this.startRestTimer = this.startRestTimer.bind(this);
        this.stopRestTimer = this.stopRestTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.navigateBack = this.navigateBack.bind(this);
        this.startWorkout = this.startWorkout.bind(this);
        this.stopWorkouTimer = this.stopWorkouTimer.bind(this);

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
        this.circularProgress.animate(100, 1000, Easing.quad);
    }

    startRestTimer() {
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
            (this.state.rest.sec * 1000), Easing.quad);

    }

    stopRestTimer() {

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

        this.circularProgress.animate(0, 2000, Easing.quad);


    }




//SET ENVIROMENT TO END WORKOUT
    setWorkoutDone() {
        this.setState({
            doneWorkout: true,
            progressColor: '#4CD964',
            circularProgressAction: 'Avanti'
        });
        Reactotron.log('end');
        this.circularProgress.animate(100, 0, Easing.quad)

    }



    resetTimer() {
        this.pauseTimer();
        this.circularProgress.animate(0,0,Easing.quad);
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
        this.setState({
            restSeries: this.state.numberOfSeries,
        })
    }

    stopWorkouTimer() {
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
        }, 2000);
        this.setState({numberOfSeries: this.state.numberOfSeries - 1});
        this.circularProgress.animate(0, 2000, Easing.quad);

    }


    render() {
        return (

            <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
                <ModernHeader
                    backgroundColor={'black'}
                    leftIconComponent={
                        <TouchableOpacity
                            onPress={() => {
                                this.state.doneWorkout ? (this.navigateBack())
                                    :
                                    this.props.navigation.pop();
                            }}>
                            <Text style={{color: 'white', fontSize: 20, marginLeft: 5}}>
                                <AntDesign name="left" type="AntDesign" size={20} color='white' />Indietro</Text>
                        </TouchableOpacity>
                    }
                />

                <ScrollView>



                    <View style={{backgroundColor: 'black', height: height/3.5, justifyContent: 'center'}}>

                        <CardView
                            cardElevation={7}
                            cardMaxElevation={2}
                            cornerRadius={8}
                            style={{
                                marginLeft: 24,
                                marginRight: 24,
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                backgroundColor: 'white'
                            }}>

                            <View style={{ flexDirection: 'column', justifyContent: 'center'}}>

                                <View style={{backgroundColor: '#EFF0F0'}}>
                                    <ImageBackground resizeMode={'contain'} source={{uri: this.state.gif}} style={{width: '100%', height: height/3.8}}/>
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                        <Text style={{fontSize: 25, color: '#007AFF'}}>Peso:</Text>
                                        <Text style={{fontSize: 25}}>60Kg</Text>
                                    </View>

                                    <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                        <Text style={{fontSize: 25, color: '#007AFF'}}>Serie:</Text>
                                        <Text style={{fontSize: 25}}>{this.state.numberOfSeries}</Text>
                                    </View>

                                    <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                        <Text style={{fontSize: 25, color: '#007AFF'}}>Ripetizioni:</Text>
                                        <Text style={{fontSize: 25}}>{this.state.numberOfRepetitions}</Text>
                                    </View>

                                    <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20}}>
                                        <Text style={{fontSize: 25, color: '#007AFF'}}>Riposo:</Text>
                                        <Text style={{fontSize: 25}}>{this.state.snapshot.rest.min + ':' + this.state.snapshot.rest.sec}</Text>
                                    </View>
                                </View>
                                <AnimatedCircularProgress
                                    ref={(ref) => this.circularProgress = ref}
                                    size={this.state.size}
                                    width={30}
                                    rotation={0}
                                    fill={this.state.doneWorkout ? 100 : this.state.animationFill}
                                    backgroundColor="#3d5875"
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
                                                            <Text style={{fontSize: 35, color: '#4CD964'}} >{this.state.circularProgressAction}</Text>
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
                                                                            <Text style={{fontSize: 35, color: 'black'}}>
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

                                                                            <Text style={{fontSize: 35, color: 'black'}}>
                                                                                {this.state.circularProgressAction}
                                                                            </Text>

                                                                            {
                                                                                this.state.circularProgressAction === 'Allenati' ?
                                                                                    (<Fontisto style={{alignSelf: 'center', justifyContent: 'center', color: 'white', marginTop: 10}} size={30} name={'play'}/>)
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

                                                                        <Text style={{fontSize: 35, color: 'white'}}>
                                                                            {this.state.rest.min + ':' + this.state.rest.sec}
                                                                        </Text>

                                                                    )

                                                                    :

                                                                    //IF FALSE RENDER ACTION
                                                                    (

                                                                        <Text style={{fontSize: 35, color: 'white'}}>
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

                        </CardView>
                    </View>







                </ScrollView>

            </SafeAreaView>
        );
    }
}
