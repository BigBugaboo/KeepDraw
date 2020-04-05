import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Image,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import days from 'dayjs';
import { Actions } from 'react-native-router-flux';

import Flex from '../../components/common/Flex';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import List from '../../components/common/List';
import { selectImage, downloadImage } from '../../utils';
import { Request, getLoginInfo } from '../../api/index';

export default class Draws extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: '',
      list: [],
      loading: true,
      more: false,
      offset: 0,
    };
  }

  componentDidMount() {
    this.handleGetDraws();
  }

  handleGetDraws = async () => {
    this.setState({ loading: true });
    getLoginInfo().then(res => {
      Request(
        'query',
        `getDraws(
          offset: ${this.state.offset},
          sort: "",
          phone: "${res.phone}", 
          token: "${res.token}", 
        ) {
          list {
            _id
            title
            src
            author
            desc
            sort
            publish
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
            more,
          });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  };

  handleUpdateload = () => {
    selectImage(res => {
      if (res) {
        this.handleUpdateImage(res.uri);
      }
    }, 0);
  };

  handleRemove = id => {
    Alert.alert(
      '警告',
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
            Request('mutation', `removeDraws(id: "${id}") { mes }`).then(
              json => {
                ToastAndroid.showWithGravity(
                  json.data.removeDraws.mes,
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
                this.setState({
                  list: _.remove(this.state.list, i => {
                    return i._id !== id;
                  }),
                  loading: false,
                });
              },
            );
          },
        },
      ],
      { cancelable: false },
    );
  };

  handleUpdateImage = src => {
    getLoginInfo().then(res => {
      Request(
        'mutation',
        `addDraws(
          phone: "${res.phone}", 
          token: "${res.token}", 
          src: "${src}"
        ) {
          mes
          code
        }`,
      ).then(json => {
        const { code, mes } = json.data.addDraws;
        ToastAndroid.showWithGravity(
          mes,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        if (code === 1) {
          Actions.reset('tabBar');
        }

        this.setState(
          pre => ({
            offset: 0,
          }),
          () => {
            this.handleGetDraws();
          },
        );
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
        console.log(e);
      });
  };

  handleDetail = item => {
    Actions.push('drawsDetail', {
      ...item,
    });
  };

  render() {
    const {
      content,
      box,
      img,
      infomation,
      name,
      date,
      desc,
      banner,
      info,
    } = styles;
    const { loading, list, more } = this.state;

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
                <Image style={img} source={{ uri: item.src }} />
                <View style={infomation}>
                  <View style={info}>
                    <View>
                      <Text style={name}>{item.title || '未设置标题'}</Text>
                      <Text>作者：{item.author}</Text>
                      <Text style={date}>
                        {days(_.toNumber(item.createdAt)).format(
                          'YYYY-MM-DD HH:mm:ss',
                        )}
                      </Text>
                    </View>
                    <Flex column>
                      <Text>描述</Text>
                      <Text numberOfLines={2} style={desc}>
                        {item.desc}
                      </Text>
                    </Flex>
                  </View>
                  <View style={banner}>
                    <Button
                      type="danger"
                      onPress={() => this.handleRemove(item._id)}>
                      删除
                    </Button>
                    <Button
                      type="deafult"
                      onPress={this.handleDetail.bind(this, item)}>
                      修改
                    </Button>
                  </View>
                </View>
              </View>
            ),
            id: item._id,
          }))}
        />
        <Button type="primary" onPress={this.handleUpdateload}>
          上传
        </Button>
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
  name: {
    fontSize: 20,
  },
  date: {
    color: '#3d3d3d',
  },
  desc: {
    borderColor: '#3f3f3f',
    borderStyle: 'dotted',
    borderWidth: 1,
    padding: 4,
  },
});
