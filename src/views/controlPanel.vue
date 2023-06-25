<template>
  <h1></h1>
  <el-container>
    <el-header><Header></Header></el-header>
    <el-container>
      <el-aside width="200px"><AsideBar></AsideBar></el-aside>
      <el-main><RouterView></RouterView></el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Header from '@/layout/Header/Header.vue'
import AsideBar from '@/layout/Aside/AsideBar.vue'
import { RouterView } from 'vue-router';
</script>

<style lang="less" scoped></style>
