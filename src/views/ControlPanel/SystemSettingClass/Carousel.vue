<template>
  <div class="LunboBoxArea">
    <div class="LunboShow">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in LunBoList" :key="item">
          <img class="LunboImg" :src="item.set_difault" alt="item.set_title">
          <div class="dataBox">
            <ul>
              <li>
                轮播标题: {{ item.set_title }}
              </li>
              <li>
                文章到达: {{ item.set_url }}
              </li>
              <li>
                设置图源: {{ item.set_difault }}
              </li>
              <li>
                设置时间: {{ item.set_time }}
              </li>
            </ul>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="ChangeLunbo">
      <div class="ChangeItem" v-for="(item, index) in LunBoList" :key="index">
        <el-descriptions direction="vertical" :column="4" border>
          <template #title>
            <fiv class="titleBox">
              <span>轮播图设置 {{ (index + 1) }}</span>
              <el-button type="primary" plain @click="ShowChange(item.id)">修改</el-button>
            </fiv>
          </template>
          <el-descriptions-item label="上传者">{{ item.set_user }}</el-descriptions-item>
          <el-descriptions-item label="时间">{{ item.set_time }}</el-descriptions-item>
          <el-descriptions-item label="设置标题" :span="2">
            <el-tag size="small">{{ item.set_title }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="文章源" :span="2">{{ item.set_url }}</el-descriptions-item>
          <el-descriptions-item label="轮播图源" :span="2">{{ item.set_difault }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
  <el-drawer v-model="isSHowCard" title="编辑轮播图">
    <div class="ChangeFrom">
      <el-form label-width="100px" :model="ChangeData" style="max-width: 460px">
        <el-form-item label="设置标题">
          <el-input v-model="ChangeData.set_title" />
        </el-form-item>
        <el-form-item label="设置源地址">
          <el-input v-model="ChangeData.set_url" />
        </el-form-item>
        <el-form-item label="设置图片源地址">
          <el-input v-model="ChangeData.set_difault" />
        </el-form-item>
      </el-form>
    </div>
    <div class="SubmitBtn">
      <el-button type="warning" plain @click="isSHowCard = false">取消</el-button>
      <el-button type="primary" plain @click="ChangeLunbo(ChangeData.id)">提交</el-button>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import getSetting from '@/utils/API/SystemClass'
import { onMounted, ref } from 'vue';
const LunBoList = ref<any>([])
const ChangeData = ref<any>([])
const isSHowCard = ref<boolean>(false)
const getLunbo = async () => {
  const { data: res } = await getSetting.getLunBo('get')
  LunBoList.value = res.data
}
const ShowChange = async (id: string | number) => {
  if (!id) return
  ChangeData.value = LunBoList.value.find((item: any) => item.id == id)
  isSHowCard.value = true
}
const ChangeLunbo = async (id: string | number) => {
  if (!id) return
  const { data: res } = await getSetting.getLunBo('cag', JSON.stringify(ChangeData.value))
  if (res.status === 200) {
    isSHowCard.value = false
    getLunbo()
  }
}
onMounted(() => {
  getLunbo()
})
</script>

<style lang="less" scoped>
.LunboBoxArea {
  height: calc(100vh - 50px);
  width: 100%;
  padding: 20px 5px;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
}

.titleBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.LunboShow {
  width: 50%;
  height: 15vh;
}

.LunboImg {
  width: 100%;
  height: 60%;
}

.dataBox>ul>li {
  font-size: 0.8rem;
}

.ChangeLunbo {
  width: 46%;
  height: 100%;
  overflow: scroll;
}

.ChangeLunbo::-webkit-scrollbar {
  display: none;
}

:deep(.el-descriptions__title) {
  width: 100%;
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
  margin-bottom: 15px;
  overflow-x: scroll;
  box-shadow: 0px 2px 5px rgba(173, 192, 255, 0.568);
  padding: 5px;
  border-radius: 5px;
  background-color: rgba(207, 218, 255, 0.21);
}

.ChangeItem::-webkit-scrollbar {
  display: none;
}
</style>
