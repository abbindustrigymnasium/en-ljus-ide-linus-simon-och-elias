import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default class Component1 extends React.Component {
    static navigationOptions ={
        title: "ScreenHome",
    };
    render() {
        this.props.navigation
        var {navigate} = this.props.navigation;
        return (
		<View>
            <Text> hi </Text>
            <Button onPress={() => navigate("ScreenLogin", {name:"hi"})}>
            </Button>
		</View>
		);
    }
}

const styles = StyleSheet.create({

});