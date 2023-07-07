<template>
  <div>
    <div id="editor"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount,onMounted } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

let editorInstance : any;

onBeforeUnmount(() => {
  editorInstance.then((editor: { destroy: () => Promise<any>; }) => {
    editor.destroy().catch((error: any) => {
      console.error(error);
    });
  });
});

onMounted(() => {
  ClassicEditor.create(document.querySelector('#editor') as HTMLElement, {
    // 配置项
  }).then(editor => {
    editorInstance = Promise.resolve(editor);
  }).catch(error => {
    console.error(error);
  });
});
</script>

<style scoped>
#editor {
  min-height: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}
</style>
