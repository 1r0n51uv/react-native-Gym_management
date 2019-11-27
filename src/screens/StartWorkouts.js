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
import gymWallpaper from "../assets/2659255-min.jpg";

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
        firebase.firestore().collection('TrainingCards').where('idUserDatabase', '==', id).get().then(value => {
            let dayOK = [];
            value.docs[0].data().exercises.map(work => {
                if (work.day === this.props.navigation.getParam('day')) {
                    dayOK.push(work);
                }
            })

            this.setState({
                workouts: dayOK
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

    startTraining(workout, id) {
        workout.atTime ?
            this.props.navigation.push('WorkoutTime', {workout: workout, workID: id, statusID: false, returnData: this.returnData.bind(this)})
            :
            this.props.navigation.push('WorkoutWeight', {workout: workout, workID: id, statusID: false, returnData: this.returnData.bind(this)})
    }

    render() {
        return (

            <SafeAreaView style={{flex: 1}}>


                <ScrollView contentContainerStyle={{paddingBottom: 20}}>


                    {
                        this.state.workouts.length > 0 ? (

                                <View>
                                    <TouchableOpacity activeOpacity={0.5} delayPressIn={50} onPress={() => this.startTraining(this.state.workouts[0], 0) }>

                                        <View style={{height: height/3, justifyContent: 'flex-start', flexDirection: 'column'}}>
                                            <ImageBackground source={startWork} style={{width: '100%', height: '100%', justifyContent: 'flex-end'}}>
                                                <View style={{justifyContent: 'flex-end', alignItems: 'center'}}>
                                                    <Text style={{fontSize: width / 10, fontFamily: 'Oswald', paddingBottom: 10, color: '#3F5469'}}>
                                                        <Ionicons name={Platform.OS === 'ios' ? 'ios-play' : 'md-play'} size={width / 10}/>
                                                        {' '} Inizia allenamento
                                                    </Text>
                                                </View>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>


                                    {this.state.workouts.map((workout, index) => (

                                        workout.status ?

                                            (
                                                <WorkoutCard key={index}
                                                             bgColor={'#4CD964'}
                                                             doneWorkout={workout.status}
                                                             workout={workout}

                                                />
                                            )

                                            :

                                            (
                                                <TouchableOpacity activeOpacity={0.5} delayPressIn={50} key={index} onPress={() => {
                                                    this.startTraining(workout, index);
                                                }}>

                                                    <WorkoutCard workout={workout}
                                                                 setEditModalVisible={this.setEditModalVisible.bind(this)}
                                                                 setInfoModalVisible={this.setInfoModalVisible.bind(this)}
                                                                 bgColor={'white'}/>
                                                </TouchableOpacity>
                                            )

                                    ))}



                                </View>

                            ) :
                            (<Spinner visible={this.state.spinner}/>)
                    }



                </ScrollView>
            </SafeAreaView>
        );
    }
}
