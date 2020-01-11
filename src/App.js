import React, { Component } from 'react';
import { Actions, Router, Scene, Modals, Tabs } from 'react-native-router-flux';

import Login from '@/pages/login/Index';

import routes from './routes';

export default class App extends Component {
  // 自定义返回
  onBackPress = () => {
    if (Actions.state.index !== 0) {
      return false;
    }
    Actions.pop();
    return true;
  };

  render() {
    return (
      <Router backAndroidHandler={this.onBackPress}>
        <Scene key="root">
          {Object.keys(routes).map(item => renderComponent(routes[item]))}
        </Scene>
      </Router>
    );
  }
}

const renderComponent = obj => {
  const actions = {
    scene: () => {
      return (
        <Scene navBarButtonColor="#39f" {...obj.value} />
      );
    },
  };

  if (typeof actions[obj.type] !== 'function') return null;
  return actions[obj.type]();
};
