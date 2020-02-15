import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { Request } from '@/api/index';
import Button from '@/components/common/Button';
import Loading from '@/components/common/Loading';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      phone: '',
      code: '',
      password: '',
      againPassword: '',
    };
  }

  onSubmit() {
    Request(
      'mutation',
      `
      postRegister(phone: "asdas", password: "123123") {
        mes
        phone
      }
    `,
    ).then(json => {
      console.log('测试', json);
    });
    // 跳转登录
    // Actions.reset('login');
    // Alert.alert('触发登录事件');
  }

  onSendCode() {}

  onChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  changePassword(str) {
    return _.replace(str, /./g, '*');
  }

  render() {
    const { phone, code, password, againPassword } = this.state;
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
    } = styles;

    return (
      <View style={main}>
        <Loading show={true} />
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
              <Text style={rowText}>密码</Text>
              <TextInput
                style={[rowInput, input]}
                onChangeText={this.onChange.bind(this, 'password')}
                value={this.changePassword(password)}
              />
            </View>
            <View style={row}>
              <Text style={rowText}>确认密码</Text>
              <TextInput
                style={[rowInput, input]}
                onChangeText={this.onChange.bind(this, 'againPassword')}
                value={this.changePassword(againPassword)}
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
          <Button
            type="primary"
            style={{ width: '60%', marginLeft: '20%', margin: 20 }}
            onPress={this.onSubmit}>
            注册
          </Button>
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
    borderRadius: 10,
    width: '95%',
    display: 'flex',
  },
  form: {
    marginBottom: 10,
    paddingTop: 5,
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
    borderBottomWidth: 0.5,
    padding: 0,
    borderBottomColor: '#999',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
  },
  normalFont: {
    color: '#fff',
  },
});
