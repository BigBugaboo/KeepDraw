import React, { Component } from 'react';
import { Actions, Router, Scene, Drawer } from 'react-native-router-flux';

import Nav from '@/components/common/Nav';

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
        <Drawer
          key="sideNav"
          drawerPosition="right"
          width={100}
          contentComponent={Nav}>
          <Scene key="root">{routes.map(item => renderComponent(item))}</Scene>
        </Drawer>
      </Router>
    );
  }
}

const renderComponent = obj => {
  const actions = {
    scene: () => {
      return <Scene navBarButtonColor="#39f" {...obj.option} />;
    },
  };

  if (typeof actions[obj.type] !== 'function') return null;
  return actions[obj.type]();
};
