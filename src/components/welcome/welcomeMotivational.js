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
    fadeInRight= () => this.view.fadeInRight(1000).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    fadeInUp= () => this.view.fadeInUp(1000).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));


    animateCarousel() {
        timer.clearInterval(this);
        timer.setInterval(this, 'phraseCounter', () => {

            this.setState({
                currentPhrase: this.props.phrases[this.state.index],
                index: this.state.index + 1
            });

            switch (this.state.index) {
                case 0:
                    this.fadeInRight();
                    break;
                case 1:
                    this.fadeInLeft();
                    break;
                case 2:
                    this.fadeInUp();
                    break;
                default:
                    this.fadeInLeft();
                    break;
            }


        }, 5000);
    }


    componentDidMount() {
        this.setState({
            currentPhrase: this.props.phrases[0],
            index: this.state.index + 1
        })
        this.animateCarousel()
    }

    componentWillUnmount() {
        this.view.stopAnimation();
        timer.clearInterval(this);
    }

    render() {
        return (





            <View style={{flexDirection: 'column', flexWrap: 'nowrap', alignSelf: 'center', width: width / 1.5}}>
                <Animatable.View ref={this.handleViewRef} animation="fadeInLeft">
                    <Text style={{fontSize: width / 15, color: '#FFFFFF', fontFamily: 'Oswald'}}>
                        {'"' + this.state.currentPhrase.toUpperCase() + '"'}
                    </Text>
                </Animatable.View>

            </View>

        );
    }
}

export default WelcomeMotivational;
