import React, { Component } from 'react';
import {
  Text,
  View,
  ToastAndroid,
  StyleSheet,
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

export default class Collect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      more: true,
      loading: false,
      list: [],
      modal_visible: false,
      sort: 'draws',
    };
  }

  componentDidMount() {
    this.handleGetList();
  }

  handleGetList = () => {
    this.setState({ loading: true });
    getLoginInfo().then(res => {
      const { offset, sort } = this.state;
      Request(
        'query',
        `
          getCollect(
            offset: ${offset},
            sort: "${sort}",
            phone: "${res.phone}",
            token: "${res.token}"
          ) {
            list {
              _id
              src
              author
              desc
              sort
              comments
              title
              authorId
              publish
              isRemove
              createdAt
            }
            more
          }
        `,
      ).then(json => {
        const { more, list } = json.data.getCollect;
        _.forEach(list, (item, index) => {
          this.handleDown(index, item.src);
        });
        const arr = offset === 0 ? list : _.concat(list, this.state.list);
        this.setState({
          list: arr,
          offset: more ? this.state.offset + 1 : this.state.offset,
          more: !!more,
          loading: false,
        });
      });
    });
  };

  handleDown = (index, src) => {
    this.setState({ loading: true });
    downloadImage(src)
      .then(res => {
        const list = _.cloneDeep(this.state.list);
        list[index].src = res;
        this.setState({ list, loading: false });
      })
      .catch(e => {
        ToastAndroid.showWithGravity(
          '加载失败，请重新刷新',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  };

  handleDetail = id => {
    const data = _.find(this.state.list, i => i._id === id);
    Actions.push('homeDetail', {
      id: id,
      ...data,
    });
  };

  handleRemove = id => {
    this.setState({ loading: true });
    getLoginInfo().then(res => {
      Request(
        'mutation',
        `
        removeCollect(
          phone: "${res.phone}",
          token: "${res.token}",
          id: "${id}",,
          sort: "${this.state.sort}",
        ) {
          mes
          code
        }
      `,
      ).then(json => {
        const { code, mes } = json.data.removeCollect;
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
            loading: false,
          }),
          () => {
            this.handleGetList();
          },
        );
      });
    });
  };

  handleChangeSort = sort => {
    this.setState(
      pre => ({
        offset: 0,
        sort,
      }),
      () => {
        this.handleGetList();
      },
    );
  };

  handleUpdateload = id => {
    selectImage(res => {
      if (res) {
        this.handleUpdateImage(id, res.uri);
      }
    }, 2);
  };

  handleUpdateImage = (id, src) => {
    this.setState({ loading: true });
    getLoginInfo().then(res => {
      Request(
        'mutation',
        `
        addCopys(
          phone: "${res.phone}",
          token: "${res.token}",
          src: "${src}",,
          draws_id: "${id}",
        ) {
          mes
          code
        }
      `,
      ).then(json => {
        const { code, mes } = json.data.addCopys;
        ToastAndroid.showWithGravity(
          mes,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        if (code === 1) {
          Actions.reset('login');
        }

        this.setState({
          loading: false,
        });
      });
    });
  };

  render() {
    const { loading, list, more, modal_visible, sort } = this.state;
    const { content, box, img, infomation, date, banner, info } = styles;

    return (
      <>
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
                {item.publish ? (
                  <>
                    <Modal
                      visible={modal_visible}
                      transparent={true}
                      onRequestClose={() => {
                        this.setState({ modal_visible: false });
                      }}>
                      <ImageViewer imageUrls={[{ url: item.src }]} />
                    </Modal>
                    <Image style={img} source={{ uri: item.src }} />
                  </>
                ) : (
                  <Flex style={img} justifyCenter alignCenter>
                    <Text numberOfLines={2} style={{ color: '#fff' }}>
                      画册未发布，无法查看标题、原图及描述
                    </Text>
                  </Flex>
                )}
                <View style={infomation}>
                  <View style={info}>
                    {sort === 'draws' && item.publish ? (
                      <Text numberOfLines={1}>标题：{item.title}</Text>
                    ) : null}
                    <Text style={date}>
                      {days(_.toNumber(item.createdAt)).format(
                        'YYYY-MM-DD HH:mm:ss',
                      )}
                    </Text>
                    <Text numberOfLines={1}>作者：{item.author}</Text>
                    {sort === 'draws' && item.publish ? (
                      <Text numberOfLines={3}>描述：{item.desc}</Text>
                    ) : null}
                    <Text numberOfLines={1}>
                      状态：{item.publish ? '已发布' : '未发布'}
                    </Text>
                    {sort === 'draws' ? null : (
                      <Text style={{ color: '#898989' }}>
                        可将自己临摹的作品，上传给作者评分
                      </Text>
                    )}
                  </View>
                  <View style={banner}>
                    <Button
                      type="danger"
                      onPress={() => this.handleRemove(item._id)}>
                      取消收藏
                    </Button>
                    {item.publish ? (
                      <>
                        <Button
                          type="default"
                          onPress={() => {
                            this.setState({ modal_visible: true });
                          }}>
                          查看大图
                        </Button>
                        {sort === 'draws' ? (
                          <Button
                            type="primary"
                            onPress={() => this.handleDetail(item._id)}>
                            详情
                          </Button>
                        ) : (
                          <Button
                            type="primary"
                            onPress={() => this.handleUpdateload(item._id)}>
                            上传临摹
                          </Button>
                        )}
                      </>
                    ) : null}
                  </View>
                </View>
              </View>
            ),
            id: item._id,
          }))}
        />
        <Flex>
          <Button
            style={{ width: '50%' }}
            type="primary"
            onPress={() => this.handleChangeSort('draws')}>
            {sort === 'draws' ? '选择：' : ''}画册
          </Button>
          <Button
            style={{ width: '50%' }}
            type="danger"
            onPress={() => this.handleChangeSort('copyDraws')}>
            {sort === 'copyDraws' ? '选择：' : ''}临摹
          </Button>
        </Flex>
        <Loading show={loading} />
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
    backgroundColor: '#898989',
  },
  infomation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '61.8%',
    height: '100%',
  },
  info: {
    width: '70%',
    padding: 5,
    display: 'flex',
  },
  banner: {
    width: '30%',
  },
  tip: {
    color: '#898989',
  },
});
