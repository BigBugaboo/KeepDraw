import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  PanResponder,
  Image,
  ToastAndroid,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Flex from '../../components/common/Flex';
import Button from '../../components/common/Button';
import List from '../../components/common/List';
import _ from 'lodash';

const arr = [
  {
    id: 0,
    title: '标题1',
  },
  {
    id: 1,
    title: '标题2',
  },
  {
    id: 2,
    title: '标题3',
  },
  {
    id: 3,
    title: '标题4',
  },
  {
    id: 4,
    title: '标题5',
  },
  {
    id: 5,
    title: '标题6',
  },
  {
    id: 6,
    title: '标题7',
  },
];

export default class Sort extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex style={styles.container} wrap justifyBetween>
        {_.map(arr, (item, index) => (
          <TouchableOpacity style={styles.item} key={item.id}>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </Flex>
    );
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#39f',
    borderBottomWidth: 4,
    borderStyle: 'solid',
  },
  itemText: {
    textAlign: 'center',
  }
});
