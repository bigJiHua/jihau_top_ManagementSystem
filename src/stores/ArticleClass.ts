import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useArticleDataStore = defineStore('ADstore', {
  state: () => ({
    ArticleListData: [] as Array<any>,
    totalNum: 0
  }),
  // 写
  actions: {
    increment(data: any) {
      this.ArticleListData = data
    },
    intotalNum(Num: number) {
      this.totalNum = Num
    }
  },
  // 读
  getters: {
    getStoreArticleListData(): Array<any> {
      return this.ArticleListData
    },
    getTotalNum(): number {
      return this.totalNum
    }
  },
})
