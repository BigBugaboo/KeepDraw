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
      if (json.data.getCopyDrawsCopys) {
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
      } else {
        console.log('哈');
        this.setState({
          loading: false,
          src: '',
        });
      }
    });
  };

  handleSubmit = count => {
    Request(
      'mutation',
      `
      updateCopys(id: "${this.state.id}", count: ${count}) { mes }
      `,
    ).then(json => {
      const { mes } = json.data.updateCopys;
      ToastAndroid.showWithGravity(
        mes,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    });
  };

  render() {
    const { loading, src, createdAt } = this.state;
    return (
      <View style={styles.container}>
        <Loading show={loading} />
        <Flex style={styles.box} justifyCenter alignCenter>
          {src ? (
            <Image
              resizeMode="contain"
              style={styles.img}
              source={{ uri: src }}
            />
          ) : (
            <Text>暂无临摹</Text>
          )}
        </Flex>
        <Flex style={styles.banner}>
          <Button
            style={styles.bannerItem}
            onPress={() => this.handleSubmit(0)}
            type="white">
            0%
          </Button>
          <Button
            style={styles.bannerItem}
            onPress={() => this.handleSubmit(0.25)}
            type="warn">
            25%
          </Button>
          <Button
            style={styles.bannerItem}
            onPress={() => this.handleSubmit(0.5)}
            type="success">
            50%
          </Button>
          <Button
            style={styles.bannerItem}
            onPress={() => this.handleSubmit(0.75)}
            type="primary">
            75%
          </Button>
          <Button
            style={styles.bannerItem}
            onPress={() => this.handleSubmit(1.0)}
            type="danger">
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
