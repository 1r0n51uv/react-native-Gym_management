import React, { Component } from 'react';
import Reactotron from 'reactotron-react-native'

import {
    View,
    Text,
    SafeAreaView,
    Dimensions,
    Platform,
    TouchableOpacity,
    ScrollView, ImageBackground,
} from 'react-native';
const { height, width } = Dimensions.get("window");
import Ionicons from 'react-native-vector-icons/Ionicons';
import WorkoutCard from '../components/workouts/WorkoutCard';
import EditModal from '../components/modals/editModal';
import InfoModal from '../components/modals/infoModal';
import firebase from "react-native-firebase";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from '@react-native-community/async-storage';
import startWork from './../assets/startworkout.gif'
import gymWallpaper from "../assets/pelo.jpeg";
import {ModernHeader} from "@freakycoder/react-native-header-view";
import * as Animatable from 'react-native-animatable';

export default class StartWorkouts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 9,
            status: null,
            editModalVisible: false,
            infoModalVisible: false,
            workouts: [],
            spinner: true,
            idCard: ''
        };
        this.returnData = this.returnData.bind(this);
        this.setInfoModalVisible = this.setInfoModalVisible.bind(this);
        this.setEditModalVisible = this.setEditModalVisible.bind(this);
        this.startTraining = this.startTraining.bind(this);
        this.getTrainingCard = this.getTrainingCard.bind(this);
    }


    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.getTrainingCard(user.uid);
                this.setState({
                    spinner: false
                })
            } else {
                Reactotron.log('NO USER');
            }
        })
    }

    getTrainingCard(id) {
        firebase.firestore().collection('TrainingCards').where('idUserDatabase', '==', id)
            .where('isActive', '==', true).get().then(value => {
            let dayOK = [];
            value.docs[0].data().exercises.map(work => {
                if (work.day === this.props.navigation.getParam('day')) {
                    dayOK.push(work);
                }
            });

            this.setState({
                workouts: dayOK,
                idCard: value.docs[0].id
            })


        }).catch(error => {
            Reactotron.log(error);
        })
    }

    returnData(id, status) {
        let tmp = [...this.state.workouts];
        tmp[id].status = status;
        this.setState({
            workouts: tmp
        })
    }

    setEditModalVisible(visible) {
        this.setState({ editModalVisible: visible});
        console.log(this.state.editModalVisible);
    }

    setInfoModalVisible(visible) {
        this.setState({ infoModalVisible: visible});
        console.log(this.state.infoModalVisible);

    }



    componentWillUnmount() {
        this.setEditModalVisible(false);
        this.setInfoModalVisible(false);
        AsyncStorage.clear();
    }

    startTraining(workout, id, idCard) {
        workout.atTime ?
            this.props.navigation.push('WorkoutTime', {workout: workout, workID: id, statusID: false, returnData: this.returnData.bind(this)})
            :
            this.props.navigation.push('WorkoutWeight', {workout: workout, workID: id, statusID: false, returnData: this.returnData.bind(this), idCard: idCard})
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
                        leftIconOnPress={() => this.props.navigation.pop()}
                        leftIconColor='#ffffff'
                    />




                    <ScrollView contentContainerStyle={{paddingBottom: 20}}>


                        {
                            this.state.workouts.length > 0 ? (

                                    <View>

                                        <View style={{height: height/9, justifyContent: 'center', flexDirection: 'column', backgroundColor: 'white', opacity: 0.7}}>
                                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                                <Text style={{fontSize: width / 10, fontFamily: 'Oswald', color: 'black'}}>
                                                    {this.props.navigation.getParam('day').toUpperCase()}
                                                </Text>
                                            </View>
                                        </View>



                                        {this.state.workouts.map((workout, index) => (

                                            workout.status ?

                                                (
                                                    <Animatable.View key={index} animation={(index % 2 === 0) ? "fadeInLeft" : "fadeInRight"} >

                                                        <WorkoutCard key={index}
                                                                     bgColor={'#4CD964'}
                                                                     doneWorkout={workout.status}
                                                                     workout={workout}

                                                        />
                                                    </Animatable.View>
                                                )

                                                :

                                                (
                                                    <Animatable.View key={index} animation={(index % 2 === 0) ? "fadeInLeft" : "fadeInRight"} >

                                                        <TouchableOpacity activeOpacity={0.5} delayPressIn={50} key={index} onPress={() => {
                                                            this.startTraining(workout, index, this.state.idCard);
                                                        }}>

                                                            <WorkoutCard workout={workout}
                                                                         setEditModalVisible={this.setEditModalVisible.bind(this)}
                                                                         setInfoModalVisible={this.setInfoModalVisible.bind(this)}
                                                                         bgColor={(index % 2 === 0) ? 'black' : 'white'}/>
                                                        </TouchableOpacity>
                                                    </Animatable.View>
                                                )

                                        ))}



                                    </View>

                                ) :
                                (<Spinner visible={this.state.spinner}/>)
                        }



                    </ScrollView>

                </ImageBackground>
            </SafeAreaView>
        );
    }
}
