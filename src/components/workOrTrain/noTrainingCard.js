import React, {Component} from 'react';
import CardView from "react-native-cardview";
import {Text, TouchableOpacity, View, Dimensions, ScrollView, ImageBackground, SafeAreaView} from "react-native";
const { height, width } = Dimensions.get("window");







class NoTrainingCard extends Component {
    render() {
        return (
            <CardView
                cardElevation={7}
                cardMaxElevation={2}
                cornerRadius={8}
                style={{
                    marginTop: width / 20,
                    marginLeft: width / 10,
                    marginRight: width / 10,
                    marginBottom: width / 35,
                    opacity: 0.7,
                    backgroundColor: 'white',
                }}>

                <View style={{height: height/6, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <Text style={{fontSize: width / 12, fontFamily: 'Oswald', color: 'black'}}>Nessuna scheda attiva</Text>
                </View>
            </CardView>
        );
    }
}

export default NoTrainingCard;
