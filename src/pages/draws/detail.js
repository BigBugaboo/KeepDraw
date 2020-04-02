import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Switch,
  Picker,
  ToastAndroid,
  TextInput,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import days from 'dayjs';
import { Actions } from 'react-native-router-flux';

import { Request, getLoginInfo } from '../../api/index';
import Flex from '../../components/common/Flex';
import Button from '../../components/common/Button';

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
      sortList: [],
    };
  }

  componentDidMount() {
    this.handleGetSort();
  }

  handleGetSort = () => {
    Request('query', `getSort { list { value text } }`).then(json => {
      this.setState({
        sortList: _.concat(
          { text: '未分类', value: null },
          json.data.getSort.list,
        ),
      });
    });
  };

  handleSubmit = () => {
    const { publish, title, desc, sort } = this.state;
    const { _id } = this.props;
    const arr = [title, desc, sort];
    if (!sort) {
      ToastAndroid.showWithGravity(
        '请设置分类',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return null;
    }
    if (publish && !_.every(arr, Boolean)) {
      ToastAndroid.showWithGravity(
        '发布需要完善作品信息！',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return null;
    }
    getLoginInfo().then(res => {
      Request(
        'mutation',
        `editDraws(
          phone: "${res.phone}",
          token: "${res.token}",
          id: "${_id}",
          title: "${title || ''}",
          desc: "${desc || ''}",
          sort: "${sort}",
          publish: ${publish ? 1 : 0}
        ) {
            mes
            code
        }`,
      ).then(json => {
        const { code, mes } = json.data.editDraws;
        ToastAndroid.showWithGravity(
          mes,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        if (code === 1) {
          Actions.reset('tabBar');
          return null;
        } else {
          Actions.pop();
        }
      });
    });
  };

  render() {
    const {
      publish,
      createdAt,
      author,
      sort,
      title,
      desc,
      sortList,
    } = this.state;

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
            selectedValue={sort}
            style={styles.input}
            onValueChange={itemValue => this.setState({ sort: itemValue })}>
            {_.map(sortList, item => (
              <Picker.Item
                key={item.value}
                label={item.text}
                value={item.value}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.label}>描述：</Text>
          <TextInput
            style={styles.input}
            placeholder="请输入"
            onChangeText={v => this.setState({ desc: v })}
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
