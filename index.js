/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { YellowBox } from 'react-native';

AppRegistry.registerComponent(appName, () => App);

// 关闭全部黄色警告
console.disableYellowBox = true;
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires',
]);
