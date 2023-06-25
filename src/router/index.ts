import { createRouter, createWebHistory } from 'vue-router'
// view 视图
import controlPanel from '@/views/controlPanel.vue'
import contentBox from '@/views/PanelContent/contentBox.vue'
// layout 布局
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'controlPanel',
      component: controlPanel,
      children: [
        {
          path: '',
          name: 'controlBox',
          component: contentBox
        }
      ]
    }
  ]
})

export default router
