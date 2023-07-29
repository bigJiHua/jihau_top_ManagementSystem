<template>
  <div class="ArticleListArea">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="用户列表" name="first" class="ListArea">
        <UserList></UserList>
      </el-tab-pane>
      <el-tab-pane label="管理员列表" name="second" class="ListArea">
        <ManageList></ManageList>
      </el-tab-pane>
      <el-tab-pane label="已注销用户" name="third">
        <DeleteUserList></DeleteUserList>
      </el-tab-pane>
      <!-- <el-tab-pane label="Task" name="fourth">Task</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
// 引入模块
import { ref } from "vue";
import UserList from './Userlist.vue'
import ManageList from './managelist.vue'
import DeleteUserList from './deleteUserlist.vue'
const activeName = ref('first')

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

.ListArea {
  width: 100%;
  height: 85vh;
  overflow: scroll;
}

.ListArea::-webkit-scrollbar {
  display: none;
}

/deep/.el-tabs__header {
  margin: 0;
}</style>
