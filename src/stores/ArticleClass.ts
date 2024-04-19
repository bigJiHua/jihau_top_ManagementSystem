import { defineStore } from 'pinia'

export const useArticleDataStore = defineStore('ADstore', {
  state: () => ({
    ArticleListData: [] as Array<any>,
    NotifyListData: [] as Array<any>,
    totalNum: 0,
    totalPageNum: 0
  }),
  // 写
  actions: {
    increment(data: any) {
      this.ArticleListData = data
    },
    intotalNum(Num: number) {
      this.totalNum = Num
    },
    inNotifyListData(data: any) {
      this.NotifyListData = data
    },
    intotalPageNum(Num: number) {
      this.totalPageNum = Num
    }
  },
  // 读
  getters: {
    getStoreArticleListData(): Array<any> {
      return this.ArticleListData
    },
    getStoreNotifyListData() : Array<any> {
      return this.NotifyListData
    },
    getTotalNum(): number {
      return this.totalNum
    },
    getTotalPageNum(): number {
      return this.totalPageNum
    }
  },
})
