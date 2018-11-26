import React, {Component} from "react";
import {StyleSheet, Image, Text, TouchableOpacity, View, Animated, Easing, Dimensions} from "react-native";
import NavigationI from "./NavigationI";
import { LinearGradient } from 'expo';
var { width, height } = Dimensions.get("window");

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xValue: new Animated.Value(0),
            yValue: new Animated.Value(150),
            opacity: new Animated.Value(0.4),
            opacityfar: new Animated.Value(0.15),
        }
    }

    _lampAnimation = () => {
        Animated.timing(this.state.xValue, {
            toValue: width - 100,
            duration: 1500,
            esing: Easing.linear,
        }).start(() => {
            Animated.timing(this.state.xValue, {
                toValue: 0,
                duration: 1500,
                easing: Easing.linear,
            }).start(() => {
                Animated.timing(this.state.xValue, {
                    toValue: width - 200,
                    duration: 900,
                    esing: Easing.linear,
                }).start(() => {
                    Animated.parallel([
                        Animated.timing(this.state.opacity, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                        Animated.timing(this.state.opacityfar, {
                            toValue: 0,
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                        Animated.timing(this.state.yValue, {
                            toValue: height - 325,
                            duration: 1000, //1500
                            esing: Easing.vertical,
                        }) ]).start(() => {
                            Animated.parallel([
                                Animated.timing(this.state.opacity, {
                                toValue: 1,
                                duration: 2000,
                                useNativeDriver: true,
                            }),
                                Animated.timing(this.state.opacityfar, {
                                    toValue: 0.5,
                                    duration: 2000,
                                    useNativeDriver: true,
                                }),
                                Animated.timing(this.state.yValue, {
                                    toValue: height - 500,
                                    duration: 2000,
                                    esing: Easing.vertical,
                                }) ]).start(() => {
                                    Animated.parallel([
                                        Animated.timing(this.state.opacity, {
                                        toValue: 0.4,
                                        duration: 1000,
                                        useNativeDriver: true,
                                    }),
                                        Animated.timing(this.state.opacityfar, {
                                            toValue: 0.15,
                                            duration: 1000,
                                            useNativeDriver: true,
                                        }),
                                        Animated.timing(this.state.yValue, {
                                            toValue: height - 400,
                                            duration: 1000,
                                            esing: Easing.vertical,
                                        }) ]).start(() => {
                                            Animated.timing(this.state.xValue, {
                                                toValue: width - 320,
                                                duration: 900,
                                                esing: Easing.linear,
                                            }).start(() => {

                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }

    render () {
        if (!this.props.visible) {
            return false;
        }
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#5b86e5', '#36D1DC']} style={styles.container}>
                <View style={styles.fromContainer}>
                    <NavigationI/>
                </View>
                <Image
                    style={styles.lamp}
                    source={{uri:"http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/light-bulb-icon.png"}}>
                </Image>
                <Animated.View
                    style={[styles.lampopacity,
                    {opacity:this.state.opacity},
                    ]}>
                </Animated.View>
                <Animated.View
                    style={[styles.lampopacityfar,
                    {opacity:this.state.opacityfar},
                    ]}>
                </Animated.View>
                <Animated.Image 
                    source={{uri:"https://i.imgur.com/Bj5tGsC.png"}}
                    style={[styles.imageView,
                    {left:this.state.xValue},
                    {top:this.state.yValue},
                ]}>
                </Animated.Image>
                <TouchableOpacity style={styles.button1}
                    onPress={this._lampAnimation}
                >
                <Text style={styles.buttonText}>Full Preview</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2}
                    onPress={this._lampAnimation}
                >
                <Text style={styles.buttonText}>Walkthrough</Text>
                </TouchableOpacity>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    button1: {
        height: 45,
        marginTop: 290,
        alignSelf: "flex-start",
        left: 10,
        backgroundColor: "rgba(0,0,0,0.15)",
        borderRadius: 7.5,
    },
    button2: {
        height: 45,
        marginTop: -45,
        alignSelf: "flex-end",
        right: 10,
        backgroundColor: "rgba(0,0,0,0.15)",
        borderRadius: 7.5,
    },
    buttonText: {
        color: "white",
        padding: 12,
        fontWeight: "bold",
        fontSize: 18,
        justifyContent: "center",
    },
    imageView: {
        width: 100,
        height: 100,
        backgroundColor: "transparent",
    },
    lamp: {
        transform: [{ rotate: '180deg'}],
        width: 100,
        height: 100,
        backgroundColor: "transparent",
        alignSelf: "center",
        top: 45,
    },
    lampopacity: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#fff200",
        alignSelf: "center",
        position: "absolute",
        top: 85,
        zIndex: -1,
    },
    lampopacityfar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "#fffa65",
        alignSelf: "center",
        position: "absolute",
        top: 65,
        zIndex: -2,
    },
});