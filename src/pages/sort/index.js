import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  PanResponder,
  Image,
  ToastAndroid,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import Flex from '../../components/common/Flex';
import { Request } from '../../api/index';
import _ from 'lodash';

export default class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: null,
      sortList: [],
    };
  }

  componentDidMount() {
    this.handleGetSort();
  }

  handleGetSort = () => {
    Request('query', `getSort { list { value text } }`).then(json => {
      this.setState({
        sortList: _.concat({ text: '全部', value: '' }, json.data.getSort.list),
      });
    });
  };

  handleSelected = key => {
    Actions.reset('tabBar', { sort: key });
  };

  render() {
    return (
      <Flex style={styles.container} wrap>
        {_.map(this.state.sortList, (item, index) => (
          <TouchableOpacity
            style={styles.item}
            key={item.value}
            onPress={() => this.handleSelected(item.value)}>
            <Text style={styles.itemText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </Flex>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    width: '40%',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: '5%',
    backgroundColor: '#fff',
    borderBottomColor: '#39f',
    borderBottomWidth: 4,
    borderStyle: 'solid',
  },
  itemText: {
    textAlign: 'center',
  },
});
