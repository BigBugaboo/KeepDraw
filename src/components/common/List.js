import React, { Component } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';

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

  render() {
    const { style, data } = this.props;
    return (
      <FlatList
        style={style}
        data={data}
        extraData={this.state}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}
