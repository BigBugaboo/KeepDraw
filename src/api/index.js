import { ToastAndroid } from 'react-native';

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
    .catch(error => {
      // 错误捕捉
      ToastAndroid.show('网络错误', ToastAndroid.SHORT);
      console.warn('网络错误', error);
    })
};
