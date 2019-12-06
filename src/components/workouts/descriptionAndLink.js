import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Linking, Dimensions} from "react-native";
import {Divider} from "react-native-paper";
import CardView from "react-native-cardview";
import Fontisto from "react-native-vector-icons/Fontisto";
import Reactotron from "reactotron-react-native";
const { height, width } = Dimensions.get("window");
import * as Animatable from 'react-native-animatable';

class DescriptionAndLink extends Component {
    constructor(props) {
        super(props);
        this.getLink = this.getLink.bind(this);

    }

    getLink(url) {
        Linking.openURL(url).then(val => {

        }).catch((err) => console.error('An error occurred', err));
    }


    render() {
        return (

            <View style={{flexDirection: 'column', marginBottom: 24}}>

                <Animatable.View animation="fadeInRightBig">

                    <Text style={{
                        color: 'white',
                        fontFamily: 'Oswald',
                        fontSize: 40,
                        marginLeft: 24
                    }}>Descrizione</Text>

                    <View style={{ marginLeft: 24,
                        marginRight: 24}}>
                        <Divider style={{height: 3, backgroundColor: 'white'}}/>

                    </View>

                    <CardView
                        cardElevation={7}
                        cardMaxElevation={2}
                        cornerRadius={8}
                        style={{
                            marginLeft: 24,
                            marginRight: 24,
                            marginTop: 10,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            backgroundColor: 'black',
                            opacity: 0.7
                        }}>

                        <View style={{padding: 10, flexDirection: 'column'}}>
                            <Text style={{color: 'white'}}>{this.props.description}</Text>
                        </View>
                    </CardView>
                </Animatable.View>

                { this.props.link.length > 0 && <Animatable.View animation="fadeInLeftBig">

                    <View>

                        <TouchableOpacity onPress={() => {this.getLink(this.props.link)}}>
                            <View style={{flexDirection: 'row', justifyContent:'center', marginTop: 10}}>
                                <Text style={{
                                    color: 'black',
                                    fontFamily: 'Oswald',
                                    fontSize: 40,
                                    backgroundColor: 'white', opacity: 0.7, borderRadius: 10, paddingLeft: 15, paddingRight: 15 , paddingBottom: 5
                                }}>Link <Fontisto name="youtube-play" size={35} style={{color: '#FF0000'}}/>
                                </Text>



                            </View>

                        </TouchableOpacity>

                    </View>
                </Animatable.View>}

            </View>
        );
    }
}

export default DescriptionAndLink;
