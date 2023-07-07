import request from '@/utils/request'
// 获取文章列表
const GetArticleList = function (Num: number) {
  return request.post('/Ctrl/allarticle?Num=' + Num)
}
// 获取文章内容
const getArchives = function (articleId: string) {
  const params = new URLSearchParams()
  params.append('id', articleId)
  return request.get('/archives/', { params })
}
export default {
  GetArticleList,
  getArchives
}