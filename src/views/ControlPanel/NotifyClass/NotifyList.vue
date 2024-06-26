<template>
  <div class="ArticleListArea">
    <div class="searchBar">
      <el-input v-model="searchKey" size="large" class="HeaderItem" placeholder="搜索通知">
        <template #append>
          <el-button :icon="Search" @click="searchArticleData" />
        </template>
      </el-input>
    </div>
    <el-table :data="ArticleData.data" class="ArticleListTable" border table-layout="fixed"
      style="width: 100%; height: calc(100% - 80px); overflow-x: auto;" stripe>
      <el-table-column fixed prop="article_id" label="文章ID" width="80">
        <template v-slot="scope">
          <a :href="`http://test.020907.xyz/notify/` + scope.row.notify_id" target="_blank" class="defalut_a_black articleId">
            {{ scope.row.notify_id }}
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
          <img v-if="scope.row.cover_img" :src="scope.row.cover_img" alt="文章配图" class="Limit-Img">
          <span v-else>无文章配图</span>
        </template>
      </el-table-column>
      <el-table-column prop="keyword" label="关键词" width="150" />
      <el-table-column prop="lable" label="标签" width="150" />
      <el-table-column prop="read_num" label="浏览次数" sortable width="90" />
      <el-table-column prop="pub_date" label="发布日期" sortable width="90" />
      <el-table-column prop="username" label="作者" width="80" />
      <el-table-column prop="is_delete" label="状态" width="100">
        <template v-slot="scope">
          <div class="Limit-content">{{ CountDeleteCode(scope.row.is_delete) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="whosee" label="谁能看" width="60">
        <template v-slot="scope">
          <div class="Limit-content">{{ whosee(scope.row.whosee) }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="ArticleDetail(scope.row.notify_id)">详细</el-button>
          <el-button link type="primary" size="small" @click="ArticleEdit(scope.row.notify_id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="prevBar">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="prevNum" @prev-click="pagerNum"
        @next-click="nextNum" />
    </div>
  </div>
  <ArticleDetailPanel v-if="isDetail" @closePanel="closePanel" :ArticleId="ArticleId" :isTrue="isTrue" :type="'notify'">
  </ArticleDetailPanel>
</template>

<script setup lang="ts">
// 引入模块
import { ref, reactive, onMounted, watch, computed } from "vue";
import ArticleRequest from "@/utils/API/ArticleClass"
import { useArticleDataStore } from '@/stores/ArticleClass'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from "vue-router"
import ArticleDetailPanel from '@/components/ArticleClass/ArticleDetailPanel.vue'
import { ElMessage } from "element-plus";
// 数据定义 
const store = useArticleDataStore()
let ArticleData = reactive({ data: store.getStoreNotifyListData })
let router = useRouter()
let isDetail = ref(false)
let total = ref(store.getTotalPageNum)
let ArticleId: string = ''
let isTrue: boolean = false
const searchKey = ref('')
let nowPagenum = 0
// 方法
async function GetArticleListData(GetNum: number) {
  const { data: res } = await ArticleRequest.getDataList(GetNum, 'notify')
  store.inNotifyListData(res.data)
  store.intotalPageNum(res.totalNum)
}

const ArticleDetail = (notify_id: string) => {
  isDetail.value = true
  ArticleId = notify_id
  isTrue = true
}
// 关闭Panel
const closePanel = () => {
  isDetail.value = false
  GetArticleListData(nowPagenum)
}
// 编辑跳转
const ArticleEdit = (notify_id: string) => {
  router.push('/controlPanel/NotifyEditor/' + notify_id)
}
function isSameData(data1: any[], data2: any[]) {
  return JSON.stringify(data1) === JSON.stringify(data2);
}
// 上一页
const prevNum = (num: number) => {
  GetArticleListData(num)
  nowPagenum = num
}
// 数字
const pagerNum = (num: number) => {
  GetArticleListData(num)
  nowPagenum = num
}
// 下一页
const nextNum = (num: number) => {
  GetArticleListData(num)
  nowPagenum = num
}
const isNonEmptyString = (key: string): boolean => {
  const trimmedInput = key.trim();
  return trimmedInput !== '';
};
// 搜索文章
const searchArticleData = async () => {
  if (isNonEmptyString(searchKey.value)) {
    const { data: res } = await ArticleRequest.search(searchKey.value, 'notify')
    ArticleData.data = res.data
    searchKey.value = ''
  } else {
    ElMessage.error('关键词不能为空！')
    GetArticleListData(1)
    nowPagenum = 1
  }
}
// 在组件挂载时获取文章列表数据
onMounted(() => {
  if (store.getStoreNotifyListData.length === 0) {
    GetArticleListData(1)
    nowPagenum = 1
  }
})
// 监听属性
watch(
  [
    () => store.getStoreNotifyListData,
    () => store.getTotalPageNum
  ], // 新值                        旧值
  ([newArticleData, newTotalNum], [oldArticleData, oldTotalNum]) => {
    if (!isSameData(ArticleData.data, newArticleData)) {
      ArticleData.data = newArticleData;
    }
    total.value = newTotalNum
  }
);
// 计算属性
const CountDeleteCode = computed(() => {
  return (state: string) => {
    return parseInt(state) === 0 ? '已发布正常' : '待发布'
  }
})
const whosee = computed(() => {
  return (see: number) => {
    return see === 0 ? '所有人' : '管理员'
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

:deep(.el-table__cell) {
  text-align: center;
}

.articleId {
  color: black;
  font-weight: 600;
}
</style>
