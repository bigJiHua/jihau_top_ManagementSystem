import { createRouter, createWebHistory } from 'vue-router'
//  import RouterMap from './routerMap'
// layout 布局
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
          name: 'ArticleList',
          component:  () => import('@/views/ControlPanel/ArticleClass/ArticleList.vue')
        },{
          path: 'ArticleEditor',
          name: 'ArticleEditor',
          component:  () => import('@/views/ControlPanel/ArticleClass/ArticleEditor.vue')
        },
        // 用户管理
        {
          path: 'UserList',
          name: 'UserList',
          component:  () => import('@/views/ControlPanel/UserClass/UserList.vue')
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
})
router.beforeEach((to, from, next) => {
  const token: boolean = localStorage.getItem('token') ? true : false
  const interceptionPath : boolean = to.path.match(/^\/controlPanel/) ? true : false
  if (interceptionPath) {
    if (token) {
      next()
    } else {
      next('Login')
    }
  } else {
    next()
  }
})
export default router
