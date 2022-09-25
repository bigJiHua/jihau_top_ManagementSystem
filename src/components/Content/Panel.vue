<template>
  <el-container>
    <el-header height="50px"><Header></Header></el-header>
    <el-container class="content">
      <AsideFrame></AsideFrame>
      <el-container>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Header from '@/components/header/Header.vue'
import AsideFrame from '@/components/Aside/AsideFrame.vue'
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
  name: 'PanelM',
  components: {
    Header,
    AsideFrame
  }
}
</script>

<style lang="less" scoped></style>
