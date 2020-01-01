import React, { Component } from 'react';

// 全局 catch
const cacheState = {};

export default loadCop =>
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        View: null,
      };
      this.id = Math.random();
    }

    UNSAFE_componentWillMount() {
      cacheState[this.id] = true;
      if (this.state.View !== null) {
        return;
      }

      // 解决 hoc 和类的问题
      const p = typeof loadCop === 'function' ? loadCop() : loadCop;

      if (p.then && p.catch) {
        p.then(module => module.default)
          .then(View => {
            if (cacheState[this.id]) {
              this.setState({ View });
            }
          })
          .catch(err => {
            console.log('Cannot load component in <AsyncComponent />');
            throw err;
          });
      }
    }

    UNSAFE_componentWillUnmount() {
      cacheState[this.id] = false;
    }

    render() {
      const { View } = this.state;
      return View ? <View {...this.props} /> : null;
    }
  };
