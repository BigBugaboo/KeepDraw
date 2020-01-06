import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

export default class Main extends Component {
  render() {
    const { body } = styles;
    return (
      <View style={body}>
        <Text>123</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flex: 1,
    width: '100%',
  },
});
