import { createRouter, createWebHistory } from 'vue-router'
import RouterMap from '@/router/routerMap'
import { showNotification } from '@/utils/components/RequestCode'
// layout 布局
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: RouterMap
})
router.beforeEach((to, from, next) => {
  const token: boolean = localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined ? true : false
  const interceptionPath: boolean = to.path.match(/^\/controlPanel/) ? true : false
  if (interceptionPath) {
    if (token) {
      next()
    } else {
      showNotification({
        title: '错误',
        message: '未登录 禁止操作！',
        type: 'warning',
      })
      next('Login')
    }
  } else {
    next()
  }
})
export default router
