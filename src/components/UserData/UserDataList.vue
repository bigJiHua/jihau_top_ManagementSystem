<template>
  <div class="demo-collapse">
    <el-tabs type="border-card">
      <el-tab-pane label="用户权限管理">
        <ul style="list-style: none;">
          <li class="swList">修改等级:
            <el-switch class="swbtn" @change="cagUserPower('power')" v-model="powerDataValue.power" inline-prompt
              active-text="管理员" inactive-text="用户" />
          </li>
          <li class="swList">评论权限:
            <el-switch class="swbtn" @change="cagUserPower('compower')" v-model="powerDataValue.compower" inline-prompt
              active-text="是" inactive-text="否" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
          </li>
          <li class="swList">发布文章权限:
            <el-switch class="swbtn" @change="cagUserPower('artpower')" v-model="powerDataValue.artpower" inline-prompt
              active-text="是" inactive-text="否" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
          </li>
          <li class="swList">图片资源上传权限:
            <el-switch class="swbtn" @change="cagUserPower('imgpower')" v-model="powerDataValue.imgpower" inline-prompt
              active-text="是" inactive-text="否" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="用户操作信息">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item :title="`用户收藏 ${ListData.collects}`" name="1">
            <div class="data-container" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
              infinite-scroll-distance="10">
              <ArticleDetailCard :data="item" v-for="item in ListData.collect" :key="item" :user="UserID">
              </ArticleDetailCard>
              <div v-if="loading">加载中...</div>
            </div>
          </el-collapse-item>
          <el-collapse-item :title="`发表评论 ${ListData.comments}`" name="2">
            <div class="data-container" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
              infinite-scroll-distance="10">
              <ArticleDetailCard :data="item" v-for="item in ListData.comment" :key="item" :user="UserID"
                @GetnewListData="GetUserListData"></ArticleDetailCard>
              <div v-if="loading">加载中...</div>
            </div>
            <!-- 此处省略其它代码 -->
          </el-collapse-item>
          <el-collapse-item :title="`点赞文章 ${ListData.goodnums}`" name="3">
            <div class="data-container" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
              infinite-scroll-distance="10">
              <ArticleDetailCard :data="item" v-for="item in ListData.goodnum" :key="item" :user="UserID">
              </ArticleDetailCard>
              <div v-if="loading">加载中...</div>
            </div>
            <!-- 此处省略其它代码 -->
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import getActDataAPI from '@/utils/API/UsersClass'
import ArticleDetailCard from '@/components/UserData/ArticleDetailCard.vue'
import useELTips from '@/Hooks/ElMessageBoxTips'
import { ElMessageBox } from 'element-plus'
const props = defineProps<{
  UserID: string
}>()
const activeName = ref('')
const ListData = ref({
  collect: [],
  comment: [],
  goodnum: [],
  collects: 0,
  comments: 0,
  goodnums: 0,
})
const powerDataValue = ref({
  power: true,
  compower: true,
  artpower: true,
  imgpower: true,
})
const loading = ref(false);
// 获取数据
const GetUserListData = async () => {
  const { data: res } = await getActDataAPI.getUserActData(props.UserID)
  const { data: powerData } = await getActDataAPI.ChangeUserPower(props.UserID, 'get', {})
  ListData.value.collect = res.data.collect
  ListData.value.comment = res.data.comment
  ListData.value.goodnum = res.data.goodnum
  ListData.value.collects = res.data.collects
  ListData.value.comments = res.data.comments
  ListData.value.goodnums = res.data.goodnums
  powerDataValue.value.power = powerData.data.isadmin === 1 ? true : false
  powerDataValue.value.compower = powerData.data.iscom === 1 ? true : false
  powerDataValue.value.artpower = powerData.data.isart === 1 ? true : false
  powerDataValue.value.imgpower = powerData.data.isupimg === 1 ? true : false
}
// 修改用户权限
const cagUserPower = async (type: string) => {
  let sandMessage = ''
  const data: any = {}
  switch (type) {
    case 'power':
      sandMessage = powerDataValue.value.power ? '你确定要授予该用户管理员权限吗？' : '你确定要收回该用户的管理员权限吗？'
      data.isadmin = powerDataValue.value.power ? 1 : 0
      break;
    case 'compower':
      sandMessage = powerDataValue.value.compower ? '你确定要授予该用户评论权限吗？' : '你确定要收回该用户的评论权限吗？'
      data.iscom = powerDataValue.value.compower ? 1 : 0
      break;
    case 'artpower':
      sandMessage = powerDataValue.value.artpower ? '你确定要授予该用户发布文章权限吗？' : '你确定要收回该用户的发布文章权限吗？'
      data.isart = powerDataValue.value.artpower ? 1 : 0
      break;
    case 'imgpower':
      sandMessage = powerDataValue.value.imgpower ? '你确定要授予该用户上传图片权限吗？' : '你确定要收回该用户的上传图片权限吗？'
      data.isupimg = powerDataValue.value.imgpower ? 1 : 0
      break;
    default:
      return
  }
  if (await useELTips.WarningTips(sandMessage) === 'true') {
    if (type !== 'power') {
      try {
        await getActDataAPI.ChangeUserPower(props.UserID, 'cag', data)
      } catch {
        GetUserListData()
      }
    } else {
      ElMessageBox.prompt('请输入你的账户密码校验身份', '重权操作！', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        inputType: 'password', // 将输入框变成密码框
        inputPattern: /^[^\u4e00-\u9fa5]{6,30}$/,
        inputErrorMessage: '6-12位且不能为空！',
      })
        .then(async ({ value }) => {
          const { data: res } = await getActDataAPI.ChangeUserPower(props.UserID, 'check', { pwd: value })
          if (!res.isTrue) {
            GetUserListData()
            return
          } else {
            await getActDataAPI.ChangeUserPower(props.UserID, 'cag', data)
          }
        })
        .catch(() => {
          return
        })
    }
  } else {
    GetUserListData()
    return
  }

}
// 加载更多数据的操作
const loadMore = () => {
  if (!loading.value) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
};
onMounted(() => {
  setTimeout(() => {
    if (props.UserID) {
      GetUserListData()
    }
  }, 300)
})
// 暴露方法给父组件
defineExpose({ GetUserListData })
</script>

<style lang="less" scoped>
.swList {
  margin-bottom: 4px;
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
</style>