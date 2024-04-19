<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <div class="MsgBoxItem">
    <div class="MsgBoxItemLeft">
      <div class="Msg">
        <div class="MsgHeader">
          <span class="name">{{ data.senduser }}</span>
          <div class="MsgBoxItemRightTitle">{{ data.title }}</div>
          <div class="MsgBoxItemRightTitleTime">{{ dayjs(new Date().getTime()).format('YYYY-MM-DD') }}
          </div>
        </div>
        <div class="MsgBoxItemRightContent" v-if="data.type !== 'relation'">
          {{ data.content }}
        </div>
      </div>
    </div>
    <div class="isState"></div>
  </div>
</template>

<style lang="less" scoped>
.MsgBoxItem {
  display: flex;
  justify-content: space-between;
  background-color: var(--el-color-primary-light-9);
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  background-color: #ffffff;
}

.MsgBoxItemLeft {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.UserAvatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;

  > img {
    width: 100%;
    height: 100%;
  }
}

.Msg {
  display: flex;
  flex-direction: column;
  font-weight: 400;
  margin-right: 10px;

  .MsgBoxItemRightContent {
    margin: 8px 0;
  }
}

.MsgHeader {
  display: flex;
  align-items: center;

  .name {
    color: #fb7299;
    font-size: 1.2rem;
    margin-right: 5px;
  }

  .MsgBoxItemRightTitleTime {
    margin-left: 10px;
  }
}

.MsgBoxItemRightTitleTime {
  font-size: 0.8rem;
}

.MsgBoxItem {
  position: relative;
}
.isState {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fb7299;
  right: 0;
  top: 0;
}
@media screen and(max-width: 755px) {
  .MsgBoxItem {
    padding: 5px;
    margin: 5px;
  }
}
</style>
