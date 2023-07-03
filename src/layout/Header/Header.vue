<template>
  <div class="HeaderBox">
    <h1>JiHua后台管理面板 control Panel</h1>
    <h3>{{ $route.name }}</h3>
    <div>
      <el-button v-if="token" color="#626aef" @click="outLogin">退出登录</el-button>
      <RouterLink :to="{ path: '/Login' }" v-else>
        <el-button color="#626aef">登录</el-button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const token = localStorage.getItem('token') ? true : false
const router = useRouter()
function outLogin() {
  localStorage.removeItem('token')
  router.push('/Login')
}
</script>

<style lang="less" scoped>
.HeaderBox {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
</style>
