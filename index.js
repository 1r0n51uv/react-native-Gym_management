if(__DEV__) {
    import('./ReactoTronConf').then(() => console.log('Reactotron Configured'))
}
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from 'react-native-firebase';
import Reactotron from 'reactotron-react-native';

firebase.firestore().settings({ persistence: true }).then(() => {});

AppRegistry.registerComponent(appName, () => App);
