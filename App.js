import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Navbar from './src/components/headers/Navbar';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Welcome from './src/screens/Welcome';
import WelcomeNav from './src/components/headers/WelcomeNav';
import ProfileNav from './src/components/headers/ProfileNav';
import StartWorkouts from './src/screens/StartWorkouts';
import WorkoutTime from './src/screens/workoutTime';
import TrainOrCourse from './src/screens/TrainOrCourse';
import TrainOrCourseNav from './src/components/headers/TrainOrCourseNav';
import Courses from './src/screens/Courses';
import StockNav from './src/components/headers/StockNav';
import {SafeAreaView} from "react-native";
import WorkoutWeight from "./src/screens/workoutWeight";
import SplashScreen from "react-native-splash-screen";
import CardDay from "./src/components/workOrTrain/cardDay";



class App extends Component {


    render() {
        return (

            <AppNavigator />
        )
    }
}


const AppNavigator = createStackNavigator(
    {

        Home: {
            screen: Home,
            navigationOptions: {
                header: navigationProps => <Navbar {...navigationProps} />
            }
        },

        Login: {
            screen: Login,
            navigationOptions: {
                header: navigationProps => {
                    navigationProps;
                },

            },
        },

        Profile: {
            screen: Profile,
            navigationOptions: {
                header: null

            }
        },

        Welcome: {
            screen: Welcome,
            navigationOptions: {
                header: null
            }
        },

        StartWorkout: {
            screen: StartWorkouts,
            navigationOptions: {
                header: null
            }
        },

        WorkoutTime: {
            screen: WorkoutTime,
            navigationOptions: {
                header: null
            }
        },

        WorkoutWeight: {
            screen: WorkoutWeight,
            navigationOptions: {
                header: null
            }
        },

        TrainOrCourse: {
            screen: TrainOrCourse,
            navigationOptions: {
                header: navigationProps => <SafeAreaView><TrainOrCourseNav {...navigationProps} /></SafeAreaView>
            }
        },

        Courses: {
            screen: Courses,
            navigationOptions: {
                header: navigationProps => <SafeAreaView><StockNav {...navigationProps} /></SafeAreaView>
            }
        },

        CardDay: {
            screen: CardDay,
            navigationOptions: {
                header: null
            }
        }

    },
    {
        initialRouteName: 'Login',
    }
);
export default createAppContainer(AppNavigator);
