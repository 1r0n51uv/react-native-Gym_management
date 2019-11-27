import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Linking} from "react-native";
import {Divider} from "react-native-paper";
import CardView from "react-native-cardview";
import Fontisto from "react-native-vector-icons/Fontisto";
import Reactotron from "reactotron-react-native";

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

                <Text style={{
                    color: '#3F5469',
                    fontFamily: 'Oswald',
                    fontSize: 40,
                    marginLeft: 24
                }}>Descrizione</Text>

                <View style={{ marginLeft: 24,
                    marginRight: 24}}>
                    <Divider style={{height: 3, backgroundColor: '#3F5469'}}/>

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
                        backgroundColor: 'white'
                    }}>

                    <View style={{padding: 10, flexDirection: 'column'}}>
                        <Text>{this.props.description}</Text>
                    </View>
                </CardView>

                <View>



                    <TouchableOpacity onPress={() => {this.getLink(this.props.link)}}>

                        <View style={{flexDirection: 'row', justifyContent:'center'}}>


                            <Text style={{
                                color: 'black',
                                fontFamily: 'Oswald',
                                fontSize: 40,
                            }}>Link <Fontisto name="youtube-play" size={35} style={{color: '#FF0000'}}/>
                            </Text>



                        </View>

                    </TouchableOpacity>

                </View>


            </View>
        );
    }
}

export default DescriptionAndLink;
