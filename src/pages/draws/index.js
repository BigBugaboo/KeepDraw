import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import _ from 'lodash';
import days from 'dayjs';

import Flex from '../../components/common/Flex';
import Button from '../../components/common/Button';
import List from '../../components/common/List';

import options from './config';

export default class Draws extends Component {
  handelSelectImage = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  render() {
    const arr = [
      {
        img:
          'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg',
        date: new Date(),
        name: '名称',
        desc:
          '1827358712t38111111111111111111112222222222222222222222222222222222222222222222222211111111111111111111111111111111112g',
        good: 16,
        bad: 20,
      },
      {
        img:
          'http://b-ssl.duitang.com/uploads/item/201704/10/20170410095843_SEvMy.thumb.700_0.jpeg',
        date: new Date(),
        name: '名称',
        desc: '1827358712t3812g',
        good: 16,
        bad: 20,
      },
    ];
    const {
      content,
      box,
      img,
      infomation,
      name,
      date,
      desc,
      banner,
      info,
    } = styles;

    return (
      <>
        <List
          style={content}
          data={_.map(arr, (item, index) => ({
            Content: () => (
              <View style={box}>
                <Image style={img} source={{ uri: item.img }} />
                <View style={infomation}>
                  <View style={info}>
                    <View>
                      <Text style={name}>{item.name}</Text>
                      <Text style={date}>
                        {days(item.date).format('YYYY-MM-DD HH:mm')}
                      </Text>
                    </View>
                    <Flex column>
                      <Text>描述</Text>
                      <Text numberOfLines={4} style={desc}>
                        {item.desc}
                      </Text>
                    </Flex>
                    <Flex>
                      <Flex row>
                        <Text>欣赏：</Text>
                        <Text>{item.good}</Text>
                      </Flex>
                      <Flex row>
                        <Text>不喜欢：</Text>
                        <Text>{item.bad}</Text>
                      </Flex>
                    </Flex>
                  </View>
                  <View style={banner}>
                    <Button type="danger">删除</Button>
                    <Button type="deafult">修改</Button>
                  </View>
                </View>
              </View>
            ),
            id: index,
          }))}
        />
        <Button type="primary" onPress={this.handelSelectImage}>上传</Button>
      </>
    );
  }
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  content: {
    width: '100%',
    backgroundColor: '#dfdfdf',
  },
  box: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: height / 3,
    marginBottom: 2,
  },
  img: {
    width: '38.2%',
    height: '100%',
  },
  infomation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '61.8%',
    height: '100%',
  },
  info: {
    width: '80%',
    padding: 5,
    display: 'flex',
    justifyContent: 'space-between',
  },
  banner: {
    width: '20%',
  },
  name: {
    fontSize: 20,
  },
  date: {
    color: '#3d3d3d',
  },
  desc: {
    borderColor: '#3f3f3f',
    borderStyle: 'dotted',
    borderWidth: 1,
    padding: 4,
  },
});
