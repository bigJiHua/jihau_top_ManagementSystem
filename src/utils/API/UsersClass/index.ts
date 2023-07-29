import request from '@/utils/request'

// 获取文章/通知/待发布通知的数据列表
const getUserList = (Num: number, type: string, data?: any, id?: number) => {
  const params: any = new URLSearchParams()
  params.append('id', id) // 携带的数据
  params.append('data', data) // 携带的数据
  return request.get('/Ctrl/Users?Num=' + Num + '&type=' + type, params)
}

export default {
  getUserList
}