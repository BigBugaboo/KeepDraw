import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

// 按钮组件
export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onPress, children, type, style, textStyle, shape } = this.props;

    return (
      <TouchableOpacity
        style={[mineStyles.btn, mineStyles[type], style, mineStyles[shape]]}
        onPress={onPress}>
        <Text style={[{ textAlign: 'center' }, mineStyles[type], textStyle]}>
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
  },
  round: {
    borderRadius: 10,
  },
  link: {
    backgroundColor: 'transparent',
    padding: 0,
    color: '#39f',
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
  textStyle: PropTypes.object,
  type: PropTypes.oneOf(['primary', 'warn', 'danger', 'success', 'link']),
  children: PropTypes.element.isRequired,
  onPress: PropTypes.func,
  shape: PropTypes.oneOf(['round']),
};
