import axios from 'axios'
import useLocalStorage from '@/Hooks/useLocalStorage'
import { useRouter } from 'vue-router'
const router = useRouter()
import { ElNotification } from 'element-plus'


// 创建axios实例
const request = axios.create({
  baseURL: 'http://192.168.0.110/api',
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
    ElNotification({
      title: '错误',
      message: res.message,
      type: 'warning',
    })
    if (res.status === 401 || res.status === 404) {
      localStorage.removeItem('token')
      router.push('/')
    }
  } else {
    ElNotification({
      title: '成功',
      message: res.message,
      type: 'success',
    })
  }
  return response
}, error => {
  const errorCode: number = error.response.status
  // 在需要显示通知的地方调用函数
  ElNotification({
    title: '错误',
    message: error.response.data.message,
    type: 'error',
  })
  if (errorCode === 401) {
    localStorage.removeItem('token')
    router.push('/')
  }
  return Promise.reject(error)
})


export default request