import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0, // 0: 密码登录,1: 验证码登录
      time: 60,
      phone: '',
      password: '',
      code: '',
      timer: null,
    };
  }

  onLogin() {
    Actions.reset('tabBar');
    // Alert.alert('触发登录事件');
  }
  onRegister() {
    Actions.push('register');
  }

  onSendCode() {
    const timer = setInterval(() => {
      this.setState(
        preState => ({
          time: preState.time - 1,
        }),
        () => {
          if (this.state.time === 0) {
            clearInterval(this.state.timer);
            this.setState({
              time: 60,
            });
          }
        },
      );
    }, 1000);

    this.setState({
      timer,
    });
  }

  onChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { phone, password, code, time, type } = this.state;
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
      navBtnGroup,
      navBtnGroupItem,
    } = styles;
    console.log(this.state.time);
    return (
      <View style={main}>
        <View style={container}>
          <Flex style={navBtnGroup} justifyCenter>
            <TouchableOpacity
              style={navBtnGroupItem}
              onPress={() => this.setState({ type: 0 })}>
              <Text style={{ color: '#fff' }}>密码登录</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={navBtnGroupItem}
              onPress={() => this.setState({ type: 1 })}>
              <Text style={{ color: '#fff' }}>验证码登录</Text>
            </TouchableOpacity>
          </Flex>
          <View style={form}>
            <View style={row}>
              <Text style={rowText}>手机</Text>
              <TextInput
                style={[rowInput, input]}
                onChangeText={this.onChange.bind(this, 'phone')}
                value={phone}
                maxLength={11}
              />
            </View>
            {!type ? (
              <View style={row}>
                <Text style={rowText}>密码</Text>
                <TextInput
                  style={[rowInput, input]}
                  onChangeText={this.onChange.bind(this, 'password')}
                  value={password}
                  maxLength={20}
                />
              </View>
            ) : (
              <View style={row}>
                <Text style={rowText}>验证码</Text>
                <View style={rowInput}>
                  <TextInput
                    style={[input, { flex: 3 }]}
                    onChangeText={this.onChange.bind(this, 'code')}
                    value={code}
                  />
                  {time === 60 ? (
                    <Button onPress={this.onSendCode.bind(this)}>
                      发送验证码
                    </Button>
                  ) : (
                    <Text>{`${time}秒后可重发`}</Text>
                  )}
                </View>
              </View>
            )}
          </View>
          <View style={btnGroup}>
            <Button
              type="primary"
              style={{ width: 100, margin: 20 }}
              onPress={this.onLogin}>
              登录
            </Button>
            <Button
              disable={true}
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
  navBtnGroup: {
    padding: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#16f',
  },
  navBtnGroupItem: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    width: '50%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
