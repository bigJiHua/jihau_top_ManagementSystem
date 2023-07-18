import axios from 'axios'
import useLocalStorage from '@/Hooks/useLocalStorage'
import { ElNotification,ElMessage  } from 'element-plus'
import router from '@/router'


// 创建axios实例
const request = axios.create({
  baseURL: '',
  timeout: 5000
})

// axios请求拦截器
request.interceptors.request.use(config => {
  if (useLocalStorage.getLoc('token', false)) {
    config.headers.Authorization = useLocalStorage.getLoc('token', false)
  }
  return config
}, error => {
  ElNotification({
    title: '错误',
    message: error.message,
    type: 'error',
  })
  return Promise.reject(error)
})

// axios响应式拦截器
request.interceptors.response.use(response => {
  const { data: res } = response
  if (res.status !== 200) {
    // 在需要显示通知的地方调用函数
    ElNotification({
      title: '错误',
      message: res.message,
      type: 'warning',
      duration: 1500
    })
    if (res.status === 401 || res.status === 404) {
      localStorage.removeItem('token')
      router.push('/')
    }
  } else {
    ElMessage.success({
      message: res.message,
      duration: 500
    })
  }
  return response
}, error => {
  const errorCode: number = error.response.status ? error.response.status : 200
  const message = error.response.data.message ? error.response.data.message : error.message
  // 在需要显示通知的地方调用函数
  ElNotification({
    title: '错误',
    message: message,
    type: 'error',
    duration: 1500
  })
  if (errorCode === 401) {
    localStorage.removeItem('token')
    router.push('/')
  }
  return Promise.reject(error)
})


export default request