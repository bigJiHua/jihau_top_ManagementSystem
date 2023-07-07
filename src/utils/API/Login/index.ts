import request from '@/utils/request'
// 用户登录
const LoginMenu = function (userData: { username: string; password: string }) {
  const params = new URLSearchParams()
  params.append('username', userData.username)
  params.append('password', userData.password)
  return request.post('/my/login', params)
}
export default {
  LoginMenu
}
