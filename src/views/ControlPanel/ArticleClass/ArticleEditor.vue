<template>
  <div class="EditorAreaBox">
    <div class="EditorAside"></div>
    <div id="EditorArea">
      <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Editor } from '@jihua/ckeditor5-jihua';

const editor = Editor
const editorData = ref('<p>Content of the editor.</p>')
const editorConfig = reactive({
  plugins: Editor.builtinPlugins,
  toolbar: {
    items: [
      'undo',
      'redo',
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'codeBlock',
      'showBlocks',
      'selectAll',
      'imageUpload',
      'imageInsert',
      'blockQuote',
      'insertTable',
      '-',
      'highlight',
      'horizontalLine',
      'fontBackgroundColor',
      'fontColor',
      'alignment',
      'fontFamily',
      'fontSize',
      'underline',
      'superscript',
      'strikethrough',
      'specialCharacters',
      'subscript',
      'sourceEditing',
      'removeFormat',
      'htmlEmbed',
    ],
    shouldNotGroupWhenFull: true
  },
  language: 'zh-cn',
  image: {
    toolbar: [
      'imageTextAlternative',
      'toggleImageCaption',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      'linkImage'
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableCellProperties',
      'tableProperties'
    ]
  }
})
</script>



<style scoped>
#editor {
  height: calc(100vh - 70px);
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}
</style>

