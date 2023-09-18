import '@/assets/css/main.css'
import '@/assets/ts/TextLog'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(createPinia())
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 自定义一个代码高亮指令
app.directive('highlight', function (el) {
  const highlight = el.querySelectorAll('pre code')
  highlight.forEach((block: any) => {
    hljs.highlightBlock(block)
  })
})

app.mount('#app')
