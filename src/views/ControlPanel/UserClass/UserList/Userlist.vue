<template>
  <div class="UserListArea">
    <div class="UserCardItem" v-for="(item, index) in UserList" :key="index">
      <UserCard :data="item"></UserCard>
    </div>
  </div>
  <div class="prevBar">
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="prevNum" @prev-click="pagerNum"
      @next-click="nextNum" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import UserCard from '@/components/UserData/UserCard.vue'
import GetUserList from '@/utils/API/UsersClass'
let UserList = reactive([])
let nowPagenum = 0
let total = ref(0)

const GetUserListData = async (Num: number) => {
  const { data: res } = await GetUserList.getUserList(Num, 'user')
  UserList = res.data
  total.value = res.totalNum
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

onMounted(() => {
  GetUserListData(0)
})
</script>

<style lang="less" scoped>
.UserListArea {
  height: calc(100vh - 135px);
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
