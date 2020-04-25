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
    key: 'draws',
    title: '画册',
    method: 'push',
  },
  {
    key: 'copyDraws',
    title: '临摹任务',
    method: 'push',
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
    backgroundColor: '#fff',
    display: 'flex',
    padding: 10,
    borderLeftWidth: 10,
    borderLeftColor: '#39f',
    borderStyle: 'solid',
  },
  itemText: {
    color: '#39f',
    textAlign: 'center',
  },
});
