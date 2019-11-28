import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
    Dimensions,
    Platform,
    ImageBackground
} from 'react-native';

import CardView from 'react-native-cardview';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { height, width } = Dimensions.get("window");
const timer = require('react-native-timer');
import firebase from 'react-native-firebase';
import {observer} from 'mobx-react';
import Spinner from "react-native-loading-spinner-overlay";
import CoursesCarousel from "../components/courses/coursesCarousel";
import gymWallpaper from "../assets/2659255-min.jpg";
import {Divider} from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";

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
            <SafeAreaView style={{flex: 1}}>

                <LinearGradient colors={['#3f5469','#647184', '#888f9f', '#acafba', '#d0d0d7', '#d2cedd', '#d8cbe1', '#e0c7e2', '#d799bd', '#cf6a89', '#bb3b4a', '#980f00'].reverse()} style={{flex: 1}}>

                    {this.state.spinner ? (<Spinner visible={this.state.spinner}/>) : (<ScrollView>

                        {

                            this.state.fireCourse.length > 0  ? (

                                <View>

                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={{
                                            color: '#ffffff',
                                            fontFamily: 'Oswald',
                                            fontSize: 35,
                                            marginLeft: 60
                                        }}>I tuoi corsi</Text>
                                        <Divider
                                            style={{marginLeft: 60, marginRight: 60, backgroundColor: '#ffffff', height: 5}}
                                        />
                                        <CoursesCarousel
                                            courses={this.state.fireCourse}
                                            whichCarousel={false}
                                        />

                                    </View>

                                    <View style={{flexDirection: 'column'}}>

                                        <Text style={{
                                            color: '#ffffff',
                                            fontFamily: 'Oswald',
                                            fontSize: 40,
                                            marginLeft: 60,
                                        }}>Scopri altri corsi</Text>
                                        <Divider
                                            style={{marginLeft: 60, marginRight: 60, backgroundColor: '#ffffff', height: 5}}
                                        />
                                        <CoursesCarousel
                                            courses={this.state.allCourse}
                                            whichCarousel={true}
                                        />
                                    </View>

                                </View>


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
                                            marginLeft: 60
                                        }}>I nostri corsi</Text>

                                        <CoursesCarousel
                                            courses={this.state.allCourse}
                                            whichCarousel={true}
                                        />
                                    </View>


                                </View>
                            )


                        }

                    </ScrollView>)}

                </LinearGradient>
            </SafeAreaView>
        );
    }
}
