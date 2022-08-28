<template>
  <div id="" class="Header">
    <h2>JiHua后台管理系统</h2>
    <p class="Headertime">现在时间：{{ time }}</p>
    <el-button v-if="!isLogin">登录</el-button>
    <el-button v-else>退出登录</el-button>
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {
      isLogin: !localStorage.getItem('token'),
      time: this.$dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  created () {
    setInterval(() => {
      this.time = this.$dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
  },
  method () {},
  methods: {},
  watch: {},
  computed: {},
  filters: {},
  name: 'HeaderM',
  components: {}
}
</script>

<style lang="less" scoped>
.Header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.Headertime{
  font-weight: bolder;
  font-size: 1.2rem;
}
</style>
