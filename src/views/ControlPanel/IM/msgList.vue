<template>
  <div class="MessageListArea">
    <div class="searchBar">
      <el-input
        v-model="searchKey"
        size="large"
        class="HeaderItem"
        placeholder="搜索通知"
      >
        <template #append>
          <el-button :icon="Search" @click="searchAllNotify" />
        </template>
      </el-input>
    </div>
    <el-table
      :data="MessageData"
      class="ArticleListTable"
      border
      table-layout="fixed"
      style="width: 100%; height: calc(100% - 80px); overflow-x: auto"
      stripe
    >
      <el-table-column
        fixed
        prop="id"
        label="文章ID"
        width="70"
      ></el-table-column>
      <el-table-column prop="title" label="标题" width="120" />
      <el-table-column prop="type" label="类型" sortable width="90" />
      <el-table-column prop="senduser" label="谁发" width="80" />
      <el-table-column prop="getuser" label="谁收" width="80" />
      <el-table-column prop="content" label="内容" width="200" />
      <el-table-column prop="label" label="标签" width="100" />
      <el-table-column prop="pub_date" label="发布日期" sortable width="90">
        <template v-slot="scope">
          {{ dayjs(Number(scope.row.pub_date)).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="阅读状态" width="60">
        <template v-slot="scope">
          <div class="Limit-content">
            {{ CountState(scope.row.state) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="is_delete" label="是否删除" width="100">
        <template v-slot="scope">
          <div class="Limit-content">
            {{ CountDeleteCode(scope.row.is_delete, scope.row.state) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-tooltip
            effect="light"
            content="删除按钮不可逆！"
            placement="top"
          >
            <el-button
              type="danger"
              size="small"
              plain
              v-if="scope.row.is_delete === 0"
              @click="Delect(scope.row.id)"
              >删除</el-button
            ><el-button link type="danger" size="small" plain disabled v-else
              >已删除</el-button
            >
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="prevBar">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="prevNum"
        @prev-click="pagerNum"
        @next-click="nextNum"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入模块
import dayjs from 'dayjs'
import { ref, reactive, onMounted, computed } from 'vue'
import getMsgAPI from '@/utils/API/Msg'
import { useArticleDataStore } from '@/stores/ArticleClass'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import useELTips from '@/Hooks/ElMessageBoxTips'
// 数据定义
const store = useArticleDataStore()
let MessageData = ref([])
let total = ref(0)
const searchKey = ref('')
let nowPagenum = ref(0)
const isSearch = ref(false)
// 方法
const GetArticleListData = async (GetNum: number) => {
  const { data: res } = await getMsgAPI.getMsg(GetNum)
  total.value = res.totalNum
  MessageData.value = res.data
}
// 删除接口
const Delect = async (id: string) => {
  if (!(await useELTips('你确定要删除这个全站通知吗？'))) return
  const { data: res } = await getMsgAPI.delMsg(id, 'delete')
  if (res.status === 200) {
    GetArticleListData(nowPagenum.value)
  }
}

// 上一页
const prevNum = (num: number) => {
  GetArticleListData(num)
  nowPagenum.value = num
}
// 数字
const pagerNum = (num: number) => {
  GetArticleListData(num)
  nowPagenum.value = num
}
// 下一页
const nextNum = (num: number) => {
  GetArticleListData(num)
  nowPagenum.value = num
}
// 校验keys非空
const isNonEmptyString = (key: string): boolean => {
  const trimmedInput = key.trim()
  return trimmedInput !== ''
}
// 搜索文章
const searchAllNotify = async () => {
  if (isNonEmptyString(searchKey.value)) {
    const { data: res } = await getMsgAPI.getMsg(0, searchKey.value)
    MessageData.value = res.data
    searchKey.value = ''
    isSearch.value = true
  } else {
    ElMessage.error('关键词不能为空！')
    GetArticleListData(nowPagenum.value)
  }
}
// 计算属性
// 计算文章状态
const CountDeleteCode = computed(() => {
  return (is_delete: string, state: string) => {
    if (Number(is_delete) === 0) {
      return '已发布正常'
    } else {
      return '已删除'
    }
  }
})
// 计算阅读状态
const CountState = computed(() => {
  return (state: string) => {
    if (parseInt(state) === 0) {
      return '未查阅'
    } else if (parseInt(state) === 1) {
      return '已查阅'
    }
  }
})
// 在组件挂载时获取文章列表数据
onMounted(() => {
  if (store.getStoreArticleListData.length === 0) {
    GetArticleListData(nowPagenum.value)
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

.MessageListArea {
  height: calc(100vh - 60px);
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
