import React, {Component} from 'react';
import CardView from "react-native-cardview";
import {Text, TouchableOpacity, View, Dimensions, ScrollView, ImageBackground, SafeAreaView} from "react-native";
import Emoji from "react-native-emoji";
import Reactotron from 'reactotron-react-native'
import firebase from "react-native-firebase";
import gymWallpaper from './../../assets/590.jpg';
import Spinner from "react-native-loading-spinner-overlay";
const { height, width } = Dimensions.get("window");

class CardDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workouts: [],
            spinner: true,
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
            <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
                <ImageBackground source={gymWallpaper} style={{width: '100%', height: '100%'}}>
                    <ScrollView>

                        {this.state.days.length > 0 ? (
                            this.state.days.map((day, index) => (
                                    <TouchableOpacity
                                        key={index} activeOpacity={0.5} onPress={() => this.props.navigation.push('StartWorkout', {day})}>

                                        <CardView
                                            cardElevation={7}
                                            cardMaxElevation={2}
                                            style={{
                                                marginTop: width / 20,
                                                marginLeft: width / 10,
                                                marginRight: width / 10,
                                                marginBottom: width / 35,

                                                backgroundColor: 'white',
                                            }}>

                                            <View style={{height: height/6, alignItems: 'center', justifyContent: 'center', borderWidth: 5,
                                                borderColor: '#3F5469', flexDirection: 'row'}}>
                                                <Text style={{fontSize: width / 8, fontFamily: 'Oswald', color: '#3F5469'}}>{day.toUpperCase()}</Text>
                                            </View>
                                        </CardView>

                                    </TouchableOpacity>
                                ))

                        ) :
                            (<Spinner visible={this.state.spinner}/>)
                        }


                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>

        );
    }
}

export default CardDay;
