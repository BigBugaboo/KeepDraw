import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import _ from 'lodash';

// 按钮组件
export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    const styles = _.reduce(
      this.props,
      (res, val, name) => {
        if (!!mineStyles[name]) {
          res.push(mineStyles[name]);
        }
        return res;
      },
      [],
    );

    return <View style={[mineStyles.flex, ...styles]}>{children}</View>;
  }
}

const mineStyles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyCenter: {
    justifyContent: 'space-around',
  },
  justifyEvenly: {
    justifyContent: 'space-evenly',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
});

Button.propsTypes = {
  children: PropTypes.element.isRequired,
  justifyAround: PropTypes.bool,
  justifyCenter: PropTypes.bool,
};
