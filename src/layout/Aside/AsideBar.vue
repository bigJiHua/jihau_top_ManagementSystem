<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <template v-for="(menuItem, index) in menuArray" :key="index">
      <el-sub-menu :index="index + 1">
        <template #title>
          <el-icon>
            <component :is="menuItem.icon.name" />
          </el-icon>
          <span>{{ menuItem.name }}</span>
        </template>
        <el-menu-item-group :title="menuItem.groupTitle">
          <el-menu-item v-for="(childItem, childIndex) in menuItem.children" :key="childIndex" :index="`${index + 1}-${childIndex + 1}`">
            {{ childItem.name }}
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  Document,
  Setting,
  User,
  TrendCharts
} from '@element-plus/icons-vue'
const menuArray = [
  {
    name: '文章管理',
    icon: Document,
    groupTitle: '文章',
    children: [
      { name: '文章列表' }, // 获取所有文章 查阅所有用户的文章
      { name: '文章编辑' }, // 编辑目标文章
      { name: '通知编辑' }, // 发布站点通知 公告之类的 Page页面
    ],
  },
  {
    name: '用户管理',
    icon: User,
    groupTitle: '管理',
    children: [
      { name: '用户列表' }, // 分别展示 用户 和 管理员
      { name: '权限管理' }, // 对用户分权
    ],
  },
  {
    name: '数据统计',
    icon: TrendCharts,
    groupTitle: '统计',
    children: [
      { name: '文章统计', url: '' }, // 展示所有文章数目图
      { name: '用户统计', url: '' }, // 展示所有用户分布图
      { name: '访问量统计', url: '' },// 展示网站访问量图
      { name: '用户活跃度', url: '' },// 展示用户活跃状态图
      { name: '用户设备统计', url: '' },// 展示用户使用的设备 宽高大小 设备显示密度 统计图
      { name: '用户来源统计', url: '' },// 展示用户来源分布图
      { name: '文章互动统计', url: '' },// 展示文章点赞数最高 评论最多等等数据 图
    ],
  },
  {
    name: '系统设置',
    icon: Setting,
    groupTitle: '设置',
    children: [
      { name: '轮播图', url: '' }, // 修改首页轮播图
      { name: '友链', url: '' }, // 增删友链
      { name: '站点设置', url: '' }, // 是否开启注册等等
      { name: '站点运行图', url: '' }, // 展示站点运行状态
    ],
  }
]
</script>

<style lang="less" scoped></style>
