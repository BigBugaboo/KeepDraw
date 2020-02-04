import { Text } from 'react-native';

import Home from '@/pages/home/Index';
import Mine from '@/pages/mine/Index';
import Login from '@/pages/login/Index';

export default [
  {
    type: 'scene',
    option: {
      drawer: true,
      initial: true,
      key: 'tabBar', // 必须存在默认的 tabbar 的 key
      component: Home,
    },
  },
  {
    type: 'scene',
    option: {
      navBarButtonColor: '#39f',
      title: '个人信息',
      key: 'mine',
      component: Mine,
      rightTitle: '123',
      onRight: () => {
        console.log('right');
      },
    },
  },
  {
    type: 'scene',
    option: {
      title: '登录',
      key: 'login',
      hideNavBar: true,
      component: Login,
    },
  },
];
