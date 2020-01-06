import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default function Mine() {
  const menuList = [
    {
      title: '个人信息',
      path: '',
      placeholde: '可修改个人信息',
    },
    {
      title: '打赏',
      path: '',
      placeholde: '打赏点钱给苦命点程序员',
    },
    {
      title: '投诉建议',
      path: '',
      placeholde: '提交投诉申请',
    },
  ];

  const { container, avatar, menu, avatarName } = styles;
  return (
    <View style={container}>
      <View style={avatar} />
      <Text style={avatarName}>姓名</Text>
      <View style={menu} />
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
  menuItem: {},
});
