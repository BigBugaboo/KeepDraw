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
    author: '作者',
    desc: '123123123123',
    img:
      'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg',
  },
  {
    id: 1,
    title: '标题2',
    author: '作者',
    img:
      'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg',
  },
  {
    id: 2,
    title: '标题3',
    author: '作者',
    img:
      'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg',
  },
  {
    id: 3,
    title: '标题4',
    author: '作者',
    img:
      'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg',
  },
  {
    id: 4,
    title: '标题5',
    author: '作者',
    img:
      'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg',
  },
];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      desc: '',
      id: null,
    };
  }

  handelChangeState = data => {
    console.log(data);
    this.setState({
      name: data.title,
      desc: data.desc,
      id: data.id,
    });
  };

  handleDetail = () => {
    if (this.state.id !== null) {
      Actions.push('comment', {
        id: this.state.id,
      });
    } else {
      ToastAndroid.showWithGravity(
        '请点击图片获取信息',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  render() {
    const { list } = styles;
    const { name, desc, id } = this.state;
    return (
      <>
        <List
          ListFooterComponent={
            <Text style={{ textAlign: 'center', color: '#999', padding: 10 }}>
              已经到底了~~
            </Text>
          }
          style={list}
          data={_.map(arr, (item, index) => ({
            Content: props => (
              <Content
                data={item}
                onClick={() => this.handelChangeState(item)}
                index={index}
                {...props}
              />
            ),
            id: index,
          }))}
        />
        <Flex style={styles.fixedBanner} alignCenter>
          <TouchableOpacity style={styles.fixedBtn} onPress={this.handleDetail}>
            <Text style={{ color: '#fff' }}>鉴赏</Text>
          </TouchableOpacity>
          {id !== null ? (
            <Flex column>
              <TouchableOpacity style={styles.name}>
                <Flex>
                  <Text>作品名:</Text>
                  <Text>{name}</Text>
                </Flex>
              </TouchableOpacity>
              <TouchableOpacity style={styles.name}>
                <Flex>
                  <Text>描述:</Text>
                  <Text numberOfLines={1}>{desc}</Text>
                </Flex>
              </TouchableOpacity>
            </Flex>
          ) : (
            <Text>请点击图片获取信息</Text>
          )}
        </Flex>
      </>
    );
  }
}

class Content extends Component {
  handlePress = () => {
    this.props.onClick();
  };
  render() {
    const { box, imgBox } = styles;
    const { width, height } = Dimensions.get('window');
    const { data } = this.props;
    const { title, img } = data;

    return (
      <TouchableHighlight onPress={this.handlePress}>
        <View style={[box, { height: height - 80 }]}>
          <Image resizeMode="contain" style={imgBox} source={{ uri: img }} />
        </View>
      </TouchableHighlight>
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
    width: '100%',
    backgroundColor: '#fff',
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  imgBox: {
    width: '100%',
    height: '100%',
  },
  fixedBanner: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    width: width - 40,
    backgroundColor: '#aaa',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    opacity: 0.8,
  },
  fixedBtn: {
    backgroundColor: '#f46',
    height: 60,
    width: 60,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    padding: 4,
    opacity: 0.8,
  },
});
