import React, { Component } from 'react';
import { Router, Scene, Tabs } from 'react-native-router-flux';

import routes from './routes';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          {Object.keys(routes).map(item => renderComponent(routes[item]))}
        </Scene>
      </Router>
    );
  }
}

const renderComponent = obj => {
  const actions = {
    tabs: () => {
      return (
        <Tabs key={obj.key} lazy={true}>
          {obj.children.map(item => (
            <Scene {...item} />
          ))}
        </Tabs>
      );
    },
    scene: () => {
      return <Scene {...obj.value} />;
    },
  };

  if (typeof actions[obj.type] !== 'function') return null;
  return actions[obj.type]();
};
