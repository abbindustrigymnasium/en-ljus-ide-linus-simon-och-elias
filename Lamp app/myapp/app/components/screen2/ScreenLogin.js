import React from 'react';

import Login from './Login';

export default class ScreenLogin extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            LoginVisible: true,
        }

    }

    toggleComponent(component = false) {

        if (!component) {
            return false;
        }

        let prop = component + 'Visible';
        let val  = this.state[prop];
        if (typeof val === 'undefined') {
            return false;
        }

        this.setState({
            [prop]: val === true ? false : true
        })

        return true;

    }

    hideComponent(component = false) {

        if (!component) {
            return false;
        }

        let prop = component + 'Visible';

        this.setState({
            [prop]: false
        })

        return true;

    }

    showComponent(component = false) {

        if (!component) {
            return false;
        }

        let prop = component + 'Visible';

        this.setState({
            [prop]: true
        })

        return true;

    }
    render() {
        return (
            <Login
            navigation={this.props.navigation}
            toggleComponent={ (component) => this.toggleComponent(component) }
            hideComponent={ (component) => this.hideComponent(component) }
            showComponent={ (component) => this.showComponent(component) }
            visible={ this.state.LoginVisible }
            />
        );
    }
};