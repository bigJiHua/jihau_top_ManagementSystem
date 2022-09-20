import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/components/router/router'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import Meta from 'vue-meta'
import Store from './Store/Store'
import '@/assets/css/index.css'

Vue.prototype.$dayjs = dayjs
Vue.prototype.$echarts = echarts

Vue.use(ElementUI)
Vue.use(Meta)

Vue.config.productionTip = true

new Vue({
  Store,
  router,
  render: h => h(App)
}).$mount('#app')
