import React, {Component} from 'react';
import {Dimensions, Text, View, StyleSheet, TouchableOpacity, Platform} from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import firebase from "react-native-firebase";
const { height, width } = Dimensions.get("window");
import Reactotron from "reactotron-react-native";
import {Card, Divider, Title, Paragraph} from 'react-native-paper';
import CardView from "react-native-cardview";
import Fontisto from "react-native-vector-icons/Fontisto";

export default class CoursesCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireCourse: [],
            collapse: false
        }
    }



    componentDidMount() {
        let tmp = [];
        this.props.courses.map(val => {
            let x = {
                ...val,
                collapsed: false
            }
            tmp.push(x);
        });
        this.setState({
            fireCourse: tmp
        });
    }


    _renderItem2({item, index}, parallaxProps) {
        return (
            <CardView
                key={index}
                cardElevation={7}
                cardMaxElevation={2}
                cornerRadius={8}
                style={{
                    marginTop: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 10,
                    opacity: 0.8,
                    backgroundColor: 'white'
                }}>

                <Card>
                    <Card.Cover source={{ uri: item.image }}/>

                    <Card.Content style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        paddingBottom: 15,
                        fontFamily: 'Oswald'
                    }}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{
                                color: 'black',
                                marginTop: 10,
                                fontSize: 30,
                                alignSelf: 'flex-start',
                                fontFamily: 'Oswald'
                            }}>{item['name']}</Text>

                        </View>

                        <Divider/>

                        <View>
                            <View style={{
                                justifyContent: 'flex-start',
                                flexDirection: 'row',
                                marginTop: 5
                            }}>
                                <Text style={{
                                    fontSize: width / 25,
                                    color: 'black',
                                    marginTop: 5,
                                    fontFamily: 'Oswald'
                                }}>Istruttore:</Text>
                                <Text style={{fontSize: width / 20, fontFamily: 'Oswald', color: 'black',}}>{' ' + item['instructor']}</Text>
                            </View>

                            <View style={{
                                justifyContent: 'flex-start',
                                flexDirection: 'row',
                                marginTop: 5
                            }}>
                                <Text style={{
                                    fontSize: width / 25,
                                    color: 'black',
                                    marginTop: 5,
                                    fontFamily: 'Oswald'
                                }}>Cadenza:</Text>

                                <View style={{flexDirection: 'column'}}>

                                    {

                                        item['weeklyFrequency'].map((workDay, index) =>(
                                            <Text key={index} style={{fontSize: width / 20, marginTop: 2, fontFamily: 'Oswald', color: 'black'}}>{' ' + workDay.day + ' - ' + workDay.startTime.hour + ':' + workDay.endTime.minutes + ' | ' + workDay.endTime.hour + ':' + workDay.endTime.minutes}</Text>
                                        ))

                                    }
                                </View>


                            </View>

                            <View style={{
                                justifyContent: 'flex-start',
                                flexDirection: 'row',
                                marginTop: 5
                            }}>
                                <Text style={{
                                    fontSize: width / 25,
                                    color: 'black',
                                    marginTop: 5,
                                    fontFamily: 'Oswald'
                                }}>Inizio:</Text>
                                <Text
                                    style={{fontSize: width / 20, fontFamily: 'Oswald', color: 'black'}}>{' ' + item['period'].startDate }</Text>
                            </View>


                            <View style={{
                                justifyContent: 'flex-start',
                                flexDirection: 'row',
                                marginTop: 5
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    color: 'black',
                                    marginTop: 5,
                                    fontFamily: 'Oswald'
                                }}>Fine:</Text>
                                <Text
                                    style={{fontSize: 20, fontFamily: 'Oswald', color: 'black',}}>{' ' + item['period'].endDate}</Text>
                            </View>

                        </View>




                    </Card.Content>

                </Card>

            </CardView>
        )
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
                    opacity: 0.8,
                    backgroundColor: 'white'
                }}>


                <Card>
                    <Card.Cover source={{ uri: item.image }} />
                    <Card.Content>
                        <View>
                            <Title style={{ fontFamily: 'Oswald', fontSize: 25, paddingTop: 10, color: 'black'}}>{item.name}</Title>
                            <Divider/>
                            <View>
                                <View style={{
                                    justifyContent: 'flex-start',
                                    flexDirection: 'row',
                                    marginTop: 5
                                }}>
                                    <Text style={{
                                        fontSize: width / 28,
                                        color: 'black',
                                        marginTop: 5,
                                        fontFamily: 'Oswald'
                                    }}>Istruttore:</Text>
                                    <Text style={{fontSize: width / 25, fontFamily: 'Oswald', color: 'black',}}>{' ' + item['instructor']}</Text>
                                </View>

                                <View style={{
                                    justifyContent: 'flex-start',
                                    flexDirection: 'row',
                                    marginTop: 5
                                }}>
                                    <Text style={{
                                        fontSize: width / 28,
                                        color: 'black',
                                        marginTop: 5,
                                        fontFamily: 'Oswald'
                                    }}>Cadenza:</Text>

                                    <View style={{flexDirection: 'column'}}>

                                        {

                                            item['weeklyFrequency'].map((workDay, index) =>(
                                                <Text key={index} style={{fontSize: width / 25, marginTop: 2, fontFamily: 'Oswald', color: 'black'}}>{' ' + workDay.day + ' - ' + workDay.startTime.hour + ':' + workDay.endTime.minutes + ' | ' + workDay.endTime.hour + ':' + workDay.endTime.minutes}</Text>
                                            ))

                                        }
                                    </View>


                                </View>


                            </View>
                        </View>
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
                itemWidth={width - 100}
                data={this.state.fireCourse}
                layout={'default'}
                renderItem={this.props.whichCarousel ? this._renderItem : this._renderItem2}
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
