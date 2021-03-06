import { Actions } from 'react-native-router-flux';

import Home from '../pages/home/index';
import HomeDetail from '../pages/home/detail';
import Mine from '../pages/mine/index';
import MineInfo from '../pages/mine/info';
import ChangePassword from '../pages/mine/changePassword';
import Collect from '../pages/mine/collect';
import Copys from '../pages/mine/copys';
import Login from '../pages/login/index';
import Draws from '../pages/draws/index';
import DrawsDetail from '../pages/draws/detail';
import Register from '../pages/register/index';
import Comment from '../pages/comment/index';
import CopyDraws from '../pages/copyDraws/index';
import CopyDrawsDetail from '../pages/copyDraws/detail';
import Sort from '../pages/sort/index';

export default [
  {
    type: 'scene',
    option: {
      drawer: true,
      key: 'tabBar', // 必须存在默认的 tabbar 的 key
      component: Home,
      leftTitle: '分类',
      onLeft: () => {
        Actions.push('sort');
      },
    },
  },
  {
    type: 'scene',
    option: {
      title: '作品详情',
      drawer: true,
      key: 'homeDetail',
      component: HomeDetail,
    },
  },
  {
    type: 'scene',
    option: {
      title: '分类',
      key: 'sort',
      component: Sort,
    },
  },
  {
    type: 'scene',
    option: {
      title: '个人信息',
      key: 'mine',
      component: Mine,
      rightTitle: ' ',
    },
  },
  {
    type: 'scene',
    option: {
      title: '收藏集',
      key: 'collect',
      component: Collect,
      rightTitle: ' ',
    },
  },
  {
    type: 'scene',
    option: {
      title: '临摹集',
      key: 'copys',
      component: Copys,
      rightTitle: ' ',
    },
  },
  {
    type: 'scene',
    option: {
      navBarButtonColor: '#39f',
      title: '修改个人信息',
      key: 'mineInfo',
      component: MineInfo,
      rightTitle: ' ',
    },
  },
  {
    type: 'scene',
    option: {
      navBarButtonColor: '#39f',
      title: '修改密码',
      key: 'changePassword',
      component: ChangePassword,
      rightTitle: ' ',
    },
  },
  {
    type: 'scene',
    option: {
      title: '登录',
      key: 'login',
      initial: true,
      hideNavBar: true,
      component: Login,
    },
  },
  {
    type: 'scene',
    option: {
      title: '注册',
      key: 'register',
      hideNavBar: true,
      component: Register,
    },
  },
  {
    type: 'scene',
    option: {
      title: '画册',
      key: 'draws',
      hideNavBar: true,
      component: Draws,
    },
  },
  {
    type: 'scene',
    option: {
      title: '画册详情修改',
      key: 'drawsDetail',
      component: DrawsDetail,
      rightTitle: ' ',
    },
  },
  {
    type: 'scene',
    option: {
      title: '评论',
      key: 'comment',
      hideNavBar: true,
      component: Comment,
    },
  },
  {
    type: 'scene',
    option: {
      title: '临摹',
      key: 'copyDraws',
      hideNavBar: true,
      component: CopyDraws,
    },
  },
  {
    type: 'scene',
    option: {
      title: '临摹列表',
      key: 'copyDrawsDetail',
      hideNavBar: true,
      component: CopyDrawsDetail,
    },
  },
];
