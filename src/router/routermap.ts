// 路由表

const RouterMap = [
  {
    path: '/',
    name: '',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/controlPanel',
    name: 'controlPanel',
    component: () => import('@/views/ControlPanel/index.vue'),
    redirect: '/controlPanel/ArticleList',
    children: [
      // 文章管理
      {
        path: 'ArticleList',
        name: '文章列表',
        component: () => import('@/views/ControlPanel/ArticleClass/ArticleList.vue')
      }, {
        path: 'ArticleEditor/:articleid?',
        name: '文章编辑',
        component: () => import('@/views/ControlPanel/ArticleClass/ArticleEditor.vue')
      },
      // 通知
      {
        path: 'NotifyList',
        name: '通知列表',
        component: () => import('@/views/ControlPanel/NotifyClass/NotifyList.vue'),
      },
      {
        path: 'waitEditor',
        name: '待发布列表',
        component: () => import('@/views/ControlPanel/NotifyClass/waitEditor.vue'),
      },
      {
        path: 'NotifyPost/:postId?',
        name: '通知发布',
        component: () => import('@/views/ControlPanel/NotifyClass/NotifyPost.vue'),
      },
      {
        path: 'NotifyEditor/:pageid?',
        name: '通知编辑',
        component: () => import('@/views/ControlPanel/NotifyClass/NotifyEditor.vue'),
      },
      // 全站通知
      {
        path: 'msglist',
        name: '全站通知列表',
        component: () => import('@/views/ControlPanel/IM/msgList.vue'),
      },
      {
        path: 'sysmsg',
        name: '系统通知',
        component: () => import('@/views/ControlPanel/IM/sysMsg.vue'),
      },
      // 回收站
      {
        path: 'recycle',
        name: '回收站',
        component: () => import('@/views/ControlPanel/RecycleClass/index.vue')
      },
      // 用户管理
      {
        path: 'UserList',
        name: '用户列表',
        component: () => import('@/views/ControlPanel/UserClass/UserList/index.vue')
      },
      // 数据统计
      {
        path: 'ArticleCount',
        name: '文章统计',
        component: () => import('@/views/ControlPanel/DataCountClass/ArticleCount/index.vue')
      }, {
        path: 'UserCount',
        name: '用户统计',
        component: () => import('@/views/ControlPanel/DataCountClass/UserCount/index.vue')
      }, {
        path: 'sourceCount',
        name: '来源统计',
        component: () => import('@/views/ControlPanel/DataCountClass/sourceCount/index.vue')
      },
      // 设置SystemSettingClass
      {
        path: 'Carousel',
        name: '轮播图',
        component: () => import('@/views/ControlPanel/SystemSettingClass/Carousel.vue')
      }, {
        path: 'FriendChain',
        name: '友链',
        component: () => import('@/views/ControlPanel/SystemSettingClass/FriendChain.vue')
      }, {
        path: 'Develop',
        name: '发展历程',
        component: () => import('@/views/ControlPanel/SystemSettingClass/Develop.vue')
      }, {
        path: 'SiteSetting',
        name: '站点设置',
        component: () => import('@/views/ControlPanel/SystemSettingClass/SiteSetting.vue')
      }, {
        path: 'SiteRun',
        name: '站点运行图',
        component: () => import('@/views/ControlPanel/SystemSettingClass/SiteRun.vue')
      },
    ]
  }
]
// 导出路由表
export default RouterMap