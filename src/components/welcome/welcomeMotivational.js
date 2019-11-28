import React, {Component} from 'react';
import {View, Text, Dimensions, Button} from "react-native";
const { height, width } = Dimensions.get("window");
import * as Animatable from 'react-native-animatable';
import Reactotron from "reactotron-react-native";

const timer = require('react-native-timer');


class WelcomeMotivational extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPhrase : '',
            index: 0
        }
        this.animateCarousel = this.animateCarousel.bind(this);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if  (prevState.index + 1 === this.props.phrases.length) {
            this.setState({index: 0})
        }

    }


    handleViewRef = ref => this.view = ref;

    fadeInLeft = () => this.view.fadeInLeft(1000).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));


    animateCarousel() {
        timer.clearInterval(this);
        timer.setInterval(this, 'phraseCounter', () => {

            this.setState({
                currentPhrase: this.props.phrases[this.state.index],
                index: this.state.index + 1
            });

            this.fadeInLeft();

        }, 5000);
    }


    componentDidMount() {
        this.setState({
            currentPhrase: this.props.phrases[0],
            index: this.state.index + 1
        })
        this.animateCarousel()
    }

    render() {
        return (





            <View style={{borderRightWidth: 5, marginRight: width / 20, borderRightColor: 'black', flexDirection: 'column', flexWrap: 'nowrap', alignSelf: 'flex-end'}}>
                <Animatable.View ref={this.handleViewRef} animation={'fadeInLeft'}>
                    <Text style={{fontSize: width / 12, color: 'black', fontFamily: 'Oswald', paddingRight: 10, paddingBottom: 10}}>
                        {this.state.currentPhrase}
                    </Text>
                </Animatable.View>

            </View>

        );
    }
}

export default WelcomeMotivational;