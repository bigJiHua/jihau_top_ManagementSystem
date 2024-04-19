<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import useELTips from '@/Hooks/ElMessageBoxTips'
import SearchAPI from '@/utils/API/ArticleClass'
import SendMsgAPI from '@/utils/API/Msg'
import MessageItem from '@/components/IM/MessageItem.vue'
const props = defineProps({
  type: {
    type: String,
    defalut: 'all',
  },
})
const searchKey = ref('')
let UserList: any = ref({
  user_pic: '',
  username: '',
  user_id: '',
})
const ruleFormRef = ref<FormInstance>()
const options = [
  {
    value: 'notify',
    label: '通知',
  },
  {
    value: 'activity',
    label: '活动',
  },
  {
    value: 'contact',
    label: '联系',
  },
]
const subData: any = reactive<RuleForm>({
  type: props.type === 'user' ? 'user' : 'all',
  title: props.type === 'user' ? '管理员新建通知' : '',
  senduser: props.type === 'user' ? 'user' : 'System',
  getuser: props.type === 'user' ? '' : 'all',
  content: '',
  label: 'notify',
})
interface RuleForm {
  type: string
  title: string
  senduser: string
  getuser: string
  content: string
  label: string
}
const rules = reactive<FormRules<RuleForm>>({
  title: [
    { required: true, message: '请输入通知标题/标签', trigger: 'blur' },
    { min: 2, max: 15, message: '长度限制 2 - 15', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入通知内容', trigger: 'blur' },
    { min: 2, max: 150, message: '长度限制 2 - 150', trigger: 'blur' },
  ],
  getuser: [
    { required: true, message: '接收者参数异常！', trigger: 'blur' },
    { min: 1, max: 15, message: '长度限制 1 - 15', trigger: 'blur' },
  ],
})
// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  let msg =
    props.type === 'user' ? '确认发送通知吗？' : '确定要发送全站通知吗？'
  await formEl.validate(async (valid) => {
    if (valid) {
      if (await useELTips(msg)) {
        try {
          const { data: res } = await SendMsgAPI.sendMsg(subData)
          if (res.status === 200) {
            formEl.resetFields()
          }
        } catch (error) {
          formEl.resetFields()
        }
      }
    } else {
      ElMessage.warning('参数不全！！！')
    }
  })
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 搜索用户

// 搜索用户
const searchUserData = async () => {
  if (searchKey.value.trim() !== '') {
    const { data: res } = await SearchAPI.search(searchKey.value, 'all')
    UserList.value = res.data
    searchKey.value = ''
  } else {
    ElMessage.error('关键词不能为空！')
  }
}
</script>
<template>
  <div class="SendMsgBox">
    <div class="leftBar">
      <div v-if="type === 'user'">
        <el-input
          v-model="searchKey"
          size="large"
          class="HeaderItem"
          placeholder="搜索用户"
        >
          <template #append>
            <el-button :icon="Search" @click="searchUserData" />
          </template>
        </el-input>
        <div
          class="UserCardItem"
          v-for="(item, index) in UserList"
          :key="index"
        >
          <div class="item">
            <img class="userLogo" :src="item.user_pic" alt="logo" />
            <div class="userData">
              <p>{{ item.username }}</p>
              <p>id: {{ item.user_id }}</p>
            </div>
          </div>
          <el-button
            type="primary"
            plain
            @click="subData.getuser = item.user_id"
            >发给他</el-button
          >
        </div>
      </div>
      <div v-else>
        通知预览
        <MessageItem :data="subData"></MessageItem>
      </div>
    </div>
    <div class="rightBar">
      <el-alert
        title="注意：发布错误的通知只能删除重发不可恢复找回"
        type="error"
      />
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="subData"
        :rules="rules"
        label-width="auto"
        class="senMessageFrom"
        status-icon
        :label-position="'top'"
        :size="'large'"
      >
        <el-form-item label="通知标题" prop="title">
          <el-input
            :disabled="type === 'user'"
            v-model="subData.title"
            placeholder="请输入通知标题"
          />
        </el-form-item>
        <el-form-item label="通知标签" prop="title">
          <!-- <el-input v-model="subData.label" placeholder="请输入通知标签" /> -->
          <el-select
            v-model="subData.label"
            placeholder="选择通知标签"
            style="width: 240px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="type === 'user'"
          label="发给谁 --- 请输入用户id"
          prop="getuser"
        >
          <el-input v-model="subData.getuser" placeholder="请输入目标用户ID" />
        </el-form-item>
        <el-form-item label="通知内容" prop="content">
          <el-input
            v-model="subData.content"
            maxlength="150"
            minlength="2"
            placeholder="请输入发送的内容"
            show-word-limit
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10 }"
          />
        </el-form-item>
        <el-form-item>
          <div class="subBtn">
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              发送
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style scoped>
.senMessageFrom {
  font-size: 1.2rem;
}

.subBtn {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.SendMsgBox {
  display: flex;
}

.leftBar,
.rightBar {
  flex: 1;
  padding: 2px;
}

.leftBar {
  overflow: scroll;
}

.leftBar::-webkit-scrollbar {
  display: none;
}

.userLogo {
  width: 50px;
  height: 50px;
}

.UserCardItem,
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item {
  img {
    margin-right: 10px;
  }
}

.userData {
  p:first-child {
    color: #fb7299;
  }
}
</style>
