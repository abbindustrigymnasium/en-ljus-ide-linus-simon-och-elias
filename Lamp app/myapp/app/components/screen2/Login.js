import React, { Component } from "react";
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from 'expo';
import LoginFrom from "./LoginFrom";
import NavigationL from "./NavigationL";

export default class Login extends Component {

    constructor(){
        super();
        this.state={
            imageURL : "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/light-bulb-icon.png",
            opacityshadow: new Animated.Value(0),
        }
    }

    Load_New_Image=()=>{
        this.setState({
            imageURL : "https://i.imgur.com/d3is5pq.png"
        })
    }

    _infoanimation = () => {
        Animated.timing(this.state.opacityshadow, {
            toValue: 0.75,
            duration: 0,
            useNativeDriver: true,
        }).start(() => {

        });
    }

    render() {
        if (!this.props.visible) {
            return false;
        }
        return (
            <View style={styles.container}>
            <LinearGradient colors={['#5b86e5', '#36D1DC']} style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.fromContainer}>
                    <NavigationL/>
                </View>
                <Animated.View
                    style={[styles.shadow,
                    {opacity:this.state.opacityshadow},
                    ]}>
                </Animated.View>
                <TouchableOpacity onPress={this._infoanimation}> kan inte klicka
                    <Image style={styles.icons3}
                        source={{uri:"https://i.imgur.com/DBn1Jvr.png"}}>
                    </Image>
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <TouchableOpacity onPress={this.Load_New_Image}>
                        <Image style={styles.logo} source={{uri: this.state.imageURL}}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>En ljus ide</Text>
                </View>
                <View style={styles.fromContainer}>
                    <LoginFrom/>
                </View>
            </KeyboardAvoidingView>
            </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },  
    logo: {
        width: 150,
        height: 150,
    },
    title: {
        color: "#ffffff",
        marginTop: 10,
        width: 110,
        textAlign: "center",
        opacity: 0.9,
    },
    shadow: { //gör det transparent någonstans idk kom på något
        backgroundColor: "rgba(0,0,0,0.75)",
        width: 1000,
        height: 1000,
        position: "absolute",
        zIndex: 10,
    },
    icons3: {
        height: 42,
        width: 42,
        position: "absolute",
        right: 270,
        top: 2,
    }
});