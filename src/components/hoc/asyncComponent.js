import React, { Component } from 'react';

const cacheState = {};

export default loadCop => class AsyncComponent extends Component {

    id = Math.random();
    state = {
        View: null,
    }

    componentWillMount() {
        cacheState[this.id] = true;
        if (this.state.View !== null) {
            return;
        }

        const p = typeof loadCop === 'function' ? loadCop() : loadCop;

        if (p.then && p.catch) {
            p.then(module => module.default).then(View => {
                if (cacheState[this.id]) {
                    this.setState({ View });
                }
            }).catch(err => {
                console.log('Cannot load component in <AsyncComponent />');
                throw err;
            });
        }
    }

    componentWillUnmount() {
        cacheState[this.id] = false;
    }

    render() {
        const { View } = this.state;
        return (View) ? <View {...this.props} /> : null;
    }
};
