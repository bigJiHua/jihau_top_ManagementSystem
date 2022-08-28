<template>
  <div id="app">
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
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue'
import AsideFrame from '@/components/Aside/AsideFrame.vue'
import FooterBar from './components/footerbar/FooterBar.vue'

export default {
  name: 'App',
  components: {
    Header,
    AsideFrame,
    FooterBar
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 90vh;
}
.el-header{
  background-color: rgba(240,240,240,0.8);
}
@media only screen and (max-width: 755px) {
  .content{
    display: block;
  }
}
</style>
