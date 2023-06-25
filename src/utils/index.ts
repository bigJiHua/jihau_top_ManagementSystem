import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: 'http://127.0.0.1/api',
  timeout: 5000
})

// axios请求拦截器
request.interceptors.request.use(config => {
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
request.interceptors.response.use(res => res.data, e => {
  return Promise.reject(e)
})


export default request