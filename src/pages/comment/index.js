import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Flex from '../../components/common/Flex';
import Button from '../../components/common/Button';
import List from '../../components/common/List';
import _ from 'lodash';
import days from 'dayjs';

const arr = [
  {
    id: 0,
    author: '作者',
    date: new Date(),
    content:
      '12312312111111111111111111111111111111111111111111111111111111111111111111111111111111111112',
  },
  {
    id: 1,
    author: '作者',
    date: new Date(),
    content:
      '12312312111111111111111111111111111111111111111111111111111111111111111111111111111111111112',
  },
];

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <List
          ListFooterComponent={
            <Text style={{ textAlign: 'center', color: '#999' }}>
              已经到底了~~
            </Text>
          }
          style={styles.list}
          data={_.map(arr, (item, index) => ({
            Content: props => <Content data={item} index={index} {...props} />,
            id: index,
          }))}
        />
        <Flex style={styles.reply} alignCenter>
          <TextInput style={styles.replyInput} placeholder="请输入回复内容" />
          <Button
            style={styles.replyBtn}
            onPress={this.handlePress}
            type="primary">
            回复
          </Button>
          <Button style={styles.replyBtn}>收藏</Button>
        </Flex>
      </>
    );
  }
}

class Content extends Component {
  handlePress = () => {
    console.log('test');
  };
  render() {
    const { box, topBox, comment } = styles;
    const { data } = this.props;
    const { author, content, date } = data;

    return (
      <Flex style={box}>
        <Flex column style={comment}>
          <Flex>
            <Text style={topBox}>{author}</Text>
            <Text style={{ paddingLeft: 10, color: '#857857' }}>
              {days(date).format('YYYY-MM-DD HH-mm-ss')}
            </Text>
          </Flex>
          <Text>{content}</Text>
        </Flex>
      </Flex>
    );
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: '#ddd',
  },
  box: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#fff',
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  topBox: {
    color: '#39f',
    opacity: 0.8,
  },
  comment: {
    padding: 4,
  },
  reply: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  replyInput: {
    borderColor: '#999',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#dfdfdf',
    margin: 4,
    height: 40,
    flex: 8,
  },
  replyBtn: {
    flex: 2,
    height: 40,
  },
});
