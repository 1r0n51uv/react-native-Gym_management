import {NativeModules} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import Reactotron from 'reactotron-react-native'


Reactotron
    .configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .setAsyncStorageHandler(AsyncStorage) // <- here
    .connect() // let's connect!

Reactotron.onCustomCommand("reload", () => NativeModules.DevSettings.reload())
