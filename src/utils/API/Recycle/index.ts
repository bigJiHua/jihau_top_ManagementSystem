import request from '@/utils/request'

// 获取文章/通知/待发布通知的数据列表
const getRecycleList = (cagid: string | number, type: string, action: string) => {
  return request.get('/Ctrl/recycle?cagid=' + cagid + '&type=' + type + '&action=' + action)
}
export default {
  getRecycleList
}