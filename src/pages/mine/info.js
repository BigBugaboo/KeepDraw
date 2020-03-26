import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ToastAndroid,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import Loading from '../../components/common/Loading';
import Button from '../..//components/common/Button';
import List from '../../components/common/List';

export default class MineInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        <Loading
          show={loading}
          onLoadStart={() => this.setState({ loading: true })}
          onLoadEnd={() => this.setState({ loading: false })}
        />
        <Image
          style={styles.avatar}
          source={{
            uri:
              'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg',
          }}
        />
        <Button type="white" shape="round">
          更换头像
        </Button>
        <TextInput style={styles.avatarName} value="NMSL" />
        <TouchableOpacity style={styles.bannerSubmit}>
          <Text style={styles.btnText}>保存</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#39f',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 50,
    margin: 10,
  },
  avatarName: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 40,
    textAlign: 'center',
    width: '50%',
  },
  bannerSubmit: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#fff',
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  btnText: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 100,
    borderColor: '#39f',
    padding: 30,
  }
});
