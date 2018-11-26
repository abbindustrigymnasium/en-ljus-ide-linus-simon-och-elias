import React, { Component } from "react";
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import LoginFrom from "./LoginFrom";
import NavigationL from "./NavigationL";

export default class Login extends Component {

    constructor(){
        super();
        this.state={
            imageURL : "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/light-bulb-icon.png"
        }
    }

    Load_New_Image=()=>{
        this.setState({
            imageURL : "https://i.imgur.com/Leka3K0.png"
        })
    }

    render() {
        if (!this.props.visible) {
            return false;
        }
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.fromContainer}>
                    <NavigationL/>
                </View>
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3498db",
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

    skiplogin: {
        height: 40,
        backgroundColor: "rgba(255,255,255,0.2)",
        marginTop: 10,
        color: "#ffffff",
        paddingHorizontal: 10,
        borderRadius: 10,
    }
})