import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { Request } from '../../api/index';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';

import { throttle } from '../../utils';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputList: [
        {
          text: '手机',
          name: 'phone',
          maxLength: 11,
          placeholder: '请输入11位有效手机号码',
          msg: '',
          value: '',
          inputOption: {
            keyboardType: 'numeric',
          },
        },
        {
          text: '密码',
          name: 'password',
          maxLength: 20,
          placeholder: '6-20位，由字母、数值或下划线组成',
          msg: '',
          value: '',
          inputOption: {
            secureTextEntry: true,
          },
        },
        {
          text: '确认密码',
          name: 'againPassword',
          maxLength: 20,
          placeholder: '请再次输入密码',
          msg: '',
          value: '',
          inputOption: {
            secureTextEntry: true,
          },
        },
      ],
      code: '',
      isLoad: false,
      time: 60,
      timmer: null,
    };
  }

  onSubmit = () => {
    // 再校验一次
    let isSubmit = _.reduce(
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

    // 判断是否输入验证码
    if (this.state.code === '') {
      ToastAndroid.showWithGravity(
        '请输入验证码',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }

    if (isSubmit) {
      console.log(this.state.isLoad);
      this.setState(
        {
          isLoad: true,
        },
        () => {
          let req = {};
          _.forEach(this.state.inputList, item => {
            req[item.name] = item.value;
          });
          Request(
            'mutation',
            `
            postRegister(
              phone: "${req.phone}", 
              password: "${req.password}", 
              code: "${this.state.code}"
              ) {
              mes
              phone
            }
          `,
          )
            .then(json => {
              const { mes, phone } = json.data.postRegister;
              ToastAndroid.showWithGravity(
                mes,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
              if (phone === req.phone) {
                Actions.reset('login', { phone });
              }
            })
            .finally(() => {
              console.log(this.state.isLoad);
              this.setState({
                isLoad: false,
              });
            });
        },
      );
    } else {
      ToastAndroid.showWithGravity(
        '请输入注册信息',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  onSendCode = () => {
    let req = {};

    _.forEach(this.state.inputList, item => {
      req[item.name] = item.value;
    });
    if (req.phone === '' || req.phone.length < 11) {
      ToastAndroid.showWithGravity(
        '请输入完整手机号码',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }

    this.onTimer();
    this.setState({
      isLoad: true,
    });

    Request('mutation', `sendSmsCode(phone: "${req.phone}") {mes}`)
      .then(json => {
        let mes = '';
        const {
          data: { sendSmsCode },
          errors,
        } = json;
        if (errors) {
          mes = '手机错误，请输入有效的手机号码';
        } else {
          mes = sendSmsCode.mes;
        }
        ToastAndroid.showWithGravity(
          mes,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .finally(() => {
        this.setState({
          isLoad: false,
        });
      });
  };

  onTimer = () => {
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
  };

  onChange = (item, index, value) => {
    let newList = _.cloneDeep(this.state.inputList);
    newList[index] = {
      ...item,
      value: value,
    };
    this.setState({
      inputList: newList,
    });
  };

  // 校验
  onCheck = (item, index, e) => {
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
  };

  render() {
    const { code, isLoad, inputList, time } = this.state;
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
                    {...item.inputOption}
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
                  keyboardType="numeric"
                  style={[input, { flex: 3 }]}
                  onChangeText={v => this.setState({ code: v })}
                  value={code}
                />
                {time === 60 ? (
                  <Button onPress={throttle(this.onSendCode)}>
                    发送验证码
                  </Button>
                ) : (
                  <Text>{`${time}秒后可重发`}</Text>
                )}
              </View>
            </View>
          </View>
          <Button
            type="primary"
            shape="round"
            style={{ width: '60%', marginLeft: '20%', margin: 20 }}
            onPress={throttle(this.onSubmit)}>
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
