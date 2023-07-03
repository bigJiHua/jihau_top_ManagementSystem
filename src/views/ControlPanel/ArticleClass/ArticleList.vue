<template>
  <div class="ArticleListArea">
    <el-table :data="ArticleData.data" class="ArticleListTable" border table-layout="fixed"
      style="width: 100%; height: calc(100% - 50px); overflow-x: auto;" stripe>
      <el-table-column fixed prop="article_id" label="文章ID" width="70">
        <template v-slot="scope">
          <a :href="`https://jihau.top/article/` + scope.row.article_id" target="_blank" class="defalut_a_black">
            {{ scope.row.article_id }}
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="文章标题" width="120" />
      <el-table-column prop="content" label="内容" width="200">
        <template v-slot="scope">
          <div class="Limit-content">{{ scope.row.content }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="cover_img" label="文章首页配图" width="100">
        <template v-slot="scope">
          <img :src="scope.row.cover_img" alt="文章配图" class="Limit-Img">
        </template>
      </el-table-column>
      <el-table-column prop="keyword" label="关键词" width="150" />
      <el-table-column prop="lable" label="标签" width="150" />
      <el-table-column prop="read_num" label="浏览次数" width="70" />
      <el-table-column prop="pub_date" label="发布日期" width="90" />
      <el-table-column prop="username" label="作者" width="60" />
      <el-table-column prop="is_delete" label="状态" width="100">
        <template v-slot="scope">
          <div class="Limit-content">{{ CountDeleteCode(scope.row.is_delete) }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="ArticleDetail(scope.row.article_id)">详细</el-button>
          <el-button link type="primary" size="small" @click="ArticleEdit(scope.row.article_id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="prevBar">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="prevNum" @prev-click="pagerNum"
        @next-click="nextNum" />
    </div>
  </div>
  <ArticleDetailPanel v-if="isDetail"></ArticleDetailPanel>
</template>

<script setup lang="ts">
// 引入模块
import { ref, reactive, onMounted, watch, computed } from "vue";
import ArticleRequest from "@/utils/API/ArticleClass"
import { useArticleDataStore } from '@/stores/ArticleClass'
import ArticleDetailPanel from '@/components/ArticleClass/ArticleDetailPanel.vue'
// 数据定义 
const store = useArticleDataStore()
let ArticleData = reactive({ data: store.getStoreArticleListData })
let isDetail = ref(false)
let isEditor = ref(false)
let total = ref(store.getTotalNum)
// 方法
async function GetArticleListData(GetNum: number) {
  const { data: res } = await ArticleRequest.GetArticleList(GetNum)
  store.increment(res.data)
  store.intotalNum(res.totalNum)
}
const ArticleDetail = (article_id: string) => {
  isDetail.value = !isDetail.value
}
const ArticleEdit = (article_id: string) => {
  isEditor.value = !isEditor.value
}
function isSameData(data1: any[], data2: any[]) {
  return JSON.stringify(data1) === JSON.stringify(data2);
}
// 上一页
const prevNum = (num: number) => {
  GetArticleListData(num)
}
// 数字
const pagerNum = (num: number) => {
  GetArticleListData(num)
}
// 下一页
const nextNum = (num: number) => {
  GetArticleListData(num)
}
// 在组件挂载时获取文章列表数据
onMounted(() => {
  if (store.getStoreArticleListData.length === 0) {
    GetArticleListData(1)
  }
})
// 监听属性
watch(
  [
    () => store.getStoreArticleListData,
    () => store.getTotalNum
  ], // 新值                        旧值
  ([newArticleData, newTotalNum], [oldArticleData, oldTotalNum]) => {
    if (!isSameData(ArticleData.data, newArticleData)) {
      ArticleData.data = newArticleData;
    }
    total.value = newTotalNum
  }
);
const CountDeleteCode = computed(() => {
  return (state: string) => {
    return parseInt(state) === 0 ? '已发布正常' : '已删除'
  }
})
</script>

<style lang="less" scoped>
.Limit-content {
  height: 50px;
  padding: 2px;
}

.Limit-Img {
  height: 50px;
  width: 80px;
}

.ArticleListArea {
  height: 100%;
  overflow: hidden;
  padding: 10px 0;
}

.ArticleListTable {
  height: 100%;
  padding: 0 0 5px 0;
}

.prevBar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
</style>
