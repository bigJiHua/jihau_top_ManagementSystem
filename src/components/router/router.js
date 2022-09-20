import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterMap from './routerMap'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: RouterMap
  // mode: 'history'
})

// 路由前置守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const address = to.path
  if (address.match(/^\/Panel\//)) {
    if (token) {
      next()
    } else {
      next('Login')
    }
  } else if (to.meta.requireAuth) {
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
