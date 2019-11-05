import {observable} from 'mobx';
import Reactotron from 'reactotron-react-native';
import firebase from "react-native-firebase";



class UserManagerOffline {
    @observable counter = 0;

    @observable userInfo = null;

    @observable userSubscription = null;

    @observable userCourses = null;

    @observable isSet = false;

    retrieveUser(user) {
        firebase.firestore().collection('User').where('Username', '==', user._user.uid).get().then(fireUser => {
            this.userInfo = fireUser.docs[0].data();
            Reactotron.log('USER SETTED')
        }).then(() => {
            this.retrieveSubscription(this.userInfo)
        })
    }

    retrieveSubscription(userInfo) {
        firebase.firestore().collection('Abbonamenti').doc(userInfo['Abbonamento']).get().then(subscription => {
            this.userSubscription = subscription.data();
            Reactotron.log('SUBSCRIPTION SETTED')
        }).then(() => {
            this.retrieveCourses(this.userSubscription)
        })
    }

    retrieveCourses(userSubs) {
        let courses = [];
        userSubs['IDCorso'].map(val => {
            firebase.firestore().collection('Corsi').doc(val).get().then(course => {
                courses.push(course.data())
            }).then(() => {
                this.userCourses = courses;
                Reactotron.log('COURSES SETTED')
            }).then(() => {
                this.isSet = true;
            })
        })
    }

}
export default new UserManagerOffline();
