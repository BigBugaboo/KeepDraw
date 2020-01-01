import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Alert,
    TouchableOpacity,
} from 'react-native';

const menuData = [
    {
        text: '首页',
        path: './src/pages/Main.js',
    },
    {
        text: '爱心',
        path: './src/pages/FindLove.js',
    },
    {
        text: '我的',
        path: './src/pages/MIne.js',
    }
];

export default () => {
    const onPress = (e) => {
        Alert.alert(e);
    };

    return (
        <View style={styles.container}>
            {menuData.map((item, index) => (
                <TouchableOpacity
                    style={styles.menuItem}
                    key={index}
                    onPress={() => onPress(item.path)}>
                    <Text style={styles.itemText}>{item.text}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    menuItem: {
        flex: 1,
        backgroundColor: 'green',
        display: 'flex',
        alignItems: 'center',
    },
    itemText: {
        color: '#fff',
    },
});