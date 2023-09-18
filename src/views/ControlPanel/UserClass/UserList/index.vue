<template>
  <div class="ArticleListArea">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane name="first" class="ListArea">
        <template #label>
          <div class="tab-label" @click="getData(1)">用户列表</div>
        </template>
        <UserList ref="User"></UserList>
      </el-tab-pane>
      <el-tab-pane name="second" class="ListArea">
        <template #label>
          <div class="tab-label" @click="getData(2)">管理员列表</div>
        </template>
        <ManageList ref="Maneger"></ManageList>
      </el-tab-pane>
      <el-tab-pane name="third">
        <template #label>
          <div class="tab-label" @click="getData(3)">已注销用户</div>
        </template>
        <DeleteUserList ref="DUser"></DeleteUserList>
      </el-tab-pane>
      <el-tab-pane name="fourth">
        <template #label>
          <div class="tab-label" @click="getData(4)">未激活账户</div>
        </template>
        <NotActList ref="NotA"></NotActList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
// 引入模块
import { ref } from "vue";
import UserList from './Userlist.vue'
import ManageList from './managelist.vue'
import DeleteUserList from './deleteUserlist.vue'
import NotActList from './notActlist.vue'
const activeName = ref('first')

let User: any = ref(null)
let Maneger: any = ref(null)
let DUser: any = ref(null)
let NotA: any = ref(null)
const getData = (val: number) => {
  switch (val) {
    case 1:
      // 父组件触发子组件里的函数方法
      User.value.GetUserListData(0)
      break;
    case 2:
      Maneger.value.GetUserListData(0)
      break;
    case 3:
      DUser.value.GetUserListData(0)
      break;
    case 4:
      NotA.value.GetUserListData(0)
      break;
  }
}
</script>

<style lang="less" scoped>
.ArticleListArea {
  height: 100%;
  overflow: hidden;
  padding: 10px 0;
}

/deep/.el-table__cell {
  text-align: center;
}
/deep/.el-tabs__header {
  margin: 0;
}
</style>
