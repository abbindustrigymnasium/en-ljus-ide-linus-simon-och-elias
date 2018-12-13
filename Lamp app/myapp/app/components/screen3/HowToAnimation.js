import React, {Component} from "react";
import {StyleSheet, Image, Text, TouchableOpacity, View, Animated, Easing, TouchableWithoutFeedback} from "react-native";
import { LinearGradient } from 'expo';

export default class HowToAnimation extends Component {
    constructor(props) {
        super(props);
        this.moveAnimation = new Animated.ValueXY({ x: 0, y:-100 })
        this.Dark = new Animated.ValueXY({ x: 10000, y: 10000 })
        this.state = {
            navigation: this.props.navigation,
            opacity: new Animated.Value(0.4),
            opacityfar: new Animated.Value(0.15),
        }
    }

_InfoAnimation = () => {
    Animated.timing(this.Dark, {
        toValue: { x: -1000, y: -1000 },
        duration: 0,
        esing: Easing.linear,
    }).start(() => {

    });
}

_InfoAnimationNo = () => {
        Animated.timing(this.Dark, {
            toValue: { x: 10000, y: 10000 },
            duration: 0,
            esing: Easing.linear,
    }).start(() => {

    });
}


    _lampAnimation = () => {
        Animated.timing(this.moveAnimation, {
            toValue: { x: 220, y: -100 },
            duration: 1500,
            esing: Easing.linear,
        }).start(() => {
            Animated.timing(this.moveAnimation, {
                toValue: { x: 0, y: -100 },
                duration: 1500,
                easing: Easing.linear,
            }).start(() => {
                Animated.timing(this.moveAnimation, {
                    toValue: { x: 120, y: -100 },
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
                        Animated.timing(this.moveAnimation, {
                            toValue: { x: 120, y: 0 },
                            duration: 1000,
                            esing: Easing.linear,
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
                                Animated.timing(this.moveAnimation, {
                                    toValue: { x: 120, y: -200 },
                                    duration: 2000,
                                    esing: Easing.linear,
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
                                        Animated.timing(this.moveAnimation, {
                                            toValue: { x: 120, y: -100 },
                                            duration: 1000,
                                            esing: Easing.linear,
                                        }) ]).start(() => {
                                            Animated.timing(this.moveAnimation, {
                                                toValue: { x: 0, y: -100 },
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

                    <View style={styles.appleicons}/>
                    
                    <View style={styles.flexdirection}>

                        <TouchableOpacity onPress={this._InfoAnimation}>
                            <Image style={styles.icons}
                                source={{uri:"https://i.imgur.com/CMimq9D.png"}}>
                            </Image>
                        </TouchableOpacity>

                        <Image style={styles.icons}
                            opacity={0.35}
                            source={{uri:"https://i.imgur.com/WgNnO3R.png"}}>
                        </Image>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenLogin', {})}>
                        <Image style={styles.icons}
                            source={{uri:"https://i.imgur.com/q8yK9xy.png"}}> 
                        </Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenHome', {})}>
                            <Image style={styles.icons} 
                                source={{uri:"https://i.imgur.com/aMWWAck.png"}}> 
                            </Image>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.lampContainer}>
                        <Image style={styles.lamp} source={{uri:"http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/light-bulb-icon.png"}}/>
                    </View>

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
                    <View style={styles.handContainer}>
                    <Animated.Image 
                        source={{uri:"https://i.imgur.com/Bj5tGsC.png"}}
                        style={[styles.imageView,
                        this.moveAnimation.getLayout()
                    ]}>
                    </Animated.Image>
                    </View>
                    <View style={styles.container1}>
                        <TouchableOpacity style={styles.buttonContainer} onPress={this._lampAnimation}>
                            <Text style={styles.buttonText}>PREVIEW</Text>
                        </TouchableOpacity>
                    </View>

                </LinearGradient>

                <TouchableWithoutFeedback onPress={this._InfoAnimationNo}>
                    <Animated.View
                        style={[styles.shadow,
                        {opacity:this.opacity},
                        this.Dark.getLayout(),
                        ]}>
                    </Animated.View>
                </TouchableWithoutFeedback>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    container1: {
        padding: 20,
    },
    buttonContainer: {
        backgroundColor: "rgba(0,0,0,0.15)",
        paddingVertical: 15,
        borderRadius: 7.5,
    },
    handContainer: {
        justifyContent: "space-between",
    },
    buttonText: {
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "700",
    },
    imageView: {
        width: 100,
        height: 100,
        backgroundColor: "transparent",
        justifyContent: "center",
    },
    lampContainer: {
        alignItems: "center",
        flexGrow: 1,
        top: -90,
        zIndex: 10,
    },  
    lamp: {
        width: 100,
        height: 100,
        transform: [{ rotate: '180deg'}],
        zIndex: 10,
    },
    lampopacity: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#fff200",
        alignSelf: "center",
        position: "absolute",
        top: 85,
        zIndex: 5,
    },
    lampopacityfar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "#fffa65",
        alignSelf: "center",
        position: "absolute",
        top: 60,
        zIndex: 2,
    },
    appleicons: {
        backgroundColor: "rgba(0,0,0,0.1)",
        paddingVertical: 13,
        top: -5,
    },
    flexdirection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 10,
    },
    icons: {
        height: 35,
        width: 35,
        marginHorizontal: 10,
    },
    shadow: {
        backgroundColor: "rgba(0,0,0,0.65)",
        width: 5000,
        height: 5000,
        position: "absolute",
    },
});