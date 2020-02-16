import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, ToastAndroid } from 'react-native';
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
      inputList: [
        {
          text: '手机',
          name: 'phone',
          maxLength: 11,
          placeholder: '请输入11位有效手机号码',
          msg: '',
          value: '',
        },
        {
          text: '密码',
          name: 'password',
          maxLength: 20,
          placeholder: '6-20位，由字母、数值或下划线组成',
          msg: '',
          value: '',
        },
        {
          text: '确认密码',
          name: 'againPassword',
          maxLength: 20,
          placeholder: '请再次输入密码',
          msg: '',
          value: '',
        },
      ],
      code: '',
      isLoad: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  onSubmit() {
    // 再校验一次
    const isSubmit = _.reduce(
      this.state.inputList,
      (res, item, index) => {
        const msg = this.onCheck(item, index);
        if (res) {
          return msg === '';
        }
        return res;
      },
      true,
    );
    if (isSubmit) {
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
        // 跳转登录
        Actions.reset('login');
      });
    } else {
      ToastAndroid.showWithGravity(
        '请输入注册信息',
        ToastAndroid.SHORT,
        ToastAndroid.Center,
      );
    }
  }

  onSendCode() {}

  onChange(item, index, value) {
    let newList = _.cloneDeep(this.state.inputList);
    newList[index] = {
      ...item,
      value: value,
    };
    this.setState({
      inputList: newList,
    });
  }

  // 校验
  onCheck(item, index, e) {
    let msg = '';
    const actions = {
      phone: () => {
        msg = item.value.length === 11 ? '' : '手机号长度不足11位，请重新输入';
      },
      password: () => {
        // 6-20 字母数字下划线组成
        const patrn = /^(\w){6,20}$/;
        msg = patrn.exec(item.value) ? '' : '密码格式错误,请重新输入';
      },
      againPassword: () => {
        const passwordValue = _.filter(
          this.state.inputList,
          item => item.name === 'password',
        )[0].value;
        msg = item.value === passwordValue ? '' : '两次密码不一致';
      },
    };

    if (typeof actions[item.name] === 'function') {
      actions[item.name]();
    }

    let newList = _.cloneDeep(this.state.inputList);
    newList[index] = {
      ...item,
      msg: msg,
    };
    this.setState({
      inputList: newList,
    });

    return msg;
  }

  // 密码掩盖
  changePassword(str) {
    return _.replace(str, /./g, '*');
  }

  render() {
    const { code, isLoad, inputList } = this.state;
    const {
      container,
      main,
      row,
      form,
      input,
      rowText,
      rowInput,
      inputTip,
    } = styles;

    return (
      <View style={main}>
        <Loading show={isLoad} />
        <View style={container}>
          <View style={form}>
            {inputList.map((item, index) => (
              <View>
                <View style={row} key={index}>
                  <Text style={rowText}>{item.text}</Text>
                  <TextInput
                    style={[rowInput, input]}
                    onChangeText={this.onChange.bind(this, item, index)}
                    value={item.value}
                    placeholder={item.placeholder}
                    maxLength={item.maxLength}
                    onBlur={this.onCheck.bind(this, item, index)}
                  />
                </View>
                {item.msg ? (
                  <Text style={[inputTip, { color: '#f33' }]}>{item.msg}</Text>
                ) : null}
              </View>
            ))}
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
  inputTip: {
    fontSize: 10,
    textAlign: 'right',
    marginRight: 10,
  },
});
