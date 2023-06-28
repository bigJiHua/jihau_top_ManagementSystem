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
    component: () => import('@/views/controlPanel.vue'),
    children: [
      {
        path: '',
        name: 'controlBox',
        component:  () => import('@/views/PanelContent/contentBox.vue')
      }
    ]
  }
]
// 导出路由表
export default RouterMap