import React from 'react';

import Componentfunction from "./Componentfunction";

export default class ScreenHome extends React.Component {
    
    constructor(props) {

        super(props);

        this.state = {
            componentfunctionVisible: true,
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
            <Componentfunction
            navigation={this.props.navigation}
            toggleComponent={ (component) => this.toggleComponent(component) }
            hideComponent={ (component) => this.hideComponent(component) }
            showComponent={ (component) => this.showComponent(component) }
            visible={ this.state.componentfunctionVisible }
            />
        );
    }
};