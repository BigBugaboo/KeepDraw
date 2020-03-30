import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Flex from './Flex';

// 加载组件,由于position只能设置absolute，所以覆盖为父组件的容器范围
export default class Loading extends Component {
  render() {
    const { size, color, show, text } = this.props;

    return show ? (
      <View style={[styles.container]}>
        <Flex style={styles.box} column justifyAround alignCenter>
          <ActivityIndicator size={size} color={color} />
          <Text style={{ color: '#39f'}}>{text}</Text>
        </Flex>
      </View>
    ) : null;
  }
}

Loading.propTypes = {
  size: PropTypes.oneOf('large', 'small'),
  color: PropTypes.string,
  show: PropTypes.bool,
  text: PropTypes.string,
};

Loading.defaultProps = {
  color: '#fff',
  size: 'large',
  show: false,
  text: '加载中',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 4,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  box: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: '40%',
    padding: 20,
    borderRadius: 10,
    marginLeft: '30%',
  },
});
