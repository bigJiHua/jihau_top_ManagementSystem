import { createRouter, createWebHistory } from 'vue-router'
// 创建路由对象
import RouterMap from '@/router/routerMap'
// 导入路由对象
import { ElNotification } from 'element-plus'
// 导入element-plus插件
// layout 布局
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),//TODO 生产环境需要修改为/admin/ import.meta.env.BASE_URL
  routes: RouterMap
})
// 创建路由前置操作
router.beforeEach((to, from, next) => {
  // 获取token
  const token: boolean = localStorage.getItem('token')!== 'undefined' && localStorage.getItem('token')!== null && localStorage.getItem('token')!== undefined? true : false
  // 获取是否拦截路由
  const interceptionPath: boolean = to.path.match(/^\/controlPanel/)? true : false
  // 如果拦截路由，则拦截
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
    // 否则不拦截
    next()
  }
})
// 路由拦截
export default router