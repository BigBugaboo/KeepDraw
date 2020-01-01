import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Home extends Component {
    render () {
        return (
            <View>
                <Text>主页</Text>
                <Button onPress={() => Actions.findLove()} title='to FindLove' />
                <Button onPress={() => Actions.mine()} title='to Mine' />
            </View>
        );
    }
};