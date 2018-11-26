import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

export default class NavigationL extends Component {
    render() {
        return(
            <View style={styles.container}>
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
                    source={{uri:"https://i.imgur.com/DBn1Jvr.png"}}> 
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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
        height: 45,
        width: 45,
        position: "absolute",
        right: 130,
        top: 20,
        opacity: 0.5,
    },
});