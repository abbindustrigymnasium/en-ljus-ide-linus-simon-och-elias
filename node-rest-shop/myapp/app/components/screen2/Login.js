import React, { Component } from "react";
import { StyleSheet, View, Image, Text, KeyboardAvoidingView } from "react-native";
import LoginFrom from "./LoginFrom";

export default class Login extends Component {
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={{uri: ("https://cdn4.iconfinder.com/data/icons/pixel-perfect-at-24px-volume-2/24/2092-512.png")}}/>
                    <Text style={styles.title}>En app gjord för att spara varor</Text>
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
        backgroundColor: "#e74c3c",
    },

    logoContainer: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
    
    logo: {
        width: 110,
        height: 110,
    },

    title: {
        color: "#ffffff",
        marginTop: 10,
        width: 110,
        textAlign: "center",
        opacity: 0.9,
    },
})