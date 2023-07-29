<template>
  <div class="ArticleListArea">
    <el-tabs v-model="activeName" class="demo-tabs" >
      <el-tab-pane label="文章回收站" name="first" class="ListArea">
        <Article></Article>
      </el-tab-pane>
      <el-tab-pane label="通知回收站" name="second" class="ListArea">
        <Notify></Notify>
      </el-tab-pane>
      <!-- <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
// 引入模块
import { ref } from "vue";
import Article from './Article.vue'
import Notify from './Notify.vue'
// import { TabsPaneContext } from 'element-plus'
const activeName = ref('first')

</script>

<style lang="less" scoped>
.ArticleListArea {
  height: 100%;
  overflow: hidden;
  padding: 10px 0;
}
/deep/.el-table__cell {
  text-align: center;
}
.ListArea {
  width: 100%;
  height: 85vh;
  overflow: scroll;
}
.ListArea::-webkit-scrollbar {
  display: none;
}
/deep/.el-tabs__header{
  margin: 0;
}
</style>
