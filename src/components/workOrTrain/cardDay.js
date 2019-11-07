import React, {Component} from 'react';
import CardView from "react-native-cardview";
import {Text, TouchableOpacity, View, Dimensions, ScrollView} from "react-native";
import Emoji from "react-native-emoji";
import Reactotron from 'reactotron-react-native'
import firebase from "react-native-firebase";
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
            <ScrollView>

                {this.state.days.map((day, index) => (
                    <TouchableOpacity key={index} activeOpacity={0.5} onPress={() => this.props.navigation.push('StartWorkout', {day})}>

                        <CardView
                            cardElevation={7}
                            cardMaxElevation={2}
                            cornerRadius={8}
                            style={{
                                marginTop: 24,
                                marginLeft: 24,
                                marginRight: 24,
                                marginBottom: 24,
                                backgroundColor: 'white'

                            }}>

                            <View style={{height: height/3, alignItems: 'center', justifyContent: 'center'}}>
                                <Emoji name="newspaper" style={{fontSize: 50}} />
                                <Text style={{fontSize: 40}}>{'Giorno: ' + (index + 1)}</Text>
                            </View>
                        </CardView>

                    </TouchableOpacity>
                ))
                }
            </ScrollView>
        );
    }
}

export default CardDay;
