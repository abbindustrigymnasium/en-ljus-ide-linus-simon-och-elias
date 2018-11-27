import React, {Component} from "react"; //nu äre uppdated
import {StyleSheet, Image, Text, TouchableOpacity, View, Animated, Easing, Dimensions} from "react-native";
import { LinearGradient, Constants } from 'expo';
var { width, height } = Dimensions.get("window");

export default class HowToAnimation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: this.props.navigation,
            xValue: new Animated.Value(0),
            yValue: new Animated.Value(150),
            opacity: new Animated.Value(0.4),
            opacityfar: new Animated.Value(0.15),
            //index: new Animated.Value(-10),
        }
    }
/*
    onPress=()=>{
        this.setState({index: index});
    }
*/
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
                            toValue: height - 290,
                            duration: 1000,
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
                                            toValue: height - 425,
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

                /*
                <View 
                    style={[styles.shadow,
                    {zIndex:this.state.index},
                    ]}>
                </View>

                <View style={styles.container2}>
                <LinearGradient
                    colors={["#00fff", "#17c8ff", "#329bff", "#4c64ff", "#6536ff", "#8000ff"]}
                    start={{x:0.0, y:1.0}} end={{x:1.0, y:1.0}}
                    style={{ height: 48, width: 200, alignItems: "center", justifyContent: "center"}}
                >
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText2}>
                            LOGIN
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
                </View>
                */

    render () {
        if (!this.props.visible) {
            return false;
        }
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#5b86e5', '#36D1DC']} style={styles.container}>

                <View style={styles.appleicons}/>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenHome', {})}>
                    <Image style={styles.icons} 
                        source={{uri:"https://i.imgur.com/S9DcZjE.png"}}> 
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenLogin', {})}>
                    <Image style={styles.icons1}
                        source={{uri:"https://i.imgur.com/Ym3QcbY.png"}}> 
                    </Image>
                </TouchableOpacity>
                <Image style={styles.icons2}
                    source={{uri:"https://i.imgur.com/h0k8Wop.png"}}> 
                </Image>


                <TouchableOpacity onPress={this.InfoAnimation}>
                    <Image style={styles.icons3}
                        source={{uri:"https://i.imgur.com/DBn1Jvr.png"}}>
                    </Image>
                </TouchableOpacity>
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
        top: 60,
        zIndex: -2,
    },
    /*
    shadow: { //gör det transparent någonstans idk kom på något
        backgroundColor: "rgba(0,0,0,0.75)",
        width: 1000,
        height: 1000,
        position: "absolute",
    },
    */
    icons3: {
        height: 42,
        width: 42,
        position: "absolute",
        right: 270,
    },
    appleicons: {
        backgroundColor: "rgba(0,0,0,0.1)",
        paddingVertical: 10,
        top: -5,
    },
    icons: {
        height: 50,
        width: 50,
        position: "absolute",
        right: 10,
        top: -5,
    },
    icons1: {
        height: 50,
        width: 50,
        position: "absolute",
        right: 70,
        top: -2,
    },
    icons2: {
        height: 33,
        width: 33,
        position: "absolute",
        right: 140,
        top: 30,
        opacity: 0.5,
    },
    /*
    buttonContainer: {
        width: 200,
        alignItems: 'center',
    },
    buttonText2: {
        textAlign: 'center',
        backgroundColor: '#4C64FF',
        padding: 15,
        marginLeft: 1,
        marginRight: 1,
        width: 200,
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    */
});