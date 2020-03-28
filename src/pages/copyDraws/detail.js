import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Flex from '../../components/common/Flex';
import Button from '../../components/common/Button';
import List from '../../components/common/List';
import _ from 'lodash';
import days from 'dayjs';

const arr = [
  {
    id: 0,
    author: '作者',
    date: new Date(),
    content:
      '12312312111111111111111111111111111111111111111111111111111111111111111111111111111111111112',
  },
  {
    id: 1,
    author: '作者',
    date: new Date(),
    content:
      '12312312111111111111111111111111111111111111111111111111111111111111111111111111111111111112',
  },
];

export default class CopyDrawsDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={{
              uri:
                'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg',
            }}
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
        <Text style={styles.bannerTip}>评分（越高越好）</Text>
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');
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
    right: 0,
  },
});
