import axios from 'axios'
import { ElNotification } from 'element-plus'

// 创建axios实例
const request = axios.create({
  baseURL: 'https://jihau.top/api',
  timeout: 5000
})

// axios请求拦截器
request.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
}, error => Promise.reject(error))

// axios响应式拦截器
request.interceptors.response.use(response => {
  const { data: res } = response
  if(res.status!==200) {
    ElNotification.error({
      title: '错误',
      message: res.message
    })
  } else {
    ElNotification.success({
      title: '成功',
      message: res.message
    })
  }
  return response
}, error => {
    return Promise.reject(error)
  })


export default request