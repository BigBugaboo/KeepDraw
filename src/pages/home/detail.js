import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  PanResponder,
  ScrollView,
  Image,
  ToastAndroid,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import days from 'dayjs';

import Flex from '../../components/common/Flex';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import List from '../../components/common/List';
import _ from 'lodash';
import { selectImage, downloadImage } from '../../utils';
import { Request, getLoginInfo } from '../../api/index';
const imgSrc =
  'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg';
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAvatar: true,
      sort: '',
    };
  }

  componentDidMount() {
    this.handleGetSort();
  }

  handleGetSort = () => {
    Request('query', `getSort { list { value text } }`).then(json => {
      const data = _.find(
        json.data.getSort.list,
        i => i.value === this.props.sort,
      );
      this.setState({
        sort: data.text,
      });
    });
  };

  handleComments = () => {
    Actions.push('comment', {
      id: this.props.id,
    });
  };

  handleCopyDraws = () => {
    Actions.push('copyDraws', {
      id: this.props.authorId,
    });
  };

  render() {
    const { author, title, comments, createdAt, desc, src } = this.props;
    const { showAvatar, sort } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
            style={styles.draws}
            resizeMode="contain"
            source={{
              uri: src,
            }}
          />
          <View style={styles.content}>
            <Text>标题：{title}</Text>
            <Text>作者：{author}</Text>
            <Text>分类：{sort}</Text>
            <Text>评论数：{comments.length}条</Text>
            <Text>
              时间：{days(_.toNumber(createdAt)).format('YYYY-MM-DD HH:mm:ss')}
            </Text>
            <Text>描述：{desc}</Text>
          </View>
        </ScrollView>
        <Flex column alignCenter justifyAround style={styles.banner}>
          {showAvatar ? (
            <Image style={styles.avatar} source={{ uri: imgSrc }} />
          ) : (
            <Flex
              style={[styles.avatar, { backgroundColor: '#ddd' }]}
              alignCenter
              justifyCenter>
              <Text>未设置头像</Text>
            </Flex>
          )}
          <TouchableOpacity
            onPress={this.handleComments}
            style={[styles.bannerBtn, { backgroundColor: '#f46' }]}>
            <Text style={{ color: '#fff' }}>点评</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bannerBtn, { backgroundColor: '#f33' }]}>
            <Text style={{ color: '#fff' }}>收藏</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleCopyDraws}
            style={styles.bannerBtn}>
            <Text style={{ color: '#fff' }}>查看临摹</Text>
          </TouchableOpacity>
        </Flex>
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: height,
    backgroundColor: '#fff',
  },
  draws: {
    width: '100%',
    height: height - 200,
  },
  content: {
    borderTopWidth: 2,
    borderStyle: 'solid',
    borderTopColor: '#dfdfdf',
    width: '80%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
    marginBottom: 50,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#39f',
    borderRadius: 50,
    right: 0,
  },
  banner: {
    position: 'absolute',
    bottom: 100,
    right: 0,
  },
  bannerBtn: {
    marginTop: 10,
    display: 'flex',
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: '#39f',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
});
