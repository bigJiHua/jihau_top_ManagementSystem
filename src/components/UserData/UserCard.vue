<template>
  <div class="UserCardItemArea">
    <el-descriptions class="UserCard" :column="3" :size="size" border>
      <template #title>
        <div class="custom-title">
          <div class="UserImag">
            <img :src="data.user_pic" alt="头像">
          </div>
          <span class="userName">{{ data.username }}</span>
        </div>
      </template>
      <template #extra>
        <el-button type="primary">编辑用户信息</el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone />
            </el-icon>
            UID
          </div>
        </template>
        {{ data.user_id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Postcard />
            </el-icon>
            邮箱
          </div>
        </template>
        {{ data.email }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <User />
            </el-icon>
            用户身份
          </div>
        </template>
        <el-tag size="small">{{ data.useridentity }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <location />
            </el-icon>
            城市
          </div>
        </template>
        {{ data.city }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Burger />
            </el-icon>
            生日
          </div>
        </template>
        {{ data.birthday }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Male />
            </el-icon>
            性别
          </div>
        </template>
        {{ data.sex }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Male />
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
            <el-icon :style="iconStyle">
              <tickets />
            </el-icon>
            介绍
          </div>
        </template>
        {{ data.user_content }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import {
  Iphone,
  Location,
  Postcard,
  Tickets,
  User,
} from '@element-plus/icons-vue'

import { computed, ref } from 'vue'
const size = ref('')
const props = defineProps<{
  data: {
    birthday: string,
    city: string,
    email: string,
    id: number
    nickname: string,
    registerDate: number,
    sex: string,
    state: number,
    user_content: string,
    user_id: string,
    user_pic: string,
    useridentity: string,
    username: string,
  },
}>();

const iconStyle = computed(() => {
  const marginMap: any = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})
const registerDateCount = computed(() => {
  const milliseconds = props.data.registerDate;
  const date = new Date(milliseconds);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate
})
const registerDay = computed(() => {
  const targetDate: number = props.data.registerDate
  const currentDate = new Date(); // 获取当前日期和时间
  const timeDifference = currentDate.getTime() - targetDate // 计算时间差（毫秒数）
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // 计算天数差
  return `${Math.abs(daysDifference)}天`
})
</script>

<style lang="less" scoped>
.cell-item {
  display: flex;
  align-items: center;
  max-width: 100px;
}

/deep/.el-descriptions__header {
  margin: 0;
}

.UserCard {
  width: 100%;
  margin: 10px 5px;
  border-radius: 5px;
  padding: 5px;
  background-color: rgb(239, 239, 239);
}

.UserCardItemArea {
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: no-wrap;
  align-items: center;
  justify-content: flex-start;
}

.custom-title {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.UserImag {
  background-color: rgba(245, 247, 250, 0.342);
  overflow: hidden;
  padding: 5px;
  width: 45px;
  height: 40px;
  /* 添加等于宽度的高度以确保成为圆形 */
  margin: 5px;

  >img {
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
}

.userName {
  font-size: 1.2rem;
  font-weight: 600;
  color: rgb(251, 114, 153);
}
</style>
