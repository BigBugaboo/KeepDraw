import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ToastAndroid,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { selectImage, downloadImage } from '../../utils';
import { Request, getLoginInfo } from '../../api/index';
import Loading from '../../components/common/Loading';
import Flex from '../../components/common/Flex';
import Button from '../..//components/common/Button';

export default class Collect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#39f',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});
