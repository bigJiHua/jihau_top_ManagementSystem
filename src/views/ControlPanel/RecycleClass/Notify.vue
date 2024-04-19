<template>
  <div class="ArticleListArea">
    <div class="searchBar">
      <el-input v-model="searchKey" size="large" class="HeaderItem" placeholder="搜索通知">
        <template #append>
          <el-button :icon="Search" @click="searchNotifyData" />
        </template>
      </el-input>
    </div>
    <el-table :data="NotifyData" class="ArticleListTable" border table-layout="fixed"
      style="width: 100%; height: calc(100% - 80px); overflow-x: auto;" stripe>
      <el-table-column fixed prop="article_id" label="文章ID" width="80">
        <template v-slot="scope">
          <span class="defalut_a_black articleId">
            {{ scope.row.notify_id }}
          </span>
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
      <el-table-column prop="is_delete" label="状态" width="60">
        <template v-slot="scope">
          <div class="Limit-content">{{ CountDeleteCode(scope.row.is_delete) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="whosee" label="谁能看" width="80">
        <template v-slot="scope">
          <div class="Limit-content">{{ whosee(scope.row.whosee) }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="detailPanelShow(scope.row.notify_id)">详细</el-button>
          <el-button link type="danger" size="small" @click="deletePage(scope.row.notify_id)">彻底删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <recyleDetailPanel v-if="isDetail" @closePanel="closePanel" :ArticleId="Id" :isTrue="isTrue" :type="'notify'">
  </recyleDetailPanel>
</template>

<script setup lang="ts">
// 引入模块
import { ref, onMounted, computed } from "vue";
import getNotifyAPI from "@/utils/API/Recycle"
import NotifyRequest from "@/utils/API/ArticleClass"
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus";
import useELTips from '@/Hooks/ElMessageBoxTips'
import recyleDetailPanel from '@/components/Recyle/recyleDetailPanel.vue'
// 数据定义 
let NotifyData = ref([])
const searchKey = ref('')
let isDetail = ref(false)
let Id: string = ''
let isTrue: boolean = false

// 获取数据
async function GetNotifyListData() {
  const { data: res } = await getNotifyAPI.getRecycleList('null', 'notify', 'get')
  NotifyData.value = res.data
}

// 删除该文章
const deletePage = async (id: string | number) => {
  if (await useELTips('你真的要删除这篇文章？')) {
    const { data: res } = await getNotifyAPI.getRecycleList(id, 'notify', 'delete')
    if (res.status === 200) {
      GetNotifyListData()
    }
  }
}

// 展开细节Panel
const detailPanelShow = (notify_id: string) => {
  isDetail.value = true
  Id = notify_id
  isTrue = true
}
// 关闭Panel
const closePanel = () => {
  isDetail.value = false
  GetNotifyListData()
}
// 搜索文章
const searchNotifyData = async () => {
  if (searchKey.value.trim() !== '') {
    const { data: res } = await NotifyRequest.search(searchKey.value, 'notify_delete')
    NotifyData.value = res.data
    searchKey.value = ''
  } else {
    ElMessage.error('关键词不能为空！')
    GetNotifyListData()
  }
}

// 在组件挂载时获取文章列表数据
onMounted(() => {
  if (NotifyData.value.length === 0) {
    GetNotifyListData()
  }
})
// 计算属性
const CountDeleteCode = computed(() => {
  return (is_delete: string) => {
    return parseInt(is_delete) === 0 ? '正常' : '已删除'
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
  font-weight: 600;
  cursor: pointer;
}
</style>
