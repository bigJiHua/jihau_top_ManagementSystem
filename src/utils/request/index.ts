import axios from 'axios'
import { showNotification } from '@/utils/components/RequestCode'
import useLocalStorage from '@/Hooks/useLocalStorage'


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
}, error => Promise.reject(error))

// axios响应式拦截器
request.interceptors.response.use(response => {
  const { data: res } = response
  if (res.status !== 200) {
    // 在需要显示通知的地方调用函数
    showNotification({
      title: '错误',
      message: res.message,
      type: 'warning',
    })
  } else {
    showNotification({
      title: '成功',
      message: res.message,
      type: 'success',
    })
  }
  return response
}, error => {
  return Promise.reject(error)
})


export default request