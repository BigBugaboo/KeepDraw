import { ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';

const getToken = () => {
  global.storage
    .load({
      key: 'userLoginInfo',
    })
    .then(res => {
      if (res.token) {
        return res.token;
      } else {
        ToastAndroid.showWithGravity(
          '账号信息错误，请重新登录',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
        Actions.reset('login');
      }
    })
    .catch(e => {
      console.log('warnning', e);
      ToastAndroid.showWithGravity(
        '账号信息错误，请重新登录',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
      Actions.reset('login');
    });
  return;
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
