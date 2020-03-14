import React, { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import Loading from '../../components/common/Loading';
import Button from '../..//components/common/Button';
import List from '../../components/common/List';

export default function Mine() {
  const [loading, setLoading] = useState(false);
  const menuList = [
    {
      key: 'info',
      title: '个人信息',
      path: '',
      placeholde: '可修改个人信息',
    },
    {
      key: 'money',
      title: '打赏',
      path: '',
      placeholde: '打赏点钱给苦命点程序员',
    },
    {
      key: 'suggest',
      title: '投诉建议',
      path: '',
      placeholde: '提交投诉申请',
    },
    {
      key: 'logout',
      title: '注销',
      path: '',
      color: '#d23',
      placeholde: '退出此账号',
    },
  ];

  const onPress = e => {
    console.log(e);
  };

  const {
    container,
    avatar,
    menu,
    avatarName,
    menuItem,
    menuItemText,
  } = styles;
  return (
    <View style={container}>
      <Loading
        show={loading}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
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
              onPress={() => onPress(item)}>
              {item.title}
            </Button>
          ),
          id: item.key,
        }))}
      />
    </View>
  );
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
    padding: 10,
    backgroundColor: '#fff',
  },
  menuItemText: {
    color: '#39f',
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: '#dfdfdf',
  },
});
