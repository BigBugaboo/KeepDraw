import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Button from '@/components/common/Button';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      username: '',
      code: '',
    };
  }

  onSubmit() {
    Actions.reset('tabBar');
    // Alert.alert('触发登录事件');
  }

  onSendCode() {}

  render() {
    const { username, code, time } = this.state;
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
        <View style={container}>
          <View style={form}>
            <View style={row}>
              <Text style={rowText}>手机</Text>
              <TextInput
                style={[rowInput, input]}
                onChangeText={v => this.setState({ username: v })}
                value={username}
              />
            </View>
            <View style={row}>
              <Text style={rowText}>验证码</Text>
              <View style={rowInput}>
                <TextInput
                  style={[input, { flex: 3 }]}
                  onChangeText={v => this.setState({ code: v })}
                  value={code}
                />
                <Button style={{ flex: 1 }}>发送验证码</Button>
              </View>
            </View>
          </View>
          <Button
            type="primary"
            style={{ width: '60%', marginLeft: '20%', margin: 20 }}
            onPress={this.onSubmit}>
            登录
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
    margin: 'auto',
    width: '90%',
    display: 'flex',
  },
  form: {
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  rowText: {
    width: 50,
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
