import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Text, Dimensions, VirtualizedList } from 'react-native';

class ListItem extends Component {
  onPress = () => {
    this.props.onPressItem(this.props.id);
    return this.props.id;
  };

  render() {
    const { Content, id } = this.props;
    return <Content key={id} onPress={this.onPress} />;
  }
}

// 列表
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: new Map(),
    };
    this.height = Dimensions.get('window').height;
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
    const {
      style,
      data,
      initialScrollIndex,
      ListFooterComponent,
      EmptyComponent,
    } = this.props;
    return (
      <VirtualizedList
        style={style}
        data={data}
        ListFooterComponent={ListFooterComponent}
        getItemLayout={this.getItemLayout}
        getItem={this.getItem}
        getItemCount={this.getItemCount}
        extraData={this.state}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        initialScrollIndex={initialScrollIndex}
        ListEmptyComponent={EmptyComponent}
      />
    );
  }
}

List.propTypes = {
  data: PropTypes.array,
  style: PropTypes.object,
  // 无数据时显示
  EmptyComponent: PropTypes.element,
  // 底部
  ListFooterComponent: PropTypes.element,
  // 初始渲染的index
  initialScrollIndex: PropTypes.number,
  onCheck: PropTypes.func,
};

List.defaultProps = {
  EmptyComponent: <Text>暂无数据</Text>,
  ListFooterComponent: null,
  initialScrollIndex: 0,
  onCheck: () => null,
};

export default List;
