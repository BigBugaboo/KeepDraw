import React, { Component } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { Actions, Router, Scene, Drawer } from 'react-native-router-flux';

import Nav from './components/common/Nav';
import { storage } from './storage';
import routes from './routes';

// 全局唯一声明
global.storage = storage;

export default class App extends Component {
  componentDidMount() {
    if (Platform.OS === 'android') {
      console.log('安卓', Platform.OS);
      this.requestCameraPermission();
    } else {
      // alert('IOS device found');
    }
  }

  requestCameraPermission = async () => {
    try {
      // 这里写的都是已进入软件就要获取的权限
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
      );
      const granted2 = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      const granted3 = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      const granted4 = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      // const granted4 = await PermissionsAndroid.request(
      //     PermissionsAndroid.PERMISSIONS.CAMERA,
      // )
    } catch (err) {
      // alert("err",err);
      console.warn(err, '错误警告');
    }
  };

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
        <Drawer key="sideNav" drawerPosition="right" contentComponent={Nav}>
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
