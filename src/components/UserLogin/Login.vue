<template>
  <div id="" class="Login">
    <div class="LoginBox">
      <h2>JiHua后台管理面板 --- 管理员登录</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="username"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="CheckNum" class="CheckNum">
          <el-input
            type="CheckNum"
            v-model="ruleForm.CheckNum"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
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
      } else if (value.length < 6) {
        callback(new Error('用户名长度不能短于6位'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'))
      } else if (value.length < 6) {
        callback(new Error('用户名长度不能短于6位'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        username: '',
        CheckNum: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        username: [{ validator: validatePass2, trigger: 'blur' }],
        CheckNum: [{ validator: validatePass3, trigger: 'blur' }]
      }
    }
  },
  created () {},
  method () {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
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
  background-image: linear-gradient(
    to right top,
    #caf8ec,
    #94e1e2,
    #5ac7df,
    #18acdf,
    #008dd9,
    #5f80dd,
    #966dd3,
    #c254b9,
    #ff5495,
    #ff7468,
    #ffa63c,
    #f6d92a
  );
}
.LoginBox {
  width: 50vw;
  max-height: 60vh;
  overflow: overlay;
  background-color: rgba(240, 240, 240, 0.5);
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
.demo-ruleForm {
  padding: 0 0 0 75px;
}
.el-form-item {
  width: 35vw;
}
.CheckNum{
  width: 20vw;
}
</style>
