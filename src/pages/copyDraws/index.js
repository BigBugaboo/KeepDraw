import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import _ from 'lodash';
import days from 'dayjs';
import { Actions } from 'react-native-router-flux';

import Flex from '../../components/common/Flex';
import Button from '../../components/common/Button';
import List from '../../components/common/List';
import { uploadImage, downloadImage } from '../../utils';

export default class CopyDraws extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <List
          style={styles.content}
          data={_.map([], (item, index) => ({
            Content: () => (
              <View style={styles.box}>
                <Text>123</Text>
              </View>
            ),
            id: index,
          }))}
        />
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
});
