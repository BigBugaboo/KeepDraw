import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Switch,
  Picker,
  TextInput,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import days from 'dayjs';
import { Actions } from 'react-native-router-flux';

import Flex from '../../components/common/Flex';
import Button from '../../components/common/Button';
import List from '../../components/common/List';

export default class DrawsDetail extends Component {
  constructor(props) {
    super(props);

    const { publish, desc, author, createdAt, sort, title } = this.props;
    this.state = {
      publish: !!publish,
      title,
      author,
      desc,
      sort,
      createdAt,
    };
  }

  handleSubmit = () => {
    Actions.pop();
  }

  render() {
    const { publish, createdAt, author, sort, title, desc } = this.state;

    return (
      <View style={styles.content}>
        <View style={styles.inputItem}>
          <Text style={styles.label}>作品名：</Text>
          <TextInput
            value={title}
            style={styles.input}
            placeholder="请输入"
            onChangeText={v => this.setState({ title: v })}
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.label}>作者：</Text>
          <Text>{author}</Text>
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.label}>时间：</Text>
          <Text>
            {days(_.toNumber(createdAt)).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.label}>分类：</Text>
          <Picker
            selectedValue={this.state.language}
            style={styles.input}
            onValueChange={itemValue => this.setState({ sort: itemValue })}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.label}>描述：</Text>
          <TextInput
            style={styles.input}
            placeholder="请输入"
            onChangeText={v => this.setState({ title: v })}
            value={desc}
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.label}>发布：</Text>
          <Switch
            trackColor="#ffffff"
            thumbColor="#3399ff"
            testID={'publish'}
            onValueChange={() => {
              this.setState({ publish: !publish });
            }}
            value={publish}
          />
        </View>
        <Flex justifyCenter>
          <Button
            type="danger"
            shape="round"
            style={{ padding: 10 }}
            onPress={() => {
              Actions.pop();
            }}>
            取消
          </Button>
          <Button
            type="primary"
            shape="round"
            onPress={this.handleSubmit}
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
