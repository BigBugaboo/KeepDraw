import Home from '@/pages/home/Index';
import Mine from '@/pages/mine/Index';
import Login from '@/pages/login/Index';

export default {
  home: {
    type: 'scene',
    value: {
      initial: true,
      key: 'tabBar', // 必须存在默认的 tabbar 的 key
      title: '首页',
      hideNavBar: true,
      component: Home,
    },
  },
  mine: {
    type: 'scene',
    value: {
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
  login: {
    type: 'scene',
    value: {
      title: '登录',
      key: 'login',
      hideNavBar: true,
      component: Login,
    },
  },
};
