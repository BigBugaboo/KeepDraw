import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class FindLove extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>找爱</Text>
        <Button onPress={() => Actions.home()} title="to Home" />
        <Button onPress={() => Actions.mine()} title="to Mine" />
      </View>
    );
  }
}
