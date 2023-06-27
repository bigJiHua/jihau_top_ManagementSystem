<template>
  <el-container>
    <el-header class="MenuHeader"><Header></Header></el-header>
    <el-container>
      <el-aside width="200px" class="MenuAside"><AsideBar></AsideBar></el-aside>
      <el-main class="MenuContenArea"><RouterView></RouterView></el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Header from '@/layout/Header/Header.vue'
import AsideBar from '@/layout/Aside/AsideBar.vue'
import { RouterView } from 'vue-router';
</script>

<style lang="less" scoped>
.MenuHeader {
  width: 100%;
  height: 50px;
  background-color: red;
}
.MenuAside {
  max-height: 90vh;
  width: 15vw;
  overflow: scroll;
}
.MenuAside::-webkit-scrollbar {
  display: none;
}
.MenuContenArea {
  background-color: blueviolet;
  padding: 10px;
}
</style>
