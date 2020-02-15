import { extend } from 'umi-request';

export const Request = extend({
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    token: 'xxx', // 所有请求默认带上 token 参数
  },
  errorHandler: function(error) {
    /* 异常处理 */
    console.log('异常', error);
  },
});
