import React, { Component } from 'react';
import Reactotron from 'reactotron-react-native'

import {
    View,
    Text,
    SafeAreaView,
    Dimensions,
    Platform,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback} from 'react-native';
const { height, width } = Dimensions.get("window");
import Ionicons from 'react-native-vector-icons/Ionicons';
import WorkoutCard from '../components/workouts/WorkoutCard';
import gifff from './../assets/test.gif';
import EditModal from '../components/modals/editModal';
import InfoModal from '../components/modals/infoModal';
import firebase from "react-native-firebase";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from '@react-native-community/async-storage';

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

            <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>

                {
                    this.state.workouts.length > 0 ? (<View>
                            <EditModal visible={this.state.editModalVisible} setEditModalVisible={this.setEditModalVisible.bind(this)}/>

                            <InfoModal visible={this.state.infoModalVisible} setInfoModalVisible={this.setInfoModalVisible.bind(this)}/>

                            <TouchableOpacity activeOpacity={0.5} delayPressIn={50} onPress={() => this.startTraining(this.state.workouts[0], 0) }>
                                <View style={{backgroundColor: '#D8D8D8', height: height/3, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{fontSize: 40}}>
                                        <Ionicons name={Platform.OS === 'ios' ? 'ios-play' : 'md-play'} size={40}/>
                                        {' '} Inizia allenamento
                                    </Text>
                                </View>
                            </TouchableOpacity>


                            <ScrollView contentContainerStyle={{paddingBottom: 20}}>

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


                            </ScrollView>
                        </View>) :
                        (<Spinner visible={this.state.spinner}/>)
                }




            </SafeAreaView>
        );
    }
}
