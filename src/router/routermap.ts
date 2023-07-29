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
        name: 'UserList',
        component:  () => import('@/views/ControlPanel/UserClass/UserList/index.vue')
      },{
        path: 'Rmanagement',
        name: 'Rmanagement',
        component:  () => import('@/views/ControlPanel/UserClass/Rmanagement.vue')
      },
      // 数据统计
      {
        path: 'ArticleCount',
        name: 'ArticleCount',
        component:  () => import('@/views/ControlPanel/DataCountClass/ArticleCount.vue')
      },{
        path: 'UserCount',
        name: 'UserCount',
        component:  () => import('@/views/ControlPanel/DataCountClass/UserCount.vue')
      },{
        path: 'VisitCount',
        name: 'VisitCount',
        component:  () => import('@/views/ControlPanel/DataCountClass/VisitCount.vue')
      },{
        path: 'UserActivity',
        name: 'UserActivity',
        component:  () => import('@/views/ControlPanel/DataCountClass/UserActivity.vue')
      },{
        path: 'EquipmentCount',
        name: 'EquipmentCount',
        component:  () => import('@/views/ControlPanel/DataCountClass/EquipmentCount.vue')
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