import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  Image,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImageViewer from 'react-native-image-zoom-viewer';

import Flex from '../../components/common/Flex';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import List from '../../components/common/List';
import _ from 'lodash';
import { downloadImage } from '../../utils';
import { Request, getLoginInfo } from '../../api/index';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      desc: '',
      src: '',
      id: null,
      list: [],
      loading: false,
      offset: 0,
      more: true,
      modal_visible: false,
    };
  }

  componentDidMount() {
    getLoginInfo().then(res => {
      if (res) {
        // 如果找到数据，校验
        Request(
          'query',
          `checktAccount(phone: "${res.phone}", token: "${res.token}") {
            mes code
          }`,
        ).then(json => {
          const { code } = json.data.checktAccount;
          if (code !== 1) {
            this.handleGetList();
          } else {
            Actions.reset('tabBar');
          }
        });
      }
    });
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
          const arr =
            this.state.offset === 0 ? list : _.concat(this.state.list, list);
          _.forEach(list, (item, index) => {
            this.handleDown(index, item.src);
          });
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
      src: data.src,
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

  handleReLoad = () => {
    this.setState(
      pre => ({
        offset: 0,
        name: '',
        desc: '',
        id: null,
        src: '',
      }),
      () => {
        this.handleGetList();
      },
    );
  };

  handleShowImage = () => {
    if (this.state.id !== null) {
      this.setState({ modal_visible: true });
    } else {
      ToastAndroid.showWithGravity(
        '请点击图片获取信息',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  render() {
    const {
      name,
      desc,
      id,
      list,
      loading,
      more,
      modal_visible,
      src,
    } = this.state;
    return (
      <>
        <Modal
          visible={modal_visible}
          transparent={true}
          onRequestClose={() => {
            this.setState({ modal_visible: false });
          }}>
          <ImageViewer imageUrls={[{ url: src }]} />
        </Modal>
        <List
          ListFooterComponent={
            <Flex justifyCenter>
              {list.length > 0 && more ? (
                <Button onPress={this.handleGetList} type="white">
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
            id: item.id,
          }))}
        />
        <Flex style={styles.fixedInfo} alignCenter>
          {id !== null ? (
            <Flex style={{ width: '100%' }} column>
              <View style={styles.name}>
                <Flex>
                  <Text style={{ color: '#fff' }}>作品名:</Text>
                  <Text style={{ color: '#fff' }}>{name}</Text>
                </Flex>
              </View>
              <View style={styles.name}>
                <Flex>
                  <Text style={{ color: '#fff' }}>描述:</Text>
                  <Text style={{ color: '#fff' }} numberOfLines={1}>
                    {desc}
                  </Text>
                </Flex>
              </View>
              <Text style={{ color: '#fff', textAlign: 'right' }}>
                图片显示错误，请点击刷新
              </Text>
            </Flex>
          ) : (
            <Text style={{ width: '100%', color: '#fff', textAlign: 'center' }}>
              请点击图片获取信息
            </Text>
          )}
        </Flex>
        <Flex column alignCenter justifyAround style={styles.banner}>
          <TouchableOpacity
            onPress={this.handleComments}
            style={[styles.bannerBtn, { backgroundColor: '#f46' }]}>
            <Text style={{ color: '#fff' }}>点评</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleDetail}
            style={[styles.bannerBtn, { backgroundColor: '#090979' }]}>
            <Text style={{ color: '#fff' }}>查看详情</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleShowImage}
            style={[styles.bannerBtn, { backgroundColor: '#00d4ff' }]}>
            <Text style={{ color: '#fff' }}>查看大图</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleReLoad}
            style={[styles.bannerBtn, { backgroundColor: '#fff' }]}>
            <Text style={{ color: '#000' }}>刷新</Text>
          </TouchableOpacity>
        </Flex>
        <Loading show={loading} />
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
    const { height } = Dimensions.get('window');
    const { data } = this.props;
    const { src } = data;
    const loading = /file:/.test(src);

    return (
      <>
        <Loading color="#39f" show={!loading} bg />
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View style={[box, { height: height - 80 }]}>
            <Image resizeMode="contain" style={imgBox} source={{ uri: src }} />
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }
}

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
    backgroundColor: '#d9d9d9',
    borderBottomColor: '#888',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  imgBox: {
    width: '100%',
    height: '100%',
  },
  fixedInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 10,
    width: '100%',
    backgroundColor: '#000',
    opacity: 0.8,
  },
  name: {
    width: '70%',
    padding: 2,
    opacity: 0.8,
  },
  banner: {
    position: 'absolute',
    bottom: 40,
    right: 5,
  },
  bannerBtn: {
    marginTop: 10,
    display: 'flex',
    width: 60,
    height: 60,
    backgroundColor: '#39f',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
});
