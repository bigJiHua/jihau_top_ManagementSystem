<template>
  <div id="" class="Login">
    <div class="LoginBox">
      <h2>登录</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" label-width="70px"  prop="username">
          <el-input
            type="username"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="70px" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" v-if="loading">登录</el-button
        >
        <el-button type="primary" :loading="true" v-else>登录中</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import PostLogin from '@/API/API/UserLogin/UserLogin'
export default {
  props: [],
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能短于6位'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'))
      } else if (value.length < 3) {
        callback(new Error('用户名长度不能短于3位'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: '1111',
        pass: '123456'
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        username: [{ validator: validatePass2, trigger: 'blur' }]
      },
      loading: true
    }
  },
  created () {},
  method () {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (localStorage.getItem('token')) {
            this.$message({
              showClose: true,
              message: '已经登录请勿重复登录',
              type: 'warning'
            })
            setTimeout(() => {
              this.$router.push('/Panel')
            }, 800)
          } else {
            this.loading = !this.loading
            const { data: res } = await PostLogin.Login(
              this.ruleForm.username,
              this.ruleForm.pass
            )
            if (res.status === 200) {
              this.$notify({
                title: res.status,
                message: res.message,
                type: 'success'
              })
              setTimeout(() => {
                localStorage.setItem('token', res.token)
                this.$router.push('/Panel')
                this.loading = !this.loading
              }, 800)
            } else {
              this.$notify.error({
                title: res.status,
                message: res.message
              })
            }
          }
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  watch: {},
  computed: {},
  filters: {},
  name: 'LoginM',
  components: {}
}
</script>

<style lang="less" scoped>
.Login {
  height: 100vh;
  width: 100vw;
  background-color: #EBEEF5;
}
.LoginBox {
  width: 30vw;
  max-height: 60vh;
  overflow: overlay;
  background-color: #F2F6FC;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 6px;
  text-align: center;
  box-shadow: 0px 0px 20px rgba(240, 240, 240, 0.5);
  color: rgba(4, 35, 127, 0.991);
  h2 {
    margin: 8px 0 20px 0;
  }
}
.LoginBox::-webkit-scrollbar {
  display: none;
}
</style>
