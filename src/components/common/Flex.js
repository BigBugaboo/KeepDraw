import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import _ from 'lodash';

// Flex 布局
export default class Flex extends Component {
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

    return (
      <View style={[mineStyles.flex, ...styles, this.props.style]}>
        {children}
      </View>
    );
  }
}

const mineStyles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  noWrap: {
    flexWrap: 'nowrap',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyCenter: {
    justifyContent: 'center',
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
  alignCenter: {
    alignItems: 'center',
  },
});

Flex.propsTypes = {
  children: PropTypes.element.isRequired,
  row: PropTypes.bool,
  column: PropTypes.bool,
  wrap: PropTypes.bool,
  noWrap: PropTypes.bool,
  justifyAround: PropTypes.bool,
  justifyBetween: PropTypes.bool,
  justifyCenter: PropTypes.bool,
  justifyEvenly: PropTypes.bool,
  justifyStart: PropTypes.bool,
  justifyEnd: PropTypes.bool,
  alignCenter: PropTypes.bool,
};
