<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <Document />
        </el-icon>
        <span>文章管理</span>
      </template>
      <el-menu-item-group title="用户文章">
        <el-menu-item index="1-1">审阅文章</el-menu-item>
        <el-menu-item index="1-2">编辑文章</el-menu-item>
        <el-menu-item index="1-3">编辑通知</el-menu-item>
        <el-menu-item index="1-4">文章统计</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <User />
        </el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item-group title="用户管理">
        <el-sub-menu index="2-1">
          <template #title>管理</template>
          <el-menu-item index="2-1-1">站点用户</el-menu-item>
          <el-menu-item index="2-1-2">管理员</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2-2">用户统计</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon>
          <Files />
        </el-icon>
        <span>资源管理</span>
      </template>
      <el-menu-item-group title="站点资源">
        <el-menu-item index="3-1">站内图库</el-menu-item>
        <el-menu-item index="3-1">站内文件</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="4">
      <template #title>
        <el-icon>
          <setting />
        </el-icon>
        <span>系统设置</span>
      </template>
      <el-menu-item-group title="系统设置">
        <el-sub-menu index="4-1">
          <template #title>首页设置</template>
          <el-menu-item index="4-1-1">轮播图</el-menu-item>
          <el-menu-item index="4-1-2">友链添加</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4-2">站点设置</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  Document,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="less" scoped></style>
