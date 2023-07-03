import request from '@/utils/request'
// 获取文章列表
const GetArticleList = function (Num: number) {
  return request.post('/Ctrl/allarticle?Num=' + Num)
}
export default {
  GetArticleList
}
