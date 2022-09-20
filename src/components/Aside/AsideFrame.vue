<template>
  <div class="tac AsideFrame">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">用户数据</template>
          <router-link to="/Panel/UserData"><el-menu-item index="1-1">用户信息数据</el-menu-item></router-link>
          <router-link to="/Panel/UserArticle"><el-menu-item index="1-2">用户文章数据</el-menu-item></router-link>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {}
  },
  created () {},
  method () {},
  methods: {
  },
  watch: {},
  computed: {},
  filters: {},
  name: 'AsideFrame',
  components: {}
}
</script>

<style lang="less" scoped>
.el-menu-item-group a{
  text-decoration: none;
  color: black;
}
@media only screen and (min-width: 755px) {
  .AsideFrame {
    width: 202px;
    height: calc(100vh - 100px);
    background-color: #e9eef3;
  }
}
@media only screen and (max-width: 755px) {
  .AsideFrame {
    height: calc(100vh - 100px);
    background-color: #e9eef3;
  }
}
</style>
