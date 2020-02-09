import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// 按钮组件
export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onPress, children, type, style } = this.props;

    return (
      <TouchableOpacity
        style={[mineStyles.btn, mineStyles[type], style]}
        onPress={onPress}>
        <Text style={[{ textAlign: 'center' }, mineStyles[type]]}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
}

const mineStyles = StyleSheet.create({
  btn: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 10,
  },
  link: {
    // backgroundColor: 'transparent',
    padding: 5,
    borderRadius: 10,
  },
  primary: {
    backgroundColor: '#39f',
    color: '#fff',
  },
  warn: {
    backgroundColor: '#fc0',
    color: '#fff',
  },
  danger: {
    backgroundColor: '#f33',
    color: '#fff',
  },
  success: {
    backgroundColor: '#3c5',
  },
});

Button.propsTypes = {
  style: PropTypes.object,
  type: PropTypes.oneOf(['primary', 'warn', 'danger', 'success']),
  children: PropTypes.element.isRequired,
  onPress: PropTypes.func,
};
