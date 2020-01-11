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
        <Scene key="root" hideNavBar={true}>
          <Drawer
            key="sideNav"
            drawerPosition="right"
            width={100}
            contentComponent={Nav}>
            {Object.keys(routes).map(item => renderComponent(routes[item]))}
          </Drawer>
        </Scene>
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
