<template>
  <div class="EditorArea">
    <textarea :id="id" name="content"></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps<{
  content: string
}>();

const id = 'Cekditor';
const ckeditor = ref<any>(null);
//@ts-ignore
const CKEDITOR: any = window.CKEDITOR;
const emit = defineEmits(['cagEditorData'])

setInterval(() => {
  emit('cagEditorData', ckeditor.value.getData())
}, 800)

onMounted(() => {
  // 渲染编辑器
  ckeditor.value = CKEDITOR.replace(id, { height: '500px' });
});

watch(() => props.content, (newValue: string) => {
  if (newValue !== ckeditor.value.getData()) {
    ckeditor.value.setData(newValue);
  }
});

onBeforeUnmount(() => {
  // 销毁编辑器
  ckeditor.value.destroy();
});

</script>

<style scoped>

</style>
