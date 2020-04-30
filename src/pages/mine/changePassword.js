import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import { Request, getLoginInfo } from '../../api/index';
import Loading from '../../components/common/Loading';
import Flex from '../../components/common/Flex';
import Button from '../..//components/common/Button';

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      timer: null,
      sms_code: '',
      time: 60,
      newPassword: '',
    };
  }

  handleSubmit = () => {
    const { newPassword, sms_code } = this.state;
    if (!newPassword || !sms_code) {
      ToastAndroid.showWithGravity(
        '请输入新密码和验证码',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return null;
    }
    // 6-20 字母数字下划线组成
    const patrn = /^(\w){6,20}$/;
    if (!patrn.exec(newPassword)) {
      ToastAndroid.showWithGravity(
        '密码格式错误,请重新输入',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return null;
    }

    this.setState({ loading: true });
    getLoginInfo().then(res => {
      Request(
        'mutation',
        `changePassword(
          phone: "${res.phone}", 
          token: "${res.token}",
          password: "${newPassword}",
          code: "${sms_code}",
          ) { 
          mes
          code
        }`,
      )
        .then(json => {
          const { mes, code } = json.data.changePassword;
          ToastAndroid.showWithGravity(
            mes,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          if (code === 1) {
            Actions.reset('login');
          }
          Actions.pop();
        })
        .finally(() => {
          this.setState({
            loading: false,
          });
        });
    });
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onSendCode = () => {
    this.setState({ loading: true });
    getLoginInfo().then(res => {
      this.onTimer();
      Request('mutation', `sendSmsCode(phone: "${res.phone}") {mes}`)
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
            loading: false,
          });
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

  render() {
    const { loading, time, newPassword, sms_code } = this.state;

    return (
      <View style={styles.container}>
        <Loading
          show={loading}
          onLoadStart={() => this.setState({ loading: true })}
          onLoadEnd={() => this.setState({ loading: false })}
        />
        <Flex alignStart column>
          <Flex justifyStart alignCenter>
            <Text>新密码：</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              maxLength={20}
              onChangeText={this.onChange.bind(this, 'newPassword')}
            />
          </Flex>
          <Text>密码由6-20位，由字母、数字或下划线组成</Text>
          <Flex justifyStart alignCenter>
            <Text>验证码：</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              onChangeText={this.onChange.bind(this, 'sms_code')}
              value={sms_code}
            />
            {time === 60 ? (
              <Button type="white" onPress={this.onSendCode}>
                发送验证码
              </Button>
            ) : (
              <Text>{`${time}秒后可重发`}</Text>
            )}
          </Flex>
        </Flex>

        <Button shape="round" type="white" onPress={this.handleSubmit}>
          确认修改
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#39f',
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  input: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 40,
    textAlign: 'center',
    width: '50%',
  },
});
