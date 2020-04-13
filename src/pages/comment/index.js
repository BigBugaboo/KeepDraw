import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ToastAndroid,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import days from 'dayjs';

import Flex from '../../components/common/Flex';
import Button from '../../components/common/Button';
import List from '../../components/common/List';
import { selectImage, downloadImage } from '../../utils';
import { Request, getLoginInfo } from '../../api/index';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      more: true,
      offset: 0,
      content: '',
    };
  }

  componentDidMount() {
    this.handleGetList();
  }

  handleGetList = () => {
    const { offset } = this.state;
    const { id } = this.props;
    Request(
      'query',
      `
        getComments(offset: ${offset}, id: "${id}") {
          list {
            author
            content
            createdAt
          }
          more
        }
      `,
    ).then(json => {
      const { more, list } = json.data.getComments;
      this.setState({
        list: list,
        more: !!more,
      });
    });
  };

  handleSubmit = () => {
    if (!this.state.content) {
      ToastAndroid.showWithGravity(
        '请输入点评内容',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return null;
    }

    this.handleSendComments();
  };

  handleSendComments = () => {
    const { id } = this.props;
    const { content } = this.state;
    getLoginInfo().then(res => {
      Request(
        'mutation',
        `
        addComments(
        phone: "${res.phone}", 
        token:"${res.token}", 
        id: "${id}", 
        content: "${content}") {
          mes
          code
        }
      `,
      ).then(json => {
        const { mes, code } = json.data.addComments;
        ToastAndroid.showWithGravity(
          mes,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        if (code === 1) {
          Actions.reset('login');
        }

        this.setState(
          pre => ({
            offset: 0,
            content: '',
          }),
          () => {
            this.handleGetList();
          },
        );
      });
    });
  };

  handleChangeComments = val => {
    this.setState({
      content: val,
    });
  };

  render() {
    const { more, list, content } = this.state;
    return (
      <>
        <List
          ListFooterComponent={
            <Text style={{ textAlign: 'center', color: '#999' }}>
              已经到底了~~
            </Text>
          }
          style={styles.list}
          data={_.map(list, (item, index) => ({
            Content: props => <Content data={item} index={index} {...props} />,
            id: index,
          }))}
        />
        <Flex style={styles.reply} alignCenter>
          <TextInput
            onChangeText={this.handleChangeComments}
            style={styles.replyInput}
            value={content}
            placeholder="请输入回复内容"
          />
          <Button
            style={styles.replyBtn}
            onPress={this.handleSubmit}
            type="primary">
            回复
          </Button>
        </Flex>
      </>
    );
  }
}

class Content extends Component {
  render() {
    const { box, topBox, comment } = styles;
    const { data } = this.props;
    const { author, content, createdAt } = data;

    return (
      <Flex style={box}>
        <Flex column style={comment}>
          <Flex>
            <Text style={topBox}>{author}</Text>
            <Text style={{ paddingLeft: 10, color: '#857857' }}>
              {days(_.toNumber(createdAt)).format('YYYY-MM-DD HH:mm:ss')}
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
