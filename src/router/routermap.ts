// 路由表

const RouterMap = [
  {
    path: '/',
    name: '',
    component:  () => import('@/views/Login/index.vue')
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
        component:  () => import('@/views/ControlPanel/ArticleClass/ArticleList.vue')
      },{
        path: 'ArticleEditor/:articleid?',
        name: '文章编辑',
        component:  () => import('@/views/ControlPanel/ArticleClass/ArticleEditor.vue')
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
      // 回收站
      {
        path: 'recycle',
        name: '回收站',
        component:  () => import('@/views/ControlPanel/RecycleClass/index.vue')
      },
      // 用户管理
      {
        path: 'UserList',
        name: '用户列表',
        component:  () => import('@/views/ControlPanel/UserClass/UserList/index.vue')
      },
      // 数据统计
      {
        path: 'ArticleCount',
        name: '文章统计',
        component:  () => import('@/views/ControlPanel/DataCountClass/ArticleCount.vue')
      },{
        path: 'UserCount',
        name: '用户统计',
        component:  () => import('@/views/ControlPanel/DataCountClass/UserCount.vue')
      },{
        path: 'sourceCount',
        name: 'sourceCount',
        component:  () => import('@/views/ControlPanel/DataCountClass/sourceCount.vue')
      },
      // 设置SystemSettingClass
      {
        path: 'Carousel',
        name: 'Carousel',
        component:  () => import('@/views/ControlPanel/SystemSettingClass/Carousel.vue')
      },{
        path: 'FriendChain',
        name: 'FriendChain',
        component:  () => import('@/views/ControlPanel/SystemSettingClass/FriendChain.vue')
      },{
        path: 'SiteSetting',
        name: 'SiteSetting',
        component:  () => import('@/views/ControlPanel/SystemSettingClass/SiteSetting.vue')
      },{
        path: 'SiteRun',
        name: 'SiteRun',
        component:  () => import('@/views/ControlPanel/SystemSettingClass/SiteRun.vue')
      },
    ]
  }
]
// 导出路由表
export default RouterMap