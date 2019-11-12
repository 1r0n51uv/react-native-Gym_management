import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
    Dimensions,
    Platform,
    TouchableOpacity,
    NativeModules,
    ImageBackground
} from 'react-native';
import Emoji from 'react-native-emoji';
import CardView from 'react-native-cardview';
import {Card, Divider} from 'react-native-paper';
import plank from '../assets/plank.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { height, width } = Dimensions.get("window");
const timer = require('react-native-timer');
import firebase from 'react-native-firebase';
import UserManagerOffline from '../UserManagerOffline';
import {observer} from 'mobx-react';
import Reactotron from "reactotron-react-native";
import Spinner from "react-native-loading-spinner-overlay";
import CoursesCarousel from "../components/courses/coursesCarousel";
import gymWallpaper from "../assets/2659255-min.jpg";

@observer
export default class  extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spinner: true,
            allCourse: [],
            fireCourse: [],
        };

        this.collapseManagement = this.collapseManagement.bind(this);
        this.retrieveCourses = this.retrieveCourses.bind(this);
    }

    collapseManagement(index) {
        let tmp = [...this.state.fireCourse];
        tmp[index].collapsed = !tmp[index].collapsed;
        this.setState({
            fireCourse: tmp
        })
    }


    retrieveCourses(user) {
        let courses = [];
        let allCoursesToSlider = [];
        firebase.firestore().collection('Courses').get().then(allCourses => {
            allCourses.docs.map((course) => {
                allCoursesToSlider.push(course.data());
                course.data()['usersList'].forEach(usr => {
                    if (usr === user.uid) {
                        courses.push(course.data());
                    }
                })
            });
        }).then(() => {
            this.setState({
                fireCourse: courses,
                spinner: false,
                allCourse: allCoursesToSlider
            })
        })

    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {

                this.retrieveCourses(user);
            } else {
                console.log('nouser')
            }
        })
    }

    render() {
        return (
            <SafeAreaView >

                <ImageBackground source={gymWallpaper} style={{width: '100%', height: '100%'}}>

                    {this.state.spinner ? (<Spinner visible={this.state.spinner}/>) : (<ScrollView>

                        {

                            this.state.fireCourse.length > 0  ? (

                                this.state.fireCourse.map((course, index) => (

                                    <CardView
                                        key={index}
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

                                        <Card>
                                            <Card.Cover source={plank}/>

                                            <Card.Content style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                paddingBottom: 15
                                            }}>
                                                <Text style={{
                                                    marginTop: 10,
                                                    fontSize: 30,
                                                    alignSelf: 'center'
                                                }}>{course['name']}</Text>
                                                <TouchableOpacity activeOpacity={0.5} delayPressIn={50} onPress={() => {
                                                    this.collapseManagement(index);
                                                }}>

                                                    <Ionicons style={{alignSelf: 'center', marginTop: 15, color: '#007AFF'}}
                                                              name={(this.state.fireCourse[index].collapsed) ?
                                                                  (Platform.OS === 'ios' ? 'md-arrow-dropup' : 'ios-arrow-dropup')
                                                                  :
                                                                  (Platform.OS === 'ios' ? 'md-information-circle-outline' : 'ios-information-circle-outline')
                                                              }
                                                              size={35}/>
                                                </TouchableOpacity>
                                            </Card.Content>

                                            {(this.state.fireCourse[index].collapsed) ?
                                                (
                                                    <Card.Content>

                                                        <Divider/>

                                                        <View style={{
                                                            justifyContent: 'flex-start',
                                                            flexDirection: 'row',
                                                            marginTop: 5
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 15,
                                                                color: '#007AFF',
                                                                marginTop: 5
                                                            }}>Istruttore:</Text>
                                                            <Text style={{fontSize: 20}}>{' ' + course['instructor']}</Text>
                                                        </View>

                                                        <View style={{
                                                            justifyContent: 'flex-start',
                                                            flexDirection: 'row',
                                                            marginTop: 5
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 15,
                                                                color: '#007AFF',
                                                                marginTop: 5
                                                            }}>Cadenza:</Text>

                                                            <View style={{flexDirection: 'column'}}>

                                                                {


                                                                    course['weeklyFrequency'].map((workDay, index) =>(
                                                                        <Text key={index} style={{fontSize: 18, marginTop: 2}}>{' ' + workDay.day + ' - ' + workDay.startTime.hour + ':' + workDay.endTime.minutes}</Text>
                                                                    ))

                                                                    /*
                                                                    course['weeklyFrequency']['Giorni'].map((days, index) => (
                                                                            <Text key={index} style={{fontSize: 18, marginTop: 2}}>
                                                                                {
                                                                                    ' ' + days['Giorno']['Giorno'] + ' - ' + days['Giorno']['Ora inizio']['Ora'] + ':'
                                                                                    + (days['Giorno']['Ora inizio']['Minuti'] === 0 ? '00' : days['Giorno']['Ora inizio']['Minuti'])
                                                                                    + '/' + days['Giorno']['Ora Fine']['Ora'] + ':'
                                                                                    + (days['Giorno']['Ora Fine']['Minuti'] === 0 ? '00' : days['Giorno']['Ora Fine']['Minuti'])
                                                                                }
                                                                            </Text>
                                                                        )
                                                                    )

                                                                     */


                                                                }
                                                            </View>


                                                        </View>

                                                        <View style={{
                                                            justifyContent: 'flex-start',
                                                            flexDirection: 'row',
                                                            marginTop: 5
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 15,
                                                                color: '#007AFF',
                                                                marginTop: 5
                                                            }}>Inizio:</Text>
                                                            <Text
                                                                style={{fontSize: 20}}>{' ' + course['period'].startDate }</Text>
                                                        </View>


                                                        <View style={{
                                                            justifyContent: 'flex-start',
                                                            flexDirection: 'row',
                                                            marginTop: 5
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 15,
                                                                color: '#007AFF',
                                                                marginTop: 5
                                                            }}>Fine:</Text>
                                                            <Text
                                                                style={{fontSize: 20}}>{' ' + course['period'].endDate}</Text>
                                                        </View>

                                                    </Card.Content>
                                                ) : (<View/>)
                                            }

                                        </Card>

                                    </CardView>

                                ))
                            ) : (

                                <View style={{justifyContent: 'space-between', flexDirection: 'column'}}>
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

                                        <View style={{justifyContent: 'center', flexDirection: 'column', marginTop: 5}}>
                                            <Ionicons style={{color: '#007AFF', alignSelf: 'center'}} size={100}
                                                      name={Platform.OS === 'ios' ? 'md-close-circle' : 'md-close-circle'}/>

                                        </View>
                                    </CardView>

                                    <View style={{flexDirection: 'column'}}>

                                        <Text style={{
                                            color: 'black',
                                            fontFamily: 'Oswald',
                                            fontSize: 40,
                                            marginLeft: 40
                                        }}>I nostri corsi</Text>

                                        <CoursesCarousel
                                            courses={this.state.allCourse}
                                        />
                                    </View>


                                </View>
                            )


                        }

                    </ScrollView>)}



                </ImageBackground>
            </SafeAreaView>
        );
    }
}
