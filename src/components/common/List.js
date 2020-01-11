import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FastList,
  VirtualizedList,
} from 'react-native';

class ListItem extends Component {
  onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const { Content, id } = this.props;
    return (
      <TouchableOpacity key={id} onPress={this.onPress}>
        <Content />
      </TouchableOpacity>
    );
  }
}

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: new Map(),
    };
    const { width, height } = Dimensions.get('window');
  }

  keyExtractor = (item, index) => item.id;

  onPressItem = id => {
    this.setState(state => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id));
      return { selected };
    });
  };

  renderItem = ({ item }) => (
    <ListItem
      id={item.id}
      onPressItem={this.onPressItem}
      selected={!!this.state.selected.get(item.id)}
      {...item}
    />
  );

  // 获取item
  getItem = (data, index) => {
    return data[index];
  };

  // 列表长度
  getItemCount = data => {
    return data.length;
  };

  // 固定行高，减少动态测量的开销
  getItemLayout = (data, index) => {
    return {
      length: data.length,
      offset: this.height,
      index: index,
    };
  };

  render() {
    const { style, data } = this.props;
    return (
      <VirtualizedList
        style={style}
        data={data}
        getItemLayout={this.getItemLayout}
        getItem={this.getItem}
        getItemCount={this.getItemCount}
        extraData={this.state}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}
