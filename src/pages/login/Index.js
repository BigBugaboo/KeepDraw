import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      phone: '',
      password: '',
      code: '',
    };
  }

  onLogin() {
    Actions.reset('tabBar');
    // Alert.alert('触发登录事件');
  }
  onRegister() {
    Actions.push('register');
  }

  onSendCode() {}

  onChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { phone, password, code, time } = this.state;
    const {
      container,
      main,
      row,
      form,
      input,
      rowText,
      rowInput,
      footer,
      normalFont,
      btnGroup,
    } = styles;

    return (
      <View style={main}>
        <View style={container}>
          <View style={form}>
            <View style={row}>
              <Text style={rowText}>手机</Text>
              <TextInput
                style={[rowInput, input]}
                onChangeText={this.onChange.bind(this, 'phone')}
                value={phone}
              />
            </View>
            <View style={row}>
              <Text style={rowText}>验证码</Text>
              <View style={rowInput}>
                <TextInput
                  style={[input, { flex: 3 }]}
                  onChangeText={this.onChange.bind(this, 'code')}
                  value={code}
                />
                <Button>发送验证码</Button>
              </View>
            </View>
          </View>
          <Flex justifyCenter>
            <Button type="link">密码登录</Button>
            <Button type="link">密码登录</Button>
          </Flex>
          <View style={btnGroup}>
            <Button
              type="primary"
              style={{ width: 100, margin: 20 }}
              onPress={this.onLogin}>
              登录
            </Button>
            <Button
              style={{ width: 100, margin: 20 }}
              onPress={this.onRegister}>
              注册
            </Button>
          </View>
        </View>
        <View style={footer}>
          <Text style={normalFont}>个人开发者：何俊泽</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#39f',
  },
  container: {
    backgroundColor: '#fff',
    margin: 'auto',
    width: '90%',
    borderRadius: 10,
    display: 'flex',
  },
  form: {
    paddingTop: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  rowText: {
    width: 60,
    marginRight: 10,
    textAlign: 'right',
  },
  rowInput: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  input: {
    padding: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#999',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
  },
  normalFont: {
    color: '#fff',
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
