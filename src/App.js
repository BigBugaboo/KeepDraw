import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';

import routes from './routes';

const scenes = Actions.create(
  <Scene key="root">
    {Object.keys(routes).map(item => (
      <Scene {...routes[item]} />
    ))}
  </Scene>,
);
export default class App extends Component {
  render() {
    return <Router scenes={scenes} />;
  }
}
