import React from 'react';

import {StyleSheet, View,} from "react-native";

import {createStackNavigator,} from 'react-navigation';

import ScreenHome from "./app/components/screen1/ScreenHome";
import ScreenLogin from "./app/components/screen2/ScreenLogin";
import ScreenHowTo from "./app/components/screen3/ScreenHowTo";
import Screen1 from './app/components/screentest1/Screen1';
import Screen2 from './app/components/screentest2/Screen2';

const StackNaviApp = createStackNavigator({
    Screen1: { 
        screen: Screen1,
        navigationOptions: {
            title: false,
            header: null,
        }
    },
    Screen2: { 
        screen: Screen2,
        navigationOptions: {
            title: false,
            header: null,
        }
    },
    ScreenHowTo: {
        screen: ScreenHowTo,
        navigationOptions: {
            title: false,
            header: null,
        }
    },
    ScreenLogin: {
        screen: ScreenLogin,
        navigationOptions: {
            title: false,
            header: null,
        }
    },
    ScreenHome: { 
        screen: ScreenHome,
        navigationOptions: {
            title: false,
            header: null,
        }
    },
},{ headerMode: 'screen' });

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StackNaviApp/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});