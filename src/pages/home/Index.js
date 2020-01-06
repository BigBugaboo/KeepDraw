import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import List from '@/components/common/List';
import _ from 'lodash';
import { hidden } from 'ansi-colors';

export default class Home extends Component {
  render() {
    const { content, box } = styles;
    const arr = ['1', '2', '3', '4', '5', '6'];
    const { width, height } = Dimensions.get('window');
    return (
      <List
        style={content}
        data={_.map(arr, (item, index) => ({
          Content: () => (
            <View style={[box, { height }]}>
              <Text>{item}</Text>
            </View>
          ),
          id: index,
        }))}
      />
    );
  }
}
const styles = StyleSheet.create({
  content: {
    width: '100%',
    backgroundColor: '#888',
  },
  box: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
});
