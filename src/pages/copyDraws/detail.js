import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ToastAndroid,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import days from 'dayjs';

import Flex from '../../components/common/Flex';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import { Request } from '../../api/index';
import { downloadImage } from '../../utils';

export default class CopyDrawsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id: '',
      src: '',
      createdAt: 0,
    };
  }

  componentDidMount() {
    this.handleGetCopy();
  }

  handleGetCopy = () => {
    this.setState({ loading: true });
    Request(
      'query',
      `
      getCopyDrawsCopys(id: "${this.props.id}") {
        _id
        src
        createdAt
      }
      `,
    ).then(json => {
      const { _id, src, createdAt } = json.data.getCopyDrawsCopys;

      downloadImage(src)
        .then(res => {
          this.setState({
            loading: false,
            id: _id,
            createdAt: _.toNumber(createdAt),
            src: res,
          });
        })
        .catch(e => {
          ToastAndroid.showWithGravity(
            '加载失败，请重新刷新',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    });
  };

  render() {
    const { loading, src, createdAt } = this.state;
    return (
      <View style={styles.container}>
        <Loading show={loading} />
        <View style={styles.box}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={{ uri: src }}
          />
        </View>
        <Flex style={styles.banner}>
          <Button style={styles.bannerItem} type="white">
            0%
          </Button>
          <Button style={styles.bannerItem} type="warn">
            25%
          </Button>
          <Button style={styles.bannerItem} type="success">
            50%
          </Button>
          <Button style={styles.bannerItem} type="primary">
            75%
          </Button>
          <Button style={styles.bannerItem} type="danger">
            100%
          </Button>
        </Flex>
        <Flex style={styles.bannerTip} justifyBetween>
          <Text>评分（越高越好）</Text>
          {createdAt ? (
            <Text>{days(createdAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
          ) : null}
        </Flex>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#ddd',
    flex: 1,
  },
  box: {
    flex: 1,
  },
  img: {
    height: '100%',
    width: '100%',
  },
  banner: {
    height: 40,
    backgroundColor: '#39f',
  },
  bannerItem: {
    flex: 1,
  },
  bannerTip: {
    position: 'absolute',
    bottom: 40,
    color: '#393939',
    left: 0,
    width: '100%',
  },
});
