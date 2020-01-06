import Home from '@/pages/home/Index';
import Mine from '@/pages/mine/Index';
import Login from '@/pages/login/Index';

export default {
  home: {
    title: '主页',
    key: 'home',
    hideNavBar: true,
    component: Home,
  },
  mine: {
    title: '个人信息',
    key: 'mine',
    hideNavBar: true,
    component: Mine,
  },
  login: {
    title: '登录',
    key: 'login',
    hideNavBar: true,
    component: Login,
  },
};
