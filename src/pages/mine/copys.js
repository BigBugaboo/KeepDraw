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
import Big from 'big.js';

import Flex from '../../components/common/Flex';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import List from '../../components/common/List';
import { downloadImage } from '../../utils';
import { Request, getLoginInfo } from '../../api/index';

export default class Copys extends Component {
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
      const { offset } = this.state;
      Request(
        'query',
        `
        getPersonCopys(
            offset: ${offset},
            phone: "${res.phone}",
            token: "${res.token}"
          ) {
            list {
              _id
              src
              count
              createdAt
            }
            more
          }
        `,
      ).then(json => {
        const { more, list } = json.data.getPersonCopys;
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

  render() {
    const { loading, list, more, modal_visible } = this.state;
    const { content, box, img, infomation, date, info } = styles;

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
                  <Button
                    type="default"
                    onPress={() => {
                      this.setState({ modal_visible: true });
                    }}>
                    查看大图
                  </Button>
                  <View style={info}>
                    <Text style={date}>
                      {days(_.toNumber(item.createdAt)).format(
                        'YYYY-MM-DD HH:mm:ss',
                      )}
                    </Text>
                    {item.count ? (
                      <>
                        <Text numberOfLines={3}>原图作者评分</Text>
                        <Text>{+Big(item.count).times(100)}% 相似度</Text>
                      </>
                    ) : (
                      <Text>作者暂未评分</Text>
                    )}
                  </View>
                </View>
              </View>
            ),
            id: item._id,
          }))}
        />
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
    width: '61.8%',
    height: '100%',
    backgroundColor: '#898989',
  },
  infomation: {
    display: 'flex',
    width: '38.2%',
    height: '100%',
  },
  info: {
    width: '100%',
    padding: 5,
    display: 'flex',
  },
  tip: {
    color: '#898989',
  },
});
