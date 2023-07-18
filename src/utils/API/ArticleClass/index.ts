import request from '@/utils/request'

// 获取文章/通知/待发布通知的数据列表
const getDataList = (Num: number, type: string) => {
  return request.get('/Ctrl/getData?Num=' + Num + '&type=' + type)
}

// 获取文章内容
const getDetail = function (articleId: string | number, type: string) {
  return request.get('/Ctrl/getDetail?id=' + articleId + '&type=' + type)
}

// 修改用户文章 评论、状态
const cagUPData = (data: { cagUserName: string, articleId: string, func: string },type:string) => {
  const params: any = new URLSearchParams()
  params.append('cagUserName', data.cagUserName) // 更改的用户
  params.append('articleId', data.articleId) // 文章ID
  params.append('func', data.func) // 操作方法
  return request.post('/Ctrl/cagUPData?type=' + type, params)
}
// 修编用户文章
const cagUAData = (reason: string, data: string,type:string) => {
  const params: any = new URLSearchParams()
  params.append('reason', reason) // 更改的理由
  params.append('data', data) // 数据
  params.append('type', type) // 数据
  return request.post('/Ctrl/cagUAData', params)
}
// 文章列表---搜索文章
const searchArticle = (key: string | number, type: string) => {
  return request.get('/Ctrl/searchArticle?key=' + key + '&type=' + type)
}

/*
  通知域API
*/
const postNotify = (data: { title: string, lable: string, keyword: string, content: string, state: number, whosee: number },id?:string) => {
  const params: any = new URLSearchParams()
  params.append('title', data.title)
  params.append('lable', data.lable)
  params.append('keyword', data.keyword)
  params.append('content', data.content)
  params.append('state', data.state)
  params.append('whosee', data.whosee)
  if(id) {
    return request.post('/Ctrl/postnotify?id='+id, params)
  }
  
  return request.post('/Ctrl/postnotify', params)
}


export default {
  getDetail,
  cagUPData,
  cagUAData,
  searchArticle,
  postNotify,
  getDataList
}