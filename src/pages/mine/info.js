import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ToastAndroid,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { selectImage, downloadImage } from '../../utils';
import { Request, getLoginInfo } from '../../api/index';
import Loading from '../../components/common/Loading';
import Flex from '../../components/common/Flex';
import Button from '../..//components/common/Button';

export default class MineInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      editAvatar: '',
      showAvatar: '',
      name: '',
    };
  }

  componentDidMount() {
    getLoginInfo().then(res => {
      this.handleGetInfo(res.phone, res.token);
    });
  }

  handleGetInfo = (phone, token) => {
    this.setState({
      loading: true,
    });
    Request(
      'query',
      `
      getAccount(phone: "${phone}", token: "${token}") {
        mes
        code
        name
        avatar
      }
    `,
    ).then(res => {
      const { name, avatar, code, mes } = res.data.getAccount;
      avatar &&
        downloadImage(avatar)
          .then(img => {
            this.setState({
              showAvatar: img,
            });
          })
          .finally(() => {
            this.setState({
              loading: false,
            });
          });
      if (code === 1) {
        ToastAndroid.showWithGravity(
          mes,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        Actions.reset('login');
      }
      this.setState({
        name,
        showAvatar: avatar,
      });
    });
  };

  handleUpdateAvatar = async () => {
    selectImage(res => {
      if (res) {
        this.setState({ editAvatar: res.uri, showAvatar: res.path });
        ToastAndroid.showWithGravity(
          '上传成功',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    }, 0);
  };

  handleChangeText = val => {
    this.setState({ name: val });
  };

  handleSubmit = () => {
    getLoginInfo().then(res => {
      Request(
        'mutation',
        `
        editAccountInfo(
          phone: "${res.phone}", 
          token: "${res.token}",
          name: "${this.state.name}",
          avatar: "${this.state.editAvatar || this.state.showAvatar}"
        ) {
          mes
          code
        }
      `,
      ).then(json => {
        const { mes, code } = json.data.editAccountInfo;
        ToastAndroid.showWithGravity(
          mes,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        if (code === 1) {
          Actions.reset('login');
        }
        Actions.pop();
      });
    });
  };

  render() {
    const { loading, name, showAvatar } = this.state;

    return (
      <View style={styles.container}>
        <Loading
          show={loading}
          onLoadStart={() => this.setState({ loading: true })}
          onLoadEnd={() => this.setState({ loading: false })}
        />
        {showAvatar ? (
          <Image style={styles.avatar} source={{ uri: showAvatar }} />
        ) : (
          <Flex
            style={[styles.avatar, { backgroundColor: '#ddd' }]}
            alignCenter
            justifyCenter>
            <Text>未设置头像</Text>
          </Flex>
        )}
        <Button type="white" shape="round" onPress={this.handleUpdateAvatar}>
          {showAvatar ? '更换头像' : '设置头像'}
        </Button>
        <TextInput
          style={styles.avatarName}
          value={name}
          maxLength={8}
          onChangeText={this.handleChangeText}
        />
        <TouchableOpacity
          style={styles.bannerSubmit}
          onPress={this.handleSubmit}>
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
  },
});
