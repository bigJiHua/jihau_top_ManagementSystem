<template>
  <div id="logonCon" class="container">
    <div class="login_conten_box">
      <img class="login_img" src="https://jihau.top/api/public/uploads/undraw_Login_re_4vu2.png" />
      <div class="user_input_eara">
        <h2 v-if="islogin">登录 <small>Login</small></h2>
        <h2 v-else>欢迎回来 <small>Come Back</small></h2>
        <form class="form-horizontal" v-if="islogin">
          <div>
            <label for="username" class="login_lable">用户名:</label>
            <input id="username" type="text" v-model="username" class="form-control login_input" placeholder="请输入用户名"
              required />
          </div>
          <div>
            <label for="password" class="login_lable">密码:</label>
            <input id="password" type="password" class="form-control login_input" placeholder="请输入密码" required
              v-model="password" @keydown.enter="login" />
          </div>
        </form>
        <div class="btnmenu" v-if="islogin">
          <el-button type="primary" plain @click="login" class="Loginbtn">登录</el-button>
        </div>
        <div class="btnmenu" v-else>
          <RouterLink to="/controlPanel">
            <el-button type="primary" plain class="Loginbtn">进入</el-button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PostLogin from '@/utils/API/Login'
import { ElNotification } from 'element-plus'
import { ref, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import useLocalStorage from '@/Hooks/useLocalStorage'
import { useTokenStore } from '@/stores/getToken'
const TokenStore = useTokenStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const rules = reactive({
  username: {
    rule: /^(?=(.*[a-zA-Z].*))(?=(.*\d.*))[\w]{5,12}$|^(?=(.*[a-zA-Z].*))(?=(.*_.*))[\w]{5,12}$|^(?=(.*\d.*))(?=(.*_.*))[\w]{5,12}$|^(?=.*[a-zA-Z\d_].*[a-zA-Z\d_])[\w]{5,12}$/,
    msg: '用户名不能为空!且长度为5-12位'
  },
  password: {
    rule: /^\S{6,12}/,
    msg: '密码不能为空!且长度为6-12位'
  }
})
const islogin = !TokenStore.isToken
async function login() {
  // 验证是否已经拥有token
  if (!localStorage.getItem('token')) {
    // 验证输入的用户名是否合法
    if (validata('username', username.value)) {
      // 验证输入的密码是否合法
      if (validata('password', password.value)) {
        // 发起请求
        const { data: res } = await PostLogin.LoginMenu({
          username: username.value,
          password: password.value
        })
        const UserData = res.data.Users
        // 判断返回状态码是否成功
        if (res.token) {
          useLocalStorage.setLoc('token', res.token, false)
          useLocalStorage.setLoc('Username', UserData.username, false)
          useLocalStorage.setLoc('useridentity', UserData.useridentity, false)
          router.push('/controlPanel')
        }
      }
    }
  } else {
    setTimeout(() => {
      ElNotification({
        title: '警告',
        message: '已经登录啦！请勿重复提交表单！',
        type: 'warning'
      })
      router.push('/controlPanel')
    }, 500)
  }
}

function validata(key: string, value: string) {
  let bool: boolean = true
  if (!rules[key as keyof typeof rules].rule.test(value)) {
    bool = false
    ElNotification({
      title: '警告',
      message: rules[key as keyof typeof rules].msg,
      type: 'warning'
    })
    return bool
  }
  return bool
}
</script>

<style scoped>
#logonCon {
  width: 100vw;
  height: 100vh;
  background-color: rgba(244, 244, 244, 0.4);
}

* {
  margin: 0;
  padding: 0;
}

.login_conten_box {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tip {
  position: absolute;
  bottom: 20px;
  text-align: center;
  width: 100vw;

  >span {
    color: red;
  }
}

@media only screen and (min-width: 755px) {
  .login_conten_box {
    background-color: rgba(244, 244, 244, 0.4);
    width: 55vw;
    border-radius: 12px;
    box-shadow: 0 0px 45px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
  }

  .login_img {
    width: 50%;
    border-radius: 12px 0 0 12px;
  }

  .user_input_eara {
    width: 100%;
    padding: 20px 25px;
  }

  .user_input_eara>h2 {
    margin-bottom: 15px;
    font-weight: bolder;
    color: black;
  }

  .login_lable:first-child {
    margin: 10px 0;
  }

  .login_lable {
    display: inline-block;
    width: 4rem;
    font-weight: bolder;
  }

  .login_input {
    margin: 0 0 25px 0;
    padding: 5px 10px;
    border-radius: 5px;
    border: 0;
    height: 1.8rem;
  }
}

@media only screen and (max-width: 755px) {
  .login_conten_box {
    background-color: rgba(244, 244, 244, 0.4);
    width: 90vw;
    border-radius: 12px;
    box-shadow: 0 0 45px rgba(0, 0, 0, 0.2);
  }

  .login_img {
    display: none;
  }

  .user_input_eara {
    padding: 15px;
  }

  .user_input_eara>h2 {
    margin-bottom: 15px;
    font-weight: bolder;
  }

  .login_lable:first-child {
    margin: 10px 0;
  }

  .login_lable {
    display: inline-block;
    width: 4rem;
    font-weight: bolder;
  }

  .login_input {
    margin: 0 0 25px 0;
    padding: 5px 10px;
    border-radius: 5px;
    border: 0;
    height: 1.8rem;
  }
}

.btnmenu {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.Loginbtn {
  padding: 10px 18px;
}
</style>