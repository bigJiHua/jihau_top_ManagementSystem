import { createRouter, createWebHistory } from 'vue-router'
import RouterMap from '@/router/routerMap'
import { ElNotification } from 'element-plus'
// layout 布局
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),//TODO 生产环境需要修改为/admin/ import.meta.env.BASE_URL
  routes: RouterMap
})
router.beforeEach((to, from, next) => {
  const token: boolean = localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined ? true : false
  const interceptionPath: boolean = to.path.match(/^\/controlPanel/) ? true : false
  if (interceptionPath) {
    if (token) {
      next()
    } else {
      ElNotification({
        title: '错误',
        message: '未登录 禁止操作！',
        type: 'warning',
      })
      next('/')
    }
  } else {
    next()
  }
})
export default router
