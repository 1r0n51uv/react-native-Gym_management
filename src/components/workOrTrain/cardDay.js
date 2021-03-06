import React, {Component} from 'react';
import CardView from "react-native-cardview";
import {Text, TouchableOpacity, View, Dimensions, ScrollView, ImageBackground, SafeAreaView} from "react-native";
import Emoji from "react-native-emoji";
import Reactotron from 'reactotron-react-native'
import firebase from "react-native-firebase";
import Spinner from "react-native-loading-spinner-overlay";
const { height, width } = Dimensions.get("window");
import LinearGradient from 'react-native-linear-gradient';
import NoTrainingCard from "./noTrainingCard";
import * as Animatable from 'react-native-animatable';
import styles from './../../assets/styles'
import gymWallpaper from './../../assets/pelo.jpeg';
import {ModernHeader} from "@freakycoder/react-native-header-view";

class CardDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workouts: [],
            spinner: true,
            days: [],
            tcardActive: false
        }

        this.getTrainingCard = this.getTrainingCard.bind(this);
        this.retriveDays = this.retriveDays.bind(this);

    }

    componentDidMount() {

        Reactotron.log(this.props.navigation.getParam('day'));

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.getTrainingCard(user.uid);
            }
        })
    }




    getTrainingCard(id) {
        firebase.firestore().collection('TrainingCards').where('idUserDatabase', '==', id)
            .where('isActive', '==', true).get().then(value => {
            if  (value.docs.length > 0 ) {
                this.setState({
                    workouts: value.docs[0].data().exercises,
                    spinner: false,
                    tcardActive: true
                });
            } else {
                this.setState({
                    tcardActive: false,
                    spinner: false
                })
            }
            this.retriveDays();
        }).catch(error => {
            Reactotron.log(error);
        })
    }


    retriveDays() {

        let days = [];
        this.state.workouts.map((work, index) => {
            switch (work.day) {
                case 'Lunedi': days[0] = work.day; break;
                case 'Martedi': days[1] = work.day; break;
                case 'Mercoledi': days[2] = work.day; break;
                case 'Giovedi': days[3] = work.day; break;
                case 'Venerdi': days[4] = work.day; break;
                case 'Sabato': days[5] = work.day; break;
                case 'Domenica': days[6] = work.day; break;
            }
        });
        let days_ok = [];
        days.map(value => {
            days_ok.push(value);
        });
        this.setState({
            days: days_ok
        })

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
                        leftIconOnPress={() => this.props.navigation.navigate('Welcome')}
                        leftIconColor='#ffffff'
                    />

                    <ScrollView>
                        {this.state.spinner ? (<Spinner visible={this.state.spinner}/>) :

                            ( this.state.tcardActive === true && this.state.days.length > 0 ? (


                                this.state.days.map((day, index) => (

                                    day !== '' && <Animatable.View key={index} animation={(index % 2 === 0) ? "fadeInLeftBig" : "fadeInRightBig"} >

                                            <TouchableOpacity
                                                activeOpacity={0.5} onPress={() => this.props.navigation.navigate('StartWorkout', {day})}>

                                                <CardView
                                                    cardElevation={7}
                                                    cardElevation={7}
                                                    cardMaxElevation={2}
                                                    cornerRadius={8}
                                                    style={{
                                                        marginTop: width / 20,
                                                        marginLeft: width / 10,
                                                        marginRight: width / 10,
                                                        marginBottom: width / 35,
                                                        backgroundColor: (index % 2 === 0) ? 'black' : 'white',
                                                        opacity: 0.7
                                                    }}>


                                                    <View style={{height: height/6, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderRadius: 10}}>
                                                        <Text style={{fontSize: width / 8, fontFamily: 'Oswald', color: (index % 2 === 0) ? 'white' : 'black'}}>{day}</Text>
                                                    </View>
                                                </CardView>

                                            </TouchableOpacity>




                                        </Animatable.View>

                                    )

                                )
                            ): (<NoTrainingCard />))}

                    </ScrollView>

                </ImageBackground>


            </SafeAreaView>

        );
    }
}

export default CardDay;
