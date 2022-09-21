<template>
  <div class="tac AsideFrame">
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">用户数据</template>
          <router-link to="/Panel/UserData"
            ><el-menu-item index="1-1">用户信息数据</el-menu-item></router-link
          >
          <router-link to="/Panel/UserArticle"
            ><el-menu-item index="1-2">用户文章数据</el-menu-item></router-link
          >
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">管理用户</template>
          <el-menu-item index="1-4-1">普通用户</el-menu-item>
          <el-menu-item index="1-4-2">管理员</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">文章管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">文章数据</template>
          <router-link to="/Panel/UserData"
            ><el-menu-item index="1-1">用户文章数据</el-menu-item></router-link
          >
          <router-link to="/Panel/UserArticle"
            ><el-menu-item index="1-2">用户文章数据</el-menu-item></router-link
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">文件管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">文件</template>
          <router-link to="/Panel/UserData"
            ><el-menu-item index="1-1">用户图片</el-menu-item></router-link
          >
          <router-link to="/Panel/UserArticle"
            ><el-menu-item index="1-2">其他文件</el-menu-item></router-link
          >
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">站点设置</span>
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
  methods: {},
  watch: {},
  computed: {},
  filters: {},
  name: 'AsideFrame',
  components: {}
}
</script>

<style lang="less" scoped>
.AsideFrame {
  overflow: scroll;
}
.AsideFrame::-webkit-scrollbar {
  display: none;
}
.el-menu-item-group a {
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
