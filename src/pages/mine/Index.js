import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { selectImage, downloadImage } from '../../utils';
import { Request, getLoginInfo } from '../../api/index';
import Loading from '../../components/common/Loading';
import Flex from '../../components/common/Flex';
import Button from '../..//components/common/Button';
import List from '../../components/common/List';

const menuList = [
  {
    key: 'mineInfo',
    title: '修改个人信息',
    path: 'mineInfo',
  },
  {
    key: 'draws',
    title: '修改密码',
    path: 'draws',
  },
  {
    key: 'collect',
    title: '收藏集',
    path: 'collect',
  },
  {
    key: 'copys',
    title: '临摹集',
    path: 'copys',
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
      showAvatar: '',
    };
  }

  componentDidMount() {
    getLoginInfo().then(res => {
      this.handleGetInfo(res.phone, res.token);
    });
  }

  handleGetInfo = (phone, token) => {
    this.setState({
      loading: true,
    });
    Request(
      'query',
      `
      getAccount(phone: "${phone}", token: "${token}") {
        mes
        code
        name
        avatar
      }
    `,
    ).then(res => {
      const { name, avatar, code, mes } = res.data.getAccount;
      avatar &&
        downloadImage(avatar)
          .then(img => {
            this.setState({
              showAvatar: img,
            });
          })
          .finally(() => {
            this.setState({
              loading: false,
            });
          });
      if (code === 1) {
        ToastAndroid.showWithGravity(
          mes,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        Actions.reset('login');
      }
      this.setState({
        name,
        showAvatar: avatar,
      });
    });
  };

  onPress = e => {
    if (e.key === 'logout') {
      global.storage.remove({
        key: 'userLoginInfo',
      });
      ToastAndroid.showWithGravity(
        '已注销',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      Actions.replace('login');
    } else {
      Actions.push(e.key);
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
    const { loading, showAvatar, name } = this.state;

    return (
      <View style={container}>
        <Loading show={loading} />
        {showAvatar ? (
          <Image
            style={avatar}
            source={{
              uri: showAvatar,
            }}
          />
        ) : (
          <Flex
            style={[styles.avatar, { backgroundColor: '#ddd' }]}
            alignCenter
            justifyCenter>
            <Text>未设置头像</Text>
          </Flex>
        )}
        <Text style={avatarName}>{name}</Text>
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
