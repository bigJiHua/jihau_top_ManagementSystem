import request from '@/utils/request'

// 获取用户的数据列表
const sendMsg = (data: {
  type: string,
  title: string,
  senduser: string,
  getuser: string,
  content: string,
  label: string
}) => {
  const params: any = new URLSearchParams()
  params.append('type', data.type)
  params.append('title', data.title)
  params.append('senduser', data.senduser)
  params.append('getuser', data.getuser)
  params.append('content', data.content)
  params.append('label', data.label)
  return request.post('/Ctrl/msg', params)
}
// 获取已发布的通知列表
const getMsg = (num: number, key?: string | undefined) => {
  return request.get('/Ctrl/msg?num=' + num + '&key=' + key)
}// 获取已发布的通知列表
const delMsg = (id: string,type: string) => {
  const params: any = new URLSearchParams()
  params.append('id', id)
  params.append('type', type)
  return request.patch('/Ctrl/msg', params)
}
export default {
  sendMsg,
  getMsg,
  delMsg
}