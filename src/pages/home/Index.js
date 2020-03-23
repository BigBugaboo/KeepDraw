import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  PanResponder,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from '../../components/common/Button';
import List from '../../components/common/List';
import _ from 'lodash';

const arr = [
  {
    title: '标题1',
    author: '作者',
    img:
      'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg',
  },
  {
    title: '标题2',
    author: '作者',
    img:
      'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg',
  },
  {
    title: '标题3',
    author: '作者',
    img:
      'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg',
  },
  {
    title: '标题4',
    author: '作者',
    img:
      'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg',
  },
  {
    title: '标题5',
    author: '作者',
    img:
      'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg',
  },
];

export default class Home extends Component {
  render() {
    const { list } = styles;
    return (
      <List
        style={list}
        data={_.map(arr, (item, index) => ({
          Content: props => <Content data={item} index={index} {...props} />,
          id: index,
        }))}
      />
    );
  }
}

class Content extends Component {
  handlePress = () => {
    
  };
  render() {
    const { box } = styles;
    const { width, height } = Dimensions.get('window');
    const { data } = this.props;
    const { title } = data;

    return (
      <TouchableWithoutFeedback onPressIn={this.handlePress}>
        <View style={[box, { height }]}>
          <Text>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: '#888',
  },
  box: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
});
