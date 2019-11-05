import React, { Component } from 'react';

import {Button, Text, View, StyleSheet} from 'react-native';
import firebase from 'react-native-firebase';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('todos');
        this.unsubscribe = null;
        this.state = {
            loading: true,
            todos: [],
        }
    }

    onCollectionUpdate = (querySnapshot) => {
        const todos = [];
        querySnapshot.forEach((doc) => {
            const { title } = doc.data();
            todos.push({
                key: doc.id,
                doc, // DocumentSnapshot
                title,
            });
        });

        this.setState({
            todos,
            loading: false,
        });
    };
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
    return (
        <View>
            <Text>HomeScreen</Text>
            <Button title={'gotoLogin'} onPress={() => this.props.navigation.navigate('Login')}/>
            {firebase.firestore.nativeModuleExists && <Text>CI STA</Text>}
        </View>




    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    logo: {
        height: 120,
        marginBottom: 16,
        marginTop: 64,
        padding: 10,
        width: 135,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    modules: {
        margin: 20,
    },
    modulesHeader: {
        fontSize: 16,
        marginBottom: 8,
    },
    module: {
        fontSize: 14,
        marginTop: 4,
        textAlign: 'center',
    }
});
