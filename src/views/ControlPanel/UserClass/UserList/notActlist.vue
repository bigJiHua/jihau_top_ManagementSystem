<template>
  <div class="UserListArea">
    <div class="searchBar">
      <el-input v-model="searchKey" size="large" class="HeaderItem" placeholder="搜索用户">
        <template #append>
          <el-button :icon="Search" @click="searchUserData" />
        </template>
      </el-input>
    </div>
    <div class="UserCardItem" v-for="(item, index) in UserList" :key="index">
      <UserCard :data="item" @closePanel="closePanel" @openPanel="openPanel" :module="'list'"></UserCard>
    </div>
  </div>
  <div class="prevBar">
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="prevNum" @prev-click="pagerNum"
      @next-click="nextNum" />
  </div>
  <UserDetailPanel v-if="isEditor" :isTrue="isEditor" :User="User" @closePanel="closePanel" ></UserDetailPanel>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import UserCard from '@/components/UserData/UserCard.vue'
import UserDetailPanel from '@/components/UserData/UserDetailPanel.vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus";
import GetUserList from '@/utils/API/UsersClass'
import SearchAPI from "@/utils/API/ArticleClass"
let UserList = reactive([])
let nowPagenum = 0
const searchKey = ref('')
let total = ref(0)
let isEditor = ref(false)
let User = ref('')
// 获取用户列表
const GetUserListData = async (Num: number) => {
  const { data: res } = await GetUserList.getUserList(Num, 'notact')
  UserList = res.data
  total.value = res.totalNum
}

// 搜索用户
const searchUserData = async () => {
  if (searchKey.value.trim() !== '') {
    const { data: res } = await SearchAPI.search(searchKey.value, 'notact')
    UserList = res.data
    searchKey.value = ''
  } else {
    ElMessage.error('关键词不能为空！')
    GetUserListData(0)
  }
}
// 上一页
const prevNum = (num: number) => {
  GetUserListData(num)
  nowPagenum = num
}
// 数字
const pagerNum = (num: number) => {
  GetUserListData(num)
  nowPagenum = num
}
// 下一页
const nextNum = (num: number) => {
  GetUserListData(num)
  nowPagenum = num
}
// 开启面板
const openPanel = (user: string) =>{
  isEditor.value = true
  User.value = user
}
// 开启面板
const closePanel = () =>{
  isEditor.value = false
}
// 暴露方法给父组件
defineExpose({ GetUserListData })
</script>

<style lang="less" scoped>
.UserListArea {
  height: calc(100vh - 150px);
  width: 100%;
  background-color: #fff;
  overflow: scroll;
}

.UserListArea::-webkit-scrollbar {
  display: none;
}

.prevBar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

</style>
