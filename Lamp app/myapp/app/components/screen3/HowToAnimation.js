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
            yValue: new Animated.Value(-100),
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
/*
                <TouchableOpacity onPress={this.InfoAnimation}>
                <Image style={styles.iconss}
                   source={{uri:"https://i.imgur.com/ckCwx8E.png"}}>
                </Image>
                </TouchableOpacity>
*/

    render () {
        if (!this.props.visible) {
            return false;
        }
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#5b86e5', '#36D1DC']} style={styles.container}>

                    <View style={styles.appleicons}/>
                    
                    <View style={styles.flexdirection}>
                        <Image style={styles.icons}
                            opacity={0.5}
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

                    <Animated.Image 
                        source={{uri:"https://i.imgur.com/Bj5tGsC.png"}}
                        style={[styles.imageView,
                        {left:this.state.xValue},
                        {top:this.state.yValue},
                    ]}>
                    </Animated.Image>

                    <View style={styles.container1}>
                        <TouchableOpacity style={styles.buttonContainer} onPress={this._lampAnimation}>
                            <Text style={styles.buttonText}>PREVIEW</Text>
                        </TouchableOpacity>
                    </View>

                </LinearGradient>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
    },
    container1: {
        padding: 20,
    },
    buttonContainer: {
        backgroundColor: "rgba(0,0,0,0.15)",
        paddingVertical: 15,
        borderRadius: 7.5,
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
        top: -90, //123 inte universiellt
        //justifyContent: "flex-start",
    },  
    lamp: {
        width: 100,
        height: 100,
        transform: [{ rotate: '180deg'}],
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
    appleicons: {
        backgroundColor: "rgba(0,0,0,0.1)",
        paddingVertical: 13,
        top: -5,
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
    /*
    iconss: {
        height: 35,
        width: 35,
        marginHorizontal: 100, //123 inte lika på alla skärmar
    },
    */
});