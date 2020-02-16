import Home from '@/pages/home/index';
import Mine from '@/pages/mine/index';
import Login from '@/pages/login/index';
import Register from '@/pages/register/index';

export default [
  {
    type: 'scene',
    option: {
      drawer: true,
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
  {
    type: 'scene',
    option: {
      title: '注册',
      key: 'register',
      initial: true,
      hideNavBar: true,
      component: Register,
    },
  },
];
