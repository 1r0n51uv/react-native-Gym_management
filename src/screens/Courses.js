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
import gymWallpaper from "../assets/pelo.jpeg";
import {Divider} from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import {ModernHeader} from "@freakycoder/react-native-header-view";

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
                        leftIconOnPress={() => {this.props.navigation.pop()}}
                        leftIconColor='#ffffff'
                    />

                    {this.state.spinner ? (<Spinner visible={this.state.spinner}/>) : (<ScrollView>

                        {

                            this.state.fireCourse.length > 0  ? (

                                <View>

                                    <View style={{flexDirection: 'column'}}>
                                        <View style={{backgroundColor: 'white', opacity: 0.7}}>
                                            <Text style={{
                                                color: 'black',
                                                fontFamily: 'Oswald',
                                                fontSize: width / 10,
                                                alignSelf: 'center',
                                                marginBottom: 15,
                                                marginTop: 10,
                                            }}>I TUOI CORSI</Text>
                                        </View>

                                        <CoursesCarousel
                                            courses={this.state.fireCourse}
                                            whichCarousel={false}
                                        />

                                    </View>

                                    <View style={{flexDirection: 'column'}}>

                                        <View style={{backgroundColor: 'black', opacity: 0.7}}>
                                            <Text style={{
                                                color: 'white',
                                                fontFamily: 'Oswald',
                                                fontSize: width / 10,
                                                alignSelf: 'center',
                                                marginBottom: 15,
                                                marginTop: 10,
                                            }}>SCOPRI ALTRI CORSI</Text>
                                        </View>

                                        <CoursesCarousel
                                            courses={this.state.allCourse}
                                            whichCarousel={true}
                                        />
                                    </View>

                                </View>


                            ) : (

                                <View style={{justifyContent: 'space-between', flexDirection: 'column'}}>

                                    <View style={{flexDirection: 'column'}}>

                                        <Text style={{
                                            color: 'white',
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

                </ImageBackground>
            </SafeAreaView>
        );
    }
}
