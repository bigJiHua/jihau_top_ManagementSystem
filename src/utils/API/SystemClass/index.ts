import request from '@/utils/request'

// 获取轮播
const getLunBo = (met: string, data?: any) => {
  const params = new URLSearchParams()
  params.append('met', met)
  if (met === 'cag') {
    params.append('data', data)
  }
  return request.post('/Ctrl/Lunbo', params)
}
// 获取发展历程
const getDevP = (met: string) => {
  const params = new URLSearchParams()
  params.append('met', met)
  return request.post('/Ctrl/DevP', params)
}
// 获取友链
const getSpsList = (met: string, data?: any) => {
  const params = new URLSearchParams()
  params.append('met', met)
  params.append('data', data)
  return request.post('/Ctrl/SpsList', params)
}
export default {
  getLunBo,
  getDevP,
  getSpsList
}