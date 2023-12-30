<template>
  <div class="ArticleDetailPanelBox" @click.self="close">
    <div class="ArticleDetailPanelArea">
      <div class="BoxHeader">
        <h1>用户详细信息面板</h1>
        <el-button type="success" plain @click="GetUserDetail">刷新数据</el-button>
        <el-button type="danger" circle @click.stop="close">
          <el-icon class="closeBtn">
            <CloseBold />
          </el-icon>
        </el-button>
      </div>
      <div class="ArticleShowArea">
        <!-- 左侧内容阅览区 -->
        <div class="ArticleShowAreaBox">
          <el-tabs type="border-card">
            <el-tab-pane label="用户基本信息">
              <div class="UserAvatar">
                <div class="heBox">
                  <img :src="UserData.Users.user_pic" alt="用户头像" class="userLogo">
                  <span class="username">{{ UserData.Users.username }}</span>
                </div>
                <span class="fans">粉丝数：{{ UserData.Users.fans }}</span>
              </div>
              <div class="UserDetails">
                <el-descriptions class="UserCard" :column="2" size="default" border>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon style="default">
                          <iphone />
                        </el-icon>
                        UID
                      </div>
                    </template>
                    {{ UserData.Users.user_id }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon style="default">
                          <Postcard />
                        </el-icon>
                        邮箱
                      </div>
                    </template>
                    {{ UserData.Users.email }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon style="default">
                          <User />
                        </el-icon>
                        用户身份
                      </div>
                    </template>
                    <el-tag size="small">{{ UserData.Users.useridentity }}</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon style="default">
                          <Male />
                        </el-icon>
                        性别
                      </div>
                    </template>
                    {{ UserData.Users.sex }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon style="default">
                          <Calendar />
                        </el-icon>
                        注册日期
                      </div>
                    </template>
                    {{ registerDateCount }}
                    <el-tag size="small">{{ registerDay }}</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon style="default">
                          <DishDot />
                        </el-icon>
                        生日
                      </div>
                    </template>
                    {{ UserData.Users.birthday }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon style="default">
                          <Location />
                        </el-icon>
                        城市
                      </div>
                    </template>
                    {{ UserData.Users.city }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon style="default">
                          <tickets />
                        </el-icon>
                        介绍
                      </div>
                    </template>
                    {{ UserData.Users.user_content }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon style="default">
                          <Select />
                        </el-icon>
                        状态
                      </div>
                    </template>
                    {{ UserState }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon style="default">
                          <Open />
                        </el-icon>
                        是否激活
                      </div>
                    </template>
                    {{ UserisCat }}
                  </el-descriptions-item>
                </el-descriptions>
              </div>
            </el-tab-pane>
            <el-tab-pane label="修改用户信息">
              <div class="UserAvatar">
                <div class="heBox">
                  <img :src="cagUserData.user_pic" alt="用户头像" class="userLogo">
                  <span class="username">{{ cagUserData.username }}</span>
                </div>
                <div class="cagUserImgBox">
                  <el-input v-model="cagUserData.user_pic" placeholder="输入修改的头像Link" />
                  <el-button type="primary" plain @click="ChangeUserDataFunc('pic')">提交</el-button>
                </div>
              </div>
              <div class="UserDetails">
                <el-descriptions class="UserCard" :column="1" size="default" border>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon style="default">
                          <Postcard />
                        </el-icon>
                        邮箱
                      </div>
                    </template>
                    <div class="ChangeAre">
                      <el-input v-model="cagUserData.email" class="w-50 m-2" size="small" placeholder="修改用户介绍" />
                      <el-button type="warning" plain @click="ChangeUserDataFunc('email')">提交</el-button>
                    </div>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon style="default">
                          <tickets />
                        </el-icon>
                        介绍
                      </div>
                    </template>
                    <div class="ChangeAre">
                      <el-input v-model="cagUserData.user_content" class="w-50 m-2" size="small" placeholder="修改用户介绍" />
                      <el-button type="warning" plain @click="ChangeUserDataFunc('content')">提交</el-button>
                    </div>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon style="default">
                          <Select />
                        </el-icon>
                        状态
                      </div>
                    </template>
                    {{ UserState }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <div class="cell-item">
                        <el-icon style="default">
                          <Open />
                        </el-icon>
                        是否激活
                      </div>
                    </template>
                    {{ UserisCat }}
                  </el-descriptions-item>
                </el-descriptions>
              </div>
              <div class="UserActionBtn">
                <el-button type="warning" plain @click="ChangeUserDataFunc('rspwd')">重置密码</el-button>
                <el-button type="danger" v-if="parseInt(UserData.Users.state) === 0 && parseInt(UserData.Users.isact) !== 0" plain
                  @click="ChangeUserDataFunc('caac')">注销账号</el-button>
                <el-button type="success" v-else-if="parseInt(UserData.Users.isact) === 0" plain
                  @click="ChangeUserDataFunc('acti')">激活账号</el-button>
                <el-button type="success" v-else plain @click="ChangeUserDataFunc('reac')">恢复账号</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- 右侧工具面板 -->
        <div class="ActionToolArea">
          <UserDataList :UserID="UserData.Users.username" ref="getChildList" class="UserStats"></UserDataList>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GetUserData from "@/utils/API/UsersClass"
import UserDataList from '@/components/UserData/UserDataList.vue'
import useELTips from '@/Hooks/ElMessageBoxTips'
import {
  Iphone,
  Calendar,
  Postcard,
  Tickets,
} from '@element-plus/icons-vue'
import { onMounted, ref, computed } from "vue";

// 申明对父组件操作
const emit = defineEmits(['closePanel'])
const props = defineProps<{
  User: string,
  isTrue: boolean
}>();
// 初始化数据
let UserData = ref({
  articles: 0,
  collects: 0,
  comments: 0,
  goodnums: 0,
  Users: {
    birthday: '',
    city: '',
    email: '',
    isact: '',
    registerDate: '',
    sex: '',
    state: '',
    user_content: '',
    user_id: '',
    user_pic: '',
    useridentity: '',
    username: '',
    fans: 0,
  }
})
// 要修改的数据
let cagUserData = ref({
  birthday: '',
  city: '',
  email: '',
  isact: '',
  registerDate: '',
  sex: '',
  state: '',
  user_content: '',
  user_id: '',
  user_pic: '',
  useridentity: '',
  username: '',
  fans: 0,
})
// 父组件触发子组件里的函数方法
let getChildList: any = ref(null)

// 关闭组件 物理操作
function close() {
  emit('closePanel')
}
// 获取用户数据
const GetUserDetail = async () => {
  const { data: res } = await GetUserData.GetUserData(props.User)
  getChildList.value.GetUserListData()
  if (res.status === 200) {
    UserData.value = res.data
    Object.assign(cagUserData.value, UserData.value.Users)
  }
}
// 修改用户信息方法
const ChangeUserDataFunc = async (type: string) => {
  // 定义一个变量data，用于存储用户数据
  let data: any = {}
  // 定义一个变量reqtype，用于存储请求类型
  let reqtype: string = 'cag'
  // 定义一个布尔值confirmed，用于标记是否确认修改用户数据
  let confirmationMessage = '';
  if (type !== 'caac') {
    // 如果用户数据类型为pic，则将用户图片赋值给data
    switch (type) {
      case 'pic':
        data.user_pic = cagUserData.value.user_pic;
        confirmationMessage = '你确定要修改用户的头像吗？'
        break;
      // 如果用户数据类型为email，则将用户邮箱赋值给data
      case 'email':
        data.email = cagUserData.value.email;
        confirmationMessage = '你确定要修改用户的邮箱吗？'
        break;
      // 如果用户数据类型为content，则将用户内容赋值给data
      case 'content':
        confirmationMessage = '你确定要修改用户的个人简介吗？'
        break;
      // 如果用户数据类型为rspwd，则将密码赋值给data，并将请求类型赋值给reqtype
      case 'rspwd':
        confirmationMessage = '你确定要重置用户的密码吗？'
        reqtype = 'resetpwd';
        break;
      case 'reac':
        confirmationMessage = '你确定要恢复此用户吗？'
        reqtype = 'reac'
        break;
      case 'acti':
        confirmationMessage = '你确定要激活此账户吗？'
        reqtype = 'acti'
        break;
      // 其他情况，则返回
      default:
        return;
    }
    const confirmed = await useELTips(confirmationMessage)
    // 如果没有确认，则返回
    if (!confirmed) {
      return;
    }
    // 使用GetUserData.ChangeUserData方法修改用户数据
    await GetUserData.ChangeUserData(cagUserData.value.user_id, reqtype, data);
  } else {
    if (await useELTips('你确定要注销该用户吗？')) {
      reqtype = 'deluser'
      // 使用GetUserData.ChangeUserData方法修改用户数据
      await GetUserData.ChangeUserData(cagUserData.value.user_id, reqtype, data);
    }
  }
  data = {}
}

// 计算注册日期
const registerDateCount = computed(() => {
  const milliseconds = UserData.value.Users.registerDate;
  const date = new Date(milliseconds);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate
})
// 计算注册天数
const registerDay = computed(() => {
  const targetDate: number = Number(UserData.value.Users.registerDate)
  const currentDate = new Date(); // 获取当前日期和时间
  const timeDifference = currentDate.getTime() - targetDate // 计算时间差（毫秒数）
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // 计算天数差
  return `${Math.abs(daysDifference)}天`
})
const UserState = computed(() => {
  return Number(UserData.value.Users.state) === 0 ? '正常' : '注销'
})
const UserisCat = computed(() => {
  return Number(UserData.value.Users.isact) === 1 ? '已激活' : '未激活'
})
onMounted(() => {
  if (props.isTrue) {
    GetUserDetail()
  }
});

</script>


<style lang="less" scoped>
.ArticleDetailPanelBox {
  display: flex;
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中 */
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 平移 */
  background-color: rgba(104, 96, 96, 0.371);
  z-index: 99;
}

.ArticleDetailPanelArea {
  width: 80vw;
  height: 80vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* 平移 */
  background-color: rgb(254, 254, 254);
  z-index: 999;
  border-radius: 5px;
  overflow: hidden;
}

.ArticleShowArea {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-wrap: wrap;
  padding-bottom: 50px;
}

.ArticleShowAreaBox {
  width: 50%;
  overflow-y: scroll;
  height: 100%;
}

.ArticleShowAreaBox::-webkit-scrollbar {
  display: none;
}

.content {
  padding: 5px;
}

.ActionToolArea {
  width: calc(50% - 20px);
  background-color: rgba(200, 221, 249, 0.371);
  border-radius: 5px;
  height: 100%;
  overflow: scroll;
}

.ActionToolArea::-webkit-scrollbar {
  display: none;
}

.BoxHeader {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid;
}

.closeBtn {
  font-size: 1.2rem;
}

.UserAvatar {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  width: 100%;
  margin: 15px 0;

  .heBox {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
  }

  .userLogo {
    width: 45px;
    height: 35px;
    margin-right: 10px;
  }
}

.username {
  font-size: 1.2rem;
  font-weight: 600;
  color: rgb(251, 114, 153);
}

.UserStats {
  width: 100%;
}

.UserActionBtn,
.cagUserImgBox {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin: 20px 0;
}

.cagUserImgBox {
  max-width: 50%;
}

.ChangeAre {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;

  >.el-input {
    max-width: 180px;
    margin: 0 10px;
  }
}
</style>