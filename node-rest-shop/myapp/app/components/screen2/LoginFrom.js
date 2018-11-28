import React, { Component } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from "react-native";

export default class LoginFrom extends Component {
    render() {
        return(
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <TextInput
                placeholder="username or email"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                />
                <TextInput
                placeholder="password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="go"
                secureTextEntry
                style={styles.input}
                ref={(input) => this.passwordInput = input}
                />
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },

    input: {
        height: 40,
        backgroundColor: "#e55547",
        marginBottom: 10,
        color: "#ffffff",
        paddingHorizontal: 10,
        borderRadius: 10,
    },

    buttonContainer: {
        backgroundColor: "#e55547",
        paddingVertical: 15,
        borderRadius: 10,
    },

    buttonText: {
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "700",
    },
});