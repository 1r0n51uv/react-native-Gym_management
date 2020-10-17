import React, { Component } from 'react';
import Reactotron from 'reactotron-react-native'

import {
    View,
    Text,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    ScrollView, ImageBackground,
} from 'react-native';
const { height, width } = Dimensions.get("window");
import WorkoutCard from '../components/workouts/WorkoutCard';
import firebase from "react-native-firebase";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from '@react-native-community/async-storage';
import gymWallpaper from "../assets/pelo.jpeg";
import {ModernHeader} from "@freakycoder/react-native-header-view";
import * as Animatable from 'react-native-animatable';
import reactotron from "reactotron-react-native";
import moment from "moment";

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
            idCard: '',
            uid: null
        };
        this.returnData = this.returnData.bind(this);
        this.setInfoModalVisible = this.setInfoModalVisible.bind(this);
        this.setEditModalVisible = this.setEditModalVisible.bind(this);
        this.startTraining = this.startTraining.bind(this);
        this.getTrainingCard = this.getTrainingCard.bind(this);
    }


    componentDidMount() {

        //Reactotron.log(this.props.navigation.getParam('day'));
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.getTrainingCard(user.uid);
                this.setState({
                    spinner: false,
                    uid: user.uid
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
            let updateExField = [];


            value.docs[0].data().exercises.map(work => {

                    if (work.status === undefined) {
                        updateExField.push({...work, status: ""})
                    } else {
                        updateExField.push(this.checkDate(work))
                    }

                    if (work.day === this.props.navigation.getParam('day')) {
                        dayOK.push(work);
                    }
                }
            );



            this.setState({
                workouts: dayOK,
                idCard: value.docs[0].id,
                spinner: true
            }, () => {
                if (updateExField.length > 0) {
                    firebase.firestore().collection('TrainingCards').doc(value.docs[0].id).update({exercises: updateExField})
                        .then(() => {
                            this.setState({spinner: false}, () => {
                                reactotron.log("appost")
                            })
                        }).catch((err => {
                        reactotron.log(err)
                    }));
                }
            })


        }).catch(error => {
            Reactotron.log(error);
        })
    }

    returnData(id, status) {
        let tmp = [...this.state.workouts];
        if (status) {
            let date = new Date();
            let today = date.getDate()+'-'+(date.getMonth()+1)+"-"+date.getFullYear();
            tmp[id].status = today;
            this.setState({
                spinner: true
            }, () => {
                firebase.firestore().collection("TrainingCards").doc(this.state.idCard).update({
                    exercises: tmp
                }).then(() => {
                    this.setState({spinner: false})
                })
            })

        }

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
            this.props.navigation.push('WorkoutWeight', {workout: workout, workID: id, statusID: false, returnData: this.returnData.bind(this), idCard: idCard, day2: this.props.navigation.getParam('day')})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.navigation.getParam('dayer') !== undefined) {
            this.getTrainingCard(this.state.uid);
            //this.forceUpdate();
        }
    }

    checkDate = (work) => {
        let date = new Date();
        let mom = moment(work.status, "DD-MM-YYYY");
        if (date.getDate() > mom.date()) {
            work.status = "";
            return work;
        } else {
            return work;
        }
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
                                                        <TouchableOpacity activeOpacity={0.5} delayPressIn={50} key={index} onPress={() => {
                                                            this.startTraining(workout, index, this.state.idCard);
                                                        }}>
                                                            <WorkoutCard key={index}
                                                                         bgColor={'#4CD964'}
                                                                         workout={workout}

                                                            />
                                                        </TouchableOpacity>
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
