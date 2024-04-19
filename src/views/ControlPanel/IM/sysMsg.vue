<script lang="ts" setup>
import { ref } from 'vue'
import sendBox from '@/components/IM/sendBox.vue'
const activeName = ref('first')
</script>
<template>
  <div class="SendAllMsgBox">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="全站通知" name="first">
        <sendBox v-if="activeName === 'first'" :type="'all'"></sendBox>
      </el-tab-pane>
      <el-tab-pane label="单发用户" name="second">
        <sendBox v-if="activeName === 'second'" :type="'user'"></sendBox>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style scoped>
.SendAllMsgBox {
  padding: 10px;
  height: calc(100vh - 50px);
}
</style>
