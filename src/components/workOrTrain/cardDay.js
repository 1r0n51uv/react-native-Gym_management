import React, {Component} from 'react';
import CardView from "react-native-cardview";
import {Text, TouchableOpacity, View, Dimensions, ScrollView, ImageBackground, SafeAreaView} from "react-native";
import Emoji from "react-native-emoji";
import Reactotron from 'reactotron-react-native'
import firebase from "react-native-firebase";
import gymWallpaper from './../../assets/590.jpg';
const { height, width } = Dimensions.get("window");

class CardDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workouts: [],
            spinner: false,
            days: [],

        }

        this.getTrainingCard = this.getTrainingCard.bind(this);
        this.retriveDays = this.retriveDays.bind(this);

    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.getTrainingCard(user.uid);
                this.setState({
                    spinner: false
                });
            } else {
                Reactotron.log('NO USER');
            }
        })
    }


    getTrainingCard(id) {
        firebase.firestore().collection('TrainingCards').where('idUserDatabase', '==', id).get().then(value => {
            this.setState({
                workouts: value.docs[0].data().exercises
            });
            this.retriveDays();
        }).catch(error => {
            Reactotron.log(error);
        })
    }

    retriveDays() {
        let tmp_day = [];
        this.state.workouts.map(work => {
            tmp_day.push(work.day);
        });
        this.setState({
            days: [...new Set(tmp_day)]
        })
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <ImageBackground source={gymWallpaper} style={{width: '100%', height: '100%'}}>
                    <ScrollView>



                        {this.state.days.map((day, index) => (
                            <TouchableOpacity key={index} activeOpacity={0.5} onPress={() => this.props.navigation.push('StartWorkout', {day})}>

                                <CardView
                                    cardElevation={7}
                                    cardMaxElevation={2}
                                    style={{
                                        marginTop: 24,
                                        marginLeft: 24,
                                        marginRight: 24,
                                        marginBottom: 24,
                                        backgroundColor: 'white'
                                    }}>

                                    <View style={{height: height/5, alignItems: 'center', justifyContent: 'center', borderWidth: 5,
                                        borderColor: '#000000', flexDirection: 'row'}}>
                                        <Text style={{fontSize: 50, fontFamily: 'Oswald'}}>{'GIORNO ' + (index + 1)}</Text>
                                    </View>
                                </CardView>

                            </TouchableOpacity>
                        ))
                        }

                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>

        );
    }
}

export default CardDay;
