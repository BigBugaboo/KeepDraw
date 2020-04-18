import React, { Component } from 'react';
import {
  Text,
  View,
  ToastAndroid,
  StyleSheet,
  Switch,
  Alert,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import _ from 'lodash';
import days from 'dayjs';
import { Actions } from 'react-native-router-flux';

import Flex from '../../components/common/Flex';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import List from '../../components/common/List';
import { selectImage, downloadImage } from '../../utils';
import { Request, getLoginInfo } from '../../api/index';

export default class CopyDraws extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      more: true,
      loading: false,
      list: [],
      modal_visible: false,
    };
  }

  componentDidMount() {
    this.handleGetList();
  }

  handleGetList = () => {
    this.setState({ loading: true });
    getLoginInfo().then(res => {
      const person = `getPersonCopyDraws(
        offset: ${this.state.offset}, 
        phone: "${res.phone}", 
        token: "${res.token}"
        )`;
      const normal = `getCopyDraws(
        offset: ${this.state.offset}, 
        authorId: "${this.props.id}"
        )`;
      const req = this.props.id ? normal : person;
      Request(
        'query',
        `${req} {
          list {
            _id
            src
            author
            publish
            updatedAt
            createdAt
            copys
          }
          more
        }`,
      )
        .then(json => {
          const text = this.props.id ? 'getCopyDraws' : 'getPersonCopyDraws';
          const { more, list } = json.data[text];
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

  handleUpdateLoad = () => {
    selectImage(res => {
      if (res) {
        this.handleUpdateImage(res.uri);
      }
    }, 2);
  };

  handleUpdateImage = src => {
    getLoginInfo().then(res => {
      Request(
        'mutation',
        `addCopyDraws(
            phone: "${res.phone}", 
            token: "${res.token}", 
            src: "${src}"
          ) {
            mes
            code
          }`,
      ).then(json => {
        const { code, mes } = json.data.addCopyDraws;
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
          }),
          () => {
            this.handleGetList();
          },
        );
      });
    });
  };

  handleDetail = id => {
    Actions.push('copyDrawsDetail', {
      id: id,
    });
  };

  handleDelete = id => {
    Alert.alert(
      '提示',
      '确认删除吗？',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '确认',
          onPress: () => {
            this.setState({ loading: true });
            getLoginInfo().then(res => {
              Request(
                'mutation',
                `removeCopyDraws(
                    phone: "${res.phone}", 
                    token: "${res.token}", 
                    id: "${id}",
                  ) {
                    mes
                    code
                  }`,
              ).then(json => {
                const { code, mes } = json.data.removeCopyDraws;
                ToastAndroid.showWithGravity(
                  mes,
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
                if (code === 1) {
                  Actions.reset('login');
                }
                let new_list = _.remove(this.state.list, i => i._id !== id);
                this.setState({
                  list: new_list,
                  loading: false,
                });
              });
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  handleChangePublish = (index, value, id) => {
    Alert.alert(
      '提示',
      `${value ? '确认发布' : '取消发布'}吗？`,
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '确认',
          onPress: () => {
            this.setState({ loading: true });
            getLoginInfo().then(res => {
              Request(
                'mutation',
                `editCopyDraws(
                    phone: "${res.phone}", 
                    token: "${res.token}", 
                    id: "${id}",
                    publish: ${value ? 1 : 0}
                  ) {
                    mes
                    code
                  }`,
              ).then(json => {
                const { code, mes } = json.data.editCopyDraws;
                ToastAndroid.showWithGravity(
                  mes,
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
                if (code === 1) {
                  Actions.reset('login');
                }
                let new_list = _.cloneDeep(this.state.list);
                new_list[index].publish = value;
                this.setState({
                  list: new_list,
                  loading: false,
                });
              });
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  handleAddCollect = id => {
    this.setState({ loading: true });
    getLoginInfo().then(res => {
      // 只有画册有详情 draws
      Request(
        'mutation',
        `
          addCollect(
            phone: "${res.phone}",
            token: "${res.token}",
            id: "${id}",
            sort: "copyDraws"
          ) {
            mes
            code
          }
        `,
      ).then(json => {
        const { code, mes } = json.data.addCollect;
        this.setState({ loading: false });
        ToastAndroid.showWithGravity(
          mes,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        if (code === 1) {
          Actions.reset('login');
        }
      });
    });
  };

  handleShowImage = () => {};

  render() {
    const { loading, list, more, modal_visible } = this.state;
    const { id } = this.props;
    const { content, box, img, infomation, date, banner, info, tip } = styles;

    return (
      <>
        <Loading show={loading} />
        <List
          style={content}
          ListFooterComponent={
            <Flex justifyCenter>
              {list.length > 0 && more ? (
                <Button style={{ width: '20%' }} type="white">
                  加载更多
                </Button>
              ) : (
                <Text>已经到底了</Text>
              )}
            </Flex>
          }
          data={_.map(list, (item, index) => ({
            Content: () => (
              <View style={box}>
                <Modal
                  visible={modal_visible}
                  transparent={true}
                  onRequestClose={() => {
                    this.setState({ modal_visible: false });
                  }}>
                  <ImageViewer imageUrls={[{ url: item.src }]} />
                </Modal>
                <Image style={img} source={{ uri: item.src }} />
                <View style={infomation}>
                  <View style={info}>
                    <View>
                      <Text style={date}>
                        {days(_.toNumber(item.createdAt)).format(
                          'YYYY-MM-DD HH:mm:ss',
                        )}
                      </Text>
                    </View>
                    <Text numberOfLines={1}>作者：{item.author}</Text>
                    <Text numberOfLines={1}>临摹热度：{item.copys.length}</Text>
                    {id ? null : (
                      <Flex alignCenter>
                        <Text>发布：{item.publish ? '已发布' : '未发布'}</Text>
                        <Switch
                          trackColor="#ffffff"
                          thumbColor="#3399ff"
                          testID={'publish'}
                          onValueChange={() =>
                            this.handleChangePublish(
                              index,
                              !item.publish,
                              item._id,
                            )
                          }
                          value={!!item.publish}
                        />
                      </Flex>
                    )}
                    <Text style={tip}>
                      {id
                        ? '收藏后，在 我的信息-收藏集 中查看该临摹'
                        : '发布后，其他用户可查看临摹画作'}
                    </Text>
                  </View>
                  <View style={banner}>
                    <Button
                      type="default"
                      onPress={() => {
                        this.setState({ modal_visible: true });
                      }}>
                      查看
                    </Button>
                    {id ? (
                      <>
                        {/* <Button
                          type="primary"
                          onPress={() => this.handleDelete(item._id)}>
                          上传
                        </Button> */}
                        <Button
                          type="default"
                          onPress={() => this.handleAddCollect(item._id)}>
                          收藏
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type="danger"
                          onPress={() => this.handleDelete(item._id)}>
                          删除
                        </Button>
                        <Button
                          type="primary"
                          onPress={() => this.handleDetail(item._id)}>
                          评分
                        </Button>
                      </>
                    )}
                  </View>
                </View>
              </View>
            ),
            id: item._id,
          }))}
        />
        {id ? null : (
          <Button type="primary" onPress={this.handleUpdateLoad}>
            上传
          </Button>
        )}
      </>
    );
  }
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  content: {
    width: '100%',
    backgroundColor: '#dfdfdf',
  },
  box: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: height / 4,
    marginBottom: 2,
  },
  img: {
    width: '38.2%',
    height: '100%',
  },
  infomation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '61.8%',
    height: '100%',
  },
  info: {
    width: '80%',
    padding: 5,
    display: 'flex',
  },
  banner: {
    width: '20%',
  },
  tip: {
    color: '#898989',
  },
});
