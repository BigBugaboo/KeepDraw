import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

// 加载组件,由于position只能设置absolute，所以覆盖为父组件的容器范围
export default class Loading extends Component {
  render() {
    const { size, color, show } = this.props;

    return show ? (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size={size} color={color} />
      </View>
    ) : null;
  }
}

Loading.propTypes = {
  size: PropTypes.oneOf('large', 'small'),
  color: PropTypes.string,
  show: PropTypes.bool,
};

Loading.defaultProps = {
  color: '#0000ff',
  size: 'small',
  show: false,
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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
