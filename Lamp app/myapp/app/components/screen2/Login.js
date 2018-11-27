import React, { Component } from "react";
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity, Animated, StatusBar, TextInput } from "react-native";
import { LinearGradient } from 'expo';


export default class Login extends Component {

    constructor(){
        super();
        this.state={
            imageURL : "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/light-bulb-icon.png",
            zIndex: new Animated.Value(-10),
        }
    }

    Load_New_Image=()=>{
        this.setState({
            imageURL : "https://i.imgur.com/d3is5pq.png"
        })
    }

    InfoAnimation = () => {
        Animated.timing(this.state.zIndex, {
            toValue: 10,
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

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenHome', {})}>
                        <Image style={styles.icons} 
                            source={{uri:"https://i.imgur.com/S9DcZjE.png"}}> 
                        </Image>
                    </TouchableOpacity>

                    <Image style={styles.icons1}
                        source={{uri:"https://i.imgur.com/Ym3QcbY.png"}}> 
                    </Image>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenHowTo', {})}>
                        <Image style={styles.icons2}
                            source={{uri:"https://i.imgur.com/h0k8Wop.png"}}> 
                        </Image>
                    </TouchableOpacity>

                    <View style={styles.appleicons}/>

                        <KeyboardAvoidingView behavior="padding" style={styles.container}>

                            <TouchableOpacity onPress={this.InfoAnimation}>
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

                            <View style={styles.container1}>

                                <StatusBar barStyle="light-content"/>

                                <TextInput
                                    placeholder="namn eller email"
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    returnKeyType="next"
                                    onSubmitEditing={() => this.passwordInput.focus()}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={styles.input}
                                />

                                <TextInput
                                    placeholder="lösenord"
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    returnKeyType="go"
                                    secureTextEntry
                                    style={styles.input}
                                    ref={(input) => this.passwordInput = input}
                                />

                                <TouchableOpacity style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>LOGGA IN</Text>
                                </TouchableOpacity>

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
    container1: {
        padding: 20,
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
    },
    icons3: {
        height: 42,
        width: 42,
        position: "absolute",
        right: 270,
        top: 2,
    },
    appleicons: {
        backgroundColor: "rgba(0,0,0,0.1)",
        paddingVertical: 10,
    },
    icons: {
        height: 50,
        width: 50,
        position: "absolute",
        right: 10,
        top: 22,
    },
    icons1: {
        height: 50,
        width: 50,
        position: "absolute",
        right: 70,
        opacity: 0.5,
        top: 22,
    },
    icons2: {
        height: 35,
        width: 33,
        position: "absolute",
        right: 140,
        top: 30,
    },
    input: {
        height: 40,
        backgroundColor: "rgba(0,0,0,0.15)",
        marginBottom: 10,
        color: "#ffffff",
        paddingHorizontal: 10,
        borderRadius: 7.5,
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
});