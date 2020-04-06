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
import Loading from '../../components/common/Loading';
import List from '../../components/common/List';
import _ from 'lodash';
import { selectImage, downloadImage } from '../../utils';
import { Request, getLoginInfo } from '../../api/index';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      desc: '',
      id: null,
      list: [],
      loading: false,
      offset: 0,
      more: true,
    };
  }

  componentDidMount() {
    this.handleGetList();
  }

  handleGetList = () => {
    this.setState({ loading: true });
    const sort = this.props.sort || '';
    getLoginInfo().then(res => {
      Request(
        'query',
        `getDraws(
          offset: ${this.state.offset},
          sort: "${sort}"
        ) {
          list {
            _id
            title
            src
            author
            authorId
            desc
            sort
            comments
            updatedAt
            createdAt
          }
          more
        }`,
      )
        .then(json => {
          const { more, list } = json.data.getDraws;
          _.forEach(list, (item, index) => {
            this.handleDown(index, item.src);
          });
          const arr =
            this.state.offset === 0 ? list : _.concat(list, this.state.list);
          this.setState({
            list: arr,
            offset: more ? this.state.offset + 1 : this.state.offset,
            more: !!more,
          });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  };

  handleDown = (index, src) => {
    downloadImage(src)
      .then(res => {
        const list = _.cloneDeep(this.state.list);
        list[index].src = res;
        this.setState({ list });
      })
      .catch(e => {
        ToastAndroid.showWithGravity(
          '加载失败，请重新刷新',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  };

  handelChangeState = data => {
    this.setState({
      name: data.title,
      desc: data.desc,
      id: data._id,
    });
  };

  handleComments = () => {
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

  handleDetail = () => {
    const data = _.find(this.state.list, i => i._id === this.state.id);
    if (this.state.id !== null) {
      Actions.push('homeDetail', {
        id: this.state.id,
        ...data,
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
    const { name, desc, id, list, loading, more } = this.state;
    return (
      <>
        <Loading show={loading} />
        <List
          ListFooterComponent={
            <Flex justifyCenter>
              {list.length > 0 && more ? (
                <Button style={{ width: '20%' }} type="white">
                  加载更多
                </Button>
              ) : (
                <Text style={styles.empty}>已经到底了~~</Text>
              )}
            </Flex>
          }
          style={styles.list}
          data={_.map(list, (item, index) => ({
            Content: props => (
              <Content
                data={{ ...item }}
                onClick={() => this.handelChangeState(item)}
                index={index}
                {...props}
              />
            ),
            id: index,
          }))}
        />
        <Flex style={styles.fixedBanner} alignCenter>
          <TouchableOpacity
            style={styles.fixedBtn}
            onPress={this.handleComments}>
            <Text style={{ color: '#fff' }}>点评</Text>
          </TouchableOpacity>
          {id !== null ? (
            <Flex column>
              <TouchableOpacity onPress={this.handleDetail}>
                <View style={styles.name}>
                  <Flex>
                    <Text>作品名:</Text>
                    <Text>{name}</Text>
                  </Flex>
                </View>
                <View style={styles.name}>
                  <Flex>
                    <Text>描述:</Text>
                    <Text numberOfLines={1}>{desc}</Text>
                  </Flex>
                </View>
                <Text>点击可查看作品详情</Text>
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
    const { src } = data;

    return (
      <TouchableHighlight onPress={this.handlePress}>
        <View style={[box, { height: height - 80 }]}>
          <Image resizeMode="contain" style={imgBox} source={{ uri: src }} />
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
  empty: {
    textAlign: 'center',
    color: '#999',
    padding: 10,
    marginBottom: 100,
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
