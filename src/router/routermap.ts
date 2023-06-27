// 路由表
export default [
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