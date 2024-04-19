<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <template v-for="(menuItem, index) in menuArray" :key="index">
      <el-sub-menu :index="String(index + 1)">
        <template #title>
          <el-icon>
            <component :is="menuItem.icon.name" />
          </el-icon>
          <span>{{ menuItem.name }}</span>
        </template>
        <el-menu-item-group :title="menuItem.groupTitle">
          <el-menu-item v-for="(childItem, childIndex) in menuItem.children" :key="childIndex"
            :index="`${index + 1}-${childIndex + 1}`">
            <RouterLink :to="childItem.path" class="defalut_a_black routerLink">{{ childItem.name }}</RouterLink>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import {
  Document,
  Setting,
  User,
  TrendCharts,
  MessageBox,
  Delete,
  Message
} from '@element-plus/icons-vue'
const menuArray = [
  {
    name: '文章管理',
    icon: Document,
    groupTitle: '文章',
    children: [
      { name: '文章列表', path: '/controlPanel/ArticleList' }, // 获取所有文章 查阅所有用户的文章
      { name: '文章编辑', path: '/controlPanel/ArticleEditor' }, // 编辑目标文章
    ],
  }, {
    name: '通知管理',
    icon: MessageBox,
    groupTitle: '公告',
    children: [
      { name: '公告列表', path: '/controlPanel/NotifyList' }, // 发布站点通知 公告之类的 Page页面
      { name: '待发布列表', path: '/controlPanel/waitEditor' }, // 已上传到云端保存的通知 状态为未发布
      { name: '发布公告', path: '/controlPanel/NotifyPost' }, // 发布站点通知 公告之类的 Page页面
      { name: '公告编辑', path: '/controlPanel/NotifyEditor' }, // 编辑站点通知 公告之类的 Page页面
    ],
  },
  {
    name: '站内信',
    icon: Message,
    groupTitle: '通知',
    children: [
      { name: '全站内信列表', path: '/controlPanel/msglist' }, // 统一发送全站通知
      { name: '站内信发送', path: '/controlPanel/sysmsg' }, // 统一发送全站通知
    ],
  }, {
    name: '回收站',
    icon: Delete,
    groupTitle: '文章/通知回收站',
    children: [
      { name: '回收站', path: '/controlPanel/recycle' }, // 站点通知/文章的回收站
    ],
  },
  {
    name: '用户管理',
    icon: User,
    groupTitle: '管理',
    children: [
      { name: '用户信权', path: '/controlPanel/UserList' }, // 分别展示 用户 和 管理员
    ],
  },
  {
    name: '数据统计',
    icon: TrendCharts,
    groupTitle: '统计',
    children: [
      { name: '文章统计', path: '/controlPanel/ArticleCount' }, // 展示所有文章数目图\文章点赞数最高 评论最多等等数据 图
      { name: '用户统计', path: '/controlPanel/UserCount' }, // 展示所有用户分布图
      { name: '来源统计', path: '/controlPanel/sourceCount' },// 展示用户来源分布图
    ],
  },
  {
    name: '系统设置',
    icon: Setting,
    groupTitle: '设置',
    children: [
      { name: '轮播图', path: '/controlPanel/Carousel' }, // 修改首页轮播图
      { name: '友链', path: '/controlPanel/FriendChain' }, // 增删友链
      { name: '发展历程', path: '/controlPanel/Develop' }, // 增删友链
      { name: '站点设置', path: '/controlPanel/SiteSetting' }, // 是否开启注册等等
      { name: '站点运行图', path: '/controlPanel/SiteRun' }, // 展示站点运行状态
    ],
  }
]
</script>

<style lang="less" scoped>
.routerLink {
  display: block;
  width: 100%;
}

.routerLink:hover {
  background-color: rgb(236, 245, 255);
}
</style>
