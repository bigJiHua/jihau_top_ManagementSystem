import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/components/router/router'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
Vue.prototype.$dayjs = dayjs
Vue.prototype.$echarts = echarts

Vue.use(ElementUI)

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
