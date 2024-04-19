<template>
  <div class="UserList">
    <div class="UserItem">
      <el-descriptions class="margin-top" title="添加发展历程" :column="2" border>
        <template #extra>
          <el-button type="success" plain @click="AddUserData()">添加</el-button>
        </template>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              标题
            </div>
          </template>
          <el-input v-model="newDevP.set_title" placeholder="输入标题" />
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              历程时间
            </div>
          </template>
          <el-date-picker v-model="newDevP.set_change" type="date" />
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              链接
            </div>
          </template>
          <el-input v-model="newDevP.set_url" placeholder="输入链接" />
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              默认文字
            </div>
          </template>
          <el-input v-model="newDevP.set_difault" placeholder="默认文字" />
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="UserItem" v-for="(item, index) in DevP" :key="index">
      <el-descriptions class="margin-top" :title="`发展历程${index + 1}`" :column="2" border>
        <template #extra>
          <el-button type="primary" @click="ChangeData(item)">编辑</el-button>
          <el-button type="danger" :icon="Delete" circle @click="DeleteUser(item)" />
        </template>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              标题
            </div>
          </template>
          <span style="font-size: 10px;">{{ item.set_title }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              历程时间
            </div>
          </template>
          {{ item.set_change }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              链接
            </div>
          </template>
          {{ item.set_url }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              默认文字
            </div>
          </template>
          {{ item.set_difault }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
  <el-drawer v-model="isDrawer" :with-header="false">
    <div class="ChangeFrom">
      <el-form label-width="100px" :model="ChangeData" style="max-width: 460px">
        <el-form-item label="标题">
          <el-input v-model="ChangeDevpP.set_title" />
        </el-form-item>
        <el-form-item label="历程时间">
          <el-date-picker v-model="ChangeDevpP.set_change" type="date" />
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="ChangeDevpP.set_url" />
        </el-form-item>
        <el-form-item label="默认文字">
          <el-input v-model="ChangeDevpP.set_difault" />
        </el-form-item>
      </el-form>
    </div>
    <div class="SubmitBtn">
      <el-button type="warning" plain @click="isDrawer = false">取消</el-button>
      <el-button type="primary" plain @click="ChangeUserList()">提交</el-button>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import useELTips from '@/Hooks/ElMessageBoxTips'
import getSpsList from '@/utils/API/SystemClass'
import dayjs from 'dayjs'
import { Delete } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
const newDevP = ref({
  set_name: 'DevP',
  set_title: '',
  set_url: '',
  set_difault: '',
  set_difault01: '',
  set_change: '',
  set_time: ''
}) as any
const ChangeDevpP = ref({
  id: '',
  set_name: 'DevP',
  set_title: '',
  set_url: '',
  set_difault: '',
  set_difault01: '',
  set_change: '',
  set_time: ''
})
const isDrawer = ref(false)
const DevP = ref<any>([])
const getUserList = async () => {
  const { data: res } = await getSpsList.getDevP('get')
  DevP.value = res.data
}
const ChangeData = async (item: any) => {
  ChangeDevpP.value = item
  isDrawer.value = true
}
const ChangeUserList = async () => {
  if (await useELTips('你确定要修改当前历程信息吗？')) {
    ChangeDevpP.value.set_change = dayjs(ChangeDevpP.value.set_change).format('YYYY-MM-DD')
    console.log(ChangeDevpP.value);
    const { data: res } = await getSpsList.getDevP('cag', JSON.stringify(ChangeDevpP.value))
    if (res.status === 200) {
      isDrawer.value = false
      getUserList()
    }
  }
}
const DeleteUser = async (item: any) => {
  if (await useELTips('你确定要删除该历程吗？')) {
    const { data: res } = await getSpsList.getDevP('del', JSON.stringify(item))
    if (res.status === 200) {
      getUserList()
    }
  }
}
const AddUserData = async () => {
  for (const item in newDevP.value) {
    if (newDevP.value[item] === '') {
      ElMessage({
        showClose: true,
        message: '有遗漏项！确保每项都要填完！',
        type: 'error',
      })
      return
    }
  }
  newDevP.value.set_change = dayjs(newDevP.value.set_change).format('YYYY-MM-DD')
  if (await useELTips('你确定要添加当前历程信息吗？')) {
    const { data: res } = await getSpsList.getSpsList('add', JSON.stringify(newDevP.value))
    if (res.status === 200) {
      getUserList()
      newDevP.value.set_name = 'PriceUser'
      newDevP.value.set_title = ''
      newDevP.value.set_url = ''
      newDevP.value.set_difault = ''
      newDevP.value.set_difault01 = ''
      newDevP.value.set_change = ''
      newDevP.value.set_time = ''
      newDevP.value.set_change = ''
    }
  }
}
onMounted(() => {
  getUserList()
})
</script>

<style lang="less" scoped>
.UserList {
  width: 100%;
  height: calc(100vh - 50px);
  overflow: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.UserList::-webkit-scrollbar {
  display: none;
}

.UserItem {
  width: 49%;
  margin: 5px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(173, 192, 255, 0.568);
}

.SubmitBtn {
  margin-top: 10vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: nowrap;
}

.ChangeItem {
  border-bottom: 2px solid gray;
  margin-bottom: 10px;
  overflow-x: scroll;
}

.ChangeItem::-webkit-scrollbar {
  display: none;
}
</style>
