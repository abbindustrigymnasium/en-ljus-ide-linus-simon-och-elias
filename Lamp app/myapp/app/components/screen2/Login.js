import React, { Component } from "react";
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity, Animated, StatusBar, TextInput, Easing, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from 'expo';


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.Dark = new Animated.ValueXY({ x: 10000, y: 10000 })
        this.state = {
            imageURL : "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/light-bulb-icon.png",
            strength: [],
            opacity: new Animated.Value(0),
        }
    }

    Load_New_Image=()=>{
        this.setState({
            imageURL : "https://i.imgur.com/d3is5pq.png"
        })
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

    render() {
        if (!this.props.visible) {
            return false;
        }
        return (
            <View style={styles.container}>

                <LinearGradient colors={['#5b86e5', '#36D1DC']} style={styles.container}>

                    <View style={styles.appleicons}/>

                        <KeyboardAvoidingView behavior="padding" style={styles.container}>

                            <View style={styles.flexdirection}>

                                <TouchableOpacity onPress={this._InfoAnimation}>
                                    <Image style={styles.icons}
                                        source={{uri:"https://i.imgur.com/CMimq9D.png"}}>
                                    </Image>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenHowTo', {})}>
                                    <Image style={styles.icons}
                                        source={{uri:"https://i.imgur.com/WgNnO3R.png"}}>
                                    </Image>
                                </TouchableOpacity>
                                <Image style={styles.icons}
                                    opacity={0.35}
                                    source={{uri:"https://i.imgur.com/q8yK9xy.png"}}> 
                                </Image>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ScreenHome', {})}>
                                    <Image style={styles.icons} 
                                        source={{uri:"https://i.imgur.com/aMWWAck.png"}}> 
                                    </Image>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.logoContainer}>
                                <TouchableOpacity onPress={this.Load_New_Image}>
                                    <Image style={styles.logo} source={{uri: this.state.imageURL}}/>
                                </TouchableOpacity>
                                <Text style={styles.title}>En ljus ide</Text>
                            </View>

                            <View style={styles.container1}>

                                <StatusBar barStyle="light-content"/>

                                <TextInput
                                    placeholder="ID"
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    returnKeyType="next"
                                    onSubmitEditing={() => this.passwordInput.focus()}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={styles.input}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                />

                                <TextInput
                                    placeholder="PIN"
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    returnKeyType="go"
                                    secureTextEntry
                                    style={styles.input}
                                    ref={(input) => this.passwordInput = input}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                />
                                
                                <TouchableOpacity style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>ANSLUT</Text>
                                </TouchableOpacity>

                                <TouchableWithoutFeedback onPress={this._InfoAnimationNo}>
                                    <Animated.View
                                        style={[styles.shadow,
                                        {opacity:this.opacity},
                                        this.Dark.getLayout(),
                                        ]}>
                                    </Animated.View>
                                </TouchableWithoutFeedback>

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
    shadow: {
        backgroundColor: "rgba(0,0,0,0.65)",
        width: 5000,
        height: 5000,
        position: "absolute",
    },
    appleicons: {
        backgroundColor: "rgba(0,0,0,0.1)",
        paddingVertical: 11,
    },
    icons: {
        height: 35,
        width: 35,
        marginHorizontal: 10,
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
    flexdirection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 10,
    },
});