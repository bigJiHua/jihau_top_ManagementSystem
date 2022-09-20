<template>
  <el-container>
    <el-header height="75px"><Header></Header></el-header>
    <el-container class="content">
      <AsideFrame></AsideFrame>
      <el-container>
        <el-main><router-view></router-view></el-main>
        <el-footer>
          <FooterBar></FooterBar>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Header from '@/components/header/Header.vue'
import AsideFrame from '@/components/Aside/AsideFrame.vue'
import FooterBar from '@/components/footerbar/FooterBar.vue'
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
    AsideFrame,
    FooterBar
  }
}
</script>

<style lang="less" scoped></style>
