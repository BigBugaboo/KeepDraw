import LoadCop from '@/components/hoc/asyncComponent';

export default {
  menu: {
    type: 'tabs',
    key: 'tabBar',
    children: [
      {
        title: '首页',
        key: 'home',
        hideNavBar: true,
        component: LoadCop(() => import('@/pages/menu/Home')),
      },
      {
        title: '找爱',
        key: 'findLove',
        hideNavBar: true,
        component: LoadCop(() => import('@/pages/menu/FindLove')),
      },
      {
        initial: true,
        title: '个人信息',
        key: 'mine',
        hideNavBar: true,
        component: LoadCop(() => import('@/pages/menu/Mine')),
      },
    ],
  },
  login: {
    type: 'scene',
    option: {
      title: '登录',
      key: 'login',
      hideNavBar: true,
      component: LoadCop(() => import('@/pages/login/Login')),
    },
  },
};
