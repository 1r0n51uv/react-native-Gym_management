import React, {Component} from 'react';
import {Dimensions, Text, View, StyleSheet} from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import firebase from "react-native-firebase";
const { height, width } = Dimensions.get("window");
import Reactotron from "reactotron-react-native";
import {Card, Divider, Title, Paragraph} from 'react-native-paper';
import CardView from "react-native-cardview";

export default class CoursesCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireCourse: []
        }

    }


    componentDidMount() {
        let course = [...this.props.courses, ...this.props.courses, ...this.props.courses,];

        this.setState({
            fireCourse: course
        })
        Reactotron.log(this.state.fireCourse);
    }

    _renderItem ({item, index}, parallaxProps) {
        return (
            <CardView
                cardElevation={7}
                cardMaxElevation={2}
                cornerRadius={8}
                style={{
                    marginTop: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10,
                    backgroundColor: 'white'
                }}>


                <Card>
                    <Card.Cover source={{ uri: item.image }} />
                    <Card.Content>
                        <Title style={{ fontFamily: 'Oswald', fontSize: 30}}>{item.name}</Title>
                        <Paragraph>{item.description}</Paragraph>
                    </Card.Content>
                </Card>
            </CardView>
        );
    }


    render () {

        return (

            this.state.fireCourse.length > 0 && <Carousel
                sliderWidth={width}
                sliderHeight={width}
                itemWidth={width - 60}
                data={this.state.fireCourse}
                layout={'default'}
                renderItem={this._renderItem}
                hasParallaxImages={true}
            />
        );
    }
}

const styles = StyleSheet.create({
    item: {
        width: width - 60,
        height: width - 60,
        marginTop: 10
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
})
