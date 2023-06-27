import { createRouter, createWebHistory } from 'vue-router'
import RouterMap from './RouterMap.ts'
// layout 布局
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: RouterMap
})
router.beforeEach((to, from, next) => {
  const token: boolean = localStorage.getItem('token') ? true : false
  const interceptionPath : boolean = to.path.match(/^\/controlPanel/)
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
