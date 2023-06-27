import request from '../request'
// 用户登录
const LoginMenu = function (userData : object) {
  const params = new URLSearchParams()
  params.append('username', userData.username)
  params.append('password', userData.password)
  return request.post('/my/login', params)
}
export default {
  LoginMenu
}
