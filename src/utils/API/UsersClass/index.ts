import request from '@/utils/request'

// 获取用户的数据列表
const getUserList = (Num: number, type: string, data?: any, id?: number) => {
  const params: any = new URLSearchParams()
  params.append('id', id) // 携带的数据
  params.append('data', data) // 携带的数据
  return request.get('/Ctrl/Users?Num=' + Num + '&type=' + type, params)
}
// 获取用户信息
const GetUserData = (user: string) => {
  return request.get('/users/?user=' + user)
}
// 获取用户文章 收藏 评论 点赞列表
const getUserActData = (user: string) => {
  return request.get('/users/actdata?user=' + user)
}
// 删除用户评论
const deleteUserComment = (id: number, user: string, article_id: string | number) => {
  return request.get('/users/delact?id=' + id + '&username=' + user + '&article_id=' + article_id)
}
// 修改用户信息
const ChangeUserData = (id: string, type: string, data: object) => {
  const params = new URLSearchParams()
  params.append('data' , JSON.stringify(data))
  params.append('id' , id)
  params.append('type' , type)
  return request.patch('/Ctrl/cagUsers', params)
}
// 修改用户权限
const ChangeUserPower = (user: string, type: string, data: any) => {
  const params = new URLSearchParams()
  params.append('data' , JSON.stringify(data))
  params.append('user' , user)
  return request.post('/Ctrl/cagPower?type=' + type, params)
}
export default {
  getUserList,
  GetUserData,
  getUserActData,
  deleteUserComment,
  ChangeUserData,
  ChangeUserPower
}