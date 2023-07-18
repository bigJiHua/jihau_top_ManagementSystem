<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal">
      <RouterLink to="/controlPanel/Notify/NotifyList">
        <el-menu-item index="1">通知列表</el-menu-item>
      </RouterLink>
      <RouterLink to="/controlPanel/Notify/waitEditor">
        <el-menu-item index="2">待发布列表</el-menu-item>
      </RouterLink>
      <el-sub-menu index="3">
        <template #title>编辑/发布</template>
        <RouterLink to="/controlPanel/Notify/NotifyPost">
          <el-menu-item index="3-1">发布</el-menu-item>
        </RouterLink>
        <RouterLink to="/controlPanel/Notify/NotifyEditor">
          <el-menu-item index="3-2">编辑通知</el-menu-item>
        </RouterLink>
      </el-sub-menu>
    </el-menu>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router';
</script>

<style scoped></style>
