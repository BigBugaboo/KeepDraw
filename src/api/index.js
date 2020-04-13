import { ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';

export const getLoginInfo = async show => {
  return global.storage
    .load({
      key: 'userLoginInfo',
    })
    .then(res => {
      if (res.token && res.phone) {
        return res;
      } else {
        if (show) {
          ToastAndroid.showWithGravity(
            '账号信息错误，请重新登录',
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
          );
          Actions.reset('login');
        }
      }
    })
    .catch(e => {
      // 如果没有找到数据且没有sync方法，
      // 或者有其他异常，则在catch中返回
      console.warn(e.message);
      switch (e.name) {
        case 'NotFoundError':
          break;
        case 'ExpiredError':
          break;
      }
      console.log('warnning', e);
      if (show) {
        ToastAndroid.showWithGravity(
          '账号信息错误，请重新登录',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
        Actions.reset('login');
      }
    });
};

const base_url = 'http://192.168.3.3:3000/graphql';

export const Request = (type = 'query', req) => {
  return fetch(base_url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
          ${type}{
            ${req}
          }
        `,
    }),
  })
    .then(response => response.text())
    .then(res => Promise.resolve(JSON.parse(res)))
    .catch(error => {
      // 错误捕捉
      ToastAndroid.showWithGravity(
        '网络错误',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
      console.warn('网络错误', error);
    });
};
