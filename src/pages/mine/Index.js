import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import Loading from '../../components/common/Loading';
import Button from '../..//components/common/Button';
import List from '../../components/common/List';

const menuList = [
  {
    key: 'info',
    title: '修改个人信息',
    path: '',
  },
  {
    key: 'draws',
    title: '修改密码',
    path: 'draws',
  },
  {
    key: 'copyDraws',
    title: '收藏集',
    path: 'copyDraws',
  },
  {
    key: 'logout',
    title: '注销',
    path: '',
    color: '#d23',
  },
];

export default class Mine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  onPress = e => {
    const actions = {
      logout: () => {
        global.storage.remove({
          key: 'userLoginInfo',
        });
        ToastAndroid.showWithGravity(
          '已注销',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        Actions.replace('login');
      },
      draws: () => {
        Actions.push('draws');
      },
      info: () => {
        Actions.push('mineInfo');
      },
    };
    console.log(e);
    if (typeof actions[e.key] !== 'function') {
      return null;
    } else {
      actions[e.key]();
    }
  };

  render() {
    const {
      container,
      avatar,
      menu,
      avatarName,
      menuItem,
      menuItemText,
    } = styles;
    const { loading } = this.state;

    return (
      <View style={container}>
        <Loading show={loading} />
        <Image
          style={avatar}
          source={{
            uri:
              'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg',
          }}
        />
        <Text style={avatarName}>NMSL</Text>
        <List
          style={menu}
          data={_.map(menuList, item => ({
            Content: () => (
              <Button
                key={item.key}
                style={menuItem}
                textStyle={{
                  ...menuItemText,
                  color: item.color || menuItemText.color,
                }}
                onPress={() => this.onPress(item)}>
                {item.title}
              </Button>
            ),
            id: item.key,
          }))}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#39f',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 50,
    margin: 10,
  },
  avatarName: {
    color: '#fff',
    margin: 10,
  },
  menu: {
    backgroundColor: '#fff',
    width: '100%',
    flex: 1,
  },
  menuItem: {
    width: '100%',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
  },
  menuItemText: {
    color: '#39f',
    padding: 10,
  },
});
