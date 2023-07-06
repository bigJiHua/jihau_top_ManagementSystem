import request from '@/utils/request'
// 获取文章列表
const GetArticleList = (Num: number) => {
  return request.post('/Ctrl/allarticle?Num=' + Num)
}
// 获取文章内容
const getArchives = (articleId: string) => {
  const params = new URLSearchParams()
  params.append('id', articleId)
  return request.get('/data/article', { params })
}
// 修改用户文章内容
const cagUPData = (data: { cagUserName: string, articleId: string, func: string }) => {
  const params: any = new URLSearchParams()
  params.append('cagUserName', data.cagUserName) // 更改的用户
  params.append('articleId', data.articleId) // 文章ID
  params.append('func', data.func) // 操作方法
  return request.post('/Ctrl/cagUPData', params)
}
export default {
  GetArticleList,
  getArchives,
  cagUPData
}