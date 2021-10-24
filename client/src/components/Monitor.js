import React, { Component } from 'react';
import { getAction, resetAction } from '../utils/lilith';

class Monitor extends Component {
    state = {
        actions: {}
    };

    componentDidMount() {
        this.setState({
            actions: getAction
        })
    }

    render() {
        let { actions } = this.state;

        return (
            <div>
                <h1>Monitor</h1>
            </div>
        )
    }
}
