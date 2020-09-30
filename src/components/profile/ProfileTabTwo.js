import React, { Component } from 'react';

import {Text, Dimensions, View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import PureChart from 'react-native-pure-chart';
import Spinner from "react-native-loading-spinner-overlay";
import {Button, TextInput, Divider} from "react-native-paper";
import reactotron from "reactotron-react-native";
import firebase from 'react-native-firebase';
import Modal from 'react-native-modal';
import CardView from "react-native-cardview";

const {width, height} = Dimensions.get("window");
export default class ProfileTabTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: true,
            sampleData: [],
            imc: 0,
            modal: false,
            modalType: "edit",
            height: this.props.userAnemic['height'] ? (this.props.userAnemic['height']) : null,
            weight: this.props.userAnemic['weight'] ? this.props.userAnemic['weight'] : null,
            h2: null,
            w2: null,
        }

    }

    calculateImc = (string) => {
        if (string === "second") {
            let weight = parseInt(this.state.weight);
            let height = parseInt(this.state.height) / 100;
            let imc = weight / (height * height);
            return parseFloat(imc.toFixed(2));
        } else {
            let weight = parseInt(this.props.userAnemic['weight']);
            let height = parseInt(this.props.userAnemic['height']) / 100;
            let imc = weight / (height * height);
            return parseFloat(imc.toFixed(2));
        }
    }

    componentDidMount() {

        this.setState({
            sampleData: this.props.userAnemic['chart'] ? (this.props.userAnemic['chart']) : null,
        }, () => {

            this.setState({spinner: false})
        })
    }


    switchModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    addImc = () => {

        this.setState({
            spinner: true
        }, () => {

            let date = new Date();
            let today = date.getDate()+'-'+(date.getMonth()+1)+"-"+date.getFullYear();
            let imcUser = [];


            imcUser = this.props.userAnemic['chart'] ? (this.props.userAnemic['chart']) : ([]);
            if (this.state.imc !== null) {
                imcUser.push({x: today, y: this.calculateImc("second")})
            } else {
                //notify
            }


            firebase.firestore().collection('MedicalHistory').doc(this.props.anemicID).update({
                imc: this.calculateImc("second"),
                chart: imcUser
            }).then(() => {
                this.setState({spinner: false, imc: this.calculateImc("second")})
            }).catch(err => {
                reactotron.log(err)
            })


        })

    }

    updateAnemic = () =>{
        this.setState({spinner: true, modal: false}, () => {
            firebase.firestore().collection('MedicalHistory').doc(this.props.anemicID).update({
                weight: this.state.weight,
                height: this.state.height
            }).then(() => {
                this.setState({spinner: false, w2: this.state.weight, h2: this.state.height})
            }).catch(err => {
                reactotron.log(err)
            })
        })

    }

    render() {

        return (
            <View>



                {this.state.spinner ? (<Spinner visible={this.state.spinner}/>) : (

                    <View style={{flexDirection: 'column', marginLeft: 20, marginTop: 10, paddingBottom: 10}}>

                        <View style={{alignItems: 'center'}}>
                            <Modal
                                onBackButtonPress={() => this.switchModal()}
                                isVisible={this.state.modal}
                                coverScreen={true}
                                hasBackdrop={true}>
                                <View style={{ flex: 1 }}>

                                    <CardView
                                        cardElevation={7}
                                        cardMaxElevation={2}
                                        cornerRadius={8}
                                        style={{
                                            marginTop: 20,
                                            marginLeft: 24,
                                            marginRight: 24,
                                            backgroundColor: 'white',

                                        }}>

                                        { this.state.modalType === "edit" &&
                                        <View style={{flexDirection: 'column', justifyContent: 'space-around', marginLeft: 20, marginTop: 10, paddingBottom: 10, marginRight: 20}}>
                                            <Text style={styles.mainTitle}>Altezza</Text>
                                            <TextInput
                                                keyboardType={'number-pad'}
                                                mode='outlined'
                                                value={this.state.height}
                                                placeholder={this.state.height}
                                                onChangeText={height => this.setState({ height })}
                                                theme={{
                                                    colors: {
                                                        primary: 'black',
                                                    }
                                                }}
                                            />

                                            <Text style={styles.mainTitle}>Peso</Text>
                                            <TextInput
                                                placeholder={this.state.weight}
                                                value={this.state.weight}
                                                keyboardType={'number-pad'}
                                                mode='outlined'
                                                onChangeText={weight => this.setState({ weight })}
                                                theme={{
                                                    colors: {
                                                        primary: 'black',
                                                    }
                                                }}
                                            />

                                            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                                                <Button
                                                    mode='contained'
                                                    dark={true}
                                                    color={'#980f00'}
                                                    contentStyle={{
                                                        width: width / 3.5,
                                                        paddingTop: 5,
                                                        paddingBottom: 5,
                                                    }}
                                                    onPress={() => {this.switchModal()}}>
                                                    Annulla
                                                </Button>

                                                <Button
                                                    mode='contained'
                                                    dark={true}
                                                    color={'green'}
                                                    contentStyle={{
                                                        width: width / 3.5,
                                                        paddingTop: 5,
                                                        paddingBottom: 5,
                                                        alignSelf: 'flex-end'
                                                    }}
                                                    onPress={() => this.updateAnemic()}>
                                                    Salva
                                                </Button>


                                            </View>
                                        </View>
                                        }

                                        { this.state.modalType === "calculate" &&
                                        <View style={{flexDirection: 'column', justifyContent: 'center', marginLeft: 20, marginTop: 10, paddingBottom: 10, marginRight: 20}}>
                                            <Text style={styles.subtitle}>Il tuo IMC è: {this.calculateImc("second")}</Text>

                                            <Divider />
                                            <Text style={styles.subtitle}>Vuoi aggiungerlo al grafico?</Text>


                                            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
                                                <Button
                                                    mode='contained'
                                                    dark={true}
                                                    color={'#980f00'}
                                                    contentStyle={{
                                                        width: width / 3.5,
                                                        paddingTop: 5,
                                                        paddingBottom: 5,
                                                    }}
                                                    onPress={() => {this.switchModal()}}>
                                                    Annulla
                                                </Button>

                                                <Button
                                                    mode='contained'
                                                    dark={true}
                                                    color={'green'}
                                                    contentStyle={{
                                                        width: width / 3.5,
                                                        paddingTop: 5,
                                                        paddingBottom: 5,
                                                        alignSelf: 'flex-end'
                                                    }}
                                                    onPress={() => {this.setState({modal:false}, () => { this.addImc() })}}>
                                                    Aggiungi
                                                </Button>


                                            </View>
                                        </View>
                                        }

                                    </CardView>
                                </View>
                            </Modal>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

                            <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
                                <Text style={styles.mainTitle}>Altezza</Text>
                                <Text style={styles.subtitle}>{this.state.h2 ? this.state.h2 + 'cm' : this.props.userAnemic['height'] + 'cm'}</Text>

                                <Text style={styles.mainTitle}>Peso</Text>
                                <Text style={styles.subtitle}>{this.state.w2 ? this.state.w2 + 'kg' : this.props.userAnemic['weight'] + 'kg'}</Text>

                                <Text style={styles.mainTitle}>IMC</Text>
                                <Text style={styles.subtitle}>{this.state.imc ? this.state.imc : this.props.userAnemic['imc']}</Text>

                            </View>

                            <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
                                <Button
                                    icon='pencil'
                                    mode='contained'
                                    dark={true}
                                    color={'green'}
                                    contentStyle={{
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        alignItems: "center"
                                    }}
                                    onPress={() => this.setState({modalType: "edit"}, () => {this.switchModal()})}>
                                    Modifica
                                </Button>

                                <Button
                                    icon='calculator-variant'
                                    mode='contained'
                                    dark={true}
                                    color={'green'}
                                    contentStyle={{
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                        alignItems: "center"
                                    }}
                                    onPress={() => this.setState({modalType: "calculate"}, () => {this.switchModal()})}>
                                    Calcola IMC
                                </Button>
                            </View>

                        </View>



                        {this.state.sampleData !== undefined && <View style={{justifyContent: "center", marginTop: 30, marginRight: width / 8}}>
                            <PureChart
                                data={[
                                    {seriesName: 'series1', data: this.state.sampleData, color: '#980f00'},
                                ]}
                                type='line'
                                height={height / 5}
                                color="#980f00"
                            />
                        </View>
                        }



                    </View>


                )
                }

            </View>

        );
    }
}

const styles = StyleSheet.create({
    mainTitle: {
        color: 'black',
        fontFamily: 'Oswald'
    },
    subtitle: {
        color: 'black',
        fontSize: 25,
        fontFamily: 'Oswald'
    }

});

