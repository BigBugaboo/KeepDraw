import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Picker,
  TextInput,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import days from 'dayjs';

import Flex from '../../components/common/Flex';
import Button from '../../components/common/Button';
import List from '../../components/common/List';
import { uploadImage, downloadImage } from '../../utils';

export default class DrawsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.content}>
        <View style={styles.inputItem}>
          <Text style={styles.label}>名称：</Text>
          <TextInput style={styles.input} placeholder="请输入" />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.label}>时间：</Text>
          <TextInput
            style={[styles.input, { backgroundColor: '#ddd' }]}
            editable={false}
            placeholder="请输入"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.label}>分类：</Text>
          <Picker
            selectedValue={this.state.language}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue })
            }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.label}>描述：</Text>
          <TextInput style={styles.input} placeholder="请输入" />
        </View>
        <Flex justifyCenter>
          <Button type="danger" shape="round" style={{ padding: 10 }}>
            取消
          </Button>
          <Button
            type="primary"
            shape="round"
            style={{ padding: 10, marginLeft: 40 }}>
            保存
          </Button>
        </Flex>
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: height,
    backgroundColor: '#fff',
  },
  inputItem: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 80,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#dfdfdf',
    textAlign: 'right',
    padding: 4,
    marginRight: 10,
  },
  input: {
    borderBottomColor: '#dfdfdf',
    padding: 0,
    width: width - 100,
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
});