import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity} from "react-native";

export default class NavigationL extends Component {
    static navigationOptions ={
        title: "ScreenLogin",
    };
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.appleicons}/>
                <View style={styles.buttonContainer}/>
                <TouchableOpacity>
                    <Image style={styles.icons} 
                        source={require("C:/Users/s8simoga/Desktop/Apps/Lamp app/myapp/app/img/home.png")}> 
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icons1}
                        source={require("C:/Users/s8simoga/Desktop/Apps/Lamp app/myapp/app/img/settings.png")}> 
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icons2}
                        source={require("C:/Users/s8simoga/Desktop/Apps/Lamp app/myapp/app/img/Info.png")}> 
                    </Image>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },

    buttonContainer: {
        backgroundColor: "rgba(255,255,255,0.15)",
        height: 50,
        width: 350,
        position: "absolute",
        top: 20,
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
    },

    icons1: {
        height: 45,
        width: 45,
        position: "absolute",
        right: 70,
        top: 3,
    },

    icons2: {
        height: 50,
        width: 50,
        position: "absolute",
        right: 120,
        top: 3,
    },
});