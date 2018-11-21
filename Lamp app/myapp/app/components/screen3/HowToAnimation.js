import React, {Component} from "react";
import {
    StyleSheet, Image,
    Text, TouchableOpacity,
    View, Animated,
    Easing, Dimensions,
} from "react-native";
var { width, height } = Dimensions.get("window");

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xValue: new Animated.Value(0),
            yValue: new Animated.Value(100),
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            xValue: new Animated.Value(0),
            yValue: new Animated.Value(100),
        }
    }


    _moveAnimation = () => {
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
                    duration: 1500,
                    esing: Easing.linear,
                }).start(() => {
                    Animated.timing(this.state.yValue, {
                        toValue: height - 325,
                        duration: 1500,
                        esing: Easing.vertical,
                    }).start(() => {
                        Animated.timing(this.state.yValue, {
                            toValue: height - 550,
                            duration: 1500,
                            esing: Easing.vertical,
                        }).start(() => {
                            Animated.timing(this.state.yValue, {
                                toValue: height - 450,
                                duration: 1500,
                                esing: Easing.vertical,
                            }).start(() => {
                                Animated.timing(this.state.xValue, {
                                    toValue: width - 320,
                                    duration: 1500,
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
        return (
            <View style={styles.container}>
                <Image style={styles.lamp}
                    source={require("C:/Users/s8simoga/Desktop/Apps/Lamp app/myapp/app/img/light-bulb-icon.png")}>
                </Image>
                <Text style={styles.howtotext}>
                    gör detta 
                </Text>
                <Animated.Image 
                    source={require("C:/Users/s8simoga/Desktop/Apps/Lamp app/myapp/app/img/Hand.png")}
                    style={[styles.imageView,
                    {left:this.state.xValue},
                    {top:this.state.yValue},
                ]}>
                </Animated.Image>

                <TouchableOpacity style={styles.button1}
                    onPress={this._moveAnimation}    
                >
                <Text style={styles.buttonText}>Full Preview</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button2}
                    onPress={this._moveAnimation}    
                >
                <Text style={styles.buttonText}>Walkthrough</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#3498db",
    },
    button1: {
        height: 45,
        marginTop: 290,
        alignSelf: "flex-start",
        left: 10,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 7.5,
    },
    button2: {
        height: 45,
        marginTop: -45,
        alignSelf: "flex-end",
        right: 10,
        backgroundColor: "rgba(255,255,255,0.2)",
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
    howtotext: {
        fontSize: 18,
        alignSelf: "center",
        top: -150,
        color: "white",
    },
    lamp: {
        transform: [{ rotate: '180deg'}],
        width: 100,
        height: 100,
        backgroundColor: "transparent",
        alignSelf: "center",
    },
});