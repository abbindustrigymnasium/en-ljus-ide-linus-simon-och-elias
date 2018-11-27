import React from 'react';

import {createStackNavigator} from 'react-navigation';

import ScreenHome from "./app/components/screen1/ScreenHome";
import ScreenLogin from "./app/components/screen2/ScreenLogin";
import ScreenHowTo from "./app/components/screen3/ScreenHowTo";

const StackNaviApp = createStackNavigator({
    /*ScreenLogin: {
        screen: ScreenLogin,
        navigationOptions: {
            title: false,
            header: null,
        }
    },*/
    ScreenHowTo: {
        screen: ScreenHowTo,
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
            <StackNaviApp/>
        );
    }
};