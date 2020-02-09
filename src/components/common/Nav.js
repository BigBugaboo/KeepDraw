import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

const menu = [
  {
    key: 'tabBar',
    title: '首页',
    method: 'reset',
  },
  {
    key: 'mine',
    title: '我的信息',
    method: 'push',
  },
];

export default () => {
  const onPress = ({ key, method }) => {
    if (method === 'reset') {
      Actions.reset(key);
    } else if (method === 'push') {
      Actions.push(key);
    } else {
      Actions.push(key);
    }
  };

  return (
    <View style={styles.container}>
      {_.map(menu, (item, index) => (
        <TouchableOpacity
          style={styles.menuItem}
          key={index}
          onPress={() => onPress(item)}>
          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  menuItem: {
    backgroundColor: '#39f',
    display: 'flex',
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  itemText: {
    color: '#fff',
    textAlign: 'center',
  },
});
