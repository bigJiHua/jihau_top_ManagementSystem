<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import breaks from '@bytemd/plugin-breaks'
import footnotes from '@bytemd/plugin-footnotes'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import zhHans from 'bytemd/locales/zh_Hans.json'
// @ts-ignore
import { Editor } from '@bytemd/vue-next'
import 'juejin-markdown-themes/dist/juejin.min.css'
import 'highlight.js/styles/monokai-sublime.css'
import 'bytemd/dist/index.css'
import { ref, onMounted } from 'vue'
const emit = defineEmits(['cagEditorData'])
const props = defineProps<{
  content: string
  type: string
}>()
// 渲染md的插件
const plugins = ref([
  gfm(),
  highlight(),
  gemoji(),
  frontmatter(),
  breaks(),
  footnotes(),
  mediumZoom(),
])
const mdContent = ref('')
const handleChange = (v: string) => {
  mdContent.value = v
  if (mdContent.value !== '' && mdContent.value !== props.content) {
    emit('cagEditorData', mdContent.value)
  }
}
onMounted(() => {
  if (props.type === 'set') {
    mdContent.value = props.content
  } else {
    try {
      mdContent.value = JSON.parse(props.content).data
    } catch {
      setTimeout(() => {
        try {
          mdContent.value = JSON.parse(props.content).data
        } catch (error) {
          mdContent.value = ''
        }
      }, 500)
    }
  }
})
</script>
<template>
  <Editor
    class="mdEditor"
    :locale="zhHans"
    :value="mdContent"
    :plugins="plugins"
    @change="handleChange"
  ></Editor>
</template>

<style lang="less" scoped>
:deep(.bytemd) {
  height: calc(100vh - 100px);
  z-index: 999;
}
</style>
