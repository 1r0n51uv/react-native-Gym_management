import React, {Component} from 'react';
import {Avatar} from "react-native-paper";

import {View, TouchableOpacity} from "react-native";
import Reactotron from 'reactotron-react-native'

class ProfilePicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upload_stage: false
        }
    }

    render() {
        return (
            <View style={{alignSelf: 'center', marginTop: 20}}>

                {

                    this.state.upload_stage ?

                        (
                            <View/>

                        ) :

                        (
                                <Avatar.Image size={148} source={this.props.avatar} />
                        )


                }




            </View>
        );
    }
}

export default ProfilePicture;
